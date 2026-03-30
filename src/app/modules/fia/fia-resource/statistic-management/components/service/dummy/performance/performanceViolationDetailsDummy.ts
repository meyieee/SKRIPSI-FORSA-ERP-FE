export type Attendance = {
  present: number
  dayOff: number
  leave: number
  absent: number
  sick: number
  total: number
  available: number // %
  rawAvailable: number // %
  effective: number // %
}

export type ViolationDetailRow = {
  id: string
  empNo: string
  empName: string
  jobTitle: string
  departmentCode: string
  departmentName: string
  workgroup: string
  crew?: string // e.g. 'Crew A', 'Crew B', 'Crew Steady Day'
  att: Attendance
  siteBranch?: string
  section?: string
  element?: string
}

/** ===== DUMMY DATA (diset agar cocok dengan foto) ===== */
export const violationDetailRows: ViolationDetailRow[] = [
  // ===== Operation Department – Hauling Workgroup – Crew A =====
  {
    id: 'op-ha-a-1',
    empNo: '254875',
    empName: 'Eduard Salindeho',
    jobTitle: 'Haul Supervisor',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    att: {
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
    siteBranch: 'Head Site A',
  },
  {
    id: 'op-ha-a-2',
    empNo: '123456',
    empName: 'Vallerie Joanna',
    jobTitle: 'Operator',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    att: {
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
  },
  {
    id: 'op-ha-a-3',
    empNo: '1234566',
    empName: 'Silvie Tong',
    jobTitle: 'Operator',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    att: {
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
  },

  // ===== Operation Department – Hauling Workgroup – Crew B =====
  {
    id: 'op-ha-b-1',
    empNo: '234567',
    empName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    att: {
      present: 18,
      dayOff: 10,
      leave: 0,
      absent: 1,
      sick: 1,
      total: 30,
      available: 60.0,
      rawAvailable: 93.3,
      effective: 60.0,
    },
  },
  {
    id: 'op-ha-b-2',
    empNo: '2345677',
    empName: 'Jun Hale',
    jobTitle: 'Operator',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    att: {
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
  },

  // ===== Human Resource Department – Employee Admin Workgroup =====
  {
    id: 'hr-wg-0',
    empNo: '',
    empName: '',
    jobTitle: 'Employee Admin Workgroup :', // hanya untuk subtotal WG di foto pertama
    departmentCode: '2101',
    departmentName: 'HUMAN RESOURCE DEPARTMENT',
    workgroup: 'Employee Admin Workgroup',
    crew: undefined,
    att: {
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
  },

  // HR — Crew Steady Day (dua karyawan)
  {
    id: 'hr-csd-1',
    empNo: '345678',
    empName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
    departmentCode: '2101',
    departmentName: 'HUMAN RESOURCE DEPARTMENT',
    workgroup: 'Crew Steady Day',
    crew: 'Crew Steady Day',
    att: {
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
    att: {
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
  },
]
