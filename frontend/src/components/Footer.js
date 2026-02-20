import React, { useState } from 'react'
import { Twitter, Facebook, Youtube, Instagram } from 'lucide-react'

export default function Footer(){
  const [email, setEmail] = useState('')
  const submit = (e) => { e.preventDefault(); /* integrate later */ }

  return (
    <footer className="bg-zinc-800 text-zinc-100 mt-12">
      <div className="container px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold text-white">Igreja</div>
          <p className="text-sm text-zinc-300 mt-2">Rua Exemplo, 123 — Centro, Sua Cidade</p>
        </div>

        <div>
          <div className="font-semibold text-white">Redes</div>
          <div className="flex gap-4 mt-3 text-zinc-200">
            <a aria-label="Twitter" href="#" className="hover:text-white"><Twitter /></a>
            <a aria-label="Facebook" href="#" className="hover:text-white"><Facebook /></a>
            <a aria-label="Instagram" href="https://www.instagram.com/igrejakerigmacanhotinho/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Instagram /></a>
            <a aria-label="YouTube" href="#" className="hover:text-white"><Youtube /></a>
          </div>
        </div>

        <div>
          <div className="font-semibold text-white">Newsletter</div>
          <form onSubmit={submit} className="mt-3 flex gap-2">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@exemplo.com" className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-zinc-100" />
            <button className="bg-sky-500 text-zinc-950 px-4 rounded-md">Inscrever</button>
          </form>
        </div>
      </div>
      <div className="border-t border-zinc-700 text-center py-4 text-sm text-zinc-400">© {new Date().getFullYear()} Igreja — Todos os direitos reservados</div>
    </footer>
  )
}
