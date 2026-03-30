import { client } from '../../../../../../functions'
import { FleetForm } from './_models'

/**
 * Fleet Request API Request Functions
 */

export const getFleetRequestNew = async (): Promise<FleetForm> => {
  const response = await client().get('/fleet-request/new')
  return response.data.data
}

export const getFleetRequestById = async (id: string | number): Promise<FleetForm> => {
  const response = await client().get(`/fleet-request/${id}`)
  return response.data.data
}

export const getFleetRequestList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<{
  data: FleetForm[]
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
  
  const queryString = params.toString()
  const url = queryString ? `/fleet-request?${queryString}` : '/fleet-request'
  
  const response = await client().get(url)
  return response.data
}

export const postFleetRequest = async (values: FleetForm): Promise<{
  message: string
  data: FleetForm
}> => {
  const response = await client().post('/fleet-request', values)
  return response.data
}

export const updateFleetRequest = async (
  id: string | number,
  values: FleetForm
): Promise<{
  message: string
  data: FleetForm
}> => {
  const response = await client().put(`/fleet-request/${id}`, values)
  return response.data
}

/**
 * POST /api/fleet-request/draft
 * Save fleet request as draft
 */
export const saveFleetRequestDraftAPI = async (values: FleetForm): Promise<{
  message: string
  data: FleetForm
}> => {
  const response = await client().post('/fleet-request/draft', values)
  return response.data
}

/**
 * GET /api/fleet-request/draft?request_by=...
 * Get fleet request draft by user
 */
export const getFleetRequestDraft = async (request_by: string): Promise<FleetForm> => {
  const response = await client().get(`/fleet-request/draft?request_by=${request_by}`)
  return response.data.data
}

/**
 * PUT /api/fleet-request/:id/status
 * Update workorder status
 */
export const updateFleetRequestStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: FleetForm
}> => {
  const response = await client().put(`/fleet-request/${id}/status`, { workorder_status })
  return response.data
}

