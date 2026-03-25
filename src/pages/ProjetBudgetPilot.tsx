import { Button } from '@/components/ui/button'
import { ArrowLeft, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition"><X size={28} /></button>
      <img src={src} alt={alt} className="max-w-full max-h-[90vh] rounded-xl shadow-2xl" onClick={e => e.stopPropagation()} />
    </div>
  )
}

function Screenshot({ src, alt, label, desc }: { src: string; alt: string; label: string; desc: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all group cursor-pointer" onClick={() => setOpen(true)}>
        <div className="overflow-hidden">
          <img src={src} alt={alt} loading="lazy" className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-3">
          <p className="font-semibold text-sm" style={{ color: '#f9a8d4' }}>{label}</p>
          <p className="text-xs text-gray-500 mt-1">{desc}</p>
        </div>
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}

export default function ProjetBudgetPilot() {
  const navigate = useNavigate()
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Retour */}
      <button
        onClick={() => navigate('/projects?tab=perso')}
        className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition mb-8"
      >
        <ArrowLeft size={16} /> Retour aux projets personnels
      </button>

      {/* En-tête */}
      <div className="p-8 md:p-12 mb-10 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2">BudgetPilot</h1>
        <p className="text-lg text-gray-500 mb-5 font-medium">Application de suivi de dépenses &mdash; Projet personnel</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">React</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-300 border border-green-500/30">Node.js</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">SQLite</span>
        </div>
      </div>

      {/* Contenu */}
      <div className="space-y-8">

        {/* Contexte */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #10b981' }}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: '#34d399' }}>
            &#128218; Contexte
          </h2>
          <p className="leading-relaxed">
            Je voulais un outil simple et visuel pour <strong style={{ color: '#34d399' }}>suivre mes dépenses personnelles</strong> au quotidien.
            Plutôt que d'utiliser un tableur ou une appli générique, j'ai décidé de créer ma propre{' '}
            <strong style={{ color: '#34d399' }}>application web full-stack</strong> pour gérer mon budget,
            mes abonnements et visualiser mes statistiques de dépenses.
          </p>
        </div>

        {/* Contenu du site + Objectifs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #818cf8' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#a5b4fc' }}>
              &#128196; Fonctionnalités
            </h2>
            <ul className="grid grid-cols-1 gap-2.5">
              {[
                "Tableau de bord avec vue synthétique du mois",
                "Gestion complète des dépenses (CRUD, filtres, recherche, tri)",
                "Suivi des revenus et virements",
                "Gestion des abonnements mensuels (actif/inactif)",
                "Budgets global et par catégorie avec suivi visuel",
                "Statistiques avec graphiques (camembert, courbes)",
                "Export CSV des dépenses",
                "Mode sombre avec persistance",
                "Interface responsive compatible mobile",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #a78bfa' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#c4b5fd' }}>
              &#127919; Objectifs
            </h2>
            <ul className="grid grid-cols-1 gap-3">
              {[
                "Centraliser le suivi de toutes mes dépenses en un seul outil",
                "Visualiser la répartition du budget par catégorie",
                "Suivre les abonnements et charges fixes mensuelles",
                "Avoir des statistiques claires pour mieux gérer mon argent",
                "Pratiquer le développement full-stack (React + Node + BDD)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'rgba(167,139,250,0.2)', color: '#c4b5fd' }}>{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Moyens utilisés */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #60a5fa' }}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#93c5fd' }}>
            &#128736;&#65039; Moyens utilisés
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h3 className="font-bold mb-2 text-base" style={{ color: '#60a5fa' }}>Frontend</h3>
              <div className="space-y-2">
                {[
                  ['React 18', 'composants dynamiques avec TypeScript'],
                  ['Tailwind CSS', 'style responsive et mode sombre'],
                ].map(([name, desc], i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'rgba(96,165,250,0.1)' }}>
                    <span className="font-semibold" style={{ color: '#93c5fd' }}>{name}</span>
                    <span className="text-sm">&mdash; {desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-base" style={{ color: '#60a5fa' }}>Backend</h3>
              <div className="space-y-2">
                {[
                  ['Node.js + Express', 'API REST en TypeScript'],
                  ['Prisma ORM', 'gestion de la base de données'],
                ].map(([name, desc], i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'rgba(129,140,248,0.1)' }}>
                    <span className="font-semibold" style={{ color: '#a5b4fc' }}>{name}</span>
                    <span className="text-sm">&mdash; {desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Problématiques + Résultats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #fbbf24' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#fcd34d' }}>
              &#9888;&#65039; Problématiques rencontrées
            </h2>
            <div className="space-y-3">
              {[
                ['Modélisation des données', 'Concevoir un schéma Prisma couvrant dépenses, revenus, abonnements, budgets et catégories avec les bonnes relations.'],
                ['Statistiques dynamiques', 'Agréger les données côté serveur et les afficher sous forme de graphiques clairs et interactifs avec Recharts.'],
              ].map(([title, desc], i) => (
                <div key={i} className="rounded-lg p-4" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
                  <p className="font-bold" style={{ color: '#fcd34d' }}>{title}</p>
                  <p className="text-sm mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #10b981' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#34d399' }}>
              &#127942; Résultats obtenus
            </h2>
            <div className="grid grid-cols-3 gap-3 text-center mb-5">
              {[
                ['7', 'Pages fonctionnelles'],
                ['2', 'Couches (front + back)'],
                ['1', 'App full-stack complète'],
              ].map(([num, label], i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <p className="text-3xl font-extrabold" style={{ color: '#34d399' }}>{num}</p>
                  <p className="text-xs mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2.5">
              {[
                'Application complète et fonctionnelle en local',
                'Interface claire avec mode sombre',
                'Graphiques de suivi budgétaire précis',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Démonstration */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #f472b6' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#f9a8d4' }}>
            &#128248; Démonstration
          </h2>
          <p className="text-xs text-gray-500 mb-4">Cliquez sur une image pour l'agrandir</p>
          <div className="grid md:grid-cols-2 gap-4">
            <Screenshot src="/screenshots/budgetpilot/dashboard.jpg" alt="Tableau de bord" label="Tableau de bord" desc="Vue synthétique du mois avec revenus, dépenses, virements, abonnements et graphiques." />
            <Screenshot src="/screenshots/budgetpilot/depenses.jpg" alt="Transactions" label="Transactions" desc="Liste des dépenses avec filtres par mois, type, catégorie et export CSV." />
            <Screenshot src="/screenshots/budgetpilot/revenus.jpg" alt="Revenus" label="Revenus (mode sombre)" desc="Suivi des revenus avec recherche et tri, en mode sombre." />
            <Screenshot src="/screenshots/budgetpilot/stats.jpg" alt="Statistiques" label="Statistiques" desc="Répartition par catégorie (camembert) et évolution revenus vs dépenses." />
          </div>
        </div>

        {/* Auto-critique */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #a78bfa' }}>
          <p className="leading-relaxed">
              Ce projet est né d'un besoin concret : mieux gérer mon argent au quotidien. Le concevoir de A à Z m'a montré qu'un projet personnel peut être à la fois utile et formateur, en touchant à toutes les couches d'une application web.
          </p>
        </div>

      </div>
    </section>
  )
}
