import { client } from '../../../../../../functions'
import { AccommodationRequestForm } from './_models'

/**
 * Accommodation Request API Request Functions
 * All API calls using axios client() for Accommodation Request
 */

/**
 * GET /api/accommodation-request/new
 * Get empty form structure for new accommodation request
 */
export const getAccommodationRequestNew = async (): Promise<AccommodationRequestForm> => {
  const response = await client().get('/accommodation-request/new')
  return response.data.data
}

/**
 * GET /api/accommodation-request/:id
 * Get accommodation request by ID
 */
export const getAccommodationRequestById = async (id: string | number): Promise<AccommodationRequestForm> => {
  const response = await client().get(`/accommodation-request/${id}`)
  return response.data.data
}

/**
 * GET /api/accommodation-request?branch_site=...&status=...
 * Get list of accommodation requests with filters
 * Uses query parameters like job-request
 */
export const getAccommodationRequestList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<{
  data: AccommodationRequestForm[]
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
  const url = queryString ? `/accommodation-request?${queryString}` : '/accommodation-request'
  
  const response = await client().get(url)
  return response.data
}

/**
 * POST /api/accommodation-request
 * Create new accommodation request
 */
export const postAccommodationRequest = async (values: AccommodationRequestForm): Promise<{
  message: string
  data: AccommodationRequestForm
}> => {
  const response = await client().post('/accommodation-request', values)
  return response.data
}

/**
 * PUT /api/accommodation-request/:id
 * Update accommodation request
 */
export const updateAccommodationRequest = async (
  id: string | number,
  values: AccommodationRequestForm
): Promise<{
  message: string
  data: AccommodationRequestForm
}> => {
  const response = await client().put(`/accommodation-request/${id}`, values)
  return response.data
}

/**
 * PUT /api/accommodation-request/:id/status
 * Update workorder status
 */
export const updateAccommodationRequestStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: AccommodationRequestForm
}> => {
  const response = await client().put(`/accommodation-request/${id}/status`, { workorder_status })
  return response.data
}