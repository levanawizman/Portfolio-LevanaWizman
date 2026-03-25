import * as React from 'react'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Parcours from '@/pages/Parcours'
import Entreprise from '@/pages/Entreprise'
import Projects from '@/pages/Projects'
import Skills from '@/pages/Skills'

type SectionId = 'home' | 'about' | 'parcours' | 'entreprise' | 'projects' | 'skills'

export function Slides() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  function scrollToId(id: SectionId) {
    const el = document.getElementById(`slide-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  React.useEffect(() => {
    function onJump(e: Event) {
      const ce = e as CustomEvent
      const id = ce.detail as SectionId
      if (id) {
        scrollToId(id)
        try { history.replaceState(null, '', `#${id}`) } catch {}
      }
    }
    window.addEventListener('go-section', onJump as any)
    // Au chargement, si un hash existe, on y va
    const hash = (location.hash || '').replace('#', '') as SectionId
    if (hash) {
      // différer pour laisser le layout se rendre
      setTimeout(() => scrollToId(hash), 50)
    }
    return () => window.removeEventListener('go-section', onJump as any)
  }, [])

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
      <div id="slide-home" className="min-h-screen snap-start flex items-center">
        <Home />
      </div>
      <div id="slide-about" className="min-h-screen snap-start flex items-center">
        <About />
      </div>
      <div id="slide-parcours" className="min-h-screen snap-start flex items-center">
        <Parcours />
      </div>
      <div id="slide-skills" className="min-h-screen snap-start flex items-center">
        <Skills />
      </div>
      <div id="slide-entreprise" className="min-h-screen snap-start flex items-center">
        <Entreprise />
      </div>
      <div id="slide-projects" className="min-h-screen snap-start flex items-center">
        <Projects />
      </div>
    </div>
  )
}




