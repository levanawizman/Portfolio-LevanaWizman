import * as React from 'react'
import { createPortal } from 'react-dom'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Phone } from 'lucide-react'

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const nameInputRef = React.useRef<HTMLInputElement>(null)

  function resetForm() {
    setName('')
    setEmail('')
    setMessage('')
    window.setTimeout(() => nameInputRef.current?.focus(), 0)
  }

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('Contact portfolio')
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:levanawizman25@gmail.com?subject=${subject}&body=${body}`
    alert("Message prêt à être envoyé dans votre messagerie. Si rien ne s'ouvre, utilisez le bouton Gmail.")
    resetForm()
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg mx-4 rounded-lg border border-indigo-200 bg-white p-4 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Me contacter</h3>
            <p className="text-sm text-gray-600">Je réponds rapidement aux messages.</p>
          </div>
          <button onClick={onClose} aria-label="Fermer" className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Mail size={16} />
            <a href="mailto:levanawizman25@gmail.com" className="underline decoration-dotted">levanawizman25@gmail.com</a>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone size={16} />
            <a href="tel:0695809079" className="underline decoration-dotted">0695809079</a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium">Nom</label>
            <Input ref={nameInputRef} value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" required />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@mail.com" required />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Bonjour…" required />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit">Envoyer</Button>
            <a
              className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-gray-300 text-sm hover:bg-gray-50"
              target="_blank"
              rel="noreferrer"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('levanawizman25@gmail.com')}&su=${encodeURIComponent('Contact portfolio')}&body=${encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\n' + message)}`}
              onClick={() => {
                alert("Redirection vers Gmail avec votre message prérempli.")
                resetForm()
              }}
            >
              Envoyer via Gmail
            </a>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}


