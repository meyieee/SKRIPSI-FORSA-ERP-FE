export type TrainingDetailRow = {
  id: string
  departmentCode: string
  department: string
  workgroup: string
  empId: string
  fullName: string
  employeeType: string
  jobTitle: string
  trainingTitle: string
  trainingDate: string // YYYY-MM-DD
  status: 'Planned' | 'On Going' | 'Completed'
  costCenter: string
  siteBranch: string
  section?: string
  element?: string
}

export const trainingDetailRows: TrainingDetailRow[] = [
  // 1001 — Administration Department
  {
    id: 'td-1001-1',
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    empId: '10X01',
    fullName: 'Steve Sarowski',
    employeeType: '10-Staff',
    jobTitle: '601-01-Director - Managing',
    trainingTitle: 'Leadership Refresh 2025',
    trainingDate: '2025-06-10',
    status: 'Completed',
    costCenter: '10011-Executive',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
  {
    id: 'td-1001-2',
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    empId: '10X02',
    fullName: 'Joana Fel Sali',
    employeeType: '10-Staff',
    jobTitle: '602-10-Manager - Admin',
    trainingTitle: 'Advanced Excel for Admin',
    trainingDate: '2025-05-06',
    status: 'Completed',
    costCenter: '10011-Executive',
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // 1101 — Operation Department
  {
    id: 'td-1101-1',
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    empId: '10X03',
    fullName: 'James Grat Song',
    employeeType: '30-Expat',
    jobTitle: '601-02-Director - Operational',
    trainingTitle: 'Safety Command Workshop',
    trainingDate: '2025-04-15',
    status: 'Completed',
    costCenter: '11012-Operation',
    siteBranch: 'Head Site A',
    section: 'Operation',
  },
  {
    id: 'td-1101-2',
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    empId: '10X04',
    fullName: 'Jonas Hung',
    employeeType: '30-Expat',
    jobTitle: '603-02-Superintendent - Production',
    trainingTitle: 'Production Planning 101',
    trainingDate: '2025-04-15',
    status: 'Completed',
    costCenter: '11012-Operation',
    siteBranch: 'Head Site A',
    section: 'Operation',
  },

  // 1201 — Maintenance Department
  {
    id: 'td-1201-1',
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    empId: '10X05',
    fullName: 'Ham Ramon Krane',
    employeeType: '30-Expat',
    jobTitle: '602-08-Manager - Maintenance',
    trainingTitle: 'Drilling & Mechanic Basics',
    trainingDate: '2025-03-10',
    status: 'Completed',
    costCenter: '12012-Maintenance General',
    siteBranch: 'Head Site A',
    section: 'Maintenance',
  },
]
