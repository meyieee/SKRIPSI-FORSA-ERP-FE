// src/app/modules/fia-resource/online-feeds/requests/core/requests.ts
import {client} from '../../../../../../functions/axiosClient' // sesuaikan path
import {
  RequestDetailPayload,
  RequestHistoryRow,
  RequestsRow,
} from '../../../my-online-feeds/components/requests/types'

const mapPriority = (p: any) => {
  const s = String(p ?? '').trim()
  if (s.startsWith('P#')) return s
  if (s === '1') return 'P#1'
  if (s === '2') return 'P#2'
  return 'P#3'
}

export const getMyRequests = async (): Promise<RequestsRow[]> => {
  const axios = client()

  const res = await axios.get('/fia-resource/requests')

  if (res.data?.data && Array.isArray(res.data.data)) {
    return res.data.data.map((x: any) => ({...x, priority: mapPriority(x.priority)}))
  }

  if (Array.isArray(res.data)) {
    return res.data.map((x: any) => ({...x, priority: mapPriority(x.priority)}))
  }

  return []
}

export const getMyRequestHistory = async (refDocNo: string): Promise<RequestHistoryRow[]> => {
  const axios = client()
  const res = await axios.get(`/fia-resource/requests/${encodeURIComponent(refDocNo)}/history`)

  if (res.data?.data && Array.isArray(res.data.data)) {
    return res.data.data
  }

  if (Array.isArray(res.data)) {
    return res.data
  }

  return []
}

export const getMyRequestDetail = async (refDocNo: string): Promise<RequestDetailPayload | null> => {
  const axios = client()
  const res = await axios.get(`/fia-resource/requests/${encodeURIComponent(refDocNo)}/detail`)

  if (res.data?.data) {
    return res.data.data
  }

  return null
}
