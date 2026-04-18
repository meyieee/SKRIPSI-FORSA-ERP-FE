import { FeedsFilters, OnlineTask as BaseOnlineTask } from '../../core/types'

export interface OnlineTask extends BaseOnlineTask {
  site?: string
  department?: string
  section?: string
  tasksDateIso?: string
}

export interface OnlineTaskDetailMessage {
  id: string | number
  senderId?: string
  senderName?: string
  messageText?: string
  createdAt?: string
  attachments?: Array<{
    type?: string
    name?: string
    size?: number
    url?: string
  }>
}

export interface OnlineTaskDetailPayload {
  id?: string | number
  tasksNo?: string
  tasksTitle?: string
  assignedBy?: string
  assignedTo?: string
  priority?: string
  tasksDate?: string
  tasksDateIso?: string
  expired?: string
  status?: string
  shortDescription?: string
  messages?: OnlineTaskDetailMessage[]
  [key: string]: unknown
}

export interface OnlineTaskListQuery {
  site?: string
  department?: string
  section?: string
  date?: string
}

export interface OnlineTaskContextType {
  tasks: OnlineTask[]
  setTasks: React.Dispatch<React.SetStateAction<OnlineTask[]>>
  getTasksCount: () => number
  isLoading: boolean
  error: string | null
  refreshTasks: (query?: OnlineTaskListQuery) => Promise<void>
}

export const normalizePriority = (priority: string | number | null | undefined) => {
  const value = String(priority ?? '').trim()
  if (value.startsWith('P#')) return value
  if (value === '1') return 'P#1'
  if (value === '2') return 'P#2'
  if (value === '3') return 'P#3'
  return value || 'P#3'
}

export const normalizeStatus = (status: string | null | undefined) => {
  const value = String(status ?? '').trim()
  if (!value) return 'Outstanding'
  if (value.toLowerCase() === 'outstanding') return 'Outstanding'
  if (value.toLowerCase() === 'completed') return 'Completed'
  return value
}

export const toIsoDate = (value: string | null | undefined) => {
  if (!value) return ''
  const raw = String(value).trim()
  if (!raw) return ''

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw
  }

  const monthMap: Record<string, number> = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  }

  const matchDash = raw.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})$/)
  if (matchDash) {
    const day = Number(matchDash[1])
    const month = monthMap[matchDash[2].toLowerCase()]
    const yearRaw = Number(matchDash[3])
    const year = matchDash[3].length === 2 ? 2000 + yearRaw : yearRaw
    if (!day || !month || !year) return ''
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return ''
  const yyyy = parsed.getFullYear()
  const mm = String(parsed.getMonth() + 1).padStart(2, '0')
  const dd = String(parsed.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export const normalizeOnlineTask = (task: Partial<OnlineTask>): OnlineTask => {
  const tasksDate = String(task.tasksDate ?? '')
  return {
    id: String(task.id ?? ''),
    no: Number(task.no ?? 0),
    tasksNo: String(task.tasksNo ?? ''),
    tasksTitle: String(task.tasksTitle ?? ''),
    assignedBy: String(task.assignedBy ?? ''),
    assignedTo: String(task.assignedTo ?? ''),
    priority: normalizePriority(task.priority),
    tasksDate,
    tasksDateIso: toIsoDate(task.tasksDateIso || tasksDate),
    expired: String(task.expired ?? ''),
    status: normalizeStatus(task.status),
    site: task.site ? String(task.site) : '',
    department: task.department ? String(task.department) : '',
    section: task.section ? String(task.section) : '',
  }
}

const includesInsensitive = (source: string | undefined, target: string) =>
  String(source ?? '')
    .toLowerCase()
    .includes(target.toLowerCase())

export const matchesOnlineTaskFilters = (task: OnlineTask, filters: FeedsFilters) => {
  if (filters.department && !includesInsensitive(task.department, filters.department)) return false
  if (filters.section && !includesInsensitive(task.section, filters.section)) return false
  if (filters.date) {
    const rowIso = task.tasksDateIso || toIsoDate(task.tasksDate)
    if (rowIso !== filters.date) return false
  }
  return true
}

