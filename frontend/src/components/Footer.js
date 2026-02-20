import React from 'react'

export default function Footer(){

  return (
    <footer className="bg-zinc-800 text-zinc-100 mt-12">
      <div className="container px-4 py-10 flex flex-col items-center gap-6">
        <div className="text-center">
          <div className="font-semibold text-white">Igreja</div>
          <p className="text-sm text-zinc-300 mt-2">Rua Exemplo, 123 — Centro, Sua Cidade</p>
        </div>
      </div>
      <div className="border-t border-zinc-700 text-center py-4 text-sm text-zinc-400">© {new Date().getFullYear()} Igreja — Todos os direitos reservados</div>
    </footer>
  )
}
