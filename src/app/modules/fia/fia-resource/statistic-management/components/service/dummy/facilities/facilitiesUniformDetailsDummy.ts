export type UniformPpeRow = {
  id: number
  departmentCode: string
  departmentName: string
  workgroup: string
  crew?: string
  no: number
  employeeId: string
  employeeName: string
  jobTitle: string
  requestNo: string
  stockCode: string
  stockDesc: string
  consType: string
  qty: number
  receivedDate: string // ISO yyyy-mm-dd
  siteBranch: string
  section?: string
  element?: string
}

export const uniformPpeRows: UniformPpeRow[] = [
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
    requestNo: 'RQS0001',
    stockCode: 'SC00001',
    stockDesc: 'Safety Helmet',
    consType: 'Helmet',
    qty: 1,
    receivedDate: '2025-06-10',
    siteBranch: 'Head Site A',
  },
  {
    id: 2,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    no: 2,
    employeeId: '123456A',
    employeeName: 'Vallerie Joanna',
    jobTitle: 'Operator',
    requestNo: 'RQS0002',
    stockCode: 'SC00002',
    stockDesc: 'Boot Shoes',
    consType: 'Shoes',
    qty: 1,
    receivedDate: '2025-06-11',
    siteBranch: 'Head Site A',
  },
  {
    id: 3,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    no: 3,
    employeeId: '123456B',
    employeeName: 'Silvie Tong',
    jobTitle: 'Operator',
    requestNo: 'RQS0003',
    stockCode: 'SC00003',
    stockDesc: 'Pant Uniform Size 31',
    consType: 'Pants',
    qty: 1,
    receivedDate: '2025-06-12',
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
    employeeId: '234567A',
    employeeName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
    requestNo: 'RQS0004',
    stockCode: 'SC00004',
    stockDesc: 'Safety Uniform Size M',
    consType: 'T-Shirt',
    qty: 1,
    receivedDate: '2025-06-10',
    siteBranch: 'Head Site A',
  },
  {
    id: 5,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    no: 2,
    employeeId: '234567B',
    employeeName: 'Jun Hale',
    jobTitle: 'Operator',
    requestNo: 'RQS0005',
    stockCode: 'SC00005',
    stockDesc: 'Safety Glasses',
    consType: 'Glasses',
    qty: 1,
    receivedDate: '2025-06-11',
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
    requestNo: 'RQS0006',
    stockCode: 'SC00006',
    stockDesc: 'Working Vest',
    consType: 'Vest',
    qty: 1,
    receivedDate: '2025-06-10',
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
    requestNo: 'RQS0007',
    stockCode: 'SC00002',
    stockDesc: 'Boot Shoes',
    consType: 'Shoes',
    qty: 1,
    receivedDate: '2025-06-11',
    siteBranch: 'Head Site A',
  },
]
