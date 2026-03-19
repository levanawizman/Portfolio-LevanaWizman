import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProjetAgenda() {
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

      {/* En-t&ecirc;te */}
      <div className="p-8 md:p-12 mb-10 flex flex-col items-center">
        <img src="/logo/photoagenda-logo.png" alt="PhotoAgenda" className="h-20 mb-6" />
        <p className="text-lg text-gray-500 mb-5 font-medium">Application de gestion &mdash; Projet personnel</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Next.js</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">React</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Tailwind CSS</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-500/20 text-gray-300 border border-gray-500/30">Vercel</span>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <a href="https://agenda.wizycode.fr" target="_blank" rel="noreferrer">Voir le site</a>
          </Button>
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
            Mon mari est <strong style={{ color: '#34d399' }}>photographe professionnel</strong>. Au quotidien,
            il g&eacute;rait ses &eacute;v&eacute;nements, ses &eacute;quipes et ses contrats avec des outils dispers&eacute;s
            (carnets, tableurs, messages). J'ai d&eacute;cid&eacute; de lui cr&eacute;er une{' '}
            <strong style={{ color: '#34d399' }}>application web sur mesure</strong> pour centraliser
            toute sa gestion en un seul endroit et lui simplifier la vie.
          </p>
        </div>

        {/* Contenu du site + Objectifs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #818cf8' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#a5b4fc' }}>
              &#128196; Ce que contient le site
            </h2>
            <ul className="grid grid-cols-1 gap-2.5">
              {[
                "Calendrier interactif (vue mois, semaine, jour)",
                "Gestion des \u00e9v\u00e9nements avec d\u00e9tails clients",
                "Suivi des montants et des paiements re\u00e7us",
                "Gestion d'\u00e9quipe : attribution et suivi des r\u00e9mun\u00e9rations",
                "G\u00e9n\u00e9ration automatique de contrats personnalis\u00e9s",
                "Envoi de contrats aux clients",
                "Interface responsive et intuitive",
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
                "Centraliser la gestion des \u00e9v\u00e9nements photo en un seul outil",
                "Suivre les paiements clients et savoir qui a r\u00e9gl\u00e9 ou non",
                "G\u00e9rer l'\u00e9quipe et suivre les montants dus \u00e0 chaque membre",
                "Automatiser la g\u00e9n\u00e9ration de contrats pr\u00e9-remplis",
                "Offrir une interface simple et rapide au quotidien",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'rgba(167,139,250,0.2)', color: '#c4b5fd' }}>{i + 1}</span>
                  {item}
              </li>
            ))}
          </ul>
          </div>
        </div>

        {/* Moyens utilis&eacute;s */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #60a5fa' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#93c5fd' }}>
              &#128736;&#65039; Moyens utilis&eacute;s
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h3 className="font-bold mb-2 text-base" style={{ color: '#60a5fa' }}>Technologies</h3>
                <div className="space-y-2">
                  {[
                    ['Next.js', 'framework React avec rendu serveur'],
                    ['React', 'composants dynamiques et interactifs'],
                    ['Tailwind CSS', 'style rapide et responsive'],
                    ['Vercel', 'd\u00e9ploiement continu automatique'],
                  ].map(([name, desc], i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'rgba(96,165,250,0.1)' }}>
                      <span className="font-semibold" style={{ color: '#93c5fd' }}>{name}</span>
                      <span className="text-sm">&mdash; {desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-base" style={{ color: '#60a5fa' }}>Organisation</h3>
                <div className="space-y-2">
                  {[
                    ['Projet solo', 'conception, d\u00e9veloppement et d\u00e9ploiement en autonomie'],
                    ['Feedback utilisateur', 'it\u00e9rations avec le photographe au quotidien'],
                    ['Approche m\u00e9tier', 'adapt\u00e9 aux besoins r\u00e9els du terrain'],
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

        {/* Probl&eacute;matiques + R&eacute;sultats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #fbbf24' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#fcd34d' }}>
              &#9888;&#65039; Probl&eacute;matiques rencontr&eacute;es
            </h2>
            <div className="space-y-3">
              {[
                ['Comprendre le m\u00e9tier', 'Traduire les besoins concrets d\u2019un photographe en fonctionnalit\u00e9s techniques, notamment la logique de paiements et de r\u00e9partition d\u2019\u00e9quipe.'],
                ['G\u00e9n\u00e9ration de contrats', 'Cr\u00e9er un syst\u00e8me qui g\u00e9n\u00e8re automatiquement des contrats personnalis\u00e9s avec toutes les informations de l\u2019\u00e9v\u00e9nement.'],
                ['UX adapt\u00e9e', 'Concevoir une interface suffisamment simple pour \u00eatre utilis\u00e9e rapidement entre deux shootings.'],
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
              &#127942; R&eacute;sultats obtenus
            </h2>
            <div className="grid grid-cols-3 gap-3 text-center mb-5">
              {[
                ['1', 'Application en production'],
                ['1', 'Utilisateur actif au quotidien'],
                ['3', 'Modules cl\u00e9s (agenda, \u00e9quipe, contrats)'],
              ].map(([num, label], i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <p className="text-3xl font-extrabold" style={{ color: '#34d399' }}>{num}</p>
                  <p className="text-xs mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2.5">
              {[
                'Outil utilis\u00e9 au quotidien par le photographe',
                'Gain de temps consid\u00e9rable sur la gestion administrative',
                'Contrats g\u00e9n\u00e9r\u00e9s en quelques clics et envoy\u00e9s aux clients',
                'Suivi clair des paiements et de l\u2019\u00e9quipe',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Auto-critique */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #a78bfa' }}>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: '#c4b5fd' }}>
            &#128172; Auto-critique
          </h2>
          <p className="leading-relaxed">
            Ce projet m'a permis de d&eacute;couvrir <strong style={{ color: '#a78bfa' }}>Next.js</strong> et de
            passer d'un simple site vitrine &agrave; une vraie application m&eacute;tier avec de la logique complexe
            (gestion de paiements, g&eacute;n&eacute;ration de documents, gestion d'&eacute;quipe). Le fait de travailler
            pour un utilisateur r&eacute;el m'a oblig&eacute;e &agrave; penser <strong style={{ color: '#a78bfa' }}>UX et fiabilit&eacute;</strong> en
            permanence. Il reste des am&eacute;liorations possibles, notamment sur la gestion hors-ligne et l'ajout
            de statistiques, mais l'application r&eacute;pond d&eacute;j&agrave; parfaitement aux besoins du quotidien.
          </p>
        </div>

      </div>
    </section>
  )
}
