// movementDetailsDummy.ts

export type MovementDetailsRow = {
  /** unique row id / position number */
  positionNo: string
  /** employee id shown in table */
  idNumber: string
  fullName: string
  employeeType: string // "10-Staff" | "20-Non Staff" | "30-Expat" | etc.
  jobTitle: string
  /** Hire / Left */
  type: 'Hire' | 'Left'
  /** e.g. "10-Jun-25" (free format) */
  hireLeftDate: string
  costCenter: string

  /** NEW: used for the light header row under department */
  workgroup: string

  siteBranch: string
  section?: string
  element?: string

  /** grouping header */
  departmentCode: string
  department: string
}

export const movementDetailsRows: MovementDetailsRow[] = [
  // ===== 1001 – Administration Department =====
  {
    positionNo: 'MV-001',
    idNumber: '10X01',
    fullName: 'Steve Sarowski',
    employeeType: '10-Staff',
    jobTitle: '601-01-Director - Managing',
    type: 'Hire',
    hireLeftDate: '10-Jun-25',
    costCenter: '10011-Executive',
    workgroup: '101-Administration Workgroup',
    departmentCode: '1001',
    department: 'Administration Department',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    positionNo: 'MV-002',
    idNumber: '10X02',
    fullName: 'Joana Fel Sali',
    employeeType: '10-Staff',
    jobTitle: '602-10-Manager - Admin',
    type: 'Left',
    hireLeftDate: '06-May-25',
    costCenter: '10011-Executive',
    workgroup: '101-Administration Workgroup',
    departmentCode: '1001',
    department: 'Administration Department',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // ===== 1101 – Operation Department =====
  {
    positionNo: 'MV-003',
    idNumber: '10X03',
    fullName: 'James Grat Song',
    employeeType: '30-Expat',
    jobTitle: '601-02-Director - Operational',
    type: 'Hire',
    hireLeftDate: '15-Apr-25',
    costCenter: '11011-Operation General',
    workgroup: '111-Operation Hauling Workgroup',
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    positionNo: 'MV-004',
    idNumber: '10X04',
    fullName: 'Jonas Hung',
    employeeType: '30-Expat',
    jobTitle: '603-02-Superintendent - Production',
    type: 'Hire',
    hireLeftDate: '15-Apr-25',
    costCenter: '11011-Operation General',
    workgroup: '111-Operation Hauling Workgroup',
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // ===== 1201 – Maintenance Department =====
  {
    positionNo: 'MV-005',
    idNumber: '10X05',
    fullName: 'Ham Ramon Krane',
    employeeType: '30-Expat',
    jobTitle: '602-08-Manager - Maintenance',
    type: 'Left',
    hireLeftDate: '10-Mar-25',
    costCenter: '12011-Maintenance General',
    workgroup: '121-Mine Maintenance Workgroup',
    departmentCode: '1201',
    department: 'Maintenance Department',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
]
