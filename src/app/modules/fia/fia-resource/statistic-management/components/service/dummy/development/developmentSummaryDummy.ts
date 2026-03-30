// ===================== Dummy: Manpower Development Summary =====================
export type DevCounts = {staff: number; nonStaff: number; expat: number; total: number}

export type DevelopmentSummaryRow = {
  id: number
  departmentCode: string
  department: string
  workgroup: string

  role: string
  level: string | number

  appraisal: DevCounts // Appraisal Completed
  training: DevCounts // Training Conduct

  siteBranch: string
  section?: string
  element?: string
}

export const developmentSummaryRows: DevelopmentSummaryRow[] = [
  // ===== 1001 — Administration Department =====
  {
    id: 1,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'Director',
    level: 6,
    appraisal: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    training: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 2,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'Manager',
    level: 5,
    appraisal: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    training: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 3,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'General Superintendent',
    level: 4,
    appraisal: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    training: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 4,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'Superintendent',
    level: 3,
    appraisal: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    training: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 5,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'General Foreman',
    level: 2,
    appraisal: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    training: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    siteBranch: 'Head Site A',
  },
  {
    id: 6,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'Supervisor',
    level: 1,
    appraisal: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    training: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 7,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'Leader',
    level: 'A',
    appraisal: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    training: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 8,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'Non Staff Level 1',
    level: 'A1',
    appraisal: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    training: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 9,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'Non Staff Level 2',
    level: 'A2',
    appraisal: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    training: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 10,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    role: 'Non Staff Level 3',
    level: 'A3',
    appraisal: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    training: {staff: 0, nonStaff: 0, expat: 0, total: 0},
    siteBranch: 'Head Site A',
  },

  // ===== 1101 — Operation Department (contoh singkat) =====
  {
    id: 11,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    role: 'Superintendent',
    level: 3,
    appraisal: {staff: 1, nonStaff: 0, expat: 0, total: 1},
    training: {staff: 0, nonStaff: 1, expat: 0, total: 1},
    siteBranch: 'Head Site A',
  },
]
