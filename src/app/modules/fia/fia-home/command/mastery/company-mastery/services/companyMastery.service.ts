import {Company} from '../core/types'
import {MOCK_COMPANIES} from '../data/mock'

export async function fetchCompanies(): Promise<Company[]> {
  // Swap to real API later, keep signature stable
  return Promise.resolve(MOCK_COMPANIES)
}



