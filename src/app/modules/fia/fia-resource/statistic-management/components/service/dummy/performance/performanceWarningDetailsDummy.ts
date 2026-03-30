export type WarningStat = {
  verbal: number
  warn1: number
  warn2: number
  warn3: number
  suspension: number
  termination: number
}

export type WarningDetailRow = {
  id: string
  empNo: string
  empName: string
  jobTitle: string
  departmentCode: string
  departmentName: string
  workgroup: string
  crew?: string // e.g. 'Crew A', 'Crew B', 'Crew Steady Day'
  stat: WarningStat
  siteBranch?: string
  section?: string
  element?: string
}

/** ===== DUMMY DATA (diset agar selaras dengan tampilan foto) ===== */
export const warningDetailRows: WarningDetailRow[] = [
  // ===== Operation Dept – Hauling – Crew A =====
  {
    id: 'op-ha-a-1',
    empNo: '254875',
    empName: 'Eduard Salindeho',
    jobTitle: 'Haul Supervisor',
    departmentCode: '1101',
    departmentName: 'OPERATION DEPARTMENT',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    stat: {verbal: 0, warn1: 1, warn2: 0, warn3: 0, suspension: 0, termination: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 'op-ha-a-2',
    empNo: '123456',
    empName: 'Vallerie Joanna',
    jobTitle: 'Operator',
    departmentCode: '1101',
    departmentName: 'OPERATION DEPARTMENT',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    stat: {verbal: 0, warn1: 1, warn2: 0, warn3: 0, suspension: 0, termination: 0},
  },
  {
    id: 'op-ha-a-3',
    empNo: '1234566',
    empName: 'Silvie Tong',
    jobTitle: 'Operator',
    departmentCode: '1101',
    departmentName: 'OPERATION DEPARTMENT',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    stat: {verbal: 0, warn1: 1, warn2: 0, warn3: 0, suspension: 0, termination: 0},
  },

  // ===== Operation Dept – Hauling – Crew B =====
  {
    id: 'op-ha-b-1',
    empNo: '234567',
    empName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
    departmentCode: '1101',
    departmentName: 'OPERATION DEPARTMENT',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    stat: {verbal: 0, warn1: 1, warn2: 0, warn3: 0, suspension: 1, termination: 0},
  },
  {
    id: 'op-ha-b-2',
    empNo: '2345677',
    empName: 'Jun Hale',
    jobTitle: 'Operator',
    departmentCode: '1101',
    departmentName: 'OPERATION DEPARTMENT',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    stat: {verbal: 0, warn1: 1, warn2: 0, warn3: 0, suspension: 0, termination: 0},
  },

  // ===== Human Resource Dept – Employee Admin Workgroup (summary bar di foto) =====
  {
    id: 'hr-wg-sum',
    empNo: '',
    empName: '',
    jobTitle: 'Employee Admin Workgroup :',
    departmentCode: '2101',
    departmentName: 'HUMAN RESOURCE DEPARTMENT',
    workgroup: 'Employee Admin Workgroup',
    crew: undefined,
    stat: {verbal: 0, warn1: 0, warn2: 0, warn3: 0, suspension: 0, termination: 0},
  },

  // HR — Crew Steady Day (dua karyawan; total menambah Suspension 1)
  {
    id: 'hr-csd-1',
    empNo: '345678',
    empName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
    departmentCode: '2101',
    departmentName: 'HUMAN RESOURCE DEPARTMENT',
    workgroup: 'Crew Steady Day',
    crew: 'Crew Steady Day',
    stat: {verbal: 0, warn1: 0, warn2: 0, warn3: 0, suspension: 1, termination: 0},
  },
  {
    id: 'hr-csd-2',
    empNo: '345679',
    empName: 'Johanna Mul',
    jobTitle: 'HR Officer',
    departmentCode: '2101',
    departmentName: 'HUMAN RESOURCE DEPARTMENT',
    workgroup: 'Crew Steady Day',
    crew: 'Crew Steady Day',
    stat: {verbal: 0, warn1: 0, warn2: 0, warn3: 0, suspension: 0, termination: 0},
  },
]
