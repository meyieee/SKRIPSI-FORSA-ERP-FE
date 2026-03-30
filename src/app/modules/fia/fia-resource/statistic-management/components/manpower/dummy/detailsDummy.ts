export type ManpowerDetailRow = {
  id: number
  empId: string
  fullName: string
  employeeType: string
  jobLevelDesc: string
  jobLevel: number
  jobTitle: string
  positionTitle: string
  costCenter: string
  departmentCode: string
  departmentName: string
  workgroup?: string // ⬅️ ditambah untuk sub-header
  siteBranch?: string
  section?: string
  element?: string
}

export const manpowerDetailsRows: ManpowerDetailRow[] = [
  // ===== Administration Department =====
  {
    id: 1,
    empId: '10001',
    fullName: 'Steve Sarowski',
    employeeType: '10-Staff',
    jobLevelDesc: '105-President Director',
    jobLevel: 8,
    jobTitle: '601-01-Director - Managing',
    positionTitle: '601-01-Director - Managing',
    costCenter: '10011-Executive',
    departmentCode: '1001',
    departmentName: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 2,
    empId: '10002',
    fullName: 'Joana Fel Sali',
    employeeType: '10-Staff',
    jobLevelDesc: '120-Manager',
    jobLevel: 5,
    jobTitle: '602-10-Manager - Admin',
    positionTitle: '602-10-Manager - Admin',
    costCenter: '10011-Executive',
    departmentCode: '1001',
    departmentName: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // ===== Operation Department =====
  {
    id: 3,
    empId: '10010',
    fullName: 'James Grat Song',
    employeeType: '30-Expat',
    jobLevelDesc: '110-Director',
    jobLevel: 7,
    jobTitle: '601-02-Director - Operational',
    positionTitle: '601-02-Director - Operational',
    costCenter: '11011-Operation General',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 4,
    empId: '10012',
    fullName: 'Jonas Hung',
    employeeType: '30-Expat',
    jobLevelDesc: '205-Superintendent',
    jobLevel: 3,
    jobTitle: '603-02-Superintendent - Production',
    positionTitle: '603-02-Superintendent - Production',
    costCenter: '11011-Operation General',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 5,
    empId: '10011',
    fullName: 'Carlos Grilo',
    employeeType: '30-Expat',
    jobLevelDesc: '205-Superintendent',
    jobLevel: 3,
    jobTitle: '603-03-Superintendent - Operation',
    positionTitle: '603-03-Superintendent - Operation',
    costCenter: '11012-Operation',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 6,
    empId: '10032',
    fullName: 'Lina Alexander',
    employeeType: '10-Staff',
    jobLevelDesc: '220-Supervisor',
    jobLevel: 1,
    jobTitle: '605-01-Supervisor - Operation',
    positionTitle: '605-01-Supervisor - Operation',
    costCenter: '11012-Operation',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // ===== Maintenance Department (contoh) =====
  {
    id: 7,
    empId: '10050',
    fullName: 'Randy Sut',
    employeeType: '10-Staff',
    jobLevelDesc: '120-Manager',
    jobLevel: 5,
    jobTitle: '602-08-Manager - Maintenance',
    positionTitle: '602-08-Manager - Maintenance',
    costCenter: '12011-Maintenance General',
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    siteBranch: 'Head Site A',
    section: 'Maintenance',
  },
]
