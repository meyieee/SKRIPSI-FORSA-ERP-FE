// ===================== Dummy: Plan Details (revisi, tambah workgroup) =====================
export type PlanDetailsRow = {
  id: number
  departmentCode: string
  department: string
  workgroup: string // ⬅️ baru: untuk sub-header per Workgroup
  positionNo: string
  agreementNo: string
  employment: string
  employeeType: string
  jobLevelDescription: string
  level: number
  jobTitle: string
  costCenter: string
  siteBranch: string
  section?: string
  element?: string
}

export const planDetailsRows: PlanDetailsRow[] = [
  // 1001 - Administration Department
  {
    id: 1,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup', // ⬅️ ditambah
    positionNo: 'PN2105-001',
    agreementNo: 'tba',
    employment: 'Permanent',
    employeeType: '10-Staff',
    jobLevelDescription: '205-Superintendent',
    level: 3,
    jobTitle: '603-06-Superintendent - Adnr',
    costCenter: '10012-Administrative',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // 1101 - Operation Department
  {
    id: 2,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup', // ⬅️ ditambah
    positionNo: 'PN2105-002',
    agreementNo: 'tba',
    employment: 'Temporary',
    employeeType: '20-Non Staff',
    jobLevelDescription: '310-Non Staff Level 3',
    level: 0,
    jobTitle: '904-01-Admin',
    costCenter: '11012-Operation',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 3,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup', // ⬅️ ditambah
    positionNo: 'PN2105-003',
    agreementNo: 'tba',
    employment: 'Temporary',
    employeeType: '20-Non Staff',
    jobLevelDescription: '310-Non Staff Level 3',
    level: 0,
    jobTitle: '904-01-Admin',
    costCenter: '11012-Operation',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 4,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup', // ⬅️ ditambah
    positionNo: 'PN2105-004',
    agreementNo: 'tba',
    employment: 'Permanent',
    employeeType: '20-Non Staff',
    jobLevelDescription: '300-Non Staff Level 5',
    level: 0,
    jobTitle: '608-01-Leader - Operation',
    costCenter: '11012-Operation',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // 1201 - Maintenance Department
  {
    id: 5,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup', // ⬅️ ditambah
    positionNo: 'PN2105-005',
    agreementNo: 'tba',
    employment: 'Temporary',
    employeeType: '20-Non Staff',
    jobLevelDescription: '315-Non Staff Level 2',
    level: 0,
    jobTitle: '401-01-Mechanic Drill',
    costCenter: '12012-Maintenance Plant',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 6,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup', // ⬅️ ditambah
    positionNo: 'PN2105-006',
    agreementNo: 'tba',
    employment: 'Temporary',
    employeeType: '20-Non Staff',
    jobLevelDescription: '315-Non Staff Level 2',
    level: 0,
    jobTitle: '401-01-Mechanic Drill',
    costCenter: '12012-Maintenance Plant',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
]
