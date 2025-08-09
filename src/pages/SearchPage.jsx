// src/pages/SearchPage.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchNotes } from '../lib/notes.js'

export default function SearchPage(){
  const [q, setQ] = useState('')
  const [res, setRes] = useState([])

  useEffect(()=>{
    const t = setTimeout(async ()=>{
      const r = await searchNotes(q)
      setRes(r)
    }, 200)
    return ()=> clearTimeout(t)
  }, [q])

  return (
    <div className="space-y-3 pb-20">
      <h1 className="text-lg font-semibold">Buscar</h1>
      <input className="input" placeholder="Texto, referencia (Jn 3:16) o #etiqueta" value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid gap-3">
        {res.map(n => (
          <Link key={n.id} to={`/note/${n.id}`} className="card p-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{n.title || 'Sin título'}</h3>
              <span className="chip">{new Date(n.date).toLocaleDateString()}</span>
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
