export type ContractRow = {
  id: string
  empNo: string
  empName: string
  jobTitle: string
  contractNo: string
  contractType:
    | 'Permanent'
    | 'Fixed-Term Contract'
    | 'Temporary Contract'
    | 'Probation Contract'
    | string
  noOfContract: string // e.g., "Contract #1"
  contractDate: string // YYYY-MM-DD (start)
  completionDate: string // YYYY-MM-DD (end)
  expireDays: number // +: sisa hari, -: lewat
  createdDate: string // YYYY-MM-DD (dokumen dibuat)

  // grouping
  siteBranch: string
  department: string
  section: string
  element?: string
  workgroup: string
  crew: string
}

export const contractRows: ContractRow[] = [
  // ===== Operation Department — Crew A
  {
    id: 'op-a-1',
    empNo: '254875',
    empName: 'Eduard Salindeho',
    jobTitle: 'Haul Supervisor',
    contractNo: 'EMC-2508001',
    contractType: 'Permanent',
    noOfContract: 'Contract #3',
    contractDate: '2025-06-01',
    completionDate: '2025-09-23',
    expireDays: 18,
    createdDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Employment Contract',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-2',
    empNo: '123456',
    empName: 'Vallerie Joanna',
    jobTitle: 'Operator',
    contractNo: 'EMC-2508002',
    contractType: 'Fixed-Term Contract',
    noOfContract: 'Contract #1',
    contractDate: '2025-01-25',
    completionDate: '2025-09-27',
    expireDays: -94,
    createdDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Employment Contract',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-3',
    empNo: '1234567',
    empName: 'Silvie Tong',
    jobTitle: 'Operator',
    contractNo: 'EMC-2508003',
    contractType: 'Probation Contract',
    noOfContract: 'Contract #1',
    contractDate: '2025-02-15',
    completionDate: '2025-09-13',
    expireDays: 10,
    createdDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Employment Contract',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },

  // ===== Operation Department — Crew B
  {
    id: 'op-b-1',
    empNo: '234567',
    empName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
    contractNo: 'EMC-2508004',
    contractType: 'Permanent',
    noOfContract: 'Contract #1',
    contractDate: '2025-04-25',
    completionDate: '2025-09-27',
    expireDays: 11,
    createdDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Employment Contract',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },
  {
    id: 'op-b-2',
    empNo: '234568',
    empName: 'Jun Hale',
    jobTitle: 'Operator',
    contractNo: 'EMC-2508005',
    contractType: 'Temporary Contract',
    noOfContract: 'Contract #1',
    contractDate: '2025-01-25',
    completionDate: '2025-10-03',
    expireDays: -6,
    createdDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Employment Contract',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },

  // ===== Human Resource Department — Crew Steady Day
  {
    id: 'hr-1',
    empNo: '345678',
    empName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
    contractNo: 'EMC-2508006',
    contractType: 'Temporary Contract',
    noOfContract: 'Contract #1',
    contractDate: '2025-06-01',
    completionDate: '2025-09-23',
    expireDays: 7,
    createdDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Employment Contract',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
  },
  {
    id: 'hr-2',
    empNo: '345679',
    empName: 'Johanna Mul',
    jobTitle: 'HR Officer',
    contractNo: 'EMC-2508007',
    contractType: 'Temporary Contract',
    noOfContract: 'Contract #1',
    contractDate: '2025-01-25',
    completionDate: '2025-09-23',
    expireDays: -5,
    createdDate: '2024-01-01',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Employment Contract',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
  },
]

/** ===== Riwayat Kontrak per Employee ===== */
export type ContractHistoryRow = {
  id: string
  empNo: string
  empName: string
  createdDate: string // tanggal dokumen dibuat (kolom "Contract Date" pertama di panel)
  contractNo: string
  noOfContract: string
  contractType: string
  contractDate: string // start
  completionDate: string // end
}

export const contractHistoryMap: Record<string, ContractHistoryRow[]> = {
  '254875': [
    {
      id: 'ch-254875-2025-03-10',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      createdDate: '2025-03-10',
      contractNo: 'EMC-240610',
      noOfContract: 'Contract #2',
      contractType: 'Temporary Contract',
      contractDate: '2025-03-15',
      completionDate: '2025-04-06',
    },
    {
      id: 'ch-254875-2024-12-15',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      createdDate: '2024-12-15',
      contractNo: 'EMC240103',
      noOfContract: 'Contract #1',
      contractType: 'Probation Contract',
      contractDate: '2024-12-24',
      completionDate: '2025-01-15',
    },
  ],
  '123456': [
    {
      id: 'ch-123456-2024-11-10',
      empNo: '123456',
      empName: 'Vallerie Joanna',
      createdDate: '2024-11-10',
      contractNo: 'EMC-241110',
      noOfContract: 'Contract #1',
      contractType: 'Fixed-Term Contract',
      contractDate: '2024-11-15',
      completionDate: '2025-05-15',
    },
  ],
  '1234567': [
    {
      id: 'ch-1234567-2025-01-20',
      empNo: '1234567',
      empName: 'Silvie Tong',
      createdDate: '2025-01-20',
      contractNo: 'EMC-250120',
      noOfContract: 'Contract #1',
      contractType: 'Probation Contract',
      contractDate: '2025-02-15',
      completionDate: '2025-09-13',
    },
  ],
  '234567': [
    {
      id: 'ch-234567-2024-10-01',
      empNo: '234567',
      empName: 'Wong Tiara',
      createdDate: '2024-10-01',
      contractNo: 'EMC-241001',
      noOfContract: 'Contract #1',
      contractType: 'Permanent',
      contractDate: '2024-10-10',
      completionDate: '2025-09-27',
    },
  ],
  '234568': [
    {
      id: 'ch-234568-2024-12-03',
      empNo: '234568',
      empName: 'Jun Hale',
      createdDate: '2024-12-03',
      contractNo: 'EMC-241203',
      noOfContract: 'Contract #1',
      contractType: 'Temporary Contract',
      contractDate: '2025-01-25',
      completionDate: '2025-10-03',
    },
  ],
  '345678': [
    {
      id: 'ch-345678-2024-06-03',
      empNo: '345678',
      empName: 'Sesca Londah',
      createdDate: '2024-06-03',
      contractNo: 'EMC-240603',
      noOfContract: 'Contract #1',
      contractType: 'Temporary Contract',
      contractDate: '2025-06-01',
      completionDate: '2025-09-23',
    },
  ],
  '345679': [
    {
      id: 'ch-345679-2024-01-05',
      empNo: '345679',
      empName: 'Johanna Mul',
      createdDate: '2024-01-05',
      contractNo: 'EMC-240105',
      noOfContract: 'Contract #1',
      contractType: 'Temporary Contract',
      contractDate: '2025-01-25',
      completionDate: '2025-09-23',
    },
  ],
}
