import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import { GitBranch, Users } from 'lucide-react'

type Skill = {
  name: string
  icon: ReactNode
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
}

const svgIcon = (src: string, alt: string) => (
  <img src={src} alt={alt} className="h-4 w-4 shrink-0" loading="lazy" />
)

const languages: Skill[] = [
  { name: 'HTML', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'Logo HTML5') },
  { name: 'CSS', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'Logo CSS3') },
  { name: 'JavaScript', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'Logo JavaScript') },
  { name: 'PHP', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', 'Logo PHP') },
  { name: 'Python', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'Logo Python') },
  { name: 'Java', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'Logo Java') },
  { name: 'SQL', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'Logo SQL / MySQL') },
]

const tools: Skill[] = [
  { name: 'Git', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'Logo Git') },
  { name: 'GitHub', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 'Logo GitHub') },
  { name: 'VS Code', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', 'Logo VS Code') },
  { name: 'Figma', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', 'Logo Figma') },
  { name: 'Canva', icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg', 'Logo Canva') },
]

const others: Skill[] = [
  {
    name: 'React',
    icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'Logo React'),
    variant: 'default',
    className: 'bg-violet-100 text-violet-800 border-violet-200'
  },
  {
    name: 'Symfony',
    icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg', 'Logo Symfony'),
    variant: 'default',
    className: 'bg-violet-100 text-violet-800 border-violet-200'
  },
  {
    name: 'MySQL',
    icon: svgIcon('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'Logo MySQL'),
    variant: 'default',
    className: 'bg-violet-100 text-violet-800 border-violet-200'
  },
  {
    name: 'Travail en binôme',
    icon: <Users size={16} className="shrink-0" aria-hidden="true" />,
    variant: 'default',
    className: 'bg-violet-100 text-violet-800 border-violet-200'
  },
  {
    name: 'Versionnage Git',
    icon: <GitBranch size={16} className="shrink-0" aria-hidden="true" />,
    variant: 'default',
    className: 'bg-violet-100 text-violet-800 border-violet-200'
  },
]

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <section className="section">
      <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Compétences</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-3">Langages</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((skill) => (
                <Badge key={skill.name} className="gap-2">
                  {skill.icon}
                  <span>{skill.name}</span>
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Outils</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="gap-2">
                  {skill.icon}
                  <span>{skill.name}</span>
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Autres</h3>
            <div className="flex flex-wrap gap-2">
              {others.map((skill) => (
                <Badge
                  key={skill.name}
                  variant={skill.variant ?? 'outline'}
                  className={cn('gap-2', skill.className)}
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <a href="/tableau-synthese.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            Tableau de synthèse
          </a>
        </div>
      </div>
    </section>
  )
}


