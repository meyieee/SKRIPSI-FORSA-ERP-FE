import { client } from '../../../../../../functions/axiosClient'
import { mockOnlineRequests } from '../data/mock'
import {
  normalizeOnlineRequest,
  OnlineRequest,
  OnlineRequestDetailPayload,
  OnlineRequestListQuery,
} from '../components/online-request/types'

const listEndpoints = [
  '/fia-home/command/feeds/online-request',
  '/fia-resource/requests/global',
  '/fia-resource/requests',
]

const mapListItem = (item: any, index: number): OnlineRequest =>
  normalizeOnlineRequest({
    id: item?.id ?? item?.uuid ?? String(index + 1),
    no: item?.no ?? item?.seq ?? index + 1,
    refDocNo: item?.refDocNo ?? item?.ref_doc_no ?? item?.doc_no ?? '',
    description: item?.description ?? item?.title ?? '',
    transType: item?.transType ?? item?.trans_type ?? '',
    requestor: item?.requestor ?? item?.requestor_name ?? item?.request_by ?? '',
    priority: item?.priority,
    requestDate: item?.requestDate ?? item?.request_date ?? item?.created_at ?? '',
    requestDateIso: item?.requestDateIso ?? item?.request_date_iso ?? '',
    expired: item?.expired ?? item?.due_in ?? '',
    status: item?.status,
    site: item?.site ?? item?.site_branch ?? item?.siteBranch ?? '',
    department: item?.department ?? item?.dept ?? '',
    section: item?.section ?? '',
    element: item?.element ?? '',
  })

const extractArray = (payload: any): any[] => {
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload)) return payload
  return []
}

const extractObject = (payload: any): Record<string, unknown> | null => {
  if (payload?.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
    return payload.data
  }
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    return payload
  }
  return null
}

const toParams = (query?: OnlineRequestListQuery) => {
  if (!query) return undefined
  const params: Record<string, string> = {}
  if (query.site) params.site = query.site
  if (query.department) params.department = query.department
  if (query.section) params.section = query.section
  if (query.element) params.element = query.element
  if (query.date) params.date = query.date
  return Object.keys(params).length > 0 ? params : undefined
}

export const getOnlineRequests = async (query?: OnlineRequestListQuery): Promise<OnlineRequest[]> => {
  const axios = client()

  for (const endpoint of listEndpoints) {
    try {
      const res = await axios.get(endpoint, { params: toParams(query) })
      const rows = extractArray(res.data).map((item, index) => mapListItem(item, index))
      if (rows.length > 0) {
        return rows
      }
    } catch (error) {
      // continue to fallback endpoint
    }
  }

  return mockOnlineRequests.map((row) => normalizeOnlineRequest(row))
}

export const getOnlineRequestDetail = async (refDocNo: string): Promise<OnlineRequestDetailPayload | null> => {
  const axios = client()
  const encoded = encodeURIComponent(refDocNo)
  const detailEndpoints = [
    `/fia-home/command/feeds/online-request/${encoded}/detail`,
    `/fia-resource/requests/${encoded}/detail`,
  ]

  for (const endpoint of detailEndpoints) {
    try {
      const res = await axios.get(endpoint)
      const detail = extractObject(res.data)
      if (detail) {
        return detail as OnlineRequestDetailPayload
      }
    } catch (error) {
      // continue to fallback endpoint
    }
  }

  const fallback = mockOnlineRequests.find((row) => row.refDocNo === refDocNo)
  return fallback ? { ...fallback } : null
}
