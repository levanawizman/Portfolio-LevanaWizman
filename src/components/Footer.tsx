export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-14">
      <div className="h-px bg-gradient-to-r from-indigo-200 via-cyan-200 to-indigo-200" />
      <div className="container-page py-8 text-sm text-gray-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Levana Wizman | Portfolio BTS SIO SLAM</p>
        <div className="flex gap-4">
          <a className="hover:text-indigo-600 transition-transform hover:translate-x-0.5" href="#contact" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-contact')) }}>Email</a>
          <a className="hover:text-indigo-600 transition-transform hover:translate-x-0.5" target="_blank" rel="noreferrer" href="https://github.com/levanawizman">GitHub</a>
          <a className="hover:text-indigo-600 transition-transform hover:translate-x-0.5" target="_blank" rel="noreferrer" href="https://www.linkedin.com/">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}


