import { client } from '../../../../../../functions'
import { TrainingRequestForm } from './_models'

/**
 * Training Request API Request Functions
 */

export const getTrainingRequestNew = async (): Promise<TrainingRequestForm> => {
  const response = await client().get('/training-request/new')
  return response.data.data
}

export const getTrainingRequestById = async (id: string | number): Promise<TrainingRequestForm> => {
  const response = await client().get(`/training-request/${id}`)
  return response.data.data
}

export const getTrainingRequestList = async (filters?: {
  branch_site?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<{
  data: TrainingRequestForm[]
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
  const url = queryString ? `/training-request?${queryString}` : '/training-request'
  
  const response = await client().get(url)
  return response.data
}

export const postTrainingRequest = async (values: TrainingRequestForm): Promise<{
  message: string
  data: TrainingRequestForm
}> => {
  const response = await client().post('/training-request', values)
  return response.data
}

export const updateTrainingRequest = async (
  id: string | number,
  values: TrainingRequestForm
): Promise<{
  message: string
  data: TrainingRequestForm
}> => {
  const response = await client().put(`/training-request/${id}`, values)
  return response.data
}
