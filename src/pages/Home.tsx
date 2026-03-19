import { Button } from '@/components/ui/button'
import { Moon, Sun, Palette, Type } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const colorInputRef = useRef<HTMLInputElement>(null)
  const [showTextSize, setShowTextSize] = useState(false)
  const [fontScale, setFontScale] = useState(1)
  const [isDark, setIsDark] = useState(() => {
    try {
      return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark'
    } catch { return false }
  })
  function toggleDark() {
    const root = document.documentElement
    root.classList.toggle('dark')
    const darkNow = root.classList.contains('dark')
    setIsDark(darkNow)
    try { localStorage.setItem('theme', darkNow ? 'dark' : 'light') } catch {}
  }

  // Sélection de couleur d'accent
  function hexToHsl(hex: string) {
    const clean = hex.replace('#', '')
    const bigint = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255
    const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm)
    let h = 0, s = 0, l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break
        case gNorm: h = (bNorm - rNorm) / d + 2; break
        case bNorm: h = (rNorm - gNorm) / d + 4; break
      }
      h *= 60
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
  }
  function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)) }
  function hslToVar({ h, s, l }: { h: number; s: number; l: number }) { return `${h} ${s}% ${l}%` }
  function onPickColor(e: React.ChangeEvent<HTMLInputElement>) {
    const hex = e.target.value
    const base = hexToHsl(hex)
    const accent700 = hslToVar({ h: base.h, s: base.s, l: clamp(base.l - 8, 0, 100) })
    const accent600 = hslToVar(base)
    const accent500 = hslToVar({ h: base.h, s: base.s, l: clamp(base.l + 8, 0, 100) })
    const accent200 = hslToVar({ h: base.h, s: clamp(base.s - 10, 0, 100), l: clamp(base.l + 40, 0, 100) })
    const root = document.documentElement
    root.style.setProperty('--accent-700', accent700)
    root.style.setProperty('--accent-600', accent600)
    root.style.setProperty('--accent-500', accent500)
    root.style.setProperty('--accent-200', accent200)
    root.setAttribute('data-accent', 'custom')
    try {
      localStorage.setItem('accent', 'custom')
      localStorage.setItem('accent-color', hex)
    } catch {}
  }

  // Taille du texte (avec persistance)
  function applyFontScale(scale: number) {
    const clamped = Math.max(0.8, Math.min(1.4, scale))
    document.documentElement.style.setProperty('--font-scale', String(clamped))
    setFontScale(clamped)
    try { localStorage.setItem('font-scale', String(clamped)) } catch {}
  }
  useEffect(() => {
    try {
      const saved = parseFloat(localStorage.getItem('font-scale') || '')
      if (!Number.isNaN(saved)) {
        applyFontScale(saved)
      } else {
        applyFontScale(1)
      }
    } catch { applyFontScale(1) }
  }, [])

  return (
    <section className="section">
      <div ref={ref} className={`flex flex-col items-center text-center reveal ${inView ? 'in-view' : ''}`}>
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Levana Wizman
          </h1>
          <p className="mt-2 text-xl md:text-3xl font-bold heading-gradient">
            BTS SIO SLAM - Alternance chez 2C Démarches
          </p>
          <p className="mt-4 text-gray-600">
            Paris / Vincennes • levanawizman25@gmail.com
          </p>

          {/* Showcase: 3 nouveaux boutons */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
            <Button onClick={toggleDark} variant="outline" className="rounded-full">
              {isDark ? (<><Sun size={16} /> Clair</>) : (<><Moon size={16} /> Sombre</>)}
            </Button>
            <input ref={colorInputRef} type="color" className="sr-only" onChange={onPickColor} onInput={onPickColor} aria-label="Choisir la couleur" />
            <Button onClick={() => colorInputRef.current?.click()} variant="gradient" className="rounded-full">
              <Palette size={16} /> Couleur
            </Button>
            {/* Bouton Étincelles retiré */}
            <Button onClick={() => setShowTextSize((v) => !v)} variant="outline" size="sm" className="rounded-full">
              <Type size={14} /> Taille
            </Button>
          </div>
          {showTextSize && (
            <div className="mt-3 p-3 border border-indigo-200 rounded-lg bg-white/80 backdrop-blur shadow-sm card-float flex flex-col items-center">
              <div className="flex items-center justify-center gap-4">
                <span className="text-xs text-gray-600">A-</span>
                <div className="slider-with-mid relative w-56">
                  <input
                    type="range"
                    min={80}
                    max={120}
                    step={1}
                    value={Math.round(fontScale * 100)}
                    onChange={(e) => applyFontScale(parseFloat(e.target.value) / 100)}
                    onInput={(e) => applyFontScale(parseFloat((e.target as HTMLInputElement).value) / 100)}
                    className="w-full range-accent"
                    aria-label="Ajuster la taille du texte"
                  />
                  <div className="slider-mid-dot" title="100%" onClick={() => applyFontScale(1)} />
                  <div className="slider-mid-label">100%</div>
                </div>
                <span className="text-base text-gray-800">A+</span>
                <span className="ml-1 text-sm text-gray-600">{Math.round(fontScale * 100)}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mini-jeux déplacés vers Projets personnels */}

      {/* Veilles technologiques déplacées vers la page dédiée */}
      {false && <VeillesSection />}
    </section>
  )
}

export function GameHub() {
  const [tab, setTab] = useState<'cible' | 'reaction' | 'barre'>('cible')
  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center gap-2">
        <Button size="sm" variant={tab === 'cible' ? 'secondary' : 'outline'} onClick={() => setTab('cible')}>Cible</Button>
        <Button size="sm" variant={tab === 'reaction' ? 'secondary' : 'outline'} onClick={() => setTab('reaction')}>Réaction</Button>
        <Button size="sm" variant={tab === 'barre' ? 'secondary' : 'outline'} onClick={() => setTab('barre')}>Barre</Button>
      </div>
      {tab === 'cible' ? <MiniGame /> : tab === 'reaction' ? <ReactionGame /> : <BarGame />}
    </div>
  )
}

