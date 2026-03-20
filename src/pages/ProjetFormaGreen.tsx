import { Button } from '@/components/ui/button'
import { Github, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProjetFormaGreen() {
  const navigate = useNavigate()
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Retour */}
      <button
        onClick={() => navigate('/projects?tab=entreprise')}
        className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition mb-8"
      >
        <ArrowLeft size={16} /> Retour aux projets d'entreprise
      </button>

      {/* En-t&#234;te */}
      <div className="p-8 md:p-12 mb-10 flex flex-col items-center">
        <img src="/logo/formagreen-logo.png" alt="FormaGreen" className="w-56 mb-6" />
        <p className="text-lg text-gray-500 mb-5 font-medium">Site vitrine &mdash; Projet d'entreprise</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">React</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">Tailwind CSS</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">Vite</span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-500/20 text-gray-300 border border-gray-500/30">Vercel</span>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <a href="https://github.com/levanawizman/FormaGreen" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
          </Button>
          <Button asChild>
            <a href="https://forma-green.vercel.app" target="_blank" rel="noreferrer">Voir le site</a>
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
            FormaGreen est un cabinet de comptabilit&#233; qui mise sur l'accompagnement humain.
            L'entreprise avait besoin d'un <strong style={{ color: '#34d399' }}>site vitrine professionnel</strong> pour
            pr&#233;senter ses offres, rassurer ses prospects et leur permettre de demander un
            rappel. Le projet a &#233;t&#233; r&#233;alis&#233; <strong style={{ color: '#34d399' }}>en bin&#244;me</strong> avec un coll&#232;gue,
            dans le cadre de notre activit&#233; en entreprise.
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
                "Page d'accueil avec proposition de valeur",
                "Tableau comparatif des 3 offres",
                "Cartes tarifaires (Essentiel, Pro, Complet)",
                "Formulaire de demande de rappel",
                "Pages CGU, mentions l\u00e9gales, confidentialit\u00e9",
                "Banni\u00e8re cookies conforme RGPD",
                "Design responsive (mobile / desktop)",
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
                "Concevoir un site professionnel qui refl\u00e8te l'image du cabinet",
                "Pr\u00e9senter les offres de mani\u00e8re claire et comparative",
                "Mettre en place un formulaire de contact pour g\u00e9n\u00e9rer des leads",
                "Respecter les obligations l\u00e9gales : RGPD, CGU, mentions l\u00e9gales",
                "Livrer un site rapide, responsive et facile \u00e0 maintenir",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'rgba(167,139,250,0.2)', color: '#c4b5fd' }}>{i + 1}</span>
                  {item}
              </li>
            ))}
          </ul>
          </div>
        </div>

        {/* Moyens utilis&#233;s */}
        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #60a5fa' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#93c5fd' }}>
              &#128736;&#65039; Moyens utilis&#233;s
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h3 className="font-bold mb-2 text-base" style={{ color: '#60a5fa' }}>Technologies</h3>
                <div className="space-y-2">
                  {[
                    ['React', 'composants r\u00e9utilisables, SPA fluide'],
                    ['Tailwind CSS', 'style rapide et responsive'],
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
                    ['Git / GitHub', 'versionning et collaboration'],
                    ['Travail en bin\u00f4me', 'r\u00e9partition des t\u00e2ches'],
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

        {/* Probl\u00e9matiques + R\u00e9sultats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm" style={{ borderLeft: '4px solid #fbbf24' }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#fcd34d' }}>
              &#9888;&#65039; Probl&#233;matiques rencontr&#233;es
            </h2>
            <div className="space-y-3">
              {[
                ['Coordination en \u00e9quipe', 'Se synchroniser \u00e0 deux sur le m\u00eame projet, g\u00e9rer les merges et \u00e9viter les conflits de code.'],
                ['UX du tableau comparatif', 'Rendre un tableau dense lisible sur tous les \u00e9crans, surtout mobile.'],
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
              &#127942; R&#233;sultats obtenus
            </h2>
            <div className="grid grid-cols-3 gap-3 text-center mb-5">
              {[
                ['1', 'Site d\u00e9ploy\u00e9 en production'],
                ['5', 'Sections compl\u00e8tes'],
                ['3', 'Offres pr\u00e9sent\u00e9es'],
              ].map(([num, label], i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <p className="text-3xl font-extrabold" style={{ color: '#34d399' }}>{num}</p>
                  <p className="text-xs mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2.5">
              {[
                'Interface professionnelle avec identit\u00e9 visuelle coh\u00e9rente',
                'Formulaire fonctionnel avec choix du statut et du forfait',
                'Conformit\u00e9 RGPD compl\u00e8te (cookies, CGU, mentions l\u00e9gales)',
                'Site rapide et responsive gr\u00e2ce \u00e0 Vite + Vercel',
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
            En arrivant sur ce projet, je n'avais pas le m&#234;me niveau technique que mon coll&#232;gue, notamment sur React et Tailwind.
            Il m'a accompagn&#233;, guid&#233; et transmis de bonnes pratiques tout au long du d&#233;veloppement.
            Cette collaboration m'a permis de <strong style={{ color: '#a78bfa' }}>monter en comp&#233;tences rapidement</strong> et
            de contribuer r&#233;ellement au projet. Aujourd'hui, je suis capable de reproduire ce type de site
            de mani&#232;re autonome, ce qui montre tout ce que ce projet m'a apport&#233;.
          </p>
        </div>

      </div>
    </section>
  )
}
