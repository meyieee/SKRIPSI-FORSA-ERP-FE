// src/module-fia-resource/core/personal-info/_requests.ts
import {apiBaseUrl} from '../../../../../functions/base_url'

const API_BASE = apiBaseUrl

export type PersonSearchItem = {
  id_number: string
  full_name: string
  email?: string
  photo?: string
}

export type PersonalInfoCapabilities = {
  canSearchEmployee: boolean
  hierarchyLevel: number | null
  idNumber: string
}

export type PersonalInfoResponse = {
  header: {
    idNumber: string
    fullName: string
    email: string
    photo: string
    supervisor: string
    department: string
    employeeType: string
  }
  personalData: Record<string, any>
  jobInfo: Record<string, any>
  jobService: Record<string, any>
  dependents: any[]
  kin: any[]
}

export async function searchPersonalInfo(q: string): Promise<PersonSearchItem[]> {
  const res = await fetch(
    `${API_BASE}/fia-resource/personal-info/search?q=${encodeURIComponent(q)}`,
    {credentials: 'include'}
  )

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || 'Failed to search')
  }

  const json = await res.json()
  return Array.isArray(json.data) ? json.data : []
}

export async function fetchPersonalInfoCapabilities(): Promise<PersonalInfoCapabilities> {
  const res = await fetch(`${API_BASE}/fia-resource/personal-info/capabilities`, {
    credentials: 'include',
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || 'Failed to fetch personal info capabilities')
  }

  const json = await res.json()
  return json.data
}

export async function fetchPersonalInfo(idNumber: string): Promise<PersonalInfoResponse> {
  const res = await fetch(
    `${API_BASE}/fia-resource/personal-info/${encodeURIComponent(idNumber)}`,
    {credentials: 'include'}
  )

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || 'Failed to fetch personal info')
  }

  const json = await res.json()
  return json.data
}

// buat URL photo dari backend (kalau rel path)
export function toServerFileUrl(relOrAbs: string) {
  const raw = (relOrAbs || '').trim()
  if (!raw) return ''
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw

  // base server = API_BASE tanpa /api
  const baseServer = API_BASE.replace(/\/api$/, '')
  return `${baseServer}/${raw.replace(/^\/+/, '')}`
}
