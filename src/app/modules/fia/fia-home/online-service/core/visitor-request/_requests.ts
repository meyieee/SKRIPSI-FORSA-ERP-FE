import { client } from '../../../../../../functions'
import { VisitorRequestForm } from './_models'

/**
 * Visitor Request API Request Functions
 */

export const getVisitorRequestNew = async (): Promise<VisitorRequestForm> => {
  const response = await client().get('/visitor-request/new')
  return response.data.data
}

export const getVisitorRequestById = async (id: string | number): Promise<VisitorRequestForm> => {
  const response = await client().get(`/visitor-request/${id}`)
  return response.data.data
}

export const getVisitorRequestList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
  include_draft?: string
}): Promise<{
  data: VisitorRequestForm[]
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
  const url = queryString ? `/visitor-request?${queryString}` : '/visitor-request'
  
  const response = await client().get(url)
  return response.data
}

export const postVisitorRequest = async (values: VisitorRequestForm): Promise<{
  message: string
  data: VisitorRequestForm
}> => {
  const response = await client().post('/visitor-request', values)
  return response.data
}

export const updateVisitorRequest = async (
  id: string | number,
  values: VisitorRequestForm
): Promise<{
  message: string
  data: VisitorRequestForm
}> => {
  const response = await client().put(`/visitor-request/${id}`, values)
  return response.data
}

/**
 * PUT /api/visitor-request/:id/status
 * Update workorder status
 */
export const updateVisitorRequestStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: VisitorRequestForm
}> => {
  const response = await client().put(`/visitor-request/${id}/status`, { workorder_status })
  return response.data
}