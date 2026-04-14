import { useEffect, useRef, useState } from 'react'
import { getOnlineServiceEmployeeOrg } from '../../../../core/employee-search/_requests'

export type RequestForOrgSync = {
  orgLoading: boolean
  orgError: string | null
  /** True when Request For is set and org is loading or successfully loaded (read-only UI). */
  orgReadOnly: boolean
  displayBranchSite: string
  displayDepartment: string
}

function formatCodeName(code: string, name: string) {
  const c = (code || '').trim()
  const n = (name || '').trim()
  if (c && n) return `${c} - ${n}`
  return c || n || ''
}

function parseError(e: unknown): string {
  if (typeof e === 'object' && e !== null && 'response' in e) {
    const msg = (e as { response?: { data?: { message?: string } } }).response?.data?.message
    if (msg) return String(msg)
  }
  if (e instanceof Error) return e.message
  return 'Could not load organization data'
}

/**
 * When Request For is set: fetch HR org (branch / department) and keep fields in sync.
 * When cleared after a selection: clears org fields. Initial load with empty Request For does not wipe branch/department.
 */
export function useRequestForOrganizationSync(
  requestFor: string | undefined,
  setFieldValue: (field: string, value: unknown) => void,
  prefix = 'requestInfo.'
): RequestForOrgSync {
  const [orgLoading, setOrgLoading] = useState(false)
  const [orgError, setOrgError] = useState<string | null>(null)
  const [labels, setLabels] = useState<{
    branchSite: string
    department: string
  } | null>(null)

  const prevRequestForRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    const id = (requestFor || '').trim()
    const prev = prevRequestForRef.current
    prevRequestForRef.current = requestFor

    const branchKey = `${prefix}branchSite`
    const deptKey = `${prefix}department`

    if (!id) {
      setOrgLoading(false)
      setOrgError(null)
      setLabels(null)
      const hadRequestFor =
        prev !== undefined && String(prev || '').trim() !== ''
      if (hadRequestFor) {
        setFieldValue(branchKey, '')
        setFieldValue(deptKey, '')
      }
      return
    }

    let cancelled = false
    setOrgLoading(true)
    setOrgError(null)
    setLabels({
      branchSite: 'Loading...',
      department: 'Loading...',
    })

    getOnlineServiceEmployeeOrg(id)
      .then((org) => {
        if (cancelled) return
        setFieldValue(branchKey, org.branch_code)
        setFieldValue(deptKey, org.dept_code)
        setLabels({
          branchSite: formatCodeName(org.branch_code, org.branch_name),
          department: formatCodeName(org.dept_code, org.dept_name),
        })
        setOrgLoading(false)
      })
      .catch((e: unknown) => {
        if (cancelled) return
        setOrgError(parseError(e))
        setFieldValue(branchKey, '')
        setFieldValue(deptKey, '')
        setLabels(null)
        setOrgLoading(false)
        console.error('getOnlineServiceEmployeeOrg', e)
      })

    return () => {
      cancelled = true
    }
  }, [requestFor, prefix, setFieldValue])

  const rf = (requestFor || '').trim()
  const orgReadOnly =
    rf !== '' && (orgLoading || (orgError === null && labels !== null))

  return {
    orgLoading,
    orgError,
    orgReadOnly,
    displayBranchSite: labels?.branchSite ?? '',
    displayDepartment: labels?.department ?? '',
  }
}
