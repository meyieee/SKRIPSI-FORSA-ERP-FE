import { FeedsFilters, OnlineRequest as BaseOnlineRequest } from '../../core/types'

export interface OnlineRequest extends BaseOnlineRequest {
  site?: string
  department?: string
  section?: string
  requestDateIso?: string
}

export interface OnlineRequestDetailPayload {
  id?: string
  refDocNo?: string
  description?: string
  transType?: string
  requestor?: string
  priority?: string
  requestDate?: string
  expired?: string
  status?: string
  [key: string]: unknown
}

export interface OnlineRequestListQuery {
  site?: string
  department?: string
  section?: string
  date?: string
}

export interface OnlineRequestContextType {
  requests: OnlineRequest[]
  setRequests: React.Dispatch<React.SetStateAction<OnlineRequest[]>>
  getRequestsCount: () => number
  isLoading: boolean
  error: string | null
  refreshRequests: (query?: OnlineRequestListQuery) => Promise<void>
}

export const normalizePriority = (priority: string | number | null | undefined) => {
  const value = String(priority ?? '').trim()
  if (value.startsWith('P#')) return value
  if (value === '1') return 'P#1'
  if (value === '2') return 'P#2'
  if (value === '3') return 'P#3'
  return value || 'P#3'
}

export const normalizeStatus = (status: string | null | undefined) => String(status ?? '').trim()

// Converts yyyy-mm-dd OR dd-MMM-yy to yyyy-mm-dd.
export const toIsoDate = (value: string | null | undefined) => {
  if (!value) return ''
  const raw = String(value).trim()
  if (!raw) return ''

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw
  }

  const match = raw.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})$/)
  if (!match) return ''

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

  const day = Number(match[1])
  const month = monthMap[match[2].toLowerCase()]
  const yearRaw = Number(match[3])
  const year = match[3].length === 2 ? 2000 + yearRaw : yearRaw

  if (!day || !month || !year) return ''
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export const normalizeOnlineRequest = (request: Partial<OnlineRequest>): OnlineRequest => {
  const requestDate = String(request.requestDate ?? '')
  return {
    id: String(request.id ?? ''),
    no: Number(request.no ?? 0),
    refDocNo: String(request.refDocNo ?? ''),
    description: String(request.description ?? ''),
    transType: String(request.transType ?? ''),
    requestor: String(request.requestor ?? ''),
    priority: normalizePriority(request.priority),
    requestDate,
    requestDateIso: toIsoDate(request.requestDateIso || requestDate),
    expired: String(request.expired ?? ''),
    status: normalizeStatus(request.status),
    site: request.site ? String(request.site) : '',
    department: request.department ? String(request.department) : '',
    section: request.section ? String(request.section) : '',
  }
}

const includesInsensitive = (source: string | undefined, target: string) =>
  String(source ?? '')
    .toLowerCase()
    .includes(target.toLowerCase())

export const matchesOnlineRequestFilters = (request: OnlineRequest, filters: FeedsFilters) => {
  if (filters.department && !includesInsensitive(request.department, filters.department)) return false
  if (filters.section && !includesInsensitive(request.section, filters.section)) return false

  if (filters.date) {
    const rowIso = request.requestDateIso || toIsoDate(request.requestDate)
    if (rowIso !== filters.date) return false
  }

  return true
}

