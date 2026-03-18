import { useInView } from '@/hooks/useInView'
import { Button } from '@/components/ui/button'

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <section className="section">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">À propos</h2>
        <p className="mt-4 text-gray-700">
          Étudiante en BTS SIO SLAM, je construis mon profil autour de deux axes : développement web et IA.
          Mon parcours (bac Maths/Économie, L1 MIASHS, puis projet humanitaire à l’étranger) m’a donné à la fois
          une approche analytique et une vraie capacité d’adaptation.
        </p>
        <p className="mt-3 text-gray-700">
          J’ai aussi une expérience concrète en environnement pro (cabinet médical, secrétariat administratif) :
          gestion des demandes, organisation, communication, confidentialité — des réflexes très utiles quand on
          développe des outils pour de vrais utilisateurs.
        </p>
        <p className="mt-3 text-gray-700">
          Je recherche des projets où je peux apporter de la valeur rapidement : coder proprement, apprendre vite,
          et livrer quelque chose de fiable.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild variant="outline">
            <a href="/cv.pdf" target="_blank" rel="noreferrer" title="Ouvrir le CV (PDF)">Voir CV</a>
          </Button>
          <Button asChild>
            <a href="/cv.pdf" download title="Télécharger le CV (PDF)">Télécharger CV</a>
          </Button>
        </div>
      </div>
    </section>
  )
}


