import { client } from '../../../../../../functions'
import { AssetRequestForm } from './_models'

/**
 * Asset Request API Request Functions
 */

export const getAssetRequestNew = async (): Promise<AssetRequestForm> => {
  const response = await client().get('/asset-request/new')
  return response.data.data
}

export const getAssetRequestById = async (id: string | number): Promise<AssetRequestForm> => {
  const response = await client().get(`/asset-request/${id}`)
  return response.data.data
}

export const getAssetRequestList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
  include_draft?: string
}): Promise<{
  data: AssetRequestForm[]
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
  const url = queryString ? `/asset-request?${queryString}` : '/asset-request'
  
  const response = await client().get(url)
  return response.data
}

export const postAssetRequest = async (values: AssetRequestForm): Promise<{
  message: string
  data: AssetRequestForm
}> => {
  const response = await client().post('/asset-request', values)
  return response.data
}

export const updateAssetRequest = async (
  id: string | number,
  values: AssetRequestForm
): Promise<{
  message: string
  data: AssetRequestForm
}> => {
  const response = await client().put(`/asset-request/${id}`, values)
  return response.data
}


/**
 * GET /api/asset-request/draft?request_by=...
 * Get Asset Request Draft by user
 */
export const getAssetRequestDraft = async (request_by: string): Promise<AssetRequestForm> => {
  const response = await client().get(`/asset-request/draft?request_by=${request_by}`)
  return response.data.data
}

/**
 * PUT /api/asset-request/:id/status
 * Update workorder status
 */
export const updateAssetRequestStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: AssetRequestForm
}> => {
  const response = await client().put(`/asset-request/${id}/status`, { workorder_status })
  return response.data
}