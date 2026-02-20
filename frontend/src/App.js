import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SermonsGrid from './components/SermonsGrid'
import EventsList from './components/EventsList'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero />

        <section className="container px-4 mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Sermões Recentes</h2>
          <SermonsGrid />
        </section>

        <section className="container px-4 mt-12 mb-20">
          <h2 className="text-2xl font-bold text-white mb-6">Agenda</h2>
          <EventsList />
        </section>
      </main>

      <Footer />
    </div>
  )
}
