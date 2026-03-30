export type AppraisalRow = {
  id: string
  empNo: string
  empName: string
  jobTitle: string
  appraisalDate: string
  appraisalPeriodStart: string
  appraisalPeriodEnd: string
  appraiser: string
  promotionMerit?: string
  effectiveDate?: string

  siteBranch: string
  department: string
  section: string
  element?: string
  workgroup: string
  crew: string
}

export const appraisalRows: AppraisalRow[] = [
  // Operation Department — Crew A
  {
    id: 'op-a-1',
    empNo: '254875',
    empName: 'Eduard Salindeho',
    jobTitle: 'Haul Supervisor',
    appraisalDate: '2025-01-10',
    appraisalPeriodStart: '2024-01-01',
    appraisalPeriodEnd: '2024-12-31',
    appraiser: 'Kobe Kobistan',
    promotionMerit: '[promotion or Merit Increa]',
    effectiveDate: '',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Performance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-2',
    empNo: '123456',
    empName: 'Vallerie Joanna',
    jobTitle: 'Operator',
    appraisalDate: '2025-01-10',
    appraisalPeriodStart: '2024-01-01',
    appraisalPeriodEnd: '2024-12-31',
    appraiser: 'Kobe Kobistan',
    promotionMerit: '[promotion or Merit Increa]',
    effectiveDate: '',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Performance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },
  {
    id: 'op-a-3',
    empNo: '123456',
    empName: 'Silvie Tong',
    jobTitle: 'Operator',
    appraisalDate: '2025-01-10',
    appraisalPeriodStart: '2024-01-01',
    appraisalPeriodEnd: '2024-12-31',
    appraiser: 'Kobe Kobistan',
    promotionMerit: '[promotion or Merit Increa]',
    effectiveDate: '',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Performance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
  },

  // Operation Department — Crew B
  {
    id: 'op-b-1',
    empNo: '234567',
    empName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
    appraisalDate: '2025-01-10',
    appraisalPeriodStart: '2024-01-01',
    appraisalPeriodEnd: '2024-12-31',
    appraiser: 'Atlas Lala',
    promotionMerit: '[promotion or Merit Increa]',
    effectiveDate: '',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Performance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },
  {
    id: 'op-b-2',
    empNo: '234567',
    empName: 'Jun Hale',
    jobTitle: 'Operator',
    appraisalDate: '2025-01-10',
    appraisalPeriodStart: '2024-01-01',
    appraisalPeriodEnd: '2024-12-31',
    appraiser: 'Atlas Lala',
    promotionMerit: '[promotion or Merit Increa]',
    effectiveDate: '',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Performance',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
  },

  // Human Resource Department — Crew Steady Day
  {
    id: 'hr-1',
    empNo: '345678',
    empName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
    appraisalDate: '2025-01-09',
    appraisalPeriodStart: '2024-01-01',
    appraisalPeriodEnd: '2024-12-31',
    appraiser: 'Muffin Apinton',
    promotionMerit: '[promotion or Merit Increa]',
    effectiveDate: '',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Performance',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
  },
  {
    id: 'hr-2',
    empNo: '345679',
    empName: 'Johanna Mul',
    jobTitle: 'HR Officer',
    appraisalDate: '2025-01-09',
    appraisalPeriodStart: '2024-01-01',
    appraisalPeriodEnd: '2024-12-31',
    appraiser: 'Muffin Apinton',
    promotionMerit: '[promotion or Merit Increa]',
    effectiveDate: '',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Performance',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
  },
]

/** ===== Map Riwayat per Employee (untuk panel bawah) ===== */
export type AppraisalHistoryRow = {
  id: string
  empNo: string
  empName: string
  appraisalDate: string
  appraisalPeriodStart: string
  appraisalPeriodEnd: string
  appraiser: string
  promotionMerit?: string
  effectiveDate?: string
}

export const appraisalHistoryMap: Record<string, AppraisalHistoryRow[]> = {
  // Eduard Salindeho – meniru foto "9-Jan-25 ... 6-Jan-25"
  '254875': [
    {
      id: 'hist-254875-2025-01-09',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      appraisalDate: '2025-01-09',
      appraisalPeriodStart: '2025-01-09',
      appraisalPeriodEnd: '2025-01-09',
      appraiser: 'Kobe Kobistan',
      promotionMerit: '[promotion or Merit Increase]',
      effectiveDate: '',
    },
    {
      id: 'hist-254875-2025-01-08',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      appraisalDate: '2025-01-08',
      appraisalPeriodStart: '2025-01-08',
      appraisalPeriodEnd: '2025-01-08',
      appraiser: 'Kobe Kobistan',
      promotionMerit: '[promotion or Merit Increase]',
      effectiveDate: '',
    },
    {
      id: 'hist-254875-2025-01-07',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      appraisalDate: '2025-01-07',
      appraisalPeriodStart: '2025-01-07',
      appraisalPeriodEnd: '2025-01-07',
      appraiser: 'Kobe Kobistan',
      promotionMerit: '[promotion or Merit Increase]',
      effectiveDate: '',
    },
    {
      id: 'hist-254875-2025-01-06',
      empNo: '254875',
      empName: 'Eduard Salindeho',
      appraisalDate: '2025-01-06',
      appraisalPeriodStart: '2025-01-06',
      appraisalPeriodEnd: '2025-01-06',
      appraiser: 'Kobe Kobistan',
      promotionMerit: '[promotion or Merit Increase]',
      effectiveDate: '',
    },
  ],

  // Default contoh sederhana untuk employee lain (boleh diubah sesuai kebutuhan)
  '123456': [
    {
      id: 'hist-123456-2024-12-20',
      empNo: '123456',
      empName: 'Vallerie Joanna',
      appraisalDate: '2024-12-20',
      appraisalPeriodStart: '2024-01-01',
      appraisalPeriodEnd: '2024-12-20',
      appraiser: 'Kobe Kobistan',
      promotionMerit: '[promotion or Merit Increase]',
      effectiveDate: '',
    },
  ],
  '234567': [
    {
      id: 'hist-234567-2024-12-22',
      empNo: '234567',
      empName: 'Wong Tiara',
      appraisalDate: '2024-12-22',
      appraisalPeriodStart: '2024-01-01',
      appraisalPeriodEnd: '2024-12-22',
      appraiser: 'Atlas Lala',
      promotionMerit: '[promotion or Merit Increase]',
      effectiveDate: '',
    },
  ],
  '345678': [
    {
      id: 'hist-345678-2024-12-15',
      empNo: '345678',
      empName: 'Sesca Londah',
      appraisalDate: '2024-12-15',
      appraisalPeriodStart: '2024-01-01',
      appraisalPeriodEnd: '2024-12-15',
      appraiser: 'Muffin Apinton',
      promotionMerit: '[promotion or Merit Increase]',
      effectiveDate: '',
    },
  ],
  '345679': [
    {
      id: 'hist-345679-2024-12-10',
      empNo: '345679',
      empName: 'Johanna Mul',
      appraisalDate: '2024-12-10',
      appraisalPeriodStart: '2024-01-01',
      appraisalPeriodEnd: '2024-12-10',
      appraiser: 'Muffin Apinton',
      promotionMerit: '[promotion or Merit Increase]',
      effectiveDate: '',
    },
  ],
}
