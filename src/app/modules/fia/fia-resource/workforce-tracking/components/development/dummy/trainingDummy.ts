export type TrainingRow = {
  id: string
  empNo: string
  empName: string
  jobTitle: string
  trainingProgram: string
  trainingDate: string // YYYY-MM-DD
  duration: string // e.g. "3 Days"
  location: string
  provider: string

  // for filters / grouping
  siteBranch: string
  department: string
  section: string
  element?: string
  workgroup: string
  crew: string
}

export const trainingRows: TrainingRow[] = [
  // Operation Department — Crew A
  {
    id: 'op-a-1',
    empNo: '254875',
    empName: 'Eduard Salindeho',
    jobTitle: 'Haul Supervisor',
    trainingProgram: 'Supervisory Training Program',
    trainingDate: '2025-01-10',
    duration: '2 Days',
    location: 'Admin Building Conference',
    provider: 'In-house Trainer',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Training',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-2',
    empNo: '123456',
    empName: 'Vallerie Joanna',
    jobTitle: 'Operator',
    trainingProgram: 'Haul Truck Skill Training',
    trainingDate: '2025-01-10',
    duration: '3 Days',
    location: 'Admin Building Conference',
    provider: 'In-house Trainer',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Training',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-3',
    empNo: '123456',
    empName: 'Silvie Tong',
    jobTitle: 'Operator',
    trainingProgram: 'Haul Truck Skill Training',
    trainingDate: '2025-01-10',
    duration: '3 Days',
    location: 'Admin Building Conference',
    provider: 'In-house Trainer',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Training',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },

  // Operation Department — Crew B
  {
    id: 'op-b-1',
    empNo: '234567',
    empName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
    trainingProgram: 'Supervisory Training Program',
    trainingDate: '2025-01-10',
    duration: '2 Days',
    location: 'Admin Building Conference',
    provider: 'In-house Trainer',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Training',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },
  {
    id: 'op-b-2',
    empNo: '234567',
    empName: 'Jun Hale',
    jobTitle: 'Operator',
    trainingProgram: 'Haul Truck Skill Training',
    trainingDate: '2025-01-10',
    duration: '3 Days',
    location: 'Admin Building Conference',
    provider: 'In-house Trainer',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Training',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },

  // Human Resource Department — Crew Steady Day
  {
    id: 'hr-1',
    empNo: '345678',
    empName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
    trainingProgram: 'Leadership Advance Program',
    trainingDate: '2025-01-09',
    duration: '1 Day',
    location: 'Admin Building Conference',
    provider: 'Management Inst.',
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
    jobTitle: 'HR Officer',
    trainingProgram: 'Supervisory Training Program',
    trainingDate: '2025-01-09',
    duration: '7 Days',
    location: 'Admin Building Conference',
    provider: 'In-house Trainer',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Training',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
  },
]

/** ===== Riwayat Training per Employee (untuk panel bawah) ===== */
export type TrainingHistoryRow = {
  id: string
  empNo: string
  empName: string
  trainingDate: string // YYYY-MM-DD
  duration: string
  trainingProgram: string
  trainingLocation: string
  trainingProvider: string
}

export const trainingHistoryMap: Record<string, TrainingHistoryRow[]> = {
  // Meniru pola foto untuk Eduard (tanggal terbaru di atas bisa Anda sesuaikan)
  '254875': [
    {
      id: 'th-254875-2025-01-05',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      trainingDate: '2025-01-05',
      duration: '3 Days',
      trainingProgram: 'Haul Truck Operator Training',
      trainingLocation: 'Admin Building Conference',
      trainingProvider: 'In-house Trainer',
    },
    {
      id: 'th-254875-2024-11-10',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      trainingDate: '2024-11-10',
      duration: '3 Days',
      trainingProgram: 'Drill Skill Training',
      trainingLocation: 'Admin Building Conference',
      trainingProvider: 'In-house Trainer',
    },
    {
      id: 'th-254875-2024-06-10',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      trainingDate: '2024-06-10',
      duration: '3 Days',
      trainingProgram: 'Dozer Operator Training',
      trainingLocation: 'Admin Building Conference',
      trainingProvider: 'In-house Trainer',
    },
    {
      id: 'th-254875-2024-02-03',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      trainingDate: '2024-02-03',
      duration: '3 Days',
      trainingProgram: 'Excavator Operator Training',
      trainingLocation: 'Admin Building Conference',
      trainingProvider: 'In-house Trainer',
    },
  ],

  // contoh lain (opsional; silakan ganti sesuai data Anda)
  '123456': [
    {
      id: 'th-123456-2024-12-01',
      empNo: '123456',
      empName: 'Vallerie Joanna',
      trainingDate: '2024-12-01',
      duration: '2 Days',
      trainingProgram: 'Safety Refresh Training',
      trainingLocation: 'Admin Building Conference',
      trainingProvider: 'In-house Trainer',
    },
  ],
  '234567': [
    {
      id: 'th-234567-2024-10-20',
      empNo: '234567',
      empName: 'Wong Tiara',
      trainingDate: '2024-10-20',
      duration: '2 Days',
      trainingProgram: 'Supervisor Leadership',
      trainingLocation: 'Admin Building Conference',
      trainingProvider: 'In-house Trainer',
    },
  ],
  '345678': [
    {
      id: 'th-345678-2024-09-18',
      empNo: '345678',
      empName: 'Sesca Londah',
      trainingDate: '2024-09-18',
      duration: '1 Day',
      trainingProgram: 'People Management 101',
      trainingLocation: 'Admin Building Conference',
      trainingProvider: 'Management Inst.',
    },
  ],
  '345679': [
    {
      id: 'th-345679-2024-08-05',
      empNo: '345679',
      empName: 'Johanna Mul',
      trainingDate: '2024-08-05',
      duration: '5 Days',
      trainingProgram: 'HR Compliance Bootcamp',
      trainingLocation: 'Admin Building Conference',
      trainingProvider: 'In-house Trainer',
    },
  ],
}
