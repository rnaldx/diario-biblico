import Dexie from 'dexie'

export const db = new Dexie('diario-biblico')
db.version(1).stores({
  notes: '++id, date, title, content, tags, refs, createdAt, updatedAt'
})
