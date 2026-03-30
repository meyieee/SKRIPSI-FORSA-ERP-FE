export type MedicalDetailRow = {
  id: string
  siteBranch: string
  departmentCode: string
  departmentName: string
  workgroup: string
  crew: 'Crew A' | 'Crew B' | 'Crew Steady Day'
  empNo: string
  fullName: string
  jobTitle: string
  requestPurpose: 'Annual Leave' | 'Roster' | 'Sick Leave' | 'Medical Check'
  noOfPerson: number
  departure: string // YYYY-MM-DD
  returnDate: string // YYYY-MM-DD
  noOfDays: number
  returnToWork: string // YYYY-MM-DD
  requestDate: string // YYYY-MM-DD
  section?: string
  element?: string
}

export const medicalDetailRows: MedicalDetailRow[] = [
  // ===== OPERATION DEPARTMENT – OPERATION HAULING WORKGROUP
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
    requestPurpose: 'Annual Leave',
    noOfPerson: 3,
    departure: '2025-06-01',
    returnDate: '2025-06-22',
    noOfDays: 21,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
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
    requestPurpose: 'Roster',
    noOfPerson: 1,
    departure: '2025-01-25',
    returnDate: '2025-02-08',
    noOfDays: 14,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
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
    requestPurpose: 'Roster',
    noOfPerson: 1,
    departure: '2025-02-15',
    returnDate: '2025-03-01',
    noOfDays: 14,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
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
    requestPurpose: 'Annual Leave',
    noOfPerson: 2,
    departure: '2025-04-25',
    returnDate: '2025-05-16',
    noOfDays: 21,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
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
    requestPurpose: 'Roster',
    noOfPerson: 1,
    departure: '2025-01-25',
    returnDate: '2025-02-08',
    noOfDays: 14,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
  },

  // ===== HUMAN RESOURCE DEPARTMENT – EMPLOYEE ADMIN WORKGROUP (Crew Steady Day)
  {
    id: 'hr-steady-1',
    siteBranch: 'Head Site A',
    departmentCode: '2101',
    departmentName: 'Human Resource Department',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
    empNo: '345678',
    fullName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
    requestPurpose: 'Annual Leave',
    noOfPerson: 4,
    departure: '2025-06-01',
    returnDate: '2025-06-22',
    noOfDays: 21,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
  },
  {
    id: 'hr-steady-2',
    siteBranch: 'Head Site A',
    departmentCode: '2101',
    departmentName: 'Human Resource Department',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
    empNo: '345679',
    fullName: 'Johanna Mul',
    jobTitle: 'HR Officer',
    requestPurpose: 'Annual Leave',
    noOfPerson: 3,
    departure: '2025-01-25',
    returnDate: '2025-02-08',
    noOfDays: 14,
    returnToWork: '2024-12-31',
    requestDate: '2024-01-01',
  },
]
