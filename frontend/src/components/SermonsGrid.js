import React from 'react'
import { Play } from 'lucide-react'

const sample = [
  { id: 1, title: 'A Esperança Renovada', preacher: 'Pr. João', date: '2026-02-12' },
  { id: 2, title: 'Viver em Comunhão', preacher: 'Pr. Maria', date: '2026-02-05' },
  { id: 3, title: 'Graça e Verdade', preacher: 'Pr. Lucas', date: '2026-01-29' },
  { id: 4, title: 'Fé em Tempos Difíceis', preacher: 'Pr. Ana', date: '2026-01-22' },
  { id: 5, title: 'Crescendo na Fé', preacher: 'Pr. Paulo', date: '2026-01-15' },
  { id: 6, title: 'Compaixão em Ação', preacher: 'Pr. Elias', date: '2026-01-08' }
]

function Card({ item }) {
  return (
    <article className="media-card">
      <div className="media-thumb">
        <div className="text-sm text-zinc-200">Thumbnail</div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white">{item.title}</h3>
        <p className="text-sm text-zinc-400">{item.preacher} • {new Date(item.date).toLocaleDateString()}</p>
      </div>

      <div className="play-overlay">
        <div className="bg-white text-zinc-950 p-3 rounded-full">
          <Play />
        </div>
      </div>
    </article>
  )
}

export default function SermonsGrid() {
  return (
    <div id="sermons" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sample.map(s => (
        <Card key={s.id} item={s} />
      ))}
    </div>
  )
}
