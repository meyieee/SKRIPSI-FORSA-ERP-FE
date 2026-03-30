// ===================== Dummy: Manpower Development Overview =====================
export type DevCounts = {staff: number; nonStaff: number; expat: number; total: number}

export type DevelopmentOverviewRow = {
  id: number
  departmentCode: string
  department: string
  workgroup: string

  appraisal: DevCounts // Appraisal Completed
  training: DevCounts // Training Conduct

  siteBranch: string
  section?: string
  element?: string
}

export const developmentOverviewRows: DevelopmentOverviewRow[] = [
  // ==== 1001 – Administration Department ====
  {
    id: 1,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    appraisal: {staff: 2, nonStaff: 1, expat: 0, total: 3},
    training: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // ==== 1101 – Operation Department ====
  {
    id: 2,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    appraisal: {staff: 4, nonStaff: 1, expat: 0, total: 5},
    training: {staff: 2, nonStaff: 1, expat: 0, total: 3},
    siteBranch: 'Head Site A',
    section: 'Operation',
  },
  {
    id: 3,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    appraisal: {staff: 0, nonStaff: 2, expat: 1, total: 3},
    training: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    siteBranch: 'Head Site A',
    section: 'Operation',
  },
  {
    id: 4,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '113-Operation Support Workgroup',
    appraisal: {staff: 1, nonStaff: 1, expat: 0, total: 2},
    training: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    siteBranch: 'Head Site A',
    section: 'Operation',
  },

  // ==== 1201 – Maintenance Department ====
  {
    id: 5,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    appraisal: {staff: 1, nonStaff: 1, expat: 0, total: 2},
    training: {staff: 1, nonStaff: 1, expat: 0, total: 2},
    siteBranch: 'Head Site A',
    section: 'Maintenance',
  },
  {
    id: 6,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    appraisal: {staff: 1, nonStaff: 3, expat: 0, total: 4},
    training: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    siteBranch: 'Head Site A',
    section: 'Maintenance',
  },
]
