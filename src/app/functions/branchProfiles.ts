import {client} from './axiosClient'
import type {ComData} from '../types/comData'

export const getHoAndBranchProfiles = async (): Promise<ComData[]> => {
  const response = await client().get('/hoandbranchprofiles/')
  return response.data.data.rows
}
