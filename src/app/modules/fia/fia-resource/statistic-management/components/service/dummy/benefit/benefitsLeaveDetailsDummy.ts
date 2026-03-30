export type LeaveTravelDetailRow = {
  id: string
  siteBranch: string
  departmentCode: string
  departmentName: string
  workgroup: string
  crew: 'Crew A' | 'Crew B' | 'Crew Steady Day'
  empNo: string
  fullName: string
  jobTitle: string
  present: number
  dayOff: number
  leave: number
  absent: number
  sick: number
  total: number
  available: number
  rawAvailable: number
  effective: number
  section?: string
  element?: string
}

export const leaveTravelDetailRows: LeaveTravelDetailRow[] = [
  // ===== Operation Department – Operation Hauling Workgroup
  // Crew A
  {
    id: 'op-haul-a-1',
    siteBranch: 'Head Site A',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    empNo: '254875',
    fullName: 'Eduard Salindeho',
    jobTitle: 'Haul Supervisor',
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
    id: 'op-haul-a-2',
    siteBranch: 'Head Site A',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    empNo: '123456',
    fullName: 'Vallerie Joanna',
    jobTitle: 'Operator',
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
    id: 'op-haul-a-3',
    siteBranch: 'Head Site A',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    empNo: '123456e',
    fullName: 'Silvie Tong',
    jobTitle: 'Operator',
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

  // Crew B
  {
    id: 'op-haul-b-1',
    siteBranch: 'Head Site A',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    empNo: '234567',
    fullName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
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
  {
    id: 'op-haul-b-2',
    siteBranch: 'Head Site A',
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    empNo: '234567b',
    fullName: 'Jun Hale',
    jobTitle: 'Operator',
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

  // ===== Human Resource Department – Employee Admin Workgroup (Crew Steady Day)
  {
    id: 'hr-steady-1',
    siteBranch: 'Head Site A',
    departmentCode: '2101',
    departmentName: 'HUMAN RESOURCE DEPARTMENT',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
    empNo: '345678',
    fullName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
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
  {
    id: 'hr-steady-2',
    siteBranch: 'Head Site A',
    departmentCode: '2101',
    departmentName: 'HUMAN RESOURCE DEPARTMENT',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
    empNo: '345679',
    fullName: 'Johanna Mul',
    jobTitle: 'HR Officer',
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
]
