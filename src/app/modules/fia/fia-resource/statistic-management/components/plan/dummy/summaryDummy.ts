export type PlanSummaryRow = {
  id: number
  departmentCode: string
  department: string
  workgroup: string
  jobTitle: string
  level: string | number
  current: {staff: number; nonStaff: number; expat: number; total: number}
  additional: {staff: number; nonStaff: number; expat: number; total: number}
  requirement: {staff: number; nonStaff: number; expat: number; total: number}
  siteBranch: string
  section?: string
  element?: string
}

export const planSummaryRows: PlanSummaryRow[] = [
  // 1001 Administration Department
  {
    id: 1,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    jobTitle: 'Director',
    level: 6,
    current: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    additional: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    requirement: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 2,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    jobTitle: 'Manager',
    level: 5,
    current: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    additional: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    requirement: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 3,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    jobTitle: 'General Superintendent',
    level: 4,
    current: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    additional: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
    section: 'Admin General',
    requirement: {staff: 1, nonStaff: 0, expat: 0, total: 1},
  },
  {
    id: 4,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    jobTitle: 'Supervisor',
    level: 'A',
    current: {staff: 0, nonStaff: 0, expat: 1, total: 1},
    additional: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    requirement: {staff: 0, nonStaff: 0, expat: 1, total: 1},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 5,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    jobTitle: 'Non Staff Level 1',
    level: 'A1',
    current: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    additional: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    requirement: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
]
