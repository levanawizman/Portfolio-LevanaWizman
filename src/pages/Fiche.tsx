import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { X, ArrowUp, ArrowDown, Zap, ShieldAlert } from 'lucide-react'

function useIsDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains('dark')))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

export default function Fiche() {
  const navigate = useNavigate()
  const dark = useIsDark()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const t = dark
    ? {
        bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)',
        card: 'rgba(255,255,255,0.04)',
        cardBorder: 'rgba(255,255,255,0.08)',
        headerBg: 'rgba(255,255,255,0.06)',
        title: '#f1f5f9',
        heading: '#ffffff',
        sub: '#94a3b8',
        label: '#7dd3fc',
        text: '#e2e8f0',
        muted: '#cbd5e1',
        divider: 'rgba(255,255,255,0.05)',
        badge: 'linear-gradient(90deg, rgba(56,189,248,0.15), rgba(99,102,241,0.15))',
        badgeText: '#7dd3fc',
        timelineBg: 'rgba(255,255,255,0.04)',
        timelineBorder: 'rgba(255,255,255,0.08)',
        timelineDate: '#c7d2fe',
        arrow: '#818cf8',
      }
    : {
        bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 40%, #f8fafc 100%)',
        card: '#ffffff',
        cardBorder: '#e2e8f0',
        headerBg: '#f1f5f9',
        title: '#1e293b',
        heading: '#0f172a',
        sub: '#64748b',
        label: '#0369a1',
        text: '#334155',
        muted: '#475569',
        divider: '#e2e8f0',
        badge: 'linear-gradient(90deg, rgba(56,189,248,0.1), rgba(99,102,241,0.1))',
        badgeText: '#0284c7',
        timelineBg: '#f8fafc',
        timelineBorder: '#e2e8f0',
        timelineDate: '#4338ca',
        arrow: '#6366f1',
      }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto" style={{ background: t.bg }}>
      <button
        aria-label="Fermer"
        className="fixed top-4 right-4 z-10 p-2 rounded-full transition-all"
        style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }}
        onClick={() => navigate(-1)}
        title="Fermer (Esc)"
      >
        <X size={22} />
      </button>

      <div className="w-full max-w-[1300px] mx-auto px-8 py-6">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-block px-5 py-1.5 rounded-full mb-2" style={{ background: t.badge }}>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.badgeText }}>Fiche Entreprise</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: t.heading }}>2C Démarches</h1>
          <p className="text-sm mt-1" style={{ color: t.sub }}>SAS · 84 Avenue de la République, 94300 Vincennes</p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-4" style={{ fontSize: 14 }}>

          {/* Identification */}
          <div className="col-span-5">
            <Card t={t} title="Identification" accent="#38bdf8">
              <InfoRow t={t} label="Forme" value="Société par Actions Simplifiée (SAS)" />
              <InfoRow t={t} label="Taille" value="PME privée à but lucratif" />
              <InfoRow t={t} label="Effectif" value="10 salariés" />
              <InfoRow t={t} label="Secteur" value="Démarches administratives & accompagnement" />
              <InfoRow t={t} label="Capital" value="1 000 €" last />
            </Card>
          </div>

          {/* Historique */}
          <div className="col-span-7">
            <Card t={t} title="Historique" accent="#818cf8">
              <div className="flex gap-3 items-stretch">
                {[
                  { d: 'Fin 2022', txt: "Étude de marché & opportunité", icon: '🔍' },
                  { d: 'Nov. 2022', txt: 'Immatriculation officielle SAS', icon: '📋' },
                  { d: '2023', txt: 'CRM · RGPD · Structuration', icon: '⚙️' },
                  { d: '2024', txt: '6 500 clients · CA 100 000 €', icon: '🚀' },
                ].map((i, idx) => (
                  <div key={i.d} className="flex-1 relative">
                    <div className="rounded-xl p-3 h-full flex flex-col items-center text-center gap-1.5" style={{ background: t.timelineBg, border: `1px solid ${t.timelineBorder}` }}>
                      <span style={{ fontSize: 22 }}>{i.icon}</span>
                      <span className="font-bold" style={{ color: t.timelineDate, fontSize: 12 }}>{i.d}</span>
                      <span style={{ color: t.text, fontSize: 12.5, lineHeight: 1.4 }}>{i.txt}</span>
                    </div>
                    {idx < 3 && (
                      <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10" style={{ color: t.arrow, fontSize: 18, fontWeight: 'bold' }}>›</div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* RGPD / Stratégie / RSE */}
          <div className="col-span-4">
            <Card t={t} title="RGPD" accent="#22d3ee">
              <Bullet t={t} color="#22d3ee" items={['Données centralisées dans un CRM conforme', 'Accès limité aux collaborateurs habilités', 'Clients informés de leurs droits']} />
            </Card>
          </div>
          <div className="col-span-4">
            <Card t={t} title="Stratégie" accent="#a78bfa">
              <Bullet t={t} color="#a78bfa" items={['Conquête de nouveaux clients', 'Automatisation & outils numériques', 'Veille réglementaire permanente']} />
            </Card>
          </div>
          <div className="col-span-4">
            <Card t={t} title="RSE" accent="#4ade80">
              <Bullet t={t} color="#4ade80" items={['Dématérialisation & destruction sécurisée', 'Hébergement RGPD sécurisé', 'Confidentialité & transparence']} />
            </Card>
          </div>

          {/* SWOT */}
          <div className="col-span-12 rounded-2xl overflow-hidden" style={{ background: t.card, border: `1px solid ${t.cardBorder}` }}>
            <div className="grid grid-cols-4">
              <SwotCol t={t} dark={dark} icon={<ArrowUp size={16} />} label="Forces" color="#10b981" items={['Faible concurrence', 'Expertise métier', '6 500 clients', 'Croissance rapide']} />
              <SwotCol t={t} dark={dark} icon={<ArrowDown size={16} />} label="Faiblesses" color="#f59e0b" items={["Dépendance aux politiques de l'État", 'Complexité administrative', 'Faible capital initial']} />
              <SwotCol t={t} dark={dark} icon={<Zap size={16} />} label="Opportunités" color="#0ea5e9" items={['Énergies renouvelables', 'Essor du numérique', 'Aides à la digitalisation']} />
              <SwotCol t={t} dark={dark} icon={<ShieldAlert size={16} />} label="Menaces" color="#ef4444" items={['Changements réglementaires', 'ANTS / FranceConnect', 'Inflation & crises économiques']} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type Theme = Record<string, string>

function Card({ t, title, accent, children }: { t: Theme; title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ background: t.card, border: `1px solid ${t.cardBorder}` }}>
      <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${t.cardBorder}`, background: t.headerBg }}>
        <span className="w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}50` }} />
        <h2 className="font-bold" style={{ color: t.title, fontSize: 15 }}>{title}</h2>
      </div>
      <div className="px-5 py-4 flex-1">{children}</div>
    </div>
  )
}

function InfoRow({ t, label, value, last }: { t: Theme; label: string; value: string; last?: boolean }) {
  return (
    <div className="flex items-baseline py-2" style={last ? undefined : { borderBottom: `1px solid ${t.divider}` }}>
      <span className="font-semibold shrink-0" style={{ color: t.label, width: 80 }}>{label}</span>
      <span style={{ color: t.text }}>{value}</span>
    </div>
  )
}

function Bullet({ t, color, items }: { t: Theme; color: string; items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5" style={{ color: t.text }}>
          <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}50` }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

function SwotCol({ t, dark, icon, label, color, items }: { t: Theme; dark: boolean; icon: React.ReactNode; label: string; color: string; items: string[] }) {
  const bg = dark ? `${color}10` : `${color}08`
  return (
    <div className="px-5 py-4" style={{ background: bg }}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }}>{icon}</span>
        <span className="font-bold" style={{ color, fontSize: 14 }}>{label}</span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2" style={{ color: t.text, fontSize: 13 }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 4px ${color}60` }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
