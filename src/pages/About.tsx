import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { Button } from '@/components/ui/button'
import { PdfLightbox } from '@/components/PdfLightbox'
import { Target, Wrench, Brain } from 'lucide-react'

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [isCvOpen, setIsCvOpen] = useState(false)
  return (
    <section className="section">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">À propos</h2>

        {/* Présentation */}
        <div className="mt-4 text-gray-700 space-y-3">
          <p className="leading-relaxed">
            Je suis Levana Wizman, étudiante en 2e année de BTS SIO (Services Informatiques aux Organisations), option SLAM (Solutions Logicielles et Applications Métiers), en alternance à l’ORT Montreuil (93100), spécialité développement.
          </p>
        </div>

        {/* Projet professionnel */}
        <div className="mt-6 text-gray-700 space-y-3">
          <p className="leading-relaxed">
            J’ai un parcours Bac Maths/Économie, puis L1 MIASHS (Paris Cité), et une expérience concrète en administratif / cabinet médical : organisation, gestion des demandes, communication et confidentialité. J’aime créer des sites et des outils web simples, clairs et fiables, en partant toujours du besoin réel.
          </p>
          <div className="h-3" />

          {/* Cards dynamiques */}
          <div className="mt-2 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-md border border-indigo-200 bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2 font-semibold"><Target size={16} className="text-indigo-600" /> Objectif</div>
              <p className="mt-1 text-sm text-gray-700">Travailler à l’étranger après le BTS et me lancer en freelance (site vitrine, e‑commerce, petites applications).</p>
            </div>
            <div className="rounded-md border border-indigo-200 bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2 font-semibold"><Wrench size={16} className="text-indigo-600" /> Ma méthode</div>
              <p className="mt-1 text-sm text-gray-700">Clarifier le besoin → proposer une solution simple → développer proprement → tester → livrer &amp; maintenir.</p>
            </div>
            <div className="rounded-md border border-indigo-200 bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2 font-semibold"><Brain size={16} className="text-indigo-600" /> IA appliquée</div>
              <p className="mt-1 text-sm text-gray-700">Collaboration avec un proche dans l’IA pour intégrer des automatisations, assistants et traitements de données afin d’améliorer l’efficacité pour les clients.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" type="button" onClick={() => setIsCvOpen(true)} title="Voir le CV">
              Voir le CV
            </Button>
        </div>

        {isCvOpen && <PdfLightbox pdfUrl="/cv.pdf" onClose={() => setIsCvOpen(false)} downloadFilename="Levana_Wizman_CV.pdf" autoFullscreen />}
      </div>
    </section>
  )
}
