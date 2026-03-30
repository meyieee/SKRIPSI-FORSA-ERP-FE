export type ManpowerOverviewRow = {
  id: string
  department: string
  staff: number
  nonStaff: number
  expat: number
  totalType: number
  local: number
  national: number
  expatClass: number
  totalClass: number
  siteBranch: string
  section?: string
  element?: string
}

export const manpowerOverviewRows: ManpowerOverviewRow[] = [
  {
    id: '1001',
    department: 'Administration Department',
    staff: 2,
    nonStaff: 0,
    expat: 0,
    totalType: 2,
    local: 1,
    national: 1,
    expatClass: 0,
    totalClass: 2,
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: '1101',
    department: 'Operation Department',
    staff: 1,
    nonStaff: 0,
    expat: 3,
    totalType: 4,
    local: 1,
    national: 0,
    expatClass: 3,
    totalClass: 4,
    siteBranch: 'Head Site A',
    section: 'Operation',
  },
  {
    id: '1201',
    department: 'Maintenance Department',
    staff: 0,
    nonStaff: 0,
    expat: 3,
    totalType: 3,
    local: 0,
    national: 0,
    expatClass: 3,
    totalClass: 3,
    siteBranch: 'Head Site A',
    section: 'Maintenance',
  },
  {
    id: '2101',
    department: 'HR Admin Department',
    staff: 1,
    nonStaff: 0,
    expat: 0,
    totalType: 1,
    local: 1,
    national: 0,
    expatClass: 0,
    totalClass: 1,
    siteBranch: 'Head Site A',
    section: 'HR Admin',
  },
  {
    id: '2302',
    department: 'EHS Department',
    staff: 1,
    nonStaff: 0,
    expat: 0,
    totalType: 1,
    local: 1,
    national: 0,
    expatClass: 0,
    totalClass: 1,
    siteBranch: 'Head Site A',
    section: 'Safety',
  },
  {
    id: '3101',
    department: 'SCM Procurement Department',
    staff: 2,
    nonStaff: 0,
    expat: 0,
    totalType: 2,
    local: 1,
    national: 1,
    expatClass: 0,
    totalClass: 2,
    siteBranch: 'Head Site A',
    section: 'Procurement',
  },
  {
    id: '3301',
    department: 'SCM Warehouse Department',
    staff: 1,
    nonStaff: 0,
    expat: 0,
    totalType: 1,
    local: 0,
    national: 1,
    expatClass: 0,
    totalClass: 1,
    siteBranch: 'Head Site A',
    section: 'Warehouse',
  },
  {
    id: '4101',
    department: 'FA Finance Department',
    staff: 2,
    nonStaff: 0,
    expat: 0,
    totalType: 2,
    local: 1,
    national: 1,
    expatClass: 0,
    totalClass: 2,
    siteBranch: 'Head Site A',
    section: 'Finance',
  },
]
