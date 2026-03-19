import { useInView } from '@/hooks/useInView'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Entreprise() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [showMissions, setShowMissions] = useState(false)

  return (
    <section className="section">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Entreprise</h2>
        <p className="mt-4 text-gray-700">
          2C Démarches accompagne les particuliers et les professionnels dans leurs démarches administratives et
          numériques, avec une gestion structurée des dossiers et des documents.
        </p>
        <p className="mt-3 text-gray-700">
          En tant qu'alternante en BTS SIO SLAM, je participe au développement d'outils internes&nbsp;: analyse des
          besoins, création et amélioration d'interfaces web (formulaires, suivi de dossiers), fiabilisation des
          données (statuts, cohérence), mise en place de règles de gestion et de contrôles, ainsi que tests et
          correctifs pour améliorer la qualité et l'expérience utilisateur.
        </p>
        <p className="mt-3 text-gray-700">
          L'an dernier, j'ai réalisé un site web avec un collègue, de la création des pages jusqu'à la mise en ligne.
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Button asChild variant="outline">
            <Link to="/presentation">Voir la présentation</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/fiche">Fiche</Link>
          </Button>
          <Button variant={showMissions ? 'secondary' : 'outline'} onClick={() => setShowMissions((v) => !v)}>
            Missions
          </Button>
        </div>

        {showMissions && (
          <div className="mt-6 mx-auto max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 text-center">Missions & Difficultés</h3>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-sky-100">
                    <th className="text-left py-3 px-4 font-semibold text-sky-800">Mission</th>
                    <th className="text-left py-3 px-4 font-semibold text-sky-800">Difficulté</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="py-3 px-4 text-gray-700">Analyse des besoins</td><td className="py-3 px-4 text-gray-500">Distinguer le vrai besoin de la simple demande</td></tr>
                  <tr><td className="py-3 px-4 text-gray-700">Développement CRM</td><td className="py-3 px-4 text-gray-500">Ajouter des fonctionnalités sans ralentir l'app</td></tr>
                  <tr><td className="py-3 px-4 text-gray-700">Gestion des données</td><td className="py-3 px-4 text-gray-500">Corriger des incohérences sans perdre d'infos</td></tr>
                  <tr><td className="py-3 px-4 text-gray-700">Formulaires et contrôles</td><td className="py-3 px-4 text-gray-500">Rendre la saisie simple tout en étant stricte</td></tr>
                  <tr><td className="py-3 px-4 text-gray-700">Intégration site vitrine</td><td className="py-3 px-4 text-gray-500">Partir d'une maquette et obtenir un rendu fidèle</td></tr>
                  <tr><td className="py-3 px-4 text-gray-700">Tests et corrections</td><td className="py-3 px-4 text-gray-500">Reproduire un bug qui n'apparaît pas à chaque fois</td></tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Compétences acquises</h4>
              <div className="flex flex-wrap gap-2">
                {['Analyser un besoin et proposer une solution', 'Développer des interfaces fonctionnelles', 'Structurer et sécuriser des données', 'Tester et corriger en conditions réelles', 'Collaborer avec une équipe non-tech'].map((c) => (
                  <span key={c} className="px-3 py-1 text-sm rounded-full bg-sky-100 text-sky-700 border border-sky-200">{c}</span>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-500 italic text-center">
              Des missions variées qui m'ont permis d'intervenir à chaque étape d'un projet, du besoin à la mise en ligne.
            </p>

            <div className="flex justify-center">
              <Button asChild variant="outline">
                <a href="/projects" title="Voir le projet d'entreprise">Voir le projet d'entreprise</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
