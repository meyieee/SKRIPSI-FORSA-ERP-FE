// workforce-tracking/components/violation/tabs/violationDummy.ts

export type ViolationRow = {
  id: string
  empNo: string
  empName: string
  date: string // YYYY-MM-DD
  shift: 'Day' | 'Night' | 'Rotation'
  status: 'Present' | 'Absent' | 'Late' | 'Leave'
  reason?: string
  comments?: string
  category: 'Violation' | 'Non Violation'
  actionTaken?: string

  // for filters / grouping
  siteBranch: string
  department: string
  section: string
  element?: string // e.g. element/category of control (optional)
  workgroup: string
  crew: string
}

// contoh data meniru gambar
export const violationRows: ViolationRow[] = [
  {
    id: 'op-a-1',
    empNo: '254875',
    empName: 'Eduard Salindeho',
    date: '2025-01-10',
    shift: 'Day',
    status: 'Absent',
    reason: 'Sick Leave',
    comments: 'No information',
    category: 'Violation',
    actionTaken: 'Warning 1',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Attendance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-2',
    empNo: '123456',
    empName: 'Vallerie Joanna',
    date: '2025-01-10',
    shift: 'Day',
    status: 'Late',
    reason: 'Traffic',
    comments: '30 Minute Late due to trafic',
    category: 'Non Violation',
    actionTaken: undefined,
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Attendance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-3',
    empNo: '123456',
    empName: 'Silvie Tong',
    date: '2025-01-10',
    shift: 'Day',
    status: 'Present',
    reason: '',
    comments: '',
    category: 'Non Violation',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Attendance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-b-1',
    empNo: '234567',
    empName: 'Wong Tiara',
    date: '2025-01-10',
    shift: 'Night',
    status: 'Absent',
    reason: 'Sick Leave',
    comments: 'Sick Certificate',
    category: 'Non Violation',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Attendance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },
  {
    id: 'op-b-2',
    empNo: '234567',
    empName: 'Jun Hale',
    date: '2025-01-10',
    shift: 'Night',
    status: 'Present',
    reason: '',
    comments: '',
    category: 'Non Violation',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Attendance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },
  {
    id: 'hr-1',
    empNo: '345678',
    empName: 'Sesca Londah',
    date: '2025-01-09',
    shift: 'Day',
    status: 'Absent',
    reason: 'Training Offsite',
    comments: 'Performance Training',
    category: 'Non Violation',
    actionTaken: undefined,
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Training',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
  },
  {
    id: 'hr-2',
    empNo: '345679',
    empName: 'Johanna Mul',
    date: '2025-01-09',
    shift: 'Rotation',
    status: 'Present',
    reason: '',
    comments: '',
    category: 'Non Violation',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Training',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
  },
]
