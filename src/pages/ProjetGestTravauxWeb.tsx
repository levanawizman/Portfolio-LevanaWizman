import { Button } from '@/components/ui/button'
import { Github, ArrowLeft, X } from 'lucide-react'
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
          <p className="font-semibold text-sm text-indigo-600">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
        </div>
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}

function StepNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0"
      style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', color: '#fff' }}>
      {n}
    </span>
  )
}

export default function ProjetGestTravauxWeb() {
  const navigate = useNavigate()

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Retour */}
      <button
        onClick={() => navigate('/projects?tab=ecole')}
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-600 font-medium transition mb-8"
      >
        <ArrowLeft size={16} /> Retour aux projets d'école
      </button>

      {/* En-tête */}
      <div className="p-8 md:p-12 mb-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight heading-gradient mb-4">GestTravaux Pro</h1>
        <p className="text-lg text-gray-500 mb-5 font-medium">Application web de gestion de travaux immobiliers &mdash; Projet d'école (BTS SIO SLAM)</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-violet-500/20 text-violet-600 border border-violet-500/30">Symfony 7</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-500/20 text-indigo-600 border border-indigo-500/30">PHP</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-sky-500/20 text-sky-600 border border-sky-500/30">PostgreSQL</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-amber-500/20 text-amber-600 border border-amber-500/30">Twig</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-emerald-500/20 text-emerald-600 border border-emerald-500/30">Doctrine ORM</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-600 border border-blue-500/30">Bootstrap</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500/20 text-yellow-600 border border-yellow-500/30">JavaScript</span>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <a href="https://github.com/ort-montreuil/BTS-SIO-G6-2026-GESTTRAVAUX-Web" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
          </Button>
        </div>
      </div>

      <div className="space-y-10">

        {/* Contexte */}
        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.05), transparent)' }}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#059669' }}>
            &#128218; Contexte
          </h2>
          <p className="leading-relaxed text-gray-600">
            La société <strong className="text-emerald-600">IMMOSYNC</strong> est un syndic de gestion de biens immobiliers.
            Elle doit organiser des travaux dans les appartements et parties communes qu'elle gère.
            Ce processus était jusqu'ici <strong className="text-emerald-600">manuel et source d'erreurs</strong>.
            Le projet a été réalisé en <strong className="text-emerald-600">équipe de 3</strong> lors de ma 2e année de BTS SIO SLAM,
            avec une partie web (Symfony) et desktop (Java).
            J'ai travaillé sur la <strong className="text-emerald-600">partie web Symfony</strong> : espaces inspecteur et entrepreneur.
          </p>
        </div>

        {/* Contenu + Objectifs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(129,140,248,0.05), transparent)' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-indigo-600">
              &#128196; Fonctionnalités
            </h2>
            <ul className="grid grid-cols-1 gap-2">
              {[
                'Authentification multi-rôles (inspecteur, entrepreneur, admin)',
                'Dashboard inspecteur avec vue d\'ensemble des chantiers',
                'Chantiers à inspecter avec carte interactive',
                'Upload de fichiers drag & drop (photos, PDF)',
                'Historique des inspections réalisées',
                'Dashboard entrepreneur avec appels d\'offre',
                'Détail des appels d\'offre avec prestations',
                'Formulaire de réponse : accepter, modifier ou refuser',
                'Suivi des devis avec statuts colorés',
                'Design responsive mobile et desktop',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-emerald-600 mt-0.5">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.05), transparent)' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-purple-600">
              &#127919; Objectifs
            </h2>
            <ul className="grid grid-cols-1 gap-3">
              {[
                'Digitaliser la gestion des travaux immobiliers pour IMMOSYNC',
                'Permettre aux inspecteurs d\'inspecter sur le terrain via mobile',
                'Permettre aux entrepreneurs de soumettre leurs devis en ligne',
                'Centraliser chantiers, devis et photos dans une base unique',
                'Système d\'authentification multi-rôles sécurisé',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', color: '#fff' }}>{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Moyens utilisés */}
        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.05), transparent)' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600">
            &#128736;&#65039; Stack technique
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-blue-600">Technologies</h3>
              <div className="space-y-1.5">
                {[
                  ['Symfony 7', 'backend, routing, sécurité'],
                  ['Twig', 'templates HTML'],
                  ['Doctrine ORM', 'mapping objet-relationnel'],
                  ['PostgreSQL', 'base de données'],
                  ['Bootstrap', 'responsive design'],
                  ['JavaScript', 'drag & drop, carte'],
                  ['Docker', 'conteneurisation BDD'],
                ].map(([name, desc], i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2 bg-gray-50">
                    <span className="font-semibold text-sm text-blue-600">{name}</span>
                    <span className="text-xs text-gray-500">&mdash; {desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-indigo-600">Organisation</h3>
              <div className="space-y-1.5">
                {[
                  ['Git / GitHub', 'collaboration en équipe'],
                  ['Équipe de 3', 'Web (Symfony) + Desktop (Java)'],
                  ['Architecture MVC', 'modèle / vue / contrôleur'],
                  ['3 releases', 'livraisons progressives'],
                ].map(([name, desc], i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2 bg-gray-50">
                    <span className="font-semibold text-sm text-indigo-600">{name}</span>
                    <span className="text-xs text-gray-500">&mdash; {desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Démonstration visuelle */}
        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(244,114,182,0.05), transparent)' }}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-pink-600">
            &#128248; Démonstration
          </h2>
          <p className="text-xs text-gray-500 mb-6">Cliquez sur une image pour l'agrandir</p>

          {/* Step 1 - Connexion */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <StepNumber n={1} />
              <h3 className="font-bold text-base text-pink-600">Connexion</h3>
            </div>
            <div className="max-w-lg mx-auto">
              <Screenshot
                src="/screenshots/gesttravaux-web/connexion.jpg"
                alt="Page de connexion"
                label="Page de connexion"
                desc="Formulaire commun avec redirection automatique selon le rôle"
              />
            </div>
          </div>

          {/* Step 2 - Inspecteur */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <StepNumber n={2} />
              <h3 className="font-bold text-base text-pink-600">Espace Inspecteur</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Screenshot
                src="/screenshots/gesttravaux-web/dashboard-inspecteur.jpg"
                alt="Dashboard inspecteur"
                label="Dashboard"
                desc="4 chantiers en attente, 2 inspections, 6 total"
              />
              <Screenshot
                src="/screenshots/gesttravaux-web/chantiers-inspecter.jpg"
                alt="Chantiers à inspecter"
                label="Chantiers à inspecter"
                desc="Liste avec boutons Inspecter et Carte"
              />
              <Screenshot
                src="/screenshots/gesttravaux-web/formulaire-inspection.jpg"
                alt="Formulaire d'inspection"
                label="Formulaire d'inspection"
                desc="Upload drag & drop + observation"
              />
            </div>
          </div>

          {/* Step 3 - Entrepreneur */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <StepNumber n={3} />
              <h3 className="font-bold text-base text-pink-600">Espace Entrepreneur</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <Screenshot
                src="/screenshots/gesttravaux-web/dashboard-entrepreneur.jpg"
                alt="Dashboard entrepreneur"
                label="Dashboard"
                desc="2 appels d'offre, 3 devis, 5 activités"
              />
              <Screenshot
                src="/screenshots/gesttravaux-web/appels-offre.jpg"
                alt="Appels d'offre"
                label="Appels d'offre"
                desc="Chantiers proposés avec prestations"
              />
              <Screenshot
                src="/screenshots/gesttravaux-web/detail-appel-offre.jpg"
                alt="Détail appel d'offre"
                label="Détail appel d'offre"
                desc="Prestations demandées avec prix et durée"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Screenshot
                src="/screenshots/gesttravaux-web/formulaire-reponse.jpg"
                alt="Formulaire de réponse"
                label="Répondre à un appel"
                desc="Modifier prix/durée, commenter, accepter ou refuser"
              />
              <Screenshot
                src="/screenshots/gesttravaux-web/devis-envoyes.jpg"
                alt="Devis envoyés"
                label="Mes devis envoyés"
                desc="Statuts colorés : Accepté, Refusé, En attente"
              />
            </div>
          </div>
        </div>

        {/* Problématiques + Résultats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.05), transparent)' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-amber-600">
              &#9888;&#65039; Défis rencontrés
            </h2>
            <div className="space-y-3">
              {[
                ['BDD partagée Java / Symfony', 'Une seule base PostgreSQL pour les deux apps. Coordination des schémas Doctrine et Hibernate.'],
                ['Authentification multi-rôles', 'Tables différentes + un seul formulaire de connexion. Résolu avec un "chain provider" Symfony.'],
                ['Coordination à 3', 'Merges Git, répartition Web/Java, éviter les conflits de code.'],
              ].map(([title, desc], i) => (
                <div key={i} className="rounded-lg p-3 bg-amber-500/5 border border-amber-500/10">
                  <p className="font-semibold text-sm text-amber-600">{title}</p>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.05), transparent)' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-emerald-600">
              &#127942; Résultats
            </h2>
            <div className="grid grid-cols-2 gap-3 text-center mb-4">
              {[
                ['2', 'Espaces'],
                ['6+', 'Pages'],
                ['1', 'Auth multi-rôles'],
                ['1', 'BDD partagée'],
              ].map(([num, label], i) => (
                <div key={i} className="rounded-xl p-3 bg-emerald-500/10 border border-emerald-500/15">
                  <p className="text-2xl font-extrabold text-emerald-600">{num}</p>
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-1.5">
              {[
                'Interface professionnelle cohérente',
                'Upload drag & drop fonctionnel',
                'Réponse aux appels d\'offre (3 options)',
                'Devis avec statuts colorés',
                'Design responsive mobile/desktop',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-emerald-600">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Autocritique */}
        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.05), transparent)' }}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-purple-600">
            &#128172; Ce que ce projet m'a apporté
          </h2>
          <p className="leading-relaxed text-gray-600 text-sm">
            Ce projet m'a fait découvrir <strong className="text-purple-600">Symfony</strong> en conditions réelles.
            On a eu des difficultés d'organisation à 3 (répartition des tâches, merges Git compliqués)
            et des <strong className="text-purple-600">problèmes de BDD partagée</strong> entre Doctrine et Hibernate (conflits de schéma, colonnes qui ne correspondaient pas).
            Ça m'a appris à mieux <strong className="text-purple-600">définir les rôles dès le départ</strong> et à se mettre d'accord sur le schéma avant de coder.
          </p>
        </div>

      </div>
    </section>
  )
}
