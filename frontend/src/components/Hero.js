import React from 'react'

export default function Hero() {
  return (
    <section className="bg-zinc-950">
      <div className="container px-4 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">Experiência Online — Culto Ao Vivo e Conteúdos On-Demand</h1>
        <p className="mt-4 text-zinc-300 max-w-2xl mx-auto">Participe da nossa comunidade digital com sermões, estudo e transmissões ao vivo otimizadas para todos os dispositivos.</p>
        <div className="mt-8">
          <a href="#live" className="inline-block bg-sky-500 text-zinc-950 px-6 py-3 rounded-md font-semibold">Assista Agora</a>
        </div>
      </div>
    </section>
  )
}
