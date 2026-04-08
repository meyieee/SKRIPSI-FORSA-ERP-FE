import { client } from '../../../../../../functions'
import { WorkforceRequestForm } from './_models'

/**
 * Workforce Request API Request Functions
 */

export const getWorkforceRequestNew = async (): Promise<WorkforceRequestForm> => {
  const response = await client().get('/workforce-request/new')
  return response.data.data
}

export const getWorkforceRequestById = async (id: string | number): Promise<WorkforceRequestForm> => {
  const response = await client().get(`/workforce-request/${id}`)
  return response.data.data
}

export const getWorkforceRequestList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<{
  data: WorkforceRequestForm[]
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
  const url = queryString ? `/workforce-request?${queryString}` : '/workforce-request'
  
  const response = await client().get(url)
  return response.data
}

export const postWorkforceRequest = async (values: WorkforceRequestForm): Promise<{
  message: string
  data: WorkforceRequestForm
}> => {
  const response = await client().post('/workforce-request', values)
  return response.data
}

export const updateWorkforceRequest = async (
  id: string | number,
  values: WorkforceRequestForm
): Promise<{
  message: string
  data: WorkforceRequestForm
}> => {
  const response = await client().put(`/workforce-request/${id}`, values)
  return response.data
}

/**
 * PUT /api/workforce-request/:id/status
 * Update workorder status
 */
export const updateWorkforceRequestStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: WorkforceRequestForm
}> => {
  const response = await client().put(`/workforce-request/${id}/status`, { workorder_status })
  return response.data
}