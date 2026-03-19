import * as React from 'react'
import { createPortal } from 'react-dom'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Copy, Eye, Send, User, AtSign, MessageSquareText } from 'lucide-react'

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const nameInputRef = React.useRef<HTMLInputElement>(null)
  const [preview, setPreview] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const subject = 'Contact portfolio'
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('levanawizman25@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\n' + message)}`

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  function onPreview(e: React.FormEvent) {
    e.preventDefault()
    setPreview(true)
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg mx-4 rounded-lg border border-indigo-200 bg-white p-4 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-start justify-between gap-3 border-b border-indigo-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-lg font-semibold tracking-tight">Me contacter</h3>
            <p className="text-sm text-gray-600">Je réponds rapidement aux messages.
              <span className="ml-2 align-middle text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">Sous 24h</span>
            </p>
          </div>
          <button onClick={onClose} aria-label="Fermer" className="text-gray-500 hover:text-gray-700 rounded p-1 hover:bg-gray-100">✕</button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700 col-span-1">
            <Mail size={18} />
            <a href="mailto:levanawizman25@gmail.com" className="text-indigo-600 font-medium hover:underline underline-offset-2">levanawizman25@gmail.com</a>
            <button
              type="button"
              title="Copier l’adresse"
              className="ml-1 rounded p-1 hover:bg-gray-100"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText('levanawizman25@gmail.com')
                  setCopied(true)
                  window.setTimeout(() => setCopied(false), 1500)
                } catch {}
              }}
            >
              <Copy size={14} />
            </button>
            {copied && <span className="text-green-600 text-xs animate-in fade-in-0">Copié</span>}
          </div>
          <div className="flex items-center gap-2 text-gray-700 col-span-1">
            <Phone size={18} />
            <a href="tel:0695809079" className="text-indigo-600 font-medium hover:underline underline-offset-2">0695809079</a>
          </div>
        </div>

        {!preview ? (
          <form onSubmit={onPreview} className="mt-4 space-y-3">
            <div className="relative">
              <label className="text-sm font-medium">Nom</label>
              <span className="pointer-events-none absolute left-3 top-9 text-gray-400"><User size={16} /></span>
              <Input
                ref={nameInputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="pl-9"
                required
              />
            </div>
            <div className="relative">
              <label className="text-sm font-medium">Email</label>
              <span className="pointer-events-none absolute left-3 top-9 text-gray-400"><AtSign size={16} /></span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@mail.com"
                className="pl-9"
                required
              />
            </div>
            <div className="relative">
              <label className="text-sm font-medium">Message</label>
              <span className="pointer-events-none absolute left-3 top-9 text-gray-400"><MessageSquareText size={16} /></span>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bonjour…"
                className="pl-9"
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>Fermer</Button>
              <Button type="submit">
                <span className="inline-flex items-center gap-2">
                  <Eye size={16} /> Aperçu
                </span>
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-4 space-y-3 animate-in slide-in-from-bottom-1 fade-in-0">
            <div className="rounded-md border border-indigo-200 bg-indigo-50/50 p-3 text-sm shadow-sm">
              <p><strong>À</strong>: levanawizman25@gmail.com</p>
              <p><strong>Sujet</strong>: {subject}</p>
              <div className="mt-2">
                <p className="text-gray-600 text-xs">Aperçu du message:</p>
                <div className="mt-1 rounded bg-white p-3 ring-1 ring-indigo-100 text-gray-800 whitespace-pre-wrap">
{`Nom: ${name}
Email: ${email}

${message}`}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setPreview(false)}>Modifier</Button>
              <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                <a target="_blank" rel="noreferrer" href={gmailHref}>
                  <span className="inline-flex items-center gap-2">
                    <Send size={16} /> Envoyer via Gmail
                  </span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}


