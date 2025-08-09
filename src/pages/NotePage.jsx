import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getNote, saveNote, deleteNote } from '../lib/notes.js'

export default function NotePage(){
  const { id } = useParams()
  const nav = useNavigate()
  const [note, setNote] = useState(null)

  useEffect(()=>{
    getNote(id).then(n => {
      if (!n) return nav('/')
      setNote(n)
    })
  }, [id])

  async function handleSave(field, value) {
    const updated = { ...note, [field]: value }
    setNote(updated)
    await saveNote(updated)
  }

  async function handleDelete(){
    if (confirm('¿Eliminar nota?')) {
      await deleteNote(id)
      nav(-1)
    }
  }

  if (!note) return null

  return (
    <div className="space-y-3 pb-24">
      <input className="input text-lg font-semibold" placeholder="Título"
        value={note.title||''} onChange={e=>handleSave('title', e.target.value)} />

      <div className="grid grid-cols-2 gap-2">
        <input className="input" placeholder="Referencia (ej: Jn 3:16)"
          value={(note.refs||[]).join(', ')}
          onChange={e=>handleSave('refs', e.target.value.split(',').map(x=>x.trim()).filter(Boolean))} />
        <input className="input" placeholder="Etiquetas (ej: fe, gracia)"
          value={(note.tags||[]).join(', ')}
          onChange={e=>handleSave('tags', e.target.value.split(',').map(x=>x.trim()).filter(Boolean))} />
      </div>

      <textarea className="input min-h-[40dvh]" placeholder="Escribe tu nota (admite Markdown básico)"
        value={note.content||''} onChange={e=>handleSave('content', e.target.value)} />

      <div className="flex items-center gap-2">
        <input className="input" type="datetime-local"
          value={note.date ? note.date.slice(0,16) : ''}
          onChange={e=>handleSave('date', new Date(e.target.value).toISOString())} />
        <button className="btn btn-ghost" onClick={handleDelete}>Eliminar</button>
      </div>

      <div className="text-muted text-sm">
        Creada: {new Date(note.createdAt).toLocaleString()} · Actualizada: {new Date(note.updatedAt).toLocaleString()}
      </div>
    </div>
  )
}
