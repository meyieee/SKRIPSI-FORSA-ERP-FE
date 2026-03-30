// workforce-tracking/components/leave/dummy/leaveTravelDummy.ts

export type LeaveRow = {
  id: string
  empNo: string
  empName: string
  jobTitle: string
  requestPurpose: 'Annual Leave' | 'Roster' | 'Company Business' | 'Training' | string
  noOfPerson: number
  departure: string // YYYY-MM-DD
  returnDate: string // YYYY-MM-DD
  noOfDays: number
  returnToWork: string // YYYY-MM-DD
  requestDate: string // YYYY-MM-DD

  // grouping
  siteBranch: string
  department: string
  section: string
  element?: string
  workgroup: string
  crew: string
}

export const leaveRows: LeaveRow[] = [
  // ===================== OPERATION DEPARTMENT =====================
  // Crew A
  {
    id: 'op-a-1',
    empNo: '254875',
    empName: 'Eduard Salindeho',
    jobTitle: 'Haul Supervisor',
    requestPurpose: 'Annual Leave',
    noOfPerson: 3,
    departure: '2025-06-01',
    returnDate: '2025-06-22',
    noOfDays: 21,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Leave',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-2',
    empNo: '123456',
    empName: 'Vallerie Joanna',
    jobTitle: 'Operator',
    requestPurpose: 'Roster',
    noOfPerson: 1,
    departure: '2025-01-25',
    returnDate: '2025-02-08',
    noOfDays: 14,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Leave',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-3',
    empNo: '123457',
    empName: 'Silvie Tong',
    jobTitle: 'Operator',
    requestPurpose: 'Roster',
    noOfPerson: 1,
    departure: '2025-02-15',
    returnDate: '2025-03-01',
    noOfDays: 14,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Leave',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },

  // Crew B
  {
    id: 'op-b-1',
    empNo: '234567',
    empName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
    requestPurpose: 'Annual Leave',
    noOfPerson: 2,
    departure: '2025-04-25',
    returnDate: '2025-05-16',
    noOfDays: 21,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Leave',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },
  {
    id: 'op-b-2',
    empNo: '234568',
    empName: 'Jun Hale',
    jobTitle: 'Operator',
    requestPurpose: 'Roster',
    noOfPerson: 1,
    departure: '2025-01-25',
    returnDate: '2025-02-08',
    noOfDays: 14,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Leave',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },

  // ===================== HUMAN RESOURCE DEPARTMENT =====================
  {
    id: 'hr-1',
    empNo: '345678',
    empName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
    requestPurpose: 'Annual Leave',
    noOfPerson: 4,
    departure: '2025-06-01',
    returnDate: '2025-06-22',
    noOfDays: 21,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Leave',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
  },
  {
    id: 'hr-2',
    empNo: '345679',
    empName: 'Johanna Mul',
    jobTitle: 'HR Officer',
    requestPurpose: 'Annual Leave',
    noOfPerson: 3,
    departure: '2025-01-25',
    returnDate: '2025-02-08',
    noOfDays: 14,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Leave',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
  },

  // ===================== MAINTENANCE DEPARTMENT =====================
  // Workshop Day
  {
    id: 'mnt-d-1',
    empNo: '456700',
    empName: 'Bima Prakoso',
    jobTitle: 'Workshop Supervisor',
    requestPurpose: 'Company Business',
    noOfPerson: 1,
    departure: '2025-03-05',
    returnDate: '2025-03-09',
    noOfDays: 4,
    returnToWork: '2025-03-10',
    requestDate: '2025-02-20',
    siteBranch: 'Head Site A',
    department: 'Maintenance Department',
    section: 'Workshop',
    element: 'Travel',
    workgroup: 'Maintenance Workshop',
    crew: 'Day',
  },
  {
    id: 'mnt-d-2',
    empNo: '456701',
    empName: 'Kirana W.',
    jobTitle: 'Mechanic',
    requestPurpose: 'Training',
    noOfPerson: 1,
    departure: '2025-04-02',
    returnDate: '2025-04-06',
    noOfDays: 4,
    returnToWork: '2025-04-07',
    requestDate: '2025-03-10',
    siteBranch: 'Head Site A',
    department: 'Maintenance Department',
    section: 'Workshop',
    element: 'Training',
    workgroup: 'Maintenance Workshop',
    crew: 'Day',
  },

  // Workshop Night
  {
    id: 'mnt-n-1',
    empNo: '456702',
    empName: 'Samsul Haris',
    jobTitle: 'Welder',
    requestPurpose: 'Annual Leave',
    noOfPerson: 1,
    departure: '2025-07-01',
    returnDate: '2025-07-21',
    noOfDays: 20,
    returnToWork: '2025-07-22',
    requestDate: '2025-05-15',
    siteBranch: 'Head Site A',
    department: 'Maintenance Department',
    section: 'Workshop',
    element: 'Leave',
    workgroup: 'Maintenance Workshop',
    crew: 'Night',
  },

  // ===================== SUPPLY CHAIN =====================
  // Logistics Team
  {
    id: 'sc-l-1',
    empNo: '567800',
    empName: 'Rahma Ayu',
    jobTitle: 'Logistics Coordinator',
    requestPurpose: 'Company Business',
    noOfPerson: 2,
    departure: '2025-02-18',
    returnDate: '2025-02-20',
    noOfDays: 2,
    returnToWork: '2025-02-21',
    requestDate: '2025-02-10',
    siteBranch: 'Head Site B',
    department: 'Supply Chain Department',
    section: 'Logistics',
    element: 'Travel',
    workgroup: 'Supply Logistics',
    crew: 'Team 1',
  },
  {
    id: 'sc-l-2',
    empNo: '567801',
    empName: 'Denny Putra',
    jobTitle: 'Driver',
    requestPurpose: 'Roster',
    noOfPerson: 1,
    departure: '2025-03-01',
    returnDate: '2025-03-15',
    noOfDays: 14,
    returnToWork: '2025-03-16',
    requestDate: '2025-02-22',
    siteBranch: 'Head Site B',
    department: 'Supply Chain Department',
    section: 'Logistics',
    element: 'Leave',
    workgroup: 'Supply Logistics',
    crew: 'Team 1',
  },
  // Procurement Team
  {
    id: 'sc-p-1',
    empNo: '567802',
    empName: 'Maya Sari',
    jobTitle: 'Procurement Officer',
    requestPurpose: 'Training',
    noOfPerson: 1,
    departure: '2025-05-12',
    returnDate: '2025-05-14',
    noOfDays: 2,
    returnToWork: '2025-05-15',
    requestDate: '2025-04-25',
    siteBranch: 'Head Site B',
    department: 'Supply Chain Department',
    section: 'Procurement',
    element: 'Training',
    workgroup: 'Supply Procurement',
    crew: 'Team A',
  },
  {
    id: 'sc-p-2',
    empNo: '567803',
    empName: 'Bagas Ananta',
    jobTitle: 'Procurement Admin',
    requestPurpose: 'Annual Leave',
    noOfPerson: 1,
    departure: '2025-08-05',
    returnDate: '2025-08-19',
    noOfDays: 14,
    returnToWork: '2025-08-20',
    requestDate: '2025-07-10',
    siteBranch: 'Head Site B',
    department: 'Supply Chain Department',
    section: 'Procurement',
    element: 'Leave',
    workgroup: 'Supply Procurement',
    crew: 'Team A',
  },
]

/** ===== Riwayat Leave & Travel per Employee ===== */
export type LeaveHistoryRow = {
  id: string
  empNo: string
  empName: string
  requestDate: string
  requestPurpose: string
  departure: string
  returnDate: string
  noOfDays: number
  noOfPerson: number
  firstDayReturnToWork: string
}

export const leaveHistoryMap: Record<string, LeaveHistoryRow[]> = {
  // ---- Eduard Salindeho (meniru foto) ----
  '254875': [
    {
      id: 'lv-254875-2025-03-10',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      requestDate: '2025-03-10',
      requestPurpose: 'Annual Leave',
      departure: '2025-03-15',
      returnDate: '2025-04-06',
      noOfDays: 22,
      noOfPerson: 3,
      firstDayReturnToWork: '2025-04-06',
    },
    {
      id: 'lv-254875-2024-12-15',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      requestDate: '2024-12-15',
      requestPurpose: 'Annual Leave',
      departure: '2024-12-24',
      returnDate: '2025-01-15',
      noOfDays: 22,
      noOfPerson: 2,
      firstDayReturnToWork: '2025-01-15',
    },
    {
      id: 'lv-254875-2024-08-16',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      requestDate: '2024-08-16',
      requestPurpose: 'Company Business',
      departure: '2024-08-25',
      returnDate: '2024-08-31',
      noOfDays: 6,
      noOfPerson: 1,
      firstDayReturnToWork: '2024-09-16',
    },
    {
      id: 'lv-254875-2024-04-10',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      requestDate: '2024-04-10',
      requestPurpose: 'Training',
      departure: '2024-04-25',
      returnDate: '2024-05-07',
      noOfDays: 12,
      noOfPerson: 1,
      firstDayReturnToWork: '2024-05-07',
    },
  ],

  // ---- Vallerie Joanna ----
  '123456': [
    {
      id: 'lv-123456-2025-01-05',
      empNo: '123456',
      empName: 'Vallerie Joanna',
      requestDate: '2025-01-05',
      requestPurpose: 'Roster',
      departure: '2025-01-10',
      returnDate: '2025-01-24',
      noOfDays: 14,
      noOfPerson: 1,
      firstDayReturnToWork: '2025-01-25',
    },
    {
      id: 'lv-123456-2024-09-02',
      empNo: '123456',
      empName: 'Vallerie Joanna',
      requestDate: '2024-09-02',
      requestPurpose: 'Annual Leave',
      departure: '2024-09-05',
      returnDate: '2024-09-19',
      noOfDays: 14,
      noOfPerson: 1,
      firstDayReturnToWork: '2024-09-20',
    },
  ],

  // ---- Silvie Tong ----
  '123457': [
    {
      id: 'lv-123457-2024-11-12',
      empNo: '123457',
      empName: 'Silvie Tong',
      requestDate: '2024-11-12',
      requestPurpose: 'Roster',
      departure: '2024-11-15',
      returnDate: '2024-11-29',
      noOfDays: 14,
      noOfPerson: 1,
      firstDayReturnToWork: '2024-11-30',
    },
  ],

  // ---- Wong Tiara ----
  '234567': [
    {
      id: 'lv-234567-2024-10-01',
      empNo: '234567',
      empName: 'Wong Tiara',
      requestDate: '2024-10-01',
      requestPurpose: 'Annual Leave',
      departure: '2024-10-10',
      returnDate: '2024-10-31',
      noOfDays: 21,
      noOfPerson: 2,
      firstDayReturnToWork: '2024-11-01',
    },
  ],

  // ---- Jun Hale ----
  '234568': [
    {
      id: 'lv-234568-2024-12-03',
      empNo: '234568',
      empName: 'Jun Hale',
      requestDate: '2024-12-03',
      requestPurpose: 'Roster',
      departure: '2024-12-06',
      returnDate: '2024-12-20',
      noOfDays: 14,
      noOfPerson: 1,
      firstDayReturnToWork: '2024-12-21',
    },
  ],

  // ---- Sesca Londah ----
  '345678': [
    {
      id: 'lv-345678-2024-06-03',
      empNo: '345678',
      empName: 'Sesca Londah',
      requestDate: '2024-06-03',
      requestPurpose: 'Annual Leave',
      departure: '2024-06-10',
      returnDate: '2024-07-01',
      noOfDays: 21,
      noOfPerson: 4,
      firstDayReturnToWork: '2024-07-02',
    },
  ],

  // ---- Johanna Mul ----
  '345679': [
    {
      id: 'lv-345679-2024-01-05',
      empNo: '345679',
      empName: 'Johanna Mul',
      requestDate: '2024-01-05',
      requestPurpose: 'Annual Leave',
      departure: '2024-01-25',
      returnDate: '2024-02-08',
      noOfDays: 14,
      noOfPerson: 3,
      firstDayReturnToWork: '2024-02-09',
    },
  ],

  // ---- Bima Prakoso ----
  '456700': [
    {
      id: 'lv-456700-2025-02-20',
      empNo: '456700',
      empName: 'Bima Prakoso',
      requestDate: '2025-02-20',
      requestPurpose: 'Company Business',
      departure: '2025-03-05',
      returnDate: '2025-03-09',
      noOfDays: 4,
      noOfPerson: 1,
      firstDayReturnToWork: '2025-03-10',
    },
    {
      id: 'lv-456700-2024-07-11',
      empNo: '456700',
      empName: 'Bima Prakoso',
      requestDate: '2024-07-11',
      requestPurpose: 'Training',
      departure: '2024-07-20',
      returnDate: '2024-07-23',
      noOfDays: 3,
      noOfPerson: 1,
      firstDayReturnToWork: '2024-07-24',
    },
  ],

  // ---- Kirana W. ----
  '456701': [
    {
      id: 'lv-456701-2025-03-10',
      empNo: '456701',
      empName: 'Kirana W.',
      requestDate: '2025-03-10',
      requestPurpose: 'Training',
      departure: '2025-04-02',
      returnDate: '2025-04-06',
      noOfDays: 4,
      noOfPerson: 1,
      firstDayReturnToWork: '2025-04-07',
    },
  ],

  // ---- Samsul Haris ----
  '456702': [
    {
      id: 'lv-456702-2025-05-15',
      empNo: '456702',
      empName: 'Samsul Haris',
      requestDate: '2025-05-15',
      requestPurpose: 'Annual Leave',
      departure: '2025-07-01',
      returnDate: '2025-07-21',
      noOfDays: 20,
      noOfPerson: 1,
      firstDayReturnToWork: '2025-07-22',
    },
  ],

  // ---- Rahma Ayu ----
  '567800': [
    {
      id: 'lv-567800-2025-02-10',
      empNo: '567800',
      empName: 'Rahma Ayu',
      requestDate: '2025-02-10',
      requestPurpose: 'Company Business',
      departure: '2025-02-18',
      returnDate: '2025-02-20',
      noOfDays: 2,
      noOfPerson: 2,
      firstDayReturnToWork: '2025-02-21',
    },
  ],

  // ---- Denny Putra ----
  '567801': [
    {
      id: 'lv-567801-2025-02-22',
      empNo: '567801',
      empName: 'Denny Putra',
      requestDate: '2025-02-22',
      requestPurpose: 'Roster',
      departure: '2025-03-01',
      returnDate: '2025-03-15',
      noOfDays: 14,
      noOfPerson: 1,
      firstDayReturnToWork: '2025-03-16',
    },
  ],

  // ---- Maya Sari ----
  '567802': [
    {
      id: 'lv-567802-2025-04-25',
      empNo: '567802',
      empName: 'Maya Sari',
      requestDate: '2025-04-25',
      requestPurpose: 'Training',
      departure: '2025-05-12',
      returnDate: '2025-05-14',
      noOfDays: 2,
      noOfPerson: 1,
      firstDayReturnToWork: '2025-05-15',
    },
  ],

  // ---- Bagas Ananta ----
  '567803': [
    {
      id: 'lv-567803-2025-07-10',
      empNo: '567803',
      empName: 'Bagas Ananta',
      requestDate: '2025-07-10',
      requestPurpose: 'Annual Leave',
      departure: '2025-08-05',
      returnDate: '2025-08-19',
      noOfDays: 14,
      noOfPerson: 1,
      firstDayReturnToWork: '2025-08-20',
    },
  ],
}
