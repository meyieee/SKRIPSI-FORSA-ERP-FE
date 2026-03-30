// summaryDummy.ts (revisi)

// + tambahkan properti workgroup
export type ManpowerSummaryRow = {
  id: number
  departmentCode: string
  department: string
  workgroup: string // <— NEW
  levelDesc: string
  level: number
  costCenter: string
  staff: number
  nonStaff: number
  expatType: number
  totalType: number
  local: number
  national: number
  expatClass: number
  totalClass: number
  siteBranch: string
  section?: string
  element?: string
}

export const manpowerSummaryRows: ManpowerSummaryRow[] = [
  // 1001 – Administration Department (101-Administration Workgroup)
  {
    id: 1,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    levelDesc: '105-President Director',
    level: 8,
    costCenter: '10011-Executive',
    staff: 1,
    nonStaff: 0,
    expatType: 0,
    totalType: 1,
    local: 1,
    national: 1,
    expatClass: 0,
    totalClass: 1,
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 2,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    levelDesc: '120-Manager',
    level: 5,
    costCenter: '10011-Executive',
    staff: 1,
    nonStaff: 0,
    expatType: 0,
    totalType: 1,
    local: 1,
    national: 1,
    expatClass: 0,
    totalClass: 1,
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // 1101 – Operation Department (contoh: 111-Operation Hauling Workgroup)
  {
    id: 3,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    levelDesc: '110-Director',
    level: 7,
    costCenter: '11011-Operation General',
    staff: 1,
    nonStaff: 0,
    expatType: 1,
    totalType: 2,
    local: 1,
    national: 1,
    expatClass: 1,
    totalClass: 2,
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 4,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    levelDesc: '205-Superintendent',
    level: 3,
    costCenter: '11011-Operation General',
    staff: 1,
    nonStaff: 1,
    expatType: 0,
    totalType: 2,
    local: 1,
    national: 1,
    expatClass: 0,
    totalClass: 2,
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 5,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    levelDesc: '220-Supervisor',
    level: 1,
    costCenter: '11012-Operation',
    staff: 1,
    nonStaff: 0,
    expatType: 1,
    totalType: 2,
    local: 1,
    national: 0,
    expatClass: 1,
    totalClass: 2,
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // 1201 – Maintenance Department (121-Mine Maintenance Workgroup)
  {
    id: 6,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    levelDesc: '120-Manager',
    level: 5,
    costCenter: '12011-Maintenance General',
    staff: 0,
    nonStaff: 0,
    expatType: 1,
    totalType: 1,
    local: 0,
    national: 1,
    expatClass: 1,
    totalClass: 2,
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 7,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    levelDesc: '205-Superintendent',
    level: 3,
    costCenter: '12011-Maintenance General',
    staff: 0,
    nonStaff: 0,
    expatType: 2,
    totalType: 2,
    local: 0,
    national: 1,
    expatClass: 2,
    totalClass: 3,
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
]
