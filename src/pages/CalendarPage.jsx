import React, { useEffect, useMemo, useState } from 'react'
import { buildMonthGrid, fmtDay, isSameMonthBool } from '../lib/dates.js'
import { format, addMonths, subMonths } from 'date-fns'
import { db } from '../lib/db.js'
import { liveQuery } from 'dexie'
import { Link } from 'react-router-dom'

export default function CalendarPage(){
  const [today] = useState(new Date())
  const [current, setCurrent] = useState(new Date())
  const grid = useMemo(()=> buildMonthGrid(current), [current])
  const [counts, setCounts] = useState({})

  useEffect(()=>{
    const sub = liveQuery(()=> db.notes.toArray()).subscribe(list => {
      const map = {}
      for (const n of list) {
        const k = (n.date||'').slice(0,10)
        map[k] = (map[k]||0) + 1
      }
      setCounts(map)
    })
    return ()=> sub.unsubscribe()
  }, [])

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center gap-2">
        <button className="btn btn-ghost" onClick={()=>setCurrent(d=>subMonths(d,1))}>◀</button>
        <h1 className="text-lg font-semibold">{format(current,'MMMM yyyy')}</h1>
        <button className="btn btn-ghost" onClick={()=>setCurrent(d=>addMonths(d,1))}>▶</button>
        <button className="btn btn-ghost ml-auto" onClick={()=>setCurrent(new Date())}>Hoy</button>
      </div>

      <div className="grid grid-cols-7 text-center text-muted mb-2">
        {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d=>(<div key={d}>{d}</div>))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {grid.map((d,i)=>{
          const k = fmtDay(d)
          const inMonth = isSameMonthBool(d, current)
          const cnt = counts[k]||0
          return (
            <Link to={`/day/${k}`} key={i}
              className={`card p-2 h-24 flex flex-col items-start ${inMonth?'':'opacity-50'}`}>
              <div className="text-sm">{d.getDate()}</div>
              {cnt>0 && <div className="mt-auto chip">📝 {cnt} nota{cnt>1?'s':''}</div>}
              {format(d,'yyyy-MM-dd')===format(today,'yyyy-MM-dd') && <div className="chip mt-2">Hoy</div>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
