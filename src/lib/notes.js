import { db } from './db.js'

export async function newNoteQuick() {
  const now = new Date()
  const id = await db.notes.add({
    date: now.toISOString(),
    title: 'Nueva nota',
    content: '',
    tags: [],
    refs: [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  })
  return id
}

export async function saveNote(note) {
  note.updatedAt = new Date().toISOString()
  await db.notes.put(note)
}

export async function getNote(id) {
  return await db.notes.get(Number(id))
}

export async function deleteNote(id) {
  return await db.notes.delete(Number(id))
}

export async function listNotesBetween(startIso, endIso) {
  return await db.notes
    .where('date')
    .between(startIso, endIso, true, true)
    .toArray()
}

export async function searchNotes(q) {
  const all = await db.notes.toArray()
  const s = q.trim().toLowerCase()
  if (!s) return all.sort((a,b)=> new Date(b.updatedAt||b.date||0) - new Date(a.updatedAt||a.date||0)).slice(0, 50)
  const filtered = all.filter(n =>
    (n.title||'').toLowerCase().includes(s) ||
    (n.content||'').toLowerCase().includes(s) ||
    (n.refs||[]).some(r => r.toLowerCase().includes(s)) ||
    (n.tags||[]).some(t => t.toLowerCase().includes(s))
  )
  return filtered.sort((a,b)=> new Date(b.updatedAt||b.date||0) - new Date(a.updatedAt||a.date||0)).slice(0, 100)
}
