import { useInView } from '@/hooks/useInView'

export default function Veille() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="section">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Veille technologique</h2>
        <p className="mt-3 text-center text-lg font-medium text-sky-300">L'impact de l'IA sur le métier de développeur</p>

        <div className="mt-8 mx-auto max-w-2xl space-y-6">

          {/* Pourquoi ce sujet */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">🎯 Pourquoi ce sujet ?</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              L'IA prend de plus en plus de place dans le développement logiciel. En tant que développeuse en alternance, j'utilise certains de ces outils au quotidien. J'ai voulu comprendre comment ils fonctionnent et ce qu'ils changent vraiment dans notre façon de coder.
            </p>
          </div>

          {/* Outils de veille */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">🔍 Outils de veille</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Google Alerts', detail: '"IA développement"' },
                { name: 'YouTube', detail: 'Chaînes et tutos tech' },
                { name: 'LinkedIn', detail: 'Articles et retours de devs' },
                { name: 'Le Journal du Net', detail: 'Actus tech' },
              ].map((o) => (
                <div key={o.name} className="rounded-lg bg-sky-50 border border-sky-200 px-2 py-1.5 text-center">
                  <p className="text-[11px] font-semibold text-sky-800">{o.name}</p>
                  <p className="text-[10px] text-sky-600">{o.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ce que j'ai retenu */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">💡 Ce que j'ai retenu</h3>
            <div className="space-y-3">
              {[
                { tool: 'GitHub Copilot', desc: 'Suggère du code en temps réel, fait gagner du temps sur les tâches répétitives' },
                { tool: 'ChatGPT / Claude', desc: 'Aide à débugger, comprendre des erreurs et générer du code de base' },
                { tool: 'Cursor', desc: 'Éditeur de code qui intègre l\'IA directement dans le workflow du développeur' },
                { tool: 'Les limites', desc: 'L\'IA peut se tromper, inventer des choses et ne comprend pas le besoin métier' },
              ].map((item) => (
                <div key={item.tool} className="flex gap-3 items-start">
                  <span className="shrink-0 mt-0.5 w-2 h-2 rounded-full bg-sky-400" />
                  <div>
                    <span className="text-sm font-semibold text-gray-900">{item.tool}</span>
                    <span className="text-sm text-gray-500"> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500 italic text-center">
            L'IA est un vrai gain de temps, mais elle ne remplace pas la réflexion du développeur. C'est à nous de vérifier, structurer et adapter. Savoir l'utiliser intelligemment devient une compétence à part entière.
          </p>

        </div>
      </div>
    </section>
  )
}
