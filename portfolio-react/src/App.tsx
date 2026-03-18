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
import Veilles from '@/pages/Veilles'

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/entreprise" element={<Entreprise />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/veilles" element={<Veilles />} />
      </Routes>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </BrowserRouter>
  )
}
