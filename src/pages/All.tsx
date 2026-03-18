import Home from '@/pages/Home'
import About from '@/pages/About'
import Parcours from '@/pages/Parcours'
import Entreprise from '@/pages/Entreprise'
import Projects from '@/pages/Projects'
import Skills from '@/pages/Skills'
import Veille from '@/pages/Veille'

export default function All() {
  return (
    <main>
      <div id="home" className="scroll-mt-16 md:scroll-mt-20"><Home /></div>
      <div id="about" className="scroll-mt-16 md:scroll-mt-20"><About /></div>
      <div id="parcours" className="scroll-mt-16 md:scroll-mt-20"><Parcours /></div>
      <div id="entreprise" className="scroll-mt-16 md:scroll-mt-20"><Entreprise /></div>
      <div id="projects" className="scroll-mt-16 md:scroll-mt-20"><Projects /></div>
      <div id="veille" className="scroll-mt-16 md:scroll-mt-20"><Veille /></div>
      <div id="skills" className="scroll-mt-16 md:scroll-mt-20"><Skills /></div>
    </main>
  )
}


