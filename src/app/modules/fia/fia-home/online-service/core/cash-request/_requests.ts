import { client } from '../../../../../../functions'
import { CashRequestForm } from './_models'

/**
 * Cash Request API Request Functions
 */

export const getCashRequestNew = async (): Promise<CashRequestForm> => {
  const response = await client().get('/cash-request/new')
  return response.data.data
}

export const getCashRequestById = async (id: string | number): Promise<CashRequestForm> => {
  const response = await client().get(`/cash-request/${id}`)
  return response.data.data
}

export const getCashRequestList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<{
  data: CashRequestForm[]
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
  const url = queryString ? `/cash-request?${queryString}` : '/cash-request'
  
  const response = await client().get(url)
  return response.data
}

export const postCashRequest = async (values: CashRequestForm): Promise<{
  message: string
  data: CashRequestForm
}> => {
  const response = await client().post('/cash-request', values)
  return response.data
}

export const updateCashRequest = async (
  id: string | number,
  values: CashRequestForm
): Promise<{
  message: string
  data: CashRequestForm
}> => {
  const response = await client().put(`/cash-request/${id}`, values)
  return response.data
}

/**
 * PUT /api/cash-request/:id/status
 * Update workorder status
 */
export const updateCashRequestStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: CashRequestForm
}> => {
  const response = await client().put(`/cash-request/${id}/status`, { workorder_status })
  return response.data
}

