import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const links = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'parcours', label: 'Mon parcours' },
  { id: 'entreprise', label: 'Entreprise' },
  { id: 'projects', label: 'Projets' },
  { id: 'veille', label: 'Veille' },
  { id: 'skills', label: 'Compétences' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isAll = pathname === '/' || pathname === '/all'
  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-14 items-center justify-between">
        <Link to="/" className="font-bold tracking-tight">
          <span className="text-indigo-600">LW</span> • Portfolio
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            isAll ? (
              <a key={l.id} href={`#${l.id}`} className="relative text-sm font-medium text-gray-600 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-gradient-to-r after:from-indigo-500 after:to-cyan-500 hover:text-gray-900 after:opacity-0 hover:after:opacity-100">
                {l.label}
              </a>
            ) : (
              <Link key={l.id} to={`/#${l.id}`} className="relative text-sm font-medium text-gray-600 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-gradient-to-r after:from-indigo-500 after:to-cyan-500 hover:text-gray-900 after:opacity-0 hover:after:opacity-100">
                {l.label}
              </Link>
            )
          ))}
          <Button
            variant="accent"
            size="sm"
            onClick={() => window.dispatchEvent(new Event('open-contact'))}
          >
            Me contacter
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="https://github.com/levanawizman" target="_blank" rel="noreferrer">Mon GitHub</a>
          </Button>
        </nav>

        <Button variant="outline" size="sm" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          <Menu size={18} />
        </Button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container-page py-2 flex flex-col gap-2">
            {links.map((l) => (
              isAll ? (
                <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="block py-2 text-gray-700 hover:text-gray-900">
                  {l.label}
                </a>
              ) : (
                <Link key={l.id} to={`/#${l.id}`} onClick={() => setOpen(false)} className="block py-2 text-gray-700 hover:text-gray-900">
                  {l.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}


