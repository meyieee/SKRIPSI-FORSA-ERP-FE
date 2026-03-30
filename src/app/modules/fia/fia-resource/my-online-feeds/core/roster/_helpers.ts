import type {
  GetRosterMonthParams,
  RosterNote,
  StoredRosterNote,
  CreateRosterPayload,
  UpdateRosterPayload,
} from './_models'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Simpan 1 list besar per ownerKey (misal emp_id / user id)
 * - GET monthly: filter year+month
 * - UPDATE/DELETE: cari by id
 */
const storageKey = (ownerKey: string) => `roster-notes:${ownerKey}`

const parseYMD = (ymd: string) => {
  const [y, m, d] = String(ymd).split('-').map(Number)
  return {y, m, d}
}

const sortByDateThenId = (a: StoredRosterNote, b: StoredRosterNote) => {
  if (a.date < b.date) return -1
  if (a.date > b.date) return 1
  return (a.id ?? 0) - (b.id ?? 0)
}

const readAll = (ownerKey: string): StoredRosterNote[] => {
  const raw = sessionStorage.getItem(storageKey(ownerKey))
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const writeAll = (ownerKey: string, data: StoredRosterNote[]) => {
  sessionStorage.setItem(storageKey(ownerKey), JSON.stringify(data))
}

const nextId = (list: StoredRosterNote[]) => {
  if (!list.length) return 1
  let max = 0
  for (const n of list) if (typeof n.id === 'number' && n.id > max) max = n.id
  return max + 1
}

/** GET monthly */
export async function getRosterNotesByMonthHelper(
  params: GetRosterMonthParams,
  ownerKey: string = 'default'
): Promise<RosterNote[]> {
  await delay(120)

  const {year, month} = params
  const list = readAll(ownerKey)

  return list
    .filter((n) => !n.deleted_at)
    .filter((n) => {
      const p = parseYMD(n.date)
      return p.y === year && p.m === month
    })
    .sort(sortByDateThenId)
    .map(({id, date, text}) => ({id, date, text}))
}

/** CREATE */
export async function createRosterNoteHelper(
  payload: CreateRosterPayload,
  ownerKey: string = 'default'
): Promise<RosterNote> {
  await delay(120)

  const date = payload.date
  const text = payload.text?.trim()

  if (!date || !text) throw new Error('date & text are required')

  const list = readAll(ownerKey)
  const id = nextId(list)

  const newNote: StoredRosterNote = {id, date, text, deleted_at: null}

  list.push(newNote)
  list.sort(sortByDateThenId)
  writeAll(ownerKey, list)

  return {id, date, text}
}

/** UPDATE */
export async function updateRosterNoteHelper(
  id: number,
  payload: UpdateRosterPayload,
  ownerKey: string = 'default'
): Promise<RosterNote> {
  await delay(120)

  const text = payload.text?.trim()
  if (!text) throw new Error('text is required')

  const list = readAll(ownerKey)
  const idx = list.findIndex((n) => n.id === id && !n.deleted_at)

  if (idx === -1) {
    const err: any = new Error('Note not found')
    err.status = 404
    throw err
  }

  list[idx] = {...list[idx], text}
  list.sort(sortByDateThenId)
  writeAll(ownerKey, list)

  return {id: list[idx].id, date: list[idx].date, text: list[idx].text}
}

/** DELETE (soft delete) */
export async function deleteRosterNoteHelper(
  id: number,
  ownerKey: string = 'default'
): Promise<void> {
  await delay(120)

  const list = readAll(ownerKey)
  const idx = list.findIndex((n) => n.id === id && !n.deleted_at)

  if (idx === -1) {
    const err: any = new Error('Note not found')
    err.status = 404
    throw err
  }

  list[idx] = {...list[idx], deleted_at: new Date().toISOString()}
  writeAll(ownerKey, list)
}

/** Optional: clear semua notes */
export async function clearRosterNotesHelper(ownerKey: string = 'default') {
  await delay(50)
  sessionStorage.removeItem(storageKey(ownerKey))
}
