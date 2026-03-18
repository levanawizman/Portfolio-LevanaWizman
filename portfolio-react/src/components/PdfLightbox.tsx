import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize, Minimize, X } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'

// Configure le worker (ESM) pour Vite et les polices standard (PDF.js v4)
const pdfWorker = new Worker(new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url), { type: 'module' })
// @ts-expect-error workerPort n'a pas de type exporté dans ce build
pdfjsLib.GlobalWorkerOptions.workerPort = pdfWorker
pdfjsLib.GlobalWorkerOptions.standardFontDataUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/standard_fonts/'

type PdfLightboxProps = {
  pdfUrl: string
  onClose: () => void
}

export function PdfLightbox({ pdfUrl, onClose }: PdfLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null)
  const [pageIndex, setPageIndex] = useState(0) // 0-based
  const [isFs, setIsFs] = useState(false)

  const totalPages = doc?.numPages ?? 0

  const renderPage = useCallback(
    async (index: number) => {
      if (!doc || !canvasRef.current || !overlayRef.current) return
      const pageNum = index + 1
      const page = await doc.getPage(pageNum)

      // Taille disponible
      const container = overlayRef.current
      const maxW = Math.min(container.clientWidth * 0.9, 1400)
      const maxH = container.clientHeight * 0.85

      // Viewport à l’échelle 1 pour récupérer dimensions
      const vp1 = page.getViewport({ scale: 1 })
      const scale = Math.min(maxW / vp1.width, maxH / vp1.height)
      const viewport = page.getViewport({ scale })

      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (!context) return

      canvas.width = Math.floor(viewport.width)
      canvas.height = Math.floor(viewport.height)

      await page.render({ canvasContext: context, viewport }).promise
    },
    [doc]
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
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, totalPages])

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

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          aria-label="Plein écran"
          className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"
          onClick={toggleFullscreen}
          title={isFs ? 'Quitter le plein écran' : 'Plein écran'}
        >
          {isFs ? <Minimize /> : <Maximize />}
        </button>
        <button
          aria-label="Fermer"
          className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"
          onClick={onClose}
          title="Fermer (Esc)"
        >
          <X />
        </button>
      </div>

      <button
        aria-label="Précédente"
        className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
        onClick={goPrev}
        disabled={pageIndex <= 0}
        title="Précédente (←)"
      >
        <ChevronLeft />
      </button>

      <div className="flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded shadow-lg select-none mx-auto bg-black/20"
        />
        <div className="mt-3 text-white/90 text-sm">{totalPages > 0 ? `Page ${pageIndex + 1} / ${totalPages}` : 'Chargement…'}</div>
      </div>

      <button
        aria-label="Suivante"
        className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
        onClick={goNext}
        disabled={totalPages === 0 || pageIndex >= totalPages - 1}
        title="Suivante (→)"
      >
        <ChevronRight />
      </button>
    </div>
  )
}


