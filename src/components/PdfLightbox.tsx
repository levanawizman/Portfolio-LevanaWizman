import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Download, Maximize, Minimize, X, ZoomIn, ZoomOut } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import type { PDFDocumentProxy } from 'pdfjs-dist'

// Configure le worker (ESM) pour Vite et les polices standard (PDF.js v4)
const pdfWorker = new Worker(new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url), { type: 'module' })
pdfjsLib.GlobalWorkerOptions.workerPort = pdfWorker
// @ts-expect-error standardFontDataUrl exists at runtime but is missing from the type definitions
pdfjsLib.GlobalWorkerOptions.standardFontDataUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/standard_fonts/'

type PdfLightboxProps = {
  pdfUrl: string
  onClose: () => void
  /** Mode épuré : pas de barre grise en haut, juste la croix pour fermer */
  minimal?: boolean
  /** Nom du fichier pour le téléchargement (ex. Levana_Wizman_CV.pdf) */
  downloadFilename?: string
  /** Ouvrir directement en plein écran */
  autoFullscreen?: boolean
}

export function PdfLightbox({ pdfUrl, onClose, minimal, downloadFilename, autoFullscreen }: PdfLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null)
  const [pageIndex, setPageIndex] = useState(0) // 0-based
  const [isFs, setIsFs] = useState(false)
  const [zoom, setZoom] = useState(1)

  const totalPages = doc?.numPages ?? 0

  const zoomIn = useCallback(() => setZoom((z) => Math.min(4, z + 0.25)), [])
  const zoomOut = useCallback(() => setZoom((z) => Math.max(0.5, z - 0.25)), [])
  const zoomReset = useCallback(() => setZoom(1), [])

  const renderPage = useCallback(
    async (index: number) => {
      if (!doc || !canvasRef.current || !overlayRef.current) return
      const pageNum = index + 1
      const page = await doc.getPage(pageNum)

      // Taille disponible — utilise des valeurs CSS stables indépendantes du zoom navigateur
      const container = overlayRef.current
      const maxW = Math.min(container.clientWidth * 0.94, 1600)
      const maxH = container.clientHeight * 0.85
      // Fixer le pixelRatio à 2 pour éviter les problèmes de redimensionnement au zoom navigateur
      const pixelRatio = 2

      // Rendu avec zoom intégré pour rester net
      const vp1 = page.getViewport({ scale: 1 })
      const baseScale = Math.min(maxW / vp1.width, maxH / vp1.height)
      const scale = baseScale * zoom * pixelRatio
      const viewport = page.getViewport({ scale })

      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (!context) return

      const displayWidth = Math.floor(viewport.width / pixelRatio)
      const displayHeight = Math.floor(viewport.height / pixelRatio)
      canvas.width = Math.floor(viewport.width)
      canvas.height = Math.floor(viewport.height)
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`

      await page.render({ canvas, canvasContext: context, viewport }).promise
    },
    [doc, zoom]
  )

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: pdfUrl })
        const loaded = await loadingTask.promise
        if (cancelled) return
        setDoc(loaded)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Erreur chargement PDF', err)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [pdfUrl])

  useEffect(() => {
    if (!doc) return
    renderPage(pageIndex)
  }, [doc, pageIndex, renderPage])

  useEffect(() => {
    const onResize = () => renderPage(pageIndex)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [pageIndex, renderPage])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setPageIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setPageIndex((i) => Math.min((totalPages || 1) - 1, i + 1))
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-') zoomOut()
      if (e.key === '0') zoomReset()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, totalPages, zoomIn, zoomOut, zoomReset])

  // Ctrl+molette = zoom
  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        setZoom((z) => Math.max(0.5, Math.min(4, z + (e.deltaY > 0 ? -0.15 : 0.15))))
      }
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  const goPrev = useCallback(() => setPageIndex((i) => Math.max(0, i - 1)), [])
  const goNext = useCallback(
    () => setPageIndex((i) => Math.min((totalPages || 1) - 1, i + 1)),
    [totalPages]
  )

  const toggleFullscreen = useCallback(async () => {
    if (!overlayRef.current) return
    if (!document.fullscreenElement) {
      await overlayRef.current.requestFullscreen()
      setIsFs(true)
    } else {
      await document.exitFullscreen()
      setIsFs(false)
    }
  }, [])

  // Plein écran automatique au montage (ex. pour le CV)
  useEffect(() => {
    if (!autoFullscreen) return
    const t = setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.requestFullscreen().then(() => setIsFs(true)).catch(() => {})
      }
    }, 200)
    return () => clearTimeout(t)
  }, [autoFullscreen])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/90 backdrop-blur-sm"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      {minimal ? (
        <button
          type="button"
          aria-label="Fermer"
          className="absolute top-4 right-4 z-10 p-2 text-white/90 hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          title="Fermer (Esc)"
        >
          <X size={28} strokeWidth={2} />
        </button>
      ) : (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 px-1 py-1 shadow-xl">
          <button
            type="button"
            className="p-2 rounded-lg text-white/95 hover:text-white hover:bg-white/10 transition-all"
            onClick={zoomOut}
            title="Zoom arrière (-)"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-white/90 text-sm font-medium min-w-[3rem] text-center select-none">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            className="p-2 rounded-lg text-white/95 hover:text-white hover:bg-white/10 transition-all"
            onClick={zoomIn}
            title="Zoom avant (+)"
          >
            <ZoomIn size={20} />
          </button>
          <div className="w-px h-5 bg-white/20" />
          <a
            href={pdfUrl}
            download={downloadFilename ?? undefined}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white/95 hover:text-white hover:bg-white/10 text-sm font-medium transition-all"
            title="Télécharger le PDF"
          >
            <Download size={18} />
            Télécharger
          </a>
          <button
            type="button"
            aria-label="Plein écran"
            className="p-2 rounded-lg text-white/95 hover:text-white hover:bg-white/10 transition-all"
            onClick={toggleFullscreen}
            title={isFs ? 'Quitter le plein écran' : 'Plein écran'}
          >
            {isFs ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
          <button
            type="button"
            aria-label="Fermer"
            className="p-2 rounded-lg text-white/95 hover:text-white hover:bg-white/10 transition-all"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            title="Fermer (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {!minimal && (
        <button
          type="button"
          aria-label="Précédente"
          className="absolute left-4 z-10 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 hover:border-white/20 transition-all shadow-lg disabled:opacity-40 disabled:pointer-events-none"
          onClick={goPrev}
          disabled={pageIndex <= 0}
          title="Précédente (←)"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div className="flex flex-col items-center w-full h-full min-h-0 pt-16 pb-12">
        {/* Zone scrollable pour le PDF zoomé */}
        <div
          className={`rounded-xl sm:rounded-2xl overflow-auto shadow-2xl ring-1 ring-white/10 ${minimal ? 'bg-white' : 'bg-white/95'}`}
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        >
          <canvas
            ref={canvasRef}
            className={`select-none block ${minimal ? 'bg-white' : ''}`}
          />
        </div>
        {!minimal && (
          <div className="mt-2 sm:mt-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/95 text-sm font-medium shrink-0">
            {totalPages > 0 ? `Page ${pageIndex + 1} / ${totalPages}` : 'Chargement…'}
          </div>
        )}
      </div>

      {!minimal && (
        <button
          type="button"
          aria-label="Suivante"
          className="absolute right-4 z-10 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 hover:border-white/20 transition-all shadow-lg disabled:opacity-40 disabled:pointer-events-none"
          onClick={goNext}
          disabled={totalPages === 0 || pageIndex >= totalPages - 1}
          title="Suivante (→)"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  )
}
