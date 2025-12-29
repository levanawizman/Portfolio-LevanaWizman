import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/about', label: 'À propos' },
  { to: '/entreprise', label: 'Entreprise' },
  { to: '/projects', label: 'Projets' },
  { to: '/skills', label: 'Compétences' },
  { to: '/veilles', label: 'Veilles technologiques' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-14 items-center justify-between">
        <Link to="/" className="font-bold tracking-tight">
          <span className="text-indigo-600">LW</span> • Portfolio
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-gradient-to-r after:from-indigo-500 after:to-cyan-500 ${
                  isActive
                    ? 'text-indigo-600 after:opacity-100'
                    : 'text-gray-600 hover:text-gray-900 after:opacity-0 hover:after:opacity-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button
            variant="secondary"
            size="sm"
            className="btn-shine"
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
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-2 ${isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-900'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}


