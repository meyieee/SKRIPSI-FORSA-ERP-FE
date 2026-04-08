import { client } from '../../../../../../functions'
import type { OnlineServiceEmployeeOrg, OnlineServiceEmployeeSearchItem } from './_types'

/**
 * GET /api/online-service/employees/search?q=
 * Active employees from tbl_emp_regs (online-service Request For typeahead).
 * Empty q: first 50 Active rows, current session user first (BE ordering).
 */
export async function searchOnlineServiceEmployees(
  q: string
): Promise<OnlineServiceEmployeeSearchItem[]> {
  const trimmed = (q || '').replace(/\s+/g, ' ').trim()

  const response = await client().get('/online-service/employees/search', {
    params: trimmed ? { q: trimmed } : {},
  })

  const data = response.data?.data
  return Array.isArray(data) ? data : []
}

/**
 * GET /online-service/employees/:idNumber/org
 * Branch / department / cost center for Request For auto-fill.
 */
export async function getOnlineServiceEmployeeOrg(
  idNumber: string
): Promise<OnlineServiceEmployeeOrg> {
  const id = encodeURIComponent((idNumber || '').trim())
  const response = await client().get(`/online-service/employees/${id}/org`)
  const data = response.data?.data
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid org response')
  }
  return data as OnlineServiceEmployeeOrg
}

export type { OnlineServiceEmployeeOrg, OnlineServiceEmployeeSearchItem }
