export type RosterNote = {
  id: number
  date: string // "YYYY-MM-DD"
  text: string
}

export type GetRosterMonthParams = {
  year: number
  month: number // 1-12
}

export type CreateRosterPayload = {
  date: string
  text: string
}

export type UpdateRosterPayload = {
  text: string
}

// internal (disimpan di storage) → ada soft delete
export type StoredRosterNote = RosterNote & {
  deleted_at?: string | null
}

// untuk response backend (kalau pakai API)
export type ApiResponse<T> = {
  message: string
  data: T
}
