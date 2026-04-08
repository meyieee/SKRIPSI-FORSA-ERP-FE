/**
 * Branch/Site options aligned with HR master (`com_code` / `com_name` via hoandbranchprofiles).
 * Used by online-service forms for manual Branch|Site selection and shared with Request For auto-fill codes.
 */

export async function fetchHrBranchSiteOptions(): Promise<
  Array<{ value: string; label: string }>
> {
  try {
    const response = await fetch('/api/hoandbranchprofiles', {
      credentials: 'include',
    })

    if (!response.ok) {
      console.error('Failed to fetch branch/site options:', response.statusText)
      return getDummyBranchSiteOptions()
    }

    const result = await response.json()
    const branches = result.data?.rows || result.data || []

    if (branches.length === 0) {
      return getDummyBranchSiteOptions()
    }

    return branches.map(
      (branch: {
        com_code?: string
        id?: number | string
        com_name?: string
        name?: string
      }) => ({
        value: branch.com_code || branch.id?.toString() || '',
        label: branch.com_name || branch.name || 'Unknown Branch',
      })
    )
  } catch (error) {
    console.error('Error fetching branch/site options:', error)
    return getDummyBranchSiteOptions()
  }
}

export function getDummyBranchSiteOptions(): Array<{ value: string; label: string }> {
  return [
    { value: 'HO-001', label: 'Head Office - Jakarta' },
    { value: 'BR-001', label: 'Branch - Surabaya' },
    { value: 'BR-002', label: 'Branch - Bandung' },
    { value: 'BR-003', label: 'Branch - Medan' },
    { value: 'ST-001', label: 'Site - Plant A' },
    { value: 'ST-002', label: 'Site - Plant B' },
  ]
}
