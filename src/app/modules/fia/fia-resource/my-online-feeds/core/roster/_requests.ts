import {client} from '../../../../../../functions'
import type {
  ApiResponse,
  GetRosterMonthParams,
  CreateRosterPayload,
  UpdateRosterPayload,
  RosterNote,
} from './_models'

import {getRosterNotesByMonthHelper} from './_helpers'

// fallback GET hanya untuk kasus backend belum aktif / route belum ada / network down
const shouldFallbackToDummyGET = (err: any) => {
  // network error / no response
  if (!err?.response) return true

  const status = err.response.status
  // 404 route belum didaftarkan, 502/503/504 server down
  if ([404, 502, 503, 504].includes(status)) return true

  return false
}

/**
 * GET /api/fia-resource/roster?year=&month=
 * - AUTO fallback to dummy ONLY for GET
 */
export const getRosterNotesByMonth = async (
  params: GetRosterMonthParams,
  ownerKey: string = 'default'
): Promise<RosterNote[]> => {
  try {
    const response = await client().get<ApiResponse<RosterNote[]>>('/fia-resource/roster', {
      params: {year: params.year, month: params.month},
    })
    return response.data.data
  } catch (err: any) {
    if (shouldFallbackToDummyGET(err)) {
      return getRosterNotesByMonthHelper(params, ownerKey)
    }
    throw err
  }
}

/**
 * POST /api/fia-resource/roster
 * - NO fallback (biar tidak ada data nyangkut di dummy)
 */
export const postRosterNote = async (payload: CreateRosterPayload): Promise<RosterNote> => {
  const response = await client().post<ApiResponse<RosterNote>>('/fia-resource/roster', payload)
  return response.data.data
}

/**
 * PUT /api/fia-resource/roster/:id
 * - NO fallback
 */
export const putRosterNote = async (
  id: number | string,
  payload: UpdateRosterPayload
): Promise<RosterNote> => {
  const response = await client().put<ApiResponse<RosterNote>>(
    `/fia-resource/roster/${id}`,
    payload
  )
  return response.data.data
}

/**
 * DELETE /api/fia-resource/roster/:id
 * - NO fallback
 */
export const removeRosterNote = async (id: number | string): Promise<void> => {
  await client().delete(`/fia-resource/roster/${id}`)
}
