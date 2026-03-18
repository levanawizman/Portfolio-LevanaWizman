import { useInView } from '@/hooks/useInView'

type Item = { title: string; dates: string; desc: string; link?: string }

function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative border-l border-indigo-200 pl-4 space-y-4">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[8px] top-2 h-3 w-3 rounded-full bg-indigo-400 ring-2 ring-indigo-100" />
          <div className="flex items-start gap-2 sm:gap-3">
            {/* Badge date: fixe en desktop pour éviter tout décalage visuel */}
            <span className="hidden sm:inline-flex items-center justify-center w-28 md:w-32 rounded-full bg-indigo-400 px-2.5 py-0.5 text-[12px] md:text-sm font-semibold text-white ring-1 ring-indigo-100 shadow-sm">
              {it.dates}
            </span>
            {/* Badge date mobile au-dessus */}
            <span className="mt-0.5 inline-flex sm:hidden items-center rounded-full bg-indigo-400 px-2.5 py-0.5 text-[12px] font-semibold text-white ring-1 ring-indigo-100 shadow-sm self-start">
              {it.dates}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900">{it.title}</p>
              <p className="text-sm text-gray-700">{it.desc}</p>
              {it.link && (
                <a href={it.link} className="text-indigo-600 text-sm hover:underline">Plus d’informations</a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function Parcours() {
  const { ref, inView } = useInView<HTMLDivElement>()

  // Données (placeholders éditables rapidement)
  const experiences: Item[] = [
    {
      title: 'Secrétaire administrative — ABC liv (Paris)',
      dates: 'Mai 2024 – Août 2024',
      desc: 'Accueil physique et téléphonique, classement/archivage, rédaction et expédition de courriers.',
    },
    {
      title: 'Aide au secrétariat — Cabinet médical (Paris XI)',
      dates: 'Juil. 2020, 2021, 2022, 2023',
      desc: 'Accueil, classement et archivage des dossiers patients.',
    },
    {
      title: 'Projet humanitaire — Étranger',
      dates: 'Année scolaire 2021–2022',
      desc: 'Colis pour nécessiteux; aide aux personnes âgées (domicile, maisons de retraite).',
    },
    {
      title: 'Trésorière bénévole — Association BZH YOMYOM',
      dates: 'Depuis mars 2019',
      desc: 'Tenue du budget; participation aux assemblées générales.',
    },
    {
      title: 'Soutien scolaire & baby‑sitting',
      dates: 'Depuis juil. 2019',
      desc: 'Soutien primaire/collège; Kids Home — missions régulières.',
    },
  ]

  const formations: Item[] = [
    { title: "BTS SIO \u2014 Option SLAM (ORT Montreuil) \u2014 En alternance chez 2C D\u00e9marches", dates: "En cours", desc: "D\u00e9veloppement d’applications, bases de donn\u00e9es, m\u00e9thodes de projet." },
    { title: 'L1 MIASHS — Paris Cité', dates: 'Sept. 2022 – Mai 2024', desc: 'Raisonnements mathématiques, initiation à la programmation (Python), macroéconomie.' },
    { title: 'BAFA Complet', dates: 'Juil. 2023', desc: 'Encadrement et animation jeunesse.' },
    { title: 'Bac général (Maths / Économie) — Lycée NR HATORAH (Paris XIX)', dates: 'Juin 2021', desc: 'Mention Bien.' },
  ]


  return (
    <section className="section">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Mon parcours</h2>
        <div className="mt-4 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">Expérience professionnelle</h3>
            <Timeline items={experiences} />
          </div>
          <div>
            <h3 className="font-semibold">Formations</h3>
            <Timeline items={formations} />
          </div>
        </div>
      </div>
    </section>
  )
}

