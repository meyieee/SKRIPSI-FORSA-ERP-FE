// statistic-management/components/plan/dummy/planRosterDetailsDummy.ts

export type RosterCode = 'D' | 'N' | 'O' | 'V' | 'T' | '+' | '' // Day, Night, Off, Vacation, Training, Special, kosong

export type PlanRosterDetailRow = {
  id: number
  empNo: string
  empName: string
  jobTitle: string
  rosterPattern: string // contoh "6-1" / "5-2"
  crew?: string // "Crew A", "Crew B", dst (opsional)
  workgroup: string // "Operation Hauling Workgroup"
  departmentCode: string
  department: string
  siteBranch: string
  section?: string
  element?: string
  days: RosterCode[] // index 0 = tanggal 1
}

// helpers
const d = (codes: string) => codes.split('') as RosterCode[]
const seg = (...parts: string[]) => parts.join('') // hindari eslint no-useless-concat

// ====== DUMMY ======
export const planRosterDetailRows: PlanRosterDetailRow[] = [
  // OPERATION DEPARTMENT
  // Workgroup: Operation Hauling
  {
    id: 1,
    empNo: '254875',
    empName: 'Eduard Salindeho',
    jobTitle: 'Business Analyst',
    rosterPattern: '6-1',
    crew: 'Crew A',
    workgroup: 'Operation Hauling Workgroup',
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    days: d(seg('VVVVOOOONNNNNN', 'OOOONNNNNDD')), // 31 char
  },
  {
    id: 2,
    empNo: '123456',
    empName: 'Vallerie Joanna',
    jobTitle: 'Operation Superintendent',
    rosterPattern: '6-1',
    crew: 'Crew A',
    workgroup: 'Operation Hauling Workgroup',
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    days: d(seg('DDTTTOOOONNNNN', 'DDDDOONNNNN')), // ada T (training)
  },
  {
    id: 3,
    empNo: '123456',
    empName: 'Silvie Tong',
    jobTitle: 'Operation Engineer',
    rosterPattern: '6-1',
    crew: 'Crew A',
    workgroup: 'Operation Hauling Workgroup',
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    days: d(seg('DDDDOOONNNNNNN', 'DDOOOONNNNN')),
  },

  // Crew B
  {
    id: 4,
    empNo: '234567',
    empName: 'Wong Tiara',
    jobTitle: 'Operation Supervisor',
    rosterPattern: '6-1',
    crew: 'Crew B',
    workgroup: 'Operation Hauling Workgroup',
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    days: d(seg('NNOOODDDDDOOO', 'NNNNN•OOO'.replace('•', 'O'))), // contoh variasi
  },
  {
    id: 5,
    empNo: '234567',
    empName: 'Jun Hale',
    jobTitle: 'Operation Superintendent',
    rosterPattern: '6-1',
    crew: 'Crew B',
    workgroup: 'Operation Hauling Workgroup',
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    days: d(seg('NNNNOOOODDDDD', 'OOONNNNNOO')),
  },

  // Crew C
  {
    id: 6,
    empNo: '234567',
    empName: 'Jannice Felicia',
    jobTitle: 'Operation Engineer',
    rosterPattern: '6-1',
    crew: 'Crew C',
    workgroup: 'Operation Hauling Workgroup',
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    days: d(seg('ONNNNNNNOOOO', '+DDOOONNNNN'.replace('+', '+'))),
  },

  // HUMAN RESOURCE DEPARTMENT
  {
    id: 7,
    empNo: '345678',
    empName: 'Sesca Londah',
    jobTitle: 'Human Resource Manager',
    rosterPattern: '5-2',
    crew: 'Crew Steady',
    workgroup: 'Employee Admin Workgroup',
    departmentCode: '1301',
    department: 'Human Resource Department',
    siteBranch: 'Head Site A',
    days: d(seg('DDDDDOONNNNN', 'NNOOONNNNNO')),
  },
  {
    id: 8,
    empNo: '345679',
    empName: 'Johanna Mul',
    jobTitle: 'Admin Supervisor',
    rosterPattern: '5-2',
    crew: 'Crew Steady',
    workgroup: 'Employee Admin Workgroup',
    departmentCode: '1301',
    department: 'Human Resource Department',
    siteBranch: 'Head Site A',
    days: d(seg('DDDDDOONNNNN', 'NNOOONNNNNO')),
  },
]
