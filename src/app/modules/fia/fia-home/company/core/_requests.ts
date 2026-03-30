import { client } from '../../../../../functions'
import { Company, Department, BusinessUnit, CostCenter, Location } from './_models'

/**
 * Company Module - API Request Functions
 * All API calls using axios client() for Company
 */

/**
 * GET /api/company
 * Get list of companies with optional filters
 */
export const getCompanies = async (filters?: {
  type?: string
  status?: string
  search?: string
  limit?: number
  offset?: number
}): Promise<{
  data: Company[]
  pagination: {
    total: number
    limit: number
    offset: number
  }
}> => {
  const params = new URLSearchParams()
  if (filters?.type) params.append('type', filters.type)
  if (filters?.status) params.append('status', filters.status)
  if (filters?.search) params.append('search', filters.search)
  if (filters?.limit) params.append('limit', filters.limit.toString())
  if (filters?.offset) params.append('offset', filters.offset.toString())
  
  const queryString = params.toString()
  const url = queryString ? `/company?${queryString}` : '/company'
  
  const response = await client().get(url)
  return response.data
}

/**
 * GET /api/company/:id
 * Get company details by ID
 */
export const getCompanyById = async (id: string | number): Promise<Company> => {
  const response = await client().get(`/company/${id}`)
  return response.data.data
}

/**
 * POST /api/company
 * Create new company
 */
export const postCompany = async (values: Company): Promise<{
  message: string
  data: Company
}> => {
  const response = await client().post('/company', values)
  return response.data
}

/**
 * PUT /api/company/:id
 * Update company
 */
export const updateCompany = async (
  id: string | number,
  values: Partial<Company>
): Promise<{
  message: string
  data: Company
}> => {
  const response = await client().put(`/company/${id}`, values)
  return response.data
}

/**
 * DELETE /api/company/:id
 * Delete company
 */
export const deleteCompany = async (id: string | number): Promise<{
  message: string
}> => {
  const response = await client().delete(`/company/${id}`)
  return response.data
}

/**
 * GET /api/company/:id/departments
 * Get departments for a company
 */
export const getCompanyDepartments = async (id: string | number): Promise<Department[]> => {
  const response = await client().get(`/company/${id}/departments`)
  return response.data.data
}

/**
 * GET /api/company/:id/business-units
 * Get business units for a company
 */
export const getCompanyBusinessUnits = async (id: string | number): Promise<BusinessUnit[]> => {
  const response = await client().get(`/company/${id}/business-units`)
  return response.data.data
}

/**
 * GET /api/company/:id/cost-centers
 * Get cost centers for a company
 */
export const getCompanyCostCenters = async (id: string | number): Promise<CostCenter[]> => {
  const response = await client().get(`/company/${id}/cost-centers`)
  return response.data.data
}

/**
 * GET /api/company/:id/locations
 * Get locations for a company
 */
export const getCompanyLocations = async (id: string | number): Promise<Location[]> => {
  const response = await client().get(`/company/${id}/locations`)
  return response.data.data
}

/**
 * GET /api/departments
 * Get all departments
 */
export const getDepartments = async (): Promise<Department[]> => {
  const response = await client().get('/departments')
  return response.data.data
}

/**
 * GET /api/business-units
 * Get all business units
 */
export const getBusinessUnits = async (): Promise<BusinessUnit[]> => {
  const response = await client().get('/business-units')
  return response.data.data
}

/**
 * GET /api/cost-centers
 * Get all cost centers
 */
export const getCostCenters = async (): Promise<CostCenter[]> => {
  const response = await client().get('/cost-centers')
  return response.data.data
}

/**
 * GET /api/locations
 * Get all locations
 */
export const getLocations = async (): Promise<Location[]> => {
  const response = await client().get('/locations')
  return response.data.data
}

