export type TimeRow = {
  id: string
  siteBranch: string
  department: string
  section: string
  element: string
  workgroup: string
  crew: string

  empNo: string
  empName: string

  date: string // YYYY-MM-DD

  // numbers kept as string|number to mimic screenshot values (e.g., 6.36, 16.01)
  timeIn?: number | string
  timeOut?: number | string
  scanIn?: number | string
  scanOut?: number | string
  late?: number | string
  early?: number | string
  overtime?: number | string
  workhours?: number | string
  totalHours?: number | string
  paymentHours?: number | string
}

export type TimeHistoryRow = {
  id: string
  date: string // YYYY-MM-DD
  timeIn?: number | string
  timeOut?: number | string
  scanIn?: number | string
  scanOut?: number | string
  late?: number | string
  early?: number | string
  overtime?: number | string
  workhours?: number | string
  totalHours?: number | string
  paymentHours?: number | string
}

/**
 * Dummy rows for the main "Time Management" table.
 * Values mirror the look in the screenshot: mixed ints/decimals; empty cells allowed.
 */
export const timeRows: TimeRow[] = [
  // ==== OPERATION DEPARTMENT – Operation Hauling Workgroup – Crew A
  {
    id: 'op-a-1',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',

    empNo: '254875',
    empName: 'Eduard Salindeho',

    date: '2025-03-16',
    timeIn: 7,
    timeOut: 12,
    scanIn: 6.36,
    // scanOut intentionally empty to resemble screenshot row 1
    workhours: '',
    totalHours: '',
    paymentHours: '',
  },
  {
    id: 'op-a-2',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',

    empNo: '123456',
    empName: 'Vallerie Joanna',

    date: '2025-03-16',
    timeIn: 13,
    timeOut: 16,
    scanIn: 13.07,
    scanOut: 16.01,
    late: 7,
    workhours: 2.52,
    totalHours: 2.53,
    paymentHours: 2.53,
  },
  {
    id: 'op-a-3',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',

    empNo: '123456',
    empName: 'Silvie Tong',

    date: '2025-03-16',
    timeIn: 7,
    timeOut: 12,
    scanIn: '',
    scanOut: '',
    workhours: '',
    totalHours: '',
    paymentHours: '',
  },

  // ==== OPERATION DEPARTMENT – Operation Hauling Workgroup – Crew B
  {
    id: 'op-b-1',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',

    empNo: '234567',
    empName: 'Wong Tiara',

    date: '2025-03-16',
    timeIn: 7,
    timeOut: 12,
    scanIn: 6.39,
    scanOut: 12.02,
    late: '',
    early: '',
    overtime: '',
    workhours: 5,
    totalHours: 5.22,
    paymentHours: 5.22,
  },
  {
    id: 'op-b-2',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',

    empNo: '234567',
    empName: 'Jun Hale',

    date: '2025-03-16',
    timeIn: 13,
    timeOut: 16,
    scanIn: 13.01,
    scanOut: 16.02,
    workhours: 2.58,
    totalHours: 3,
    paymentHours: 3,
  },

  // ==== HUMAN RESOURCE DEPARTMENT – Employee Admin Workgroup – Crew Steady Day
  {
    id: 'hr-sd-1',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Default',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',

    empNo: '345678',
    empName: 'Sesca Londah',

    date: '2025-03-16',
    timeIn: 13,
    timeOut: 16,
    scanIn: 12.56,
    scanOut: 16.03,
    workhours: 3,
    totalHours: 3.07,
    paymentHours: 3.07,
  },
  {
    id: 'hr-sd-2',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Default',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',

    empNo: '345679',
    empName: 'Johanna Mul',

    date: '2025-03-16',
    timeIn: 7,
    timeOut: 12,
    scanIn: 6.41,
    scanOut: 12.02,
    workhours: 5,
    totalHours: 5.21,
    paymentHours: 5.21,
  },
]

/**
 * History rows per employee (bottom panel).
 * Keys are empNo from timeRows above.
 */
export const timeHistoryMap: Record<string, TimeHistoryRow[]> = {
  '254875': [
    {
      id: 'h-254875-2025-03-15',
      date: '2025-03-15',
      timeIn: 13,
      timeOut: 16,
      scanIn: 13.07,
      scanOut: 16.01,
      late: 7,
      workhours: 2.52,
      totalHours: 2.53,
      paymentHours: 2.53,
    },
    {
      id: 'h-254875-2024-12-14',
      date: '2024-12-14',
      timeIn: 7,
      timeOut: 12,
      scanIn: 7.12,
      scanOut: 12.05,
      workhours: 4.9,
      totalHours: 5.0,
      paymentHours: 5.0,
    },
  ],
  '123456': [
    {
      id: 'h-123456-2025-03-10',
      date: '2025-03-10',
      timeIn: 13,
      timeOut: 16,
      scanIn: 13.02,
      scanOut: 16.0,
      late: 2,
      workhours: 2.9,
      totalHours: 3.0,
      paymentHours: 3.0,
    },
  ],
  '234567': [
    {
      id: 'h-234567-2025-03-11',
      date: '2025-03-11',
      timeIn: 7,
      timeOut: 12,
      scanIn: 6.45,
      scanOut: 12.01,
      workhours: 5,
      totalHours: 5.2,
      paymentHours: 5.2,
    },
  ],
  '345678': [
    {
      id: 'h-345678-2025-03-13',
      date: '2025-03-13',
      timeIn: 13,
      timeOut: 16,
      scanIn: 12.55,
      scanOut: 16.05,
      workhours: 3,
      totalHours: 3.05,
      paymentHours: 3.05,
    },
  ],
  '345679': [
    {
      id: 'h-345679-2025-03-12',
      date: '2025-03-12',
      timeIn: 7,
      timeOut: 12,
      scanIn: 6.4,
      scanOut: 12.03,
      workhours: 5,
      totalHours: 5.18,
      paymentHours: 5.18,
    },
  ],
}
