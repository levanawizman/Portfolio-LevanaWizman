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

function MultiLightbox({ images, onClose }: { images: { src: string; alt: string }[]; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition"><X size={28} /></button>
      <img src={images[idx].src} alt={images[idx].alt} className="max-w-full max-h-[80vh] rounded-xl shadow-2xl" onClick={e => e.stopPropagation()} />
      <div className="flex gap-2 mt-4" onClick={e => e.stopPropagation()}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-3 h-3 rounded-full transition ${i === idx ? 'bg-orange-400' : 'bg-white/30 hover:bg-white/50'}`} />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">{idx + 1} / {images.length}</p>
    </div>
  )
}

function Shot({ src, alt, label, desc, className = '' }: { src: string; alt: string; label: string; desc: string; className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={`rounded-xl overflow-hidden border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all group cursor-pointer ${className}`} onClick={() => setOpen(true)}>
        <div className="overflow-hidden h-40">
          <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="px-3 py-2.5">
          <p className="font-semibold text-sm text-orange-600">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}

function DashboardShot() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all group cursor-pointer" onClick={() => setOpen(true)}>
        <div className="overflow-hidden h-40">
          <img src="/screenshots/gesttravaux-java/dashboard.jpg" alt="Dashboard" loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="px-3 py-2.5">
          <p className="font-semibold text-sm text-orange-600">Tableau de bord</p>
          <p className="text-xs text-gray-500 mt-0.5">9 modules de gestion (2 photos)</p>
        </div>
      </div>
      {open && (
        <MultiLightbox
          images={[
            { src: '/screenshots/gesttravaux-java/dashboard.jpg', alt: 'Dashboard - partie haute' },
            { src: '/screenshots/gesttravaux-java/dashboard2.jpg', alt: 'Dashboard - partie basse' },
          ]}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

const B = '/screenshots/gesttravaux-java'

export default function ProjetGestTravauxJava() {
  const navigate = useNavigate()

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/projects?tab=ecole')}
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-500 font-medium transition mb-8"
      >
        <ArrowLeft size={16} /> Retour aux projets d'école
      </button>

      {/* En-tête */}
      <div className="p-8 md:p-12 mb-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight heading-gradient mb-4">GestTravaux Pro — Desktop</h1>
        <p className="text-lg text-gray-500 mb-5 font-medium">Application desktop de gestion de travaux immobiliers &mdash; Projet d'école (BTS SIO SLAM)</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            ['Java 17', 'bg-orange-500/20 text-orange-600 border-orange-500/30'],
            ['JavaFX', 'bg-indigo-500/20 text-indigo-600 border-indigo-500/30'],
            ['PostgreSQL', 'bg-sky-500/20 text-sky-600 border-sky-500/30'],
          ].map(([name, cls], i) => (
            <span key={i} className={`px-3 py-1 rounded-full text-sm font-semibold border ${cls}`}>{name}</span>
          ))}
        </div>
        <Button asChild variant="outline">
          <a href="https://github.com/ort-montreuil/BTS-SIO-G6-2026-GESTTRAVAUX-Java" target="_blank" rel="noreferrer" className="flex items-center gap-2">
            <Github size={16} /> GitHub
          </a>
        </Button>
      </div>

      <div className="space-y-10">

        {/* Contexte */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #10b981' }}>
          <h2 className="text-xl font-bold mb-2" style={{ color: '#059669' }}>&#128218; Contexte</h2>
          <p className="leading-relaxed">
            La société <strong style={{ color: '#059669' }}>IMMOSYNC</strong> est un syndic de gestion de biens immobiliers.
            Le projet a été réalisé en <strong style={{ color: '#059669' }}>équipe de 3</strong> en 2e année de BTS SIO SLAM.
            J'ai travaillé sur la <strong style={{ color: '#059669' }}>partie Java Desktop</strong> : le back-office du gestionnaire
            pour administrer entrepreneurs, propriétaires, biens, catégories, prestations, inspecteurs et chantiers.
          </p>
        </div>

        {/* Fonctionnalités + Objectifs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #818cf8' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#4f46e5' }}>&#128196; Fonctionnalités</h2>
            <ul className="grid grid-cols-1 gap-2">
              {[
                'Connexion sécurisée avec authentification admin',
                'Dashboard avec cartes interactives vers chaque module',
                'CRUD complet : Entrepreneurs, Propriétaires, Biens',
                'CRUD complet : Catégories, Prestations, Inspecteurs',
                'Gestion des Chantiers avec inspections et photos',
                'Suivi des Devis reçus (Accepté / Refusé / En attente)',
                'Sidebar de navigation entre tous les modules',
                'Fenêtres modales pour ajout et modification',
                'Double-clic sur tableau pour ouvrir la fiche',
                'Design Material Design avec boutons colorés',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5" style={{ color: '#059669' }}>&#10003;</span>{item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #a78bfa' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#7c3aed' }}>&#127919; Objectifs</h2>
            <ul className="grid grid-cols-1 gap-3">
              {[
                'Fournir un outil desktop pour administrer les données métier',
                'Permettre le CRUD complet sur toutes les entités',
                'Partager la même base PostgreSQL avec la partie web Symfony',
                'Architecture en couches (Controller → Service → Repository)',
                'Interface ergonomique avec navigation intuitive',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'rgba(167,139,250,0.2)', color: '#7c3aed' }}>{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stack technique */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #60a5fa' }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#2563eb' }}>&#128736;&#65039; Stack technique</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h3 className="font-bold mb-2 text-base" style={{ color: '#2563eb' }}>Technologies</h3>
              <div className="space-y-2">
                {[
                  ['Java 17', 'langage objet avec modules JPMS'],
                  ['JavaFX + FXML', 'interface graphique desktop'],
                ].map(([name, desc], i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'rgba(96,165,250,0.1)' }}>
                    <span className="font-semibold" style={{ color: '#2563eb' }}>{name}</span>
                    <span className="text-sm">&mdash; {desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-base" style={{ color: '#2563eb' }}>Organisation</h3>
              <div className="space-y-2">
                {[
                  ['Git / GitHub', 'collaboration en équipe'],
                  ['Équipe de 3', 'Web (Symfony) + Desktop (Java)'],
                ].map(([name, desc], i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'rgba(129,140,248,0.1)' }}>
                    <span className="font-semibold" style={{ color: '#4f46e5' }}>{name}</span>
                    <span className="text-sm">&mdash; {desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === DÉMONSTRATION === */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #f97316' }}>
          <h2 className="text-xl font-bold mb-1" style={{ color: '#ea580c' }}>&#128248; Démonstration</h2>
          <p className="text-xs text-gray-500 mb-6">Cliquez sur une image pour l'agrandir</p>

          {/* Toutes les captures en grille uniforme */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Shot src={`${B}/connexion.jpg`} alt="Connexion" label="Connexion" desc="Identifiant et mot de passe" />
            <DashboardShot />
            <Shot src={`${B}/entrepreneurs.jpg`} alt="Entrepreneurs" label="Entrepreneurs" desc="Liste avec sidebar et boutons" />
            <Shot src={`${B}/Ajouter un entrepreneur.jpg`} alt="Ajout entrepreneur" label="Ajout entrepreneur" desc="Entreprise, nom, email, adresse" />
            <Shot src={`${B}/ajouter un Bien.jpg`} alt="Ajout bien" label="Ajout bien" desc="Type, adresse, surface, propriétaire" />
            <Shot src={`${B}/ajouter un Gestionnaire.jpg`} alt="Ajout gestionnaire" label="Ajout gestionnaire" desc="Nom, prénom, identifiants" />
            <Shot src={`${B}/ajouter un inspecteur.jpg`} alt="Ajout inspecteur" label="Ajout inspecteur" desc="Nom, prénom, email, téléphone" />
            <Shot src={`${B}/Ajouter une catégorie.jpg`} alt="Ajout catégorie" label="Ajout catégorie" desc="Électricité, Plomberie, Peinture" />
            <Shot src={`${B}/Ajouter une prestation.jpg`} alt="Ajout prestation" label="Ajout prestation" desc="Nom, libellé, catégorie" />
            <Shot src={`${B}/ajouter un Chantier.jpg`} alt="Ajout chantier" label="Ajout chantier" desc="Adresse, bien, inspecteur" />
            <Shot src={`${B}/ChantierInspecte.jpg`} alt="Chantiers inspectés" label="Chantiers inspectés" desc="7 chantiers avec photos" />
            <Shot src={`${B}/Devis.jpg`} alt="Devis reçus" label="Devis reçus" desc="Accepté, Refusé, En attente" />
          </div>
        </div>

        {/* Défis + Résultats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #fbbf24' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#d97706' }}>&#9888;&#65039; Défis rencontrés</h2>
            <div className="space-y-3">
              {[
                ['BDD partagée Java / Symfony', 'Conflits de schéma entre Hibernate et Doctrine. Stratégie ddl-auto=update.'],
                ['Navigation entre fenêtres', 'Pattern factorisé dans naviguerVers() pour fermer/ouvrir proprement.'],
                ['Formulaires modaux', 'Pattern callback pour rafraîchir le tableau parent après sauvegarde.'],
              ].map(([title, desc], i) => (
                <div key={i} className="rounded-lg p-4" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
                  <p className="font-bold" style={{ color: '#d97706' }}>{title}</p>
                  <p className="text-sm mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #10b981' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#059669' }}>&#127942; Résultats</h2>
            <div className="grid grid-cols-2 gap-3 text-center mb-4">
              {[
                ['8+', 'Modules CRUD'],
                ['14', 'Vues FXML'],
                ['17+', 'Classes Java'],
                ['1', 'BDD partagée'],
              ].map(([num, label], i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <p className="text-3xl font-extrabold" style={{ color: '#059669' }}>{num}</p>
                  <p className="text-xs mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2.5">
              {[
                'Interface Material Design avec sidebar',
                'CRUD complet sur toutes les entités',
                'Fenêtres modales avec callback de rafraîchissement',
                'Double-clic sur tableau pour éditer',
                'Architecture en couches propre',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'rgba(16,185,129,0.2)', color: '#059669' }}>&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Autocritique */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #a78bfa' }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#7c3aed' }}>&#128172; Ce que ce projet m'a apporté</h2>
          <p className="leading-relaxed">
            Ce projet m'a fait découvrir l'intégration <strong style={{ color: '#7c3aed' }}>Spring Boot + JavaFX</strong>.
            Comme pour la partie web, on a eu des soucis d'organisation à 3 et des <strong style={{ color: '#7c3aed' }}>conflits sur la BDD partagée</strong> entre Hibernate et Doctrine.
            Ça m'a apporté une vraie compétence en <strong style={{ color: '#7c3aed' }}>développement desktop Java</strong> et m'a montré comment deux technologies différentes peuvent coexister sur un même projet.
          </p>
        </div>

      </div>
    </section>
  )
}
