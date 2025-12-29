import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useState } from 'react'

type Project = {
  title: string
  desc: string
  img: string
  stack: string[]
  github?: string
  demo?: string
  category: 'ecole' | 'entreprise' | 'perso'
}

const projects: Project[] = [
  {
    title: 'FormaGreen',
    desc: 'Projet d’entreprise: module de formation/communication interne. Stack et capture à venir.',
    img: 'https://via.placeholder.com/640x360.png?text=FormaGreen',
    stack: ['React', 'Tailwind'],
    github: 'https://github.com/levanawizman/FormaGreen',
    demo: 'https://forma-green.vercel.app',
    category: 'entreprise',
  },
]

export default function Projects() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [active, setActive] = useState<'ecole' | 'entreprise' | 'perso'>('entreprise')
  const filtered = projects.filter((p) => p.category === active)
  return (
    <section className="section">
      <div className="container-page">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Projets</h2>
        <div className="mt-4 flex gap-2">
          <Button
            variant={active === 'ecole' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActive('ecole')}
          >
            Projets d'école
          </Button>
          <Button
            variant={active === 'entreprise' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActive('entreprise')}
          >
            Projets d'entreprise
          </Button>
          <Button
            variant={active === 'perso' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActive('perso')}
          >
            Projets personnels
          </Button>
        </div>
        <div ref={ref} className={`mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 reveal ${inView ? 'in-view' : ''}`}>
          {filtered.map((p) => (
            <Card key={p.title} className="overflow-hidden card-float hover:border-indigo-200 group">
              <img src={p.img} alt="" className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105 kenburns" />
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
                <Button asChild>
                  <a href={p.demo} target="_blank" rel="noreferrer">Voir le projet</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


