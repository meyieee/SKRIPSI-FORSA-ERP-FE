import { client } from '../../../../../../functions'
import { TravelRequestForm } from './_models'

/**
 * Travel Request API Request Functions
 * All API calls using axios client() for Travel Request
 */

/**
 * GET /api/travel-request/new
 * Get empty form structure for new travel request
 */
export const getTravelRequestNew = async (): Promise<TravelRequestForm> => {
  const response = await client().get('/travel-request/new')
  return response.data.data
}

/**
 * GET /api/travel-request/:id
 * Get travel request by ID
 */
export const getTravelRequestById = async (id: string | number): Promise<TravelRequestForm> => {
  const response = await client().get(`/travel-request/${id}`)
  return response.data.data
}

/**
 * GET /api/travel-request
 * Get list of travel requests with filters
 */
export const getTravelRequestList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<{
  data: TravelRequestForm[]
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
  const url = queryString ? `/travel-request?${queryString}` : '/travel-request'
  
  const response = await client().get(url)
  return response.data
}

/**
 * POST /api/travel-request
 * Create new travel request
 */
export const postTravelRequest = async (values: TravelRequestForm): Promise<{
  message: string
  data: TravelRequestForm
}> => {
  const response = await client().post('/travel-request', values)
  return response.data
}

/**
 * PUT /api/travel-request/:id
 * Update travel request
 */
export const updateTravelRequest = async (
  id: string | number,
  values: TravelRequestForm
): Promise<{
  message: string
  data: TravelRequestForm
}> => {
  const response = await client().put(`/travel-request/${id}`, values)
  return response.data
}

export const updateTravelRequestStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: TravelRequestForm
}> => {
  const response = await client().put(`/travel-request/${id}/status`, { workorder_status })
  return response.data
}

