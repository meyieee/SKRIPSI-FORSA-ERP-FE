import { client } from '../../../../../../functions'
import { JobRequestForm } from './_models'

/**
 * Job Request API Request Functions
 * All API calls using axios client() for Job Request
 */

/**
 * GET /api/job-request/new
 * Get empty form structure for new job request
 */
export const getJobRequestNew = async (): Promise<JobRequestForm> => {
  const response = await client().get('/job-request/new')
  return response.data.data
}

/**
 * GET /api/job-request/:id
 * Get job request by ID
 */
export const getJobRequestById = async (id: string | number): Promise<JobRequestForm> => {
  const response = await client().get(`/job-request/${id}`)
  return response.data.data
}

/**
 * GET /api/job-request?branch_site=...&workorder_status=...
 * Get list of job requests with filters
 */
export const getJobRequestList = async (filters?: {
  branch_site?: string
  workorder_status?: string
  limit?: number
  offset?: number
}): Promise<{
  data: JobRequestForm[]
  pagination: {
    total: number
    limit: number
    offset: number
  }
}> => {
  const params = new URLSearchParams()
  if (filters?.branch_site) params.append('branch_site', filters.branch_site)
  if (filters?.workorder_status) params.append('workorder_status', filters.workorder_status)
  if (filters?.limit) params.append('limit', filters.limit.toString())
  if (filters?.offset) params.append('offset', filters.offset.toString())
  
  const queryString = params.toString()
  const url = queryString ? `/job-request?${queryString}` : '/job-request'
  
  const response = await client().get(url)
  return response.data
}

/**
 * POST /api/job-request
 * Create new job request
 */
export const postJobRequest = async (values: JobRequestForm): Promise<{
  message: string
  data: JobRequestForm
}> => {
  const response = await client().post('/job-request', values)
  return response.data
}

/**
 * PUT /api/job-request/:id
 * Update job request
 */
export const updateJobRequest = async (
  id: string | number,
  values: JobRequestForm
): Promise<{
  message: string
  data: JobRequestForm
}> => {
  const response = await client().put(`/job-request/${id}`, values)
  return response.data
}

/**
 * PUT /api/job-request/:id/status
 * Update workorder status
 */
export const updateJobRequestStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: JobRequestForm
}> => {
  const response = await client().put(`/job-request/${id}/status`, { workorder_status })
  return response.data
}

