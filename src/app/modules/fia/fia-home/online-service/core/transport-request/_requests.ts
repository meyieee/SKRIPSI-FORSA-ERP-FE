import { client } from '../../../../../../functions'
import { TransportRequestForm } from './_models'

/**
 * Transport Request API Request Functions
 * All API calls using axios client() for Transport Request
 */

/**
 * GET /api/transport-request/new
 * Get empty form structure for new transport request
 */
export const getTransportRequestNew = async (): Promise<TransportRequestForm> => {
  const response = await client().get('/transport-request/new')
  return response.data.data
}

/**
 * GET /api/transport-request/:id
 * Get transport request by ID
 */
export const getTransportRequestById = async (id: string | number): Promise<TransportRequestForm> => {
  const response = await client().get(`/transport-request/${id}`)
  return response.data.data
}

/**
 * GET /api/transport-request?branch_site=...&status=...
 * Get list of transport requests with filters
 * Uses query parameters like accommodation-request
 */
export const getTransportRequestList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
  include_draft?: string
}): Promise<{
  data: TransportRequestForm[]
  pagination: {
    total: number
    limit: number
    offset: number
  }
}> => {
  const params = new URLSearchParams()
  if (filters?.branch_site) params.append('branch_site', filters.branch_site)
  if (filters?.status) params.append('status', filters.status)
  if (filters?.limit) params.append('limit', filters.limit.toString())
  if (filters?.offset) params.append('offset', filters.offset.toString())
  if (filters?.include_draft) params.append('include_draft', filters.include_draft)
  
  const queryString = params.toString()
  const url = queryString ? `/transport-request?${queryString}` : '/transport-request'
  
  const response = await client().get(url)
  return response.data
}

/**
 * POST /api/transport-request
 * Create new transport request
 */
export const postTransportRequest = async (values: TransportRequestForm): Promise<{
  message: string
  data: TransportRequestForm
}> => {
  const response = await client().post('/transport-request', values)
  return response.data
}

/**
 * PUT /api/transport-request/:id
 * Update transport request
 */
export const updateTransportRequest = async (
  id: string | number,
  values: TransportRequestForm
): Promise<{
  message: string
  data: TransportRequestForm
}> => {
  const response = await client().put(`/transport-request/${id}`, values)
  return response.data
}

/**
 * POST /api/transport-request/draft
 * Save Transport Request as Draft
 */
export const saveTransportRequestDraftAPI = async (values: TransportRequestForm): Promise<{
  message: string
  data: TransportRequestForm
}> => {
  const response = await client().post('/transport-request/draft', values)
  return response.data
}

/**
 * GET /api/transport-request/draft?request_by=...
 * Get Transport Request Draft by user
 */
export const getTransportRequestDraft = async (request_by: string): Promise<TransportRequestForm> => {
  const response = await client().get(`/transport-request/draft?request_by=${request_by}`)
  return response.data.data
}

/**
 * PUT /api/transport-request/:id/status
 * Update workorder status
 */
export const updateTransportRequestStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: TransportRequestForm
}> => {
  const response = await client().put(`/transport-request/${id}/status`, { workorder_status })
  return response.data
}