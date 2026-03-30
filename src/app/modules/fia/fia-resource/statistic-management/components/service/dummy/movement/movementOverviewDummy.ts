export type MovementOverviewRow = {
  id: number
  departmentCode: string
  department: string
  workgroup: string
  opening: {staff: number; nonStaff: number; expat: number; total: number}
  hire: {staff: number; nonStaff: number; expat: number; total: number}
  left: {staff: number; nonStaff: number; expat: number; total: number}
  closing: {staff: number; nonStaff: number; expat: number; total: number}
  siteBranch: string
  section?: string
  element?: string
}

export const movementOverviewRows: MovementOverviewRow[] = [
  // Administration Department
  {
    id: 1,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    opening: {staff: 6, nonStaff: 3, expat: 0, total: 9},
    hire: {staff: 2, nonStaff: 0, expat: 0, total: 2},
    left: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    closing: {staff: 7, nonStaff: 3, expat: 0, total: 10},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  // Operation Department
  {
    id: 2,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    opening: {staff: 4, nonStaff: 1, expat: 0, total: 5},
    hire: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    left: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    closing: {staff: 4, nonStaff: 1, expat: 0, total: 5},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 3,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    opening: {staff: 2, nonStaff: 2, expat: 0, total: 4},
    hire: {staff: 0, nonStaff: 3, expat: 0, total: 3},
    left: {staff: 0, nonStaff: 2, expat: 0, total: 2},
    closing: {staff: 2, nonStaff: 3, expat: 0, total: 5},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 4,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '113-Operation Support Workgroup',
    opening: {staff: 1, nonStaff: 2, expat: 0, total: 3},
    hire: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    left: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    closing: {staff: 1, nonStaff: 2, expat: 0, total: 3},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  // Maintenance Department
  {
    id: 5,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    opening: {staff: 1, nonStaff: 2, expat: 2, total: 5},
    hire: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    left: {staff: 1, nonStaff: 1, expat: 0, total: 2},
    closing: {staff: 2, nonStaff: 2, expat: 0, total: 4},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 6,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    opening: {staff: 0, nonStaff: 2, expat: 1, total: 3},
    hire: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    left: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    closing: {staff: 0, nonStaff: 3, expat: 1, total: 4},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
]
