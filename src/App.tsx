import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ContactModal } from '@/components/ContactModal'
import { ScrollToTop } from '@/components/ScrollToTop'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Entreprise from '@/pages/Entreprise'
import Projects from '@/pages/Projects'
import Skills from '@/pages/Skills'
import Parcours from '@/pages/Parcours'
import All from '@/pages/All'
import Presentation from '@/pages/Presentation'
import Fiche from '@/pages/Fiche'
import Veille from '@/pages/Veille'
import ProjetFormaGreen from '@/pages/ProjetFormaGreen'
import ProjetGestTravauxWeb from '@/pages/ProjetGestTravauxWeb'
import ProjetGestTravauxJava from '@/pages/ProjetGestTravauxJava'
import ProjetAgenda from '@/pages/ProjetAgenda'

export default function App() {
  const [contactOpen, setContactOpen] = React.useState(false)
  React.useEffect(() => {
    const handler = () => setContactOpen(true)
    window.addEventListener('open-contact', handler as any)
    return () => window.removeEventListener('open-contact', handler as any)
  }, [])
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      {/* Espace pour compenser le header fixe (h-14) */}
      <div className="h-14" />
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/about" element={<About />} />
        <Route path="/parcours" element={<Parcours />} />
        <Route path="/entreprise" element={<Entreprise />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/fiche" element={<Fiche />} />
        <Route path="/veille" element={<Veille />} />
        <Route path="/projet/formagreen" element={<ProjetFormaGreen />} />
        <Route path="/projet/gesttravaux-web" element={<ProjetGestTravauxWeb />} />
        <Route path="/projet/gesttravaux-java" element={<ProjetGestTravauxJava />} />
        <Route path="/projet/agenda" element={<ProjetAgenda />} />
        <Route path="/all" element={<All />} />
      </Routes>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </BrowserRouter>
  )
}
