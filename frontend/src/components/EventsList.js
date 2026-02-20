import React from 'react'
import { MapPin } from 'lucide-react'

const events = [
  { id: 1, date: '2026-03-01', name: 'Culto de Celebração', place: 'Auditório Principal' },
  { id: 2, date: '2026-03-08', name: 'Encontro de Jovens', place: 'Sala 4' },
  { id: 3, date: '2026-03-15', name: 'Retiro de Casais', place: 'Sítio Aurora' }
]

function BadgeDate({ iso }){
  const d = new Date(iso)
  const day = d.toLocaleDateString(undefined,{day:'2-digit'})
  const month = d.toLocaleDateString(undefined,{month:'short'})
  return (
    <div className="w-16 h-16 flex flex-col items-center justify-center bg-zinc-800 rounded-md text-white">
      <div className="text-lg font-bold">{day}</div>
      <div className="text-xs text-zinc-300">{month.toUpperCase()}</div>
    </div>
  )
}

function EventItem({ e }){
  return (
    <div className="flex gap-4 items-center p-4 bg-zinc-900 rounded-lg">
      <BadgeDate iso={e.date} />
      <div className="flex-1">
        <div className="font-semibold text-white">{e.name}</div>
        <div className="text-sm text-zinc-400 flex items-center gap-2"><MapPin size={14} />{e.place}</div>
      </div>
    </div>
  )
}

export default function EventsList(){
  return (
    <div id="events" className="flex flex-col gap-4">
      {events.map(ev => <EventItem key={ev.id} e={ev} />)}
    </div>
  )
}
