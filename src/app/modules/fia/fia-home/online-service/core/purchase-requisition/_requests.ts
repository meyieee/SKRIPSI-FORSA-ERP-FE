import { client } from '../../../../../../functions'
import { PurchaseRequisitionForm } from './_models'

/**
 * Purchase Requisition API Request Functions
 */

export const getPurchaseRequisitionNew = async (): Promise<PurchaseRequisitionForm> => {
  const response = await client().get('/purchase-requisition/new')
  return response.data.data
}

export const getPurchaseRequisitionById = async (id: string | number): Promise<PurchaseRequisitionForm> => {
  const response = await client().get(`/purchase-requisition/${id}`)
  return response.data.data
}

export const getPurchaseRequisitionList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
  include_draft?: string
}): Promise<{
  data: PurchaseRequisitionForm[]
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
  const url = queryString ? `/purchase-requisition?${queryString}` : '/purchase-requisition'
  
  const response = await client().get(url)
  return response.data
}

export const postPurchaseRequisition = async (values: PurchaseRequisitionForm): Promise<{
  message: string
  data: PurchaseRequisitionForm
}> => {
  const response = await client().post('/purchase-requisition', values)
  return response.data
}

export const updatePurchaseRequisition = async (
  id: string | number,
  values: PurchaseRequisitionForm
): Promise<{
  message: string
  data: PurchaseRequisitionForm
}> => {
  const response = await client().put(`/purchase-requisition/${id}`, values)
  return response.data
}

/**
 * PUT /api/purchase-requisition/:id/status
 * Update workorder status
 */
export const updatePurchaseRequisitionStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: PurchaseRequisitionForm
}> => {
  const response = await client().put(`/purchase-requisition/${id}/status`, { workorder_status })
  return response.data
}