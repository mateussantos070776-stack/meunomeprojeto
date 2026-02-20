import React, { useState } from 'react'
import { Menu, X, Play } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const NavLinks = () => (
    <>
      <a className="hover:text-sky-300 transition-colors" href="#">Início</a>
      <a className="hover:text-sky-300 transition-colors" href="#sermons">Mensagens</a>
      <a className="hover:text-sky-300 transition-colors" href="#live">Ao Vivo</a>
      <a className="hover:text-sky-300 transition-colors" href="#events">Eventos</a>
    </>
  )

  return (
    <header className="bg-transparent">
      <div className="container px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-zinc-950 rounded flex items-center justify-center font-bold">IM</div>
          <span className="font-semibold">Igreja</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLinks />
          <button className="ml-4 inline-flex items-center gap-2 bg-sky-500 text-zinc-950 px-4 py-2 rounded-md font-medium">
            <Play size={16} /> Assista Agora
          </button>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="menu" className="p-2">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-3 text-base">
            <NavLinks />
            <button className="mt-2 inline-flex items-center gap-2 bg-sky-500 text-zinc-950 px-4 py-2 rounded-md font-medium">
              <Play size={16} /> Assista Agora
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