function MiniGame() {
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const scoreRef = useRef(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [dotPos, setDotPos] = useState({ x: 50, y: 50 })
  const [best, setBest] = useState(0)

  // Charger meilleur score
  useEffect(() => {
    try {
      const saved = parseInt(localStorage.getItem('mini-high-score') || '0', 10)
      if (!Number.isNaN(saved)) setBest(saved)
    } catch {}
  }, [])

  useEffect(() => { scoreRef.current = score }, [score])

  function randomizeDot() {
    // Position en % dans [8, 92] pour éviter les bords
    const x = 8 + Math.random() * 84
    const y = 8 + Math.random() * 84
    setDotPos({ x, y })
  }

  function start() {
    setScore(0)
    setTimeLeft(10)
    setRunning(true)
  }

  // Boucles du jeu (uniquement timer, le point bouge après chaque clic)
  useEffect(() => {
    if (!running) return
    randomizeDot()
    const timerId = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerId)
          setRunning(false)
          setBest((prev) => {
            const next = Math.max(prev, scoreRef.current)
            try { localStorage.setItem('mini-high-score', String(next)) } catch {}
            return next
          })
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { clearInterval(timerId) }
  }, [running])

  function hit() {
    if (!running) return
    setScore((s) => s + 1)
    randomizeDot()
  }

  return (
    <div className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">Score: <span className="font-semibold text-gray-900">{score}</span></div>
        <div className="text-sm text-gray-600">Temps: <span className="font-semibold text-gray-900">{timeLeft}s</span></div>
        <div className="text-sm text-gray-600">Meilleur: <span className="font-semibold text-gray-900">{best}</span></div>
      </div>
      <div ref={gameAreaRef} className="relative h-48 md:h-56 rounded-lg border border-indigo-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
        {!running && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
            Appuie sur Démarrer puis clique le point pour marquer des points
          </div>
        )}
        {running && (
          <button
            onClick={hit}
            aria-label="Point à cliquer"
            className="absolute w-10 h-10 md:w-12 md:h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--accent-600))] ring-2 ring-white shadow hover:scale-110 transition-transform"
            style={{ left: `${dotPos.x}%`, top: `${dotPos.y}%` }}
          />
        )}
      </div>
      <div className="mt-3 flex items-center gap-3">
        {!running ? (
          <Button onClick={start} variant="secondary" size="sm" className="btn-shine">Démarrer</Button>
        ) : (
          <Button onClick={() => setRunning(false)} variant="outline" size="sm">Stop</Button>
        )}
        {!running && score > 0 && (
          <Button onClick={start} variant="outline" size="sm">Rejouer</Button>
        )}
      </div>
    </div>
  )
}

