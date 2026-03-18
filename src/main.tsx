import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Initialiser le thème: sombre par défaut, sauf si l'utilisateur a choisi "light"
(() => {
  const root = document.documentElement
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      root.classList.remove('dark')
    } else {
      // par défaut ou "dark"
      root.classList.add('dark')
      if (!saved) localStorage.setItem('theme', 'dark')
    }
  } catch {
    root.classList.add('dark')
  }
})()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
