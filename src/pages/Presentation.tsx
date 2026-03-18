import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function Presentation() {
  const navigate = useNavigate()
  const [slides, setSlides] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/presentation/manifest.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.slides?.length) {
          const ordered = [...(data.slides as string[])].sort((a, b) => {
            const na = parseInt((a.match(/\d+/)?.[0] ?? '0'), 10)
            const nb = parseInt((b.match(/\d+/)?.[0] ?? '0'), 10)
            return na - nb
          })
          setSlides(ordered)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate(-1)
      if (e.key === 'ArrowLeft') setCurrentIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setCurrentIndex((i) => Math.min(slides.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, slides.length])

  if (slides.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Chargement...
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button
        aria-label="Fermer"
        className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
        onClick={() => navigate(-1)}
        title="Fermer (Esc)"
      >
        <X size={24} />
      </button>
      <button
        aria-label="Précédente"
        className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30"
        onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        disabled={currentIndex <= 0}
        title="Précédente"
      >
        <ChevronLeft size={28} />
      </button>
      <div className="flex flex-col items-center gap-3 max-h-full p-4">
        <img
          src={slides[currentIndex]}
          alt={`Diapositive ${currentIndex + 1}`}
          className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
        />
        <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium">
          {currentIndex + 1} / {slides.length}
        </span>
      </div>
      <button
        aria-label="Suivante"
        className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30"
        onClick={() => setCurrentIndex((i) => Math.min(slides.length - 1, i + 1))}
        disabled={currentIndex >= slides.length - 1}
        title="Suivante"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  )
}