function ReactionGame() {
  type ColorDef = { key: string; name: string; hex: string }
  const palette: ColorDef[] = [
    { key: 'red', name: 'Rouge', hex: '#ef4444' },
    { key: 'green', name: 'Vert', hex: '#10b981' },
    { key: 'blue', name: 'Bleu', hex: '#3b82f6' },
    { key: 'yellow', name: 'Jaune', hex: '#f59e0b' },
    { key: 'pink', name: 'Rose', hex: '#ec4899' },
    { key: 'purple', name: 'Violet', hex: '#8b5cf6' },
    { key: 'cyan', name: 'Cyan', hex: '#06b6d4' },
  ]

  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [target, setTarget] = useState<ColorDef | null>(null)
  const [tiles, setTiles] = useState<ColorDef[]>([])
  // pas de timer: partie continue jusqu'à erreur

  useEffect(() => {
    try {
      const saved = parseInt(localStorage.getItem('reaction-grid-best') || '0', 10)
      if (!Number.isNaN(saved)) setBest(saved)
    } catch {}
  }, [])

  function tileCountForScore(s: number) {
    if (s < 3) return 4
    if (s < 6) return 6
    if (s < 10) return 9
    return 12
  }

  function nextRound(expectedScore?: number) {
    const t = palette[Math.floor(Math.random() * palette.length)]
    setTarget(t)
    // nb de tuiles augmente avec le score
    const s = expectedScore ?? score
    const count = tileCountForScore(s)
    const correctIndex = Math.floor(Math.random() * count)
    const choices: ColorDef[] = []
    for (let i = 0; i < count; i++) {
      if (i === correctIndex) { choices.push(t) } else {
        let c: ColorDef
        do { c = palette[Math.floor(Math.random() * palette.length)] } while (c.key === t.key)
        choices.push(c)
      }
    }
    setTiles(choices)
  }

  function start() {
    setScore(0)
    setRunning(true)
    nextRound(0)
  }

  function gameOver() {
    setRunning(false)
    setBest((prev) => {
      const next = Math.max(prev, score)
      try { localStorage.setItem('reaction-grid-best', String(next)) } catch {}
      return next
    })
  }

  function pick(idx: number) {
    if (!running || !target) return
    const chosen = tiles[idx]
    if (chosen.key === target.key) {
      const nextScore = score + 1
      setScore(nextScore)
      nextRound(nextScore)
    } else {
      gameOver()
    }
  }

  // pas de démarrage automatique: on affiche un bouton "Démarrer"

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">Score: <span className="font-semibold text-gray-900">{score}</span></div>
        <div className="text-sm text-gray-600">Meilleur: <span className="font-semibold text-gray-900">{best}</span></div>
      </div>
      <div className="rounded-lg border border-indigo-200 bg-white/80 backdrop-blur shadow-sm p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-gray-700">Clique: <span className="font-semibold" style={{ color: target?.hex }}>{target?.name ?? '-'}</span></div>
          <div className="text-xs text-gray-500">Difficulté: {tiles.length} cases</div>
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(tiles.length || 1))}, minmax(0, 1fr))` }}>
          {tiles.map((c, i) => (
            <button
              key={i}
              onClick={() => pick(i)}
              className="h-16 md:h-20 rounded-md shadow-sm border border-gray-200 hover:scale-[1.02] transition-transform"
              style={{ backgroundColor: c.hex }}
              aria-label={`Choisir ${c.name}`}
              disabled={!running}
            />
          ))}
        </div>
        {!running && (
          <div className="mt-3 text-center text-sm text-gray-600">Clique Démarrer puis choisis la bonne couleur. Ça accélère et ajoute des cases !</div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-3">
        {!running ? (
          <Button onClick={start} variant="secondary" size="sm" className="btn-shine">Démarrer</Button>
        ) : (
          <Button onClick={gameOver} variant="outline" size="sm">Stop</Button>
        )}
      </div>
    </div>
  )
}

function BarGame() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)
  const [pos, setPos] = useState(0.5) // 0..1
  const dirRef = useRef(1)
  const speedRef = useRef(0.5) // fraction / sec
  const [zone, setZone] = useState({ start: 0.4, end: 0.6 })
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)
  const runningRef = useRef(false)

  useEffect(() => { try { const b = parseInt(localStorage.getItem('bar-best') || '0', 10); if (!Number.isNaN(b)) setBest(b) } catch {} }, [])
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  function loop(ts: number) {
    if (!runningRef.current) return
    if (lastTsRef.current == null) lastTsRef.current = ts
    const dt = (ts - lastTsRef.current) / 1000
    lastTsRef.current = ts
    setPos((p) => {
      let next = p + dirRef.current * speedRef.current * dt
      if (next > 1) { next = 1 - (next - 1); dirRef.current = -1 }
      if (next < 0) { next = -next; dirRef.current = 1 }
      return next
    })
    rafRef.current = requestAnimationFrame(loop)
  }

  function start() {
    setScore(0)
    setZone({ start: 0.35, end: 0.65 })
    speedRef.current = 0.25
    dirRef.current = 1
    setPos(0.5)
    setRunning(true)
    runningRef.current = true
    lastTsRef.current = null
    rafRef.current = requestAnimationFrame(loop)
  }
  function stopFail() {
    setRunning(false)
    runningRef.current = false
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setBest((prev) => { const n = Math.max(prev, score); try { localStorage.setItem('bar-best', String(n)) } catch {}; return n })
  }
  function tryStop() {
    if (!running) return
    const center = pos
    if (center >= zone.start && center <= zone.end) {
      // succès
      setScore((s) => s + 1)
      speedRef.current = Math.min(2.0, speedRef.current * 1.12)
      setZone((z) => {
        const width = Math.max(0.08, (z.end - z.start) * 0.9)
        const mid = (z.start + z.end) / 2
        return { start: Math.max(0, mid - width / 2), end: Math.min(1, mid + width / 2) }
      })
    } else {
      stopFail()
    }
  }

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">Score: <span className="font-semibold text-gray-900">{score}</span></div>
        <div className="text-sm text-gray-600">Vitesse: <span className="font-semibold text-gray-900">{Math.round(speedRef.current * 100)}%</span></div>
        <div className="text-sm text-gray-600">Meilleur: <span className="font-semibold text-gray-900">{best}</span></div>
      </div>
      <div ref={trackRef} onClick={tryStop} className="relative h-32 rounded-lg border border-indigo-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden cursor-pointer">
        {/* zone */}
        <div className="absolute inset-y-0 z-0 bg-emerald-100" style={{ left: `${zone.start * 100}%`, width: `${(zone.end - zone.start) * 100}%` }} />
        {/* barre */}
        <div className="absolute inset-y-0 z-10 bg-[hsl(var(--accent-700))] -translate-x-1/2 transition-transform duration-100" style={{ left: `${pos * 100}%`, width: '8px' }} />
        {/* point au centre de la barre pour visibilité */}
        <div className="absolute z-20 w-3 h-3 rounded-full bg-[hsl(var(--accent-700))] ring-2 ring-white -translate-x-1/2 -translate-y-1/2 top-1/2" style={{ left: `${pos * 100}%` }} />
        {!running && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-600 px-3 text-center">
            Clique Démarrer, puis clique dans la zone quand la barre passe dans le vert. Le jeu accélère à chaque réussite et continue jusqu'à ce que tu rates.
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-3">
        {!running ? (
          <Button onClick={start} variant="secondary" size="sm" className="btn-shine">Démarrer</Button>
        ) : (
          <Button onClick={tryStop} variant="outline" size="sm">Stop</Button>
        )}
        {running && (
          <Button onClick={stopFail} variant="outline" size="sm">Abandon</Button>
        )}
      </div>
    </div>
  )
}



function VeillesSection() {
  const [tab, setTab] = useState<'git' | 'ia'>('git')
  return (
    <div className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Veilles technologiques</h2>
      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" variant={tab === 'git' ? 'secondary' : 'outline'} onClick={() => setTab('git')}>Git & GitHub</Button>
        <Button size="sm" variant={tab === 'ia' ? 'secondary' : 'outline'} onClick={() => setTab('ia')}>IA pour les développeurs</Button>
      </div>
      <div className="mt-4 p-4 border border-indigo-200 rounded-lg bg-white/80 backdrop-blur shadow-sm card-float">
        {tab === 'git' ? (
          <div className="space-y-3 text-gray-700">
            <p><strong>📌 Sujet:</strong> Git et GitHub – Travail collaboratif dans le développement</p>
            <p><strong>🧠 Problématique:</strong> Comment Git et GitHub facilitent-ils le travail collaboratif dans les projets web modernes ?</p>
            <p><strong>📘 Définition:</strong> Git est un système de gestion de versions permettant de suivre les modifications du code. GitHub est une plateforme d’hébergement Git qui facilite la collaboration, les revues de code et la gestion de projet.</p>
            <div>
              <strong>🧪 Cas d’utilisation</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Sauvegarde régulière du code</li>
                <li>Travail en binôme (projets React / web)</li>
                <li>Suivi des modifications et des branches</li>
                <li>Visualisation de l’historique de contributions</li>
              </ul>
            </div>
            <div>
              <strong>🧰 Outils utilisés</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Git en ligne de commande</li>
                <li>GitHub Desktop / GitHub en ligne</li>
              </ul>
            </div>
            <p><strong>📌 Exemple perso:</strong> « Je l’ai utilisé lors du projet du site vitrine 2C Démarches pour collaborer avec mon binôme, suivre nos tâches et tester des fonctionnalités sans casser le projet principal. »</p>
            <div>
              <strong>✅ Avantages</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Sauvegarde sécurisée</li>
                <li>Travail simultané</li>
                <li>Historique clair</li>
              </ul>
            </div>
            <div>
              <strong>⚠ Limites</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Complexité des commandes au début</li>
                <li>Risque de conflits si mal géré</li>
              </ul>
            </div>
            <div>
              <strong>🧭 Ce que j’ai appris / veux apprendre</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Mieux gérer les branches / merge</li>
                <li>Utiliser les pull requests pro</li>
              </ul>
            </div>
            <div>
              <strong>📚 Sources</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>git-scm.com</li>
                <li>github.com</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-gray-700">
            <p><strong>📄 Fiche Veille Technologique – Sujet 2</strong></p>
            <p><strong>📌 Sujet:</strong> L’intelligence artificielle pour les développeurs</p>
            <p><strong>🧠 Problématique:</strong> Comment l’intelligence artificielle transforme-t-elle le métier de développeur ? Va-t-elle remplacer le développeur ou simplement l’assister ?</p>
            <p><strong>📘 Définition:</strong> L’IA désigne un ensemble de technologies capables d’imiter certaines fonctions humaines (raisonnement, apprentissage, décision). Dans le développement, elle s’utilise via des outils comme Copilot, ChatGPT, Notion AI.</p>
            <div>
              <strong>🧪 Cas d’utilisation</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Génération de fonctions ou de blocs de code</li>
                <li>Aide à la correction d’erreurs / compréhension</li>
                <li>Documentation de projets techniques</li>
                <li>Aide à la réflexion en cas de blocage</li>
              </ul>
            </div>
            <div>
              <strong>🛠 Outils testés</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>ChatGPT</li>
                <li>GitHub Copilot</li>
                <li>Notion AI</li>
              </ul>
            </div>
            <div>
              <strong>✅ Avantages</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Gain de temps</li>
                <li>Moins d’erreurs dans les tâches répétitives</li>
                <li>Aide pour les débutants</li>
                <li>Productivité accrue</li>
              </ul>
            </div>
            <div>
              <strong>⚠ Limites</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Risque de dépendance</li>
                <li>Qualité du code parfois approximative</li>
                <li>Ne comprend pas toujours le contexte métier</li>
              </ul>
            </div>
            <div>
              <strong>💡 Ce que j’ai appris / veux apprendre</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Apprendre à bien formuler mes requêtes</li>
                <li>Garder un esprit critique face au code généré</li>
                <li>Utiliser l’IA comme assistant, pas comme remplaçant</li>
              </ul>
            </div>
            <div>
              <strong>📚 Sources</strong>
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
  )
}

