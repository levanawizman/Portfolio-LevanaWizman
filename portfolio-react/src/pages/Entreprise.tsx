import { useInView } from '@/hooks/useInView'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { PdfLightbox } from '@/components/PdfLightbox'

export default function Entreprise() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [slides, setSlides] = useState<string[]>([])
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPdfOpen, setIsPdfOpen] = useState(false)
  const [showMissions, setShowMissions] = useState(false)

  useEffect(() => {
    fetch('/presentation/manifest.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.slides?.length) {
          // Trie défensif au cas où le manifest n'est pas strictement ordonné
          const ordered = [...(data.slides as string[])].sort((a, b) => {
            const na = parseInt((a.match(/\d+/)?.[0] ?? '0'), 10)
            const nb = parseInt((b.match(/\d+/)?.[0] ?? '0'), 10)
            return na - nb
          })
          setSlides(ordered)
        }
      })
      .catch(() => {
        // Pas de manifest: on n'affiche rien
      })
  }, [])

  const openLightbox = useCallback((index: number) => {
    if (slides.length === 0) return
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }, [slides.length])

  const closeLightbox = useCallback(() => setIsLightboxOpen(false), [])
  const showPrev = useCallback(() => setCurrentIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length])
  const showNext = useCallback(() => setCurrentIndex((i) => (i + 1) % slides.length), [slides.length])

  useEffect(() => {
    if (!isLightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isLightboxOpen, closeLightbox, showPrev, showNext])

  const canOpen = useMemo(() => slides.length > 0, [slides.length])
  return (
    <section className="section">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Entreprise</h2>
        <p className="mt-4 text-gray-700">
          2C Démarches accompagne les particuliers et les professionnels dans leurs démarches administratives et
          numériques, avec une gestion structurée des dossiers et des documents.
        </p>
        <p className="mt-3 text-gray-700">
          En tant qu’alternante en BTS SIO SLAM, je participe au développement d’outils internes&nbsp;: analyse des
          besoins, création et amélioration d’interfaces web (formulaires, suivi de dossiers), fiabilisation des
          données (statuts, cohérence), mise en place de règles de gestion et de contrôles, ainsi que tests et
          correctifs pour améliorer la qualité et l’expérience utilisateur.
        </p>
        <p className="mt-3 text-gray-700">
          L’an dernier, j’ai réalisé un site web avec un collègue, de la création des pages jusqu’à la mise en ligne.
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Button variant="outline" onClick={() => setIsPdfOpen(true)} title="Ouvrir la présentation">
            Voir la présentation
          </Button>
          <Button asChild>
            <a
              href="/2C-Demarches%20(10).pptx"
              download
              title="Télécharger la présentation (PPTX)"
            >
              Télécharger la présentation
            </a>
          </Button>
          <Button variant={showMissions ? 'secondary' : 'outline'} onClick={() => setShowMissions((v) => !v)}>
            Missions
          </Button>
        </div>

        {showMissions && (
          <div className="mt-6 rounded-lg border p-4 bg-white/50">
            <h3 className="font-semibold mb-2">Missions</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Analyse des besoins (CRM interne & site vitrine)</li>
              <li>Développement de fonctionnalités CRM (suivi, statuts, dossiers)</li>
              <li>Gestion des données (clients, dossiers, pièces)</li>
              <li>Création de formulaires et contrôles de saisie</li>
              <li>Intégration du site vitrine (pages, responsive)</li>
              <li>Tests et corrections</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href="/projects" title="Voir le projet d'entreprise">Voir le projet d’entreprise</a>
              </Button>
            </div>
          </div>
        )}

        {/* Aperçu retiré à la demande : ouverture via le bouton uniquement */}

        {isLightboxOpen && slides[currentIndex] && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <button
              aria-label="Fermer"
              className="absolute top-4 right-4 p-2 rounded bg-white/10 hover:bg-white/20 text-white"
              onClick={closeLightbox}
              title="Fermer (Esc)"
            >
              <X />
            </button>
            <button
              aria-label="Précédente"
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={showPrev}
              title="Précédente (←)"
            >
              <ChevronLeft />
            </button>
            <img
              src={slides[currentIndex]}
              alt={`Diapositive ${currentIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded shadow-lg select-none mx-auto"
            />
            <button
              aria-label="Suivante"
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={showNext}
              title="Suivante (→)"
            >
              <ChevronRight />
            </button>
          </div>
        )}

        {isPdfOpen && <PdfLightbox pdfUrl="/2C-Demarches.pdf" onClose={() => setIsPdfOpen(false)} />}
      </div>
    </section>
  )
}


