export type LeaveTravelSummaryRow = {
  id: number
  departmentCode: string
  departmentName: string
  workgroup: string

  // Management
  superintendent: number
  manager: number
  director: number

  // Supervisor
  supervisor: number
  foreman: number

  // Craft
  nonStaff: number
  leadhand: number

  siteBranch?: string
  section?: string
  element?: string
}

export const leaveTravelSummaryRows: LeaveTravelSummaryRow[] = [
  // 1001 – Administration
  {
    id: 1,
    departmentCode: '1001',
    departmentName: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    superintendent: 1,
    manager: 0,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 0,
    leadhand: 0,
    siteBranch: 'Head Site A',
  },

  // 1101 – Operation (contoh nol sesuai foto)
  {
    id: 2,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    superintendent: 0,
    manager: 0,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 0,
    leadhand: 0,
  },
  {
    id: 3,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    superintendent: 0,
    manager: 0,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 0,
    leadhand: 0,
  },
  {
    id: 4,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '113-Operation Support Workgroup',
    superintendent: 0,
    manager: 0,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 0,
    leadhand: 0,
  },

  // 1201 – Maintenance (angka meniru pola foto: 2+2 superintendent, 2+2 non-staff)
  {
    id: 5,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    superintendent: 2,
    manager: 0,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 2,
    leadhand: 0,
  },
  {
    id: 6,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    superintendent: 2,
    manager: 0,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 2,
    leadhand: 0,
  },
]
