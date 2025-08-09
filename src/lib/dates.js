import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth } from 'date-fns'

export function buildMonthGrid(date = new Date()) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
  const days = []
  let cur = start
  while (cur <= end) {
    days.push(new Date(cur))
    cur = addDays(cur, 1)
  }
  return days
}

export function fmtDay(d) { return format(d, 'yyyy-MM-dd') }
export function isSameMonthBool(a, b) { return isSameMonth(a, b) }
