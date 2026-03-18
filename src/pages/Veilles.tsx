import { Button } from '@/components/ui/button'
import { useInView } from '@/hooks/useInView'
import { useState } from 'react'

export default function Veilles() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [tab, setTab] = useState<'git' | 'ia'>('git')
  return (
    <section className="section">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Veilles technologiques</h2>
        <div className="mt-3 flex items-center gap-2">
          <Button size="sm" variant={tab === 'git' ? 'secondary' : 'outline'} onClick={() => setTab('git')}>Sujet 1 – Git & GitHub</Button>
          <Button size="sm" variant={tab === 'ia' ? 'secondary' : 'outline'} onClick={() => setTab('ia')}>Sujet 2 – IA</Button>
        </div>
        <div className="mt-4 p-4 border border-indigo-200 rounded-lg bg-white/80 backdrop-blur shadow-sm card-float">
          {tab === 'git' ? (
            <div className="space-y-3 text-gray-700">
              <img src="https://via.placeholder.com/800x300.png?text=Git+%26+GitHub" alt="Git et GitHub" className="w-full h-36 md:h-44 object-cover rounded-md ring-1 ring-indigo-100" />
              <h3 className="font-semibold text-lg">Sujet 1 — Git & GitHub: le collaboratif au cœur des projets</h3>
              <p><strong>Problématique.</strong> Comment Git et GitHub facilitent-ils le travail collaboratif dans les projets web modernes ?</p>
              <p><strong>Définition.</strong> Git: gestion de versions distribuée pour suivre les modifications du code. GitHub: plateforme d’hébergement Git pour collaborer (PR, issues, revues) et piloter les projets.</p>
              <div>
                <strong>Cas d’utilisation.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Sauvegarde régulière et versions stables</li>
                  <li>Travail en binôme (branches, PR)</li>
                  <li>Suivi clair des modifications et de l’historique</li>
                </ul>
              </div>
              <div>
                <strong>Outils.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Git (CLI)</li>
                  <li>GitHub (web) / GitHub Desktop</li>
                </ul>
              </div>
              <p><strong>Exemple perso.</strong> Utilisé sur le site vitrine 2C Démarches pour collaborer, suivre les tâches et tester sans casser la branche principale.</p>
              <div>
                <strong>Avantages.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Sauvegarde sécurisée</li>
                  <li>Travail simultané</li>
                  <li>Historique lisible</li>
                </ul>
              </div>
              <div>
                <strong>Limites.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Courbe d’apprentissage au début</li>
                  <li>Conflits possibles si mauvais flux</li>
                </ul>
              </div>
              <div>
                <strong>À retenir.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Mieux maîtriser branches / merges</li>
                  <li>Structurer les pull requests</li>
                </ul>
              </div>
              <div>
                <strong>Sources.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>git-scm.com</li>
                  <li>github.com</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-gray-700">
              <img src="https://via.placeholder.com/800x300.png?text=IA+pour+les+d%C3%A9veloppeurs" alt="IA pour les développeurs" className="w-full h-36 md:h-44 object-cover rounded-md ring-1 ring-indigo-100" />
              <h3 className="font-semibold text-lg">Sujet 2 — IA pour les développeurs: assistant ou remplaçant ?</h3>
              <p><strong>Problématique.</strong> Comment l’IA transforme le métier de développeur ? Remplacement ou assistance ?</p>
              <p><strong>Définition.</strong> L’IA regroupe des techniques capables d’imiter des fonctions humaines (raisonnement, apprentissage). Outils: Copilot (génération), ChatGPT (aide / correction), Notion AI (documentation).</p>
              <div>
                <strong>Cas d’utilisation.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Génération de fonctions / blocs de code</li>
                  <li>Débogage et explications</li>
                  <li>Rédaction / structuration de docs</li>
                </ul>
              </div>
              <div>
                <strong>Outils.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>ChatGPT</li>
                  <li>GitHub Copilot</li>
                  <li>Notion AI</li>
                </ul>
              </div>
              <div>
                <strong>Avantages.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Gain de temps</li>
                  <li>Moins d’erreurs sur tâches répétitives</li>
                  <li>Bon support pour débuter</li>
                </ul>
              </div>
              <div>
                <strong>Limites.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Dépendance possible</li>
                  <li>Qualité variable / contexte parfois mal compris</li>
                </ul>
              </div>
              <div>
                <strong>À retenir.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Bien formuler les requêtes</li>
                  <li>Garder un esprit critique sur le code généré</li>
                  <li>Utiliser l’IA comme assistant</li>
                </ul>
              </div>
              <div>
                <strong>Sources.</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>openai.com</li>
                  <li>github.com/features/copilot</li>
                  <li>developpez.com</li>
                  <li>blog.elao.com</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


