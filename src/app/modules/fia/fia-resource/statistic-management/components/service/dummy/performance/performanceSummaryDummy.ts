/* ===== VIOLATION (kehadiran) ===== */
export type ViolationSummaryRow = {
  id: number
  departmentCode: string
  departmentName: string
  workgroup: string
  present: number
  dayOff: number
  leave: number
  absent: number
  sick: number
  total: number
  available: number // %
  rawAvailable: number // %
  effective: number // %
  siteBranch?: string
  section?: string
  element?: string
}

export const violationSummaryRows: ViolationSummaryRow[] = [
  // 1001 — Administration
  {
    id: 1,
    departmentCode: '1001',
    departmentName: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    present: 20,
    dayOff: 10,
    leave: 0,
    absent: 0,
    sick: 0,
    total: 30,
    available: 66.7,
    rawAvailable: 100.0,
    effective: 66.7,
    siteBranch: 'Head Site A',
  },

  // 1101 — Operation
  {
    id: 2,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    present: 10,
    dayOff: 2,
    leave: 0,
    absent: 10,
    sick: 0,
    total: 22,
    available: 45.5,
    rawAvailable: 54.5,
    effective: 45.5,
  },
  {
    id: 3,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    present: 15,
    dayOff: 10,
    leave: 0,
    absent: 5,
    sick: 0,
    total: 30,
    available: 50.0,
    rawAvailable: 83.3,
    effective: 50.0,
  },
  {
    id: 4,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '113-Operation Support Workgroup',
    present: 20,
    dayOff: 10,
    leave: 0,
    absent: 0,
    sick: 0,
    total: 30,
    available: 66.7,
    rawAvailable: 100.0,
    effective: 66.7,
  },

  // 1201 — Maintenance
  {
    id: 5,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    present: 10,
    dayOff: 2,
    leave: 0,
    absent: 10,
    sick: 0,
    total: 22,
    available: 45.5,
    rawAvailable: 54.5,
    effective: 45.5,
  },
  {
    id: 6,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    present: 15,
    dayOff: 10,
    leave: 0,
    absent: 5,
    sick: 0,
    total: 30,
    available: 50.0,
    rawAvailable: 83.3,
    effective: 50.0,
  },
]

/* ===== WARNING (peringatan) ===== */
export type WarningSummaryRow = {
  id: number
  departmentCode: string
  departmentName: string
  workgroup: string
  verbal: number
  warn1: number
  warn2: number
  warn3: number
  suspension: number
  termination: number
  siteBranch?: string
  section?: string
  element?: string
}

export const warningSummaryRows: WarningSummaryRow[] = [
  // 1001 — Administration
  {
    id: 101,
    departmentCode: '1001',
    departmentName: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    verbal: 2,
    warn1: 0,
    warn2: 0,
    warn3: 0,
    suspension: 0,
    termination: 0,
  },

  // 1101 — Operation
  {
    id: 201,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    verbal: 0,
    warn1: 2,
    warn2: 0,
    warn3: 0,
    suspension: 1,
    termination: 0,
  },
  {
    id: 202,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    verbal: 0,
    warn1: 2,
    warn2: 0,
    warn3: 0,
    suspension: 0,
    termination: 0,
  },
  {
    id: 203,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '113-Operation Support Workgroup',
    verbal: 0,
    warn1: 1,
    warn2: 0,
    warn3: 0,
    suspension: 0,
    termination: 0,
  },

  // 1201 — Maintenance
  {
    id: 301,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    verbal: 1,
    warn1: 0,
    warn2: 0,
    warn3: 0,
    suspension: 0,
    termination: 0,
  },
  {
    id: 302,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    verbal: 1,
    warn1: 0,
    warn2: 0,
    warn3: 1,
    suspension: 0,
    termination: 0,
  },
]
