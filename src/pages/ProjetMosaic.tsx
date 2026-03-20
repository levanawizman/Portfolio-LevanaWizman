import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProjetMosaic() {
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
        <img src="/logo/mosaic-logo.jpg" alt="Mosaic" className="h-20 mb-6" />
        <p className="text-lg text-gray-500 mb-5 font-medium">G&eacute;n&eacute;rateur de photo-mosa&iuml;ques &mdash; Projet personnel</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Next.js</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">React</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Tailwind CSS</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">Canvas API</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-500/20 text-gray-300 border border-gray-500/30">Vercel</span>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <a href="https://mosaic.wizycode.fr" target="_blank" rel="noreferrer">Voir le site</a>
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
            Je voulais cr&eacute;er un outil cr&eacute;atif qui permet de <strong style={{ color: '#34d399' }}>recr&eacute;er une grande image &agrave; partir de centaines de petites photos</strong>.
            Le principe : l'utilisateur importe une image principale et une banque de photos, et l'application
            recompose l'image originale en rempla&ccedil;ant chaque zone par la <strong style={{ color: '#34d399' }}>petite photo dont les couleurs correspondent le mieux</strong>.
            Le r&eacute;sultat est une mosa&iuml;que photographique visible directement dans le navigateur.
          </p>
        </div>

        {/* Fonctionnalités + Objectifs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #818cf8' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#a5b4fc' }}>
              &#128196; Fonctionnalit&eacute;s
            </h2>
            <ul className="grid grid-cols-1 gap-2.5">
              {[
                "Import d'une image principale \u00e0 reproduire",
                "Import d'une banque de petites photos",
                "Recomposition automatique de l'image en mosa\u00efque de photos",
                "R\u00e9glage de la taille et du nombre de photos utilis\u00e9es",
                "Aper\u00e7u en temps r\u00e9el du r\u00e9sultat",
                "T\u00e9l\u00e9chargement de la mosa\u00efque g\u00e9n\u00e9r\u00e9e",
                "Interface intuitive et responsive",
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
                "Proposer un outil cr\u00e9atif de photo-mosa\u00efque utilisable sans installation",
                "Explorer la manipulation d'images et l'analyse de couleurs avec Canvas",
                "Obtenir un rendu r\u00e9aliste o\u00f9 chaque tuile est une vraie photo",
                "Pratiquer le d\u00e9veloppement frontend avec Next.js",
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
            &#128736;&#65039; Moyens utilis&eacute;s
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h3 className="font-bold mb-2 text-base" style={{ color: '#60a5fa' }}>Technologies</h3>
              <div className="space-y-2">
                {[
                  ['Next.js', 'framework React pour le rendu et le routing'],
                  ['Canvas API', 'analyse des couleurs et composition de la mosa\u00efque'],
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
                  ['Projet solo', 'conception et d\u00e9veloppement en autonomie'],
                  ['Exp\u00e9rimentation', 'tests d\u2019algorithmes de correspondance de couleurs'],
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
              &#9888;&#65039; Probl&eacute;matiques rencontr&eacute;es
            </h2>
            <div className="space-y-3">
              {[
                ['Correspondance des couleurs', 'Trouver la photo la plus proche en couleur pour chaque zone de l\u2019image.'],
                ['Performance', 'Garder l\u2019interface fluide malgr\u00e9 le traitement de centaines de photos.'],
                ['Rendu r\u00e9aliste', '\u00c9quilibrer la taille des tuiles pour que la mosa\u00efque reste lisible de loin.'],
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
                ['1', 'Application en ligne'],
                ['0', 'Installation requise'],
                ['100%', 'Traitement c\u00f4t\u00e9 client'],
              ].map(([num, label], i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <p className="text-3xl font-extrabold" style={{ color: '#34d399' }}>{num}</p>
                  <p className="text-xs mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2.5">
              {[
                'Mosa\u00efques g\u00e9n\u00e9r\u00e9es \u00e0 partir de vraies photos, pas de simples couleurs',
                'Aucune donn\u00e9e envoy\u00e9e \u00e0 un serveur (tout reste local)',
                'Interface simple : importer les photos, r\u00e9gler, t\u00e9l\u00e9charger',
                'Projet d\u00e9ploy\u00e9 et accessible publiquement',
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
          <p className="leading-relaxed">
            Ce projet m'a permis d'explorer les <strong style={{ color: '#a78bfa' }}>algorithmes de correspondance de couleurs</strong>.
            Le rendu est convaincant, mais je pourrais l'am&eacute;liorer en proposant
            plusieurs <strong style={{ color: '#a78bfa' }}>niveaux de pr&eacute;cision</strong> et en ajoutant un{' '}
            <strong style={{ color: '#a78bfa' }}>zoom interactif</strong> pour admirer les d&eacute;tails de la mosa&iuml;que.
          </p>
        </div>

      </div>
    </section>
  )
}
