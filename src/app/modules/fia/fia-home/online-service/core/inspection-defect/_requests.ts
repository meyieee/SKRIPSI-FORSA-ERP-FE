import { client } from '../../../../../../functions'
import { InspectionDefectForm } from './_models'

/**
 * Inspection Defect API Request Functions
 */

export const getInspectionDefectNew = async (): Promise<InspectionDefectForm> => {
  const response = await client().get('/inspection-defect/new')
  return response.data.data
}

export const getInspectionDefectById = async (id: string | number): Promise<InspectionDefectForm> => {
  const response = await client().get(`/inspection-defect/${id}`)
  return response.data.data
}

export const getInspectionDefectList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<{
  data: InspectionDefectForm[]
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
  const url = queryString ? `/inspection-defect?${queryString}` : '/inspection-defect'
  
  const response = await client().get(url)
  return response.data
}

export const postInspectionDefect = async (values: InspectionDefectForm): Promise<{
  message: string
  data: InspectionDefectForm
}> => {
  const response = await client().post('/inspection-defect', values)
  return response.data
}

export const updateInspectionDefect = async (
  id: string | number,
  values: InspectionDefectForm
): Promise<{
  message: string
  data: InspectionDefectForm
}> => {
  const response = await client().put(`/inspection-defect/${id}`, values)
  return response.data
}

/**
 * PUT /api/inspection-defect/:id/status
 * Update workorder status
 */
export const updateInspectionDefectStatus = async (
  id: string | number,
  workorder_status: string
): Promise<{
  message: string
  data: InspectionDefectForm
}> => {
  const response = await client().put(`/inspection-defect/${id}/status`, { workorder_status })
  return response.data
}