export type WorkforceAssetRow = {
  id: number
  departmentCode: string
  departmentName: string
  workgroup: string
  crew?: string
  no: number
  employeeId: string
  employeeName: string
  jobTitle: string
  assetNo: string
  assetDesc: string
  assetType: string
  model: string
  serialNo: string
  condition: 'Good' | 'Fair' | 'Bad'
  siteBranch: string
  section?: string
  element?: string
  date?: string
}

export const workforceAssetRows: WorkforceAssetRow[] = [
  // OPERATION – Crew A
  {
    id: 1,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    no: 1,
    employeeId: '254875',
    employeeName: 'Eduard Salindeho',
    jobTitle: 'Haul Supervisor',
    assetNo: 'LAP001',
    assetDesc: 'Laptop',
    assetType: 'Computer Hardware',
    model: 'LPModelA',
    serialNo: 'X12345',
    condition: 'Good',
    siteBranch: 'Head Site A',
  },
  {
    id: 2,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    no: 2,
    employeeId: '123456',
    employeeName: 'Vallerie Joanna',
    jobTitle: 'Operator',
    assetNo: 'PC003',
    assetDesc: 'Personal Computer',
    assetType: 'Computer Hardware',
    model: 'PCModelZ',
    serialNo: 'X75640',
    condition: 'Good',
    siteBranch: 'Head Site A',
  },
  {
    id: 3,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    no: 3,
    employeeId: '123456',
    employeeName: 'Silvie Tong',
    jobTitle: 'Operator',
    assetNo: 'PRN010',
    assetDesc: 'Printer',
    assetType: 'Computer Hardware',
    model: 'PRINTXXX',
    serialNo: 'PXT250',
    condition: 'Good',
    siteBranch: 'Head Site A',
  },

  // OPERATION – Crew B
  {
    id: 4,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    no: 1,
    employeeId: '234567',
    employeeName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
    assetNo: 'PC003',
    assetDesc: 'Personal Computer',
    assetType: 'Computer Hardware',
    model: 'PCModelZ',
    serialNo: 'X75640',
    condition: 'Good',
    siteBranch: 'Head Site A',
  },
  {
    id: 5,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    no: 2,
    employeeId: '234567',
    employeeName: 'Jun Hale',
    jobTitle: 'Operator',
    assetNo: 'PRN010',
    assetDesc: 'Printer',
    assetType: 'Computer Hardware',
    model: 'PRINTXXX',
    serialNo: 'PXT250',
    condition: 'Good',
    siteBranch: 'Head Site A',
  },

  // HR – Crew Steady Day
  {
    id: 6,
    departmentCode: '2101',
    departmentName: 'Human Resource Department',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
    no: 1,
    employeeId: '345678',
    employeeName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
    assetNo: 'PRN010',
    assetDesc: 'Printer',
    assetType: 'Computer Hardware',
    model: 'PRINTXXX',
    serialNo: 'PXT250',
    condition: 'Good',
    siteBranch: 'Head Site A',
  },
  {
    id: 7,
    departmentCode: '2101',
    departmentName: 'Human Resource Department',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
    no: 2,
    employeeId: '345679',
    employeeName: 'Johanna Mul',
    jobTitle: 'HR Officer',
    assetNo: 'PHN001',
    assetDesc: 'Mobile Phone',
    assetType: 'Communication',
    model: 'MOBX23',
    serialNo: 'Z007',
    condition: 'Good',
    siteBranch: 'Head Site A',
  },
]
