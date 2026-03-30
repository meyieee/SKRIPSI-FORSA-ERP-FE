export type PlanOverviewRow = {
  id: number
  departmentCode: string
  department: string
  workgroup: string
  current: {staff: number; nonStaff: number; expat: number; total: number}
  additional: {staff: number; nonStaff: number; expat: number; total: number}
  requirement: {staff: number; nonStaff: number; expat: number; total: number}
  siteBranch: string
  section?: string
  element?: string
}

export const planOverviewRows: PlanOverviewRow[] = [
  // Administration Department
  {
    id: 1,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    current: {staff: 6, nonStaff: 3, expat: 0, total: 9},
    additional: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    requirement: {staff: 7, nonStaff: 3, expat: 0, total: 10},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  // Operation Department
  {
    id: 2,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    current: {staff: 4, nonStaff: 1, expat: 0, total: 5},
    additional: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    requirement: {staff: 1, nonStaff: 4, expat: 1, total: 6},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 3,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    current: {staff: 2, nonStaff: 2, expat: 0, total: 4},
    additional: {staff: 0, nonStaff: 0, expat: 1, total: 1},
    requirement: {staff: 1, nonStaff: 3, expat: 2, total: 5},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 4,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '113-Operation Support Workgroup',
    current: {staff: 1, nonStaff: 2, expat: 0, total: 3},
    additional: {staff: 0, nonStaff: 0, expat: 1, total: 1},
    requirement: {staff: 1, nonStaff: 2, expat: 1, total: 4},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  // Maintenance Department
  {
    id: 5,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    current: {staff: 1, nonStaff: 2, expat: 2, total: 5},
    additional: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    requirement: {staff: 2, nonStaff: 2, expat: 2, total: 6},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 6,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    current: {staff: 0, nonStaff: 2, expat: 1, total: 3},
    additional: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    requirement: {staff: 0, nonStaff: 3, expat: 1, total: 4},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
]
