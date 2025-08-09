import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Plus } from './components/Icons.jsx'
import { newNoteQuick } from './lib/notes.js'

export default function App() {
  const loc = useLocation()

  async function handleQuick() {
    const id = await newNoteQuick()
    window.location.assign(`/note/${id}`)
  }

  return (
    <div className="min-h-dvh grid grid-rows-[auto,1fr]">
      <header className="sticky top-0 z-20 backdrop-blur bg-slate-950/70 border-b border-slate-800">
        <div className="max-w-screen-sm mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-xl font-semibold">📖 Diario Bíblico</Link>
          <div className="ml-auto flex items-center gap-2">
            <Link className="btn btn-ghost text-sm" to="/search">Buscar</Link>
            <button className="btn btn-primary flex items-center gap-2" onClick={handleQuick}><Plus/> Nueva</button>
          </div>
        </div>
      </header>
      <main className="max-w-screen-sm mx-auto w-full px-4 py-4">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 inset-x-0 md:hidden bg-slate-950/80 border-t border-slate-800">
        <div className="max-w-screen-sm mx-auto px-4 py-2 grid grid-cols-3 gap-2">
          <Link className={`btn ${loc.pathname==='/'?'btn-primary':'btn-ghost'}`} to="/">Calendario</Link>
          <Link className={`btn ${loc.pathname.startsWith('/search')?'btn-primary':'btn-ghost'}`} to="/search">Buscar</Link>
          <button className="btn btn-primary" onClick={handleQuick}>Nueva</button>
        </div>
      </nav>
    </div>
  )
}
