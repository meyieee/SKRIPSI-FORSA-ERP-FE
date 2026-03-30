export type AppraisalDetailRow = {
  id: string
  departmentCode: string
  department: string
  workgroup: string
  empId: string
  fullName: string
  employeeType: string
  jobTitle: string
  appraisalDate: string
  appraisalPeriodStart: string
  appraisalPeriodEnd: string
  appraiser: string
  costCenter: string
  siteBranch: string
  section?: string
  element?: string
}

export const appraisalDetailRows: AppraisalDetailRow[] = [
  // 1001 – Administration Department
  {
    id: 'ad-1001-1',
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    empId: '10X01',
    fullName: 'Steve Sarowski',
    employeeType: '10-Staff',
    jobTitle: '601-01-Director - Managing',
    appraisalDate: '2025-01-09',
    appraisalPeriodStart: '2025-01-09',
    appraisalPeriodEnd: '2025-01-09',
    appraiser: 'Steve Sarowski',
    costCenter: '10011-Executive',
    siteBranch: 'Head Site A',
    section: 'Admin General',
    element: 'Performance',
  },
  {
    id: 'ad-1001-2',
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    empId: '10X02',
    fullName: 'Joana Fel Sali',
    employeeType: '10-Staff',
    jobTitle: '602-10-Manager - Admin',
    appraisalDate: '2025-01-08',
    appraisalPeriodStart: '2025-01-08',
    appraisalPeriodEnd: '2025-01-08',
    appraiser: 'Joana Fel Sali',
    costCenter: '10011-Executive',
    siteBranch: 'Head Site A',
    section: 'Admin General',
    element: 'Performance',
  },

  // 1101 – Operation Department
  {
    id: 'ad-1101-1',
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    empId: '10X03',
    fullName: 'James Grat Song',
    employeeType: '30-Expat',
    jobTitle: '601-02-Director - Operational',
    appraisalDate: '2025-01-07',
    appraisalPeriodStart: '2025-01-07',
    appraisalPeriodEnd: '2025-01-07',
    appraiser: 'Steve Sarowski',
    costCenter: '11012-Operation',
    siteBranch: 'Head Site A',
    section: 'Operation',
    element: 'Performance',
  },
  {
    id: 'ad-1101-2',
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    empId: '10X04',
    fullName: 'Jonas Hung',
    employeeType: '30-Expat',
    jobTitle: '603-02-Superintendent - Production',
    appraisalDate: '2025-01-06',
    appraisalPeriodStart: '2025-01-06',
    appraisalPeriodEnd: '2025-01-06',
    appraiser: 'James Grat Song',
    costCenter: '11012-Operation',
    siteBranch: 'Head Site A',
    section: 'Operation',
    element: 'Performance',
  },

  // 1201 – Maintenance Department
  {
    id: 'ad-1201-1',
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    empId: '10X05',
    fullName: 'Ham Ramon Krane',
    employeeType: '30-Expat',
    jobTitle: '602-08-Manager - Maintenance',
    appraisalDate: '2025-01-06',
    appraisalPeriodStart: '2025-01-06',
    appraisalPeriodEnd: '2025-01-06',
    appraiser: 'James Grat Song',
    costCenter: '12012-Maintenance General',
    siteBranch: 'Head Site A',
    section: 'Maintenance',
    element: 'Performance',
  },
]
