export type MedicalRow = {
  id: string
  siteBranch: string
  department: string
  section: string
  element: string
  workgroup: string
  crew: string

  empNo: string
  empName: string
  jobTitle: string

  dateDiagnosis: string // YYYY-MM-DD
  medicalProvider: string
  dateFrom: string
  dateTo: string
  medicalDiagnoses: string
  medicalType: 'In Patient' | 'Out Patient'
}

export type MedicalHistoryRow = {
  id: string
  requestDate: string
  medicalProvider: string
  dateFrom: string
  dateTo: string
  medicalDiagnoses: string
  medicalType: 'In Patient' | 'Out Patient'
}

/** ====== DUMMY TABLE (atas) ====== **/
export const medicalRows: MedicalRow[] = [
  // OPERATION DEPT – Operation Hauling – Crew A
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
    jobTitle: 'Haul Supervisor',

    dateDiagnosis: '2025-06-01',
    medicalProvider: 'Hospital AA',
    dateFrom: '2025-06-01',
    dateTo: '2025-06-22',
    medicalDiagnoses: 'Diabetes',
    medicalType: 'Out Patient',
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
    jobTitle: 'Operator',

    dateDiagnosis: '2025-01-25',
    medicalProvider: 'Hospital AA',
    dateFrom: '2025-01-25',
    dateTo: '2025-02-08',
    medicalDiagnoses: 'Heart Attack',
    medicalType: 'In Patient',
  },
  {
    id: 'op-a-3',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',

    empNo: '123456-2',
    empName: 'Silvie Tong',
    jobTitle: 'Operator',

    dateDiagnosis: '2025-02-15',
    medicalProvider: 'Hospital BB',
    dateFrom: '2025-02-15',
    dateTo: '2025-03-01',
    medicalDiagnoses: 'Working Accident and Injury',
    medicalType: 'In Patient',
  },

  // Crew B
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
    jobTitle: 'Haul Supervisor',

    dateDiagnosis: '2025-04-25',
    medicalProvider: 'dr. Mister AA',
    dateFrom: '2025-04-25',
    dateTo: '2025-05-16',
    medicalDiagnoses: 'Heart Attack',
    medicalType: 'In Patient',
  },
  {
    id: 'op-b-2',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',

    empNo: '234567-2',
    empName: 'Jun Hale',
    jobTitle: 'Operator',

    dateDiagnosis: '2025-01-25',
    medicalProvider: 'dr. Mister AA',
    dateFrom: '2025-01-25',
    dateTo: '2025-02-08',
    medicalDiagnoses: 'Heart Attack',
    medicalType: 'In Patient',
  },

  // HUMAN RESOURCE DEPT – Employee Admin – Crew Steady Day
  {
    id: 'hr-1',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Default',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',

    empNo: '345678',
    empName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',

    dateDiagnosis: '2025-06-01',
    medicalProvider: 'Hospital BB',
    dateFrom: '2025-06-01',
    dateTo: '2025-06-22',
    medicalDiagnoses: 'Diabetes',
    medicalType: 'Out Patient',
  },
  {
    id: 'hr-2',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Default',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',

    empNo: '345679',
    empName: 'Johanna Mul',
    jobTitle: 'HR Officer',

    dateDiagnosis: '2025-01-25',
    medicalProvider: 'Hospital BB',
    dateFrom: '2025-01-25',
    dateTo: '2025-02-08',
    medicalDiagnoses: 'Diabetes',
    medicalType: 'Out Patient',
  },
]

/** ====== DUMMY HISTORY (bawah, dibuka via ikon kalender) ====== **/
export const medicalHistoryMap: Record<string, MedicalHistoryRow[]> = {
  '254875': [
    {
      id: 'mh-254875-2024-11-20',
      requestDate: '2024-11-20',
      medicalProvider: 'Hospital AA',
      dateFrom: '2025-01-25',
      dateTo: '2025-02-08',
      medicalDiagnoses: 'Heart Attack',
      medicalType: 'In Patient',
    },
    {
      id: 'mh-254875-2025-06-01',
      requestDate: '2025-06-01',
      medicalProvider: 'Hospital BB',
      dateFrom: '2025-02-15',
      dateTo: '2025-03-01',
      medicalDiagnoses: 'Working Accident and Injury',
      medicalType: 'In Patient',
    },
  ],
  '123456': [
    {
      id: 'mh-123456-2025-01-25',
      requestDate: '2025-01-25',
      medicalProvider: 'Hospital AA',
      dateFrom: '2025-01-25',
      dateTo: '2025-02-08',
      medicalDiagnoses: 'Heart Attack',
      medicalType: 'In Patient',
    },
  ],
  '123456-2': [
    {
      id: 'mh-123456-2-2025-02-15',
      requestDate: '2025-02-15',
      medicalProvider: 'Hospital BB',
      dateFrom: '2025-02-15',
      dateTo: '2025-03-01',
      medicalDiagnoses: 'Working Accident and Injury',
      medicalType: 'In Patient',
    },
  ],
  '234567': [
    {
      id: 'mh-234567-2025-04-25',
      requestDate: '2025-04-25',
      medicalProvider: 'dr. Mister AA',
      dateFrom: '2025-04-25',
      dateTo: '2025-05-16',
      medicalDiagnoses: 'Heart Attack',
      medicalType: 'In Patient',
    },
  ],
  '234567-2': [
    {
      id: 'mh-234567-2-2025-01-25',
      requestDate: '2025-01-25',
      medicalProvider: 'dr. Mister AA',
      dateFrom: '2025-01-25',
      dateTo: '2025-02-08',
      medicalDiagnoses: 'Heart Attack',
      medicalType: 'In Patient',
    },
  ],
  '345678': [
    {
      id: 'mh-345678-2025-06-01',
      requestDate: '2025-06-01',
      medicalProvider: 'Hospital BB',
      dateFrom: '2025-06-01',
      dateTo: '2025-06-22',
      medicalDiagnoses: 'Diabetes',
      medicalType: 'Out Patient',
    },
  ],
  '345679': [
    {
      id: 'mh-345679-2025-01-25',
      requestDate: '2025-01-25',
      medicalProvider: 'Hospital BB',
      dateFrom: '2025-01-25',
      dateTo: '2025-02-08',
      medicalDiagnoses: 'Diabetes',
      medicalType: 'Out Patient',
    },
  ],
}
