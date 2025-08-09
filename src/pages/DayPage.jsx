import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { listNotesBetween } from '../lib/notes.js'

export default function DayPage(){
  const { iso } = useParams()
  const start = new Date(iso + 'T00:00:00')
  const end = new Date(iso + 'T23:59:59')
  const [notes, setNotes] = useState([])

  useEffect(()=>{
    listNotesBetween(start.toISOString(), end.toISOString()).then(setNotes)
  }, [iso])

  return (
    <div className="space-y-3 pb-20">
      <h1 className="text-lg font-semibold">Notas del {iso}</h1>
      {notes.length===0 && <p className="text-muted">Sin notas aún. Toca “Nueva” para crear una.</p>}
      <div className="grid gap-3">
        {notes.map(n => (
          <Link key={n.id} to={`/note/${n.id}`} className="card p-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{n.title || 'Sin título'}</h3>
              <span className="chip">{new Date(n.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
            </div>
            {n.refs?.length>0 && <div className="mt-1 flex flex-wrap gap-2">
              {n.refs.map((r,i)=>(<span className="chip" key={i}>📖 {r}</span>))}
            </div>}
            {n.tags?.length>0 && <div className="mt-1 flex flex-wrap gap-2">
              {n.tags.map((t,i)=>(<span className="chip" key={i}># {t}</span>))}
            </div>}
            {n.content && <p className="mt-2 line-clamp-2 text-sm text-muted">{n.content}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}
