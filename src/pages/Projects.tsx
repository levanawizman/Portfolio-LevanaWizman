import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Project = {
  title: string
  desc: string
  img: string
  stack: string[]
  github?: string
  demo?: string
  category: 'ecole' | 'entreprise' | 'perso'
  page?: string
}

const projects: Project[] = [
  {
    title: 'FormaGreen',
    desc: 'Site vitrine FormaGreen',
    img: '/logo/formagreen-logo.png',
    stack: ['React', 'Tailwind'],
    github: 'https://github.com/levanawizman/FormaGreen',
    demo: 'https://forma-green.vercel.app',
    category: 'entreprise',
    page: '/projet/formagreen',
  },
]

export default function Projects() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [active, setActive] = useState<'ecole' | 'entreprise' | 'perso'>('entreprise')
  const [showGame, setShowGame] = useState(false)
  const filtered = projects.filter((p) => p.category === active)
  const navigate = useNavigate()
  return (
    <section className="section">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Projets</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={active === 'entreprise' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActive('entreprise')}
          >
            Projets d'entreprise
          </Button>
          <Button
            variant={active === 'ecole' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActive('ecole')}
          >
            Projets d'école
          </Button>
          <Button
            variant={active === 'perso' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActive('perso')}
          >
            Projets personnels
          </Button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) =>
            p.page ? (
              <Card
                key={p.title}
                className="overflow-hidden card-float hover:border-indigo-200 group bg-white border-0 shadow-none cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => navigate(p.page!)}
              >
                <div className="overflow-hidden bg-white">
                  <img src={p.img} alt="" className="w-full object-cover" />
                </div>
                <CardHeader>
                  <h3 className="font-semibold text-lg text-center">{p.desc}</h3>
                </CardHeader>
              </Card>
            ) : (
              <Card key={p.title} className="overflow-hidden card-float hover:border-indigo-200 group bg-white border-0 shadow-none">
                <div className="overflow-hidden bg-white">
                  <img src={p.img} alt="" className="w-full object-cover" />
                </div>
                <CardHeader>
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild variant="outline">
                    <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                      <Github size={16} /> GitHub
                    </a>
                  </Button>
                  {p.demo && (
                    <Button asChild>
                      <a href={p.demo} target="_blank" rel="noreferrer">Voir le projet</a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          )}
        </div>

        {active === 'perso' && (
          <div className="mt-10">
            <Button size="sm" variant="outline" onClick={() => setShowGame((v) => !v)}>Jeu</Button>
            {showGame && <GameHub />}
          </div>
        )}
      </div>
    </section>
  )
}

// ====== Mini‑jeux (copie depuis Home, intégrée ici) ======
function GameHub() {
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

  useEffect(() => {
    try {
      const saved = parseInt(localStorage.getItem('mini-high-score') || '0', 10)
      if (!Number.isNaN(saved)) setBest(saved)
    } catch {}
  }, [])

  useEffect(() => { scoreRef.current = score }, [score])

  function randomizeDot() {
    const x = 8 + Math.random() * 84
    const y = 8 + Math.random() * 84
    setDotPos({ x, y })
  }

  function start() {
    setScore(0)
    setTimeLeft(10)
    setRunning(true)
  }

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
      <div ref={gameAreaRef} className="relative h-48 md:h-56 rounded-lg border border-indigo-200 bg-white/70 backdrop-blur overflow-hidden">
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
          <Button onClick={start} variant="secondary" size="sm">Démarrer</Button>
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

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">Score: <span className="font-semibold text-gray-900">{score}</span></div>
        <div className="text-sm text-gray-600">Meilleur: <span className="font-semibold text-gray-900">{best}</span></div>
      </div>
      <div className="rounded-lg border border-indigo-200 bg-white/70 backdrop-blur p-3">
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
          <Button onClick={start} variant="secondary" size="sm">Démarrer</Button>
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
  const [pos, setPos] = useState(0.5)
  const dirRef = useRef(1)
  const speedRef = useRef(0.5)
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
      <div ref={trackRef} onClick={tryStop} className="relative h-32 rounded-lg border border-indigo-200 bg-white/70 backdrop-blur overflow-hidden cursor-pointer">
        <div className="absolute inset-y-0 z-0 bg-emerald-100" style={{ left: `${zone.start * 100}%`, width: `${(zone.end - zone.start) * 100}%` }} />
        <div className="absolute inset-y-0 z-10 bg-[hsl(var(--accent-700))] -translate-x-1/2 transition-transform duration-100" style={{ left: `${pos * 100}%`, width: '8px' }} />
        <div className="absolute z-20 w-3 h-3 rounded-full bg-[hsl(var(--accent-700))] ring-2 ring-white -translate-x-1/2 -translate-y-1/2 top-1/2" style={{ left: `${pos * 100}%` }} />
        {!running && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-600 px-3 text-center">
            Clique Démarrer, puis clique dans la zone quand la barre passe dans le vert. Le jeu accélère à chaque réussite et continue jusqu'à ce que tu rates.
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-3">
        {!running ? (
          <Button onClick={start} variant="secondary" size="sm">Démarrer</Button>
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


