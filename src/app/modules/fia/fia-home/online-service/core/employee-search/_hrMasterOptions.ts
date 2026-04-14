import {client} from '../../../../../../functions/axiosClient'

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
      return []
    }

    const result = await response.json()
    const branches = result.data?.rows || result.data || []

    if (branches.length === 0) {
      return []
    }

    return branches.map(
      (branch: {
        com_code?: string
        id?: number | string
        com_name?: string
        name?: string
      }) => ({
        value: branch.com_code || branch.id?.toString() || '',
        label: `${branch.com_code || branch.id?.toString() || ''}${branch.com_name || branch.name ? ` - ${branch.com_name || branch.name}` : ''}`.trim(),
      })
    )
  } catch (error) {
    console.error('Error fetching branch/site options:', error)
    return []
  }
}

export async function fetchDepartmentOptions(): Promise<
  Array<{ value: string; label: string }>
> {
  try {
    const response = await client().get('/departments')
    const result = response.data
    const departments = result.data?.rows || result.data || []

    if (!Array.isArray(departments) || departments.length === 0) {
      return []
    }

    return departments
      .filter((dept: any) => dept.status !== false)
      .map((dept: any) => ({
        value: dept.dept_code || dept.id?.toString() || '',
        label: `${dept.dept_code || ''}${dept.dept_des ? ` - ${dept.dept_des}` : ''}`.trim(),
      }))
  } catch (error) {
    console.error('Error fetching department options:', error)
    return []
  }
}

export async function fetchSectionOptions(): Promise<
  Array<{ value: string; label: string; departmentCode: string }>
> {
  try {
    const response = await client().get('/sections')
    const result = response.data
    const sections = result.data?.rows || result.data || []

    if (!Array.isArray(sections) || sections.length === 0) {
      return []
    }

    return sections.map((section: any) => ({
      value: section.section_code || section.id?.toString() || '',
      label: `${section.section_code || ''}${section.section_description ? ` - ${section.section_description}` : ''}`.trim(),
      departmentCode: section.dept_code || '',
    }))
  } catch (error) {
    console.error('Error fetching section options:', error)
    return []
  }
}
