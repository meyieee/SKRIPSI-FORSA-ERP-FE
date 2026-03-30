export type C4 = {craft?: number; staff?: number; expat?: number; total?: number}

export type RecapRow = {
  no: number
  workgroup: string
  current: C4
  additional: C4
  requirement: C4
}

export type RecapBlock = {
  departmentCode: string
  department: string
  rows: RecapRow[]
  siteBranch: string
  section?: string
  element?: string
}

// helper isi total otomatis
export const T = (c: C4): Required<C4> => ({
  craft: c.craft ?? 0,
  staff: c.staff ?? 0,
  expat: c.expat ?? 0,
  total: c.total ?? (c.craft ?? 0) + (c.staff ?? 0) + (c.expat ?? 0),
})

export const recapBlocks: RecapBlock[] = [
  {
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    section: 'Operation',
    rows: [
      {
        no: 1,
        workgroup: '101-Operation Hauling Workgroup',
        current: {craft: 15, staff: 3, expat: 1},
        additional: {craft: 2, staff: 1, expat: 0},
        requirement: {craft: 17, staff: 4, expat: 1},
      },
      {
        no: 2,
        workgroup: '102-Operation Drilling Workgroup',
        current: {craft: 10, staff: 3, expat: 0},
        additional: {craft: 1, staff: 0, expat: 0},
        requirement: {craft: 11, staff: 3, expat: 0},
      },
      {
        no: 3,
        workgroup: '103-Operation Maintenance Workgroup',
        current: {craft: 10, staff: 3, expat: 0},
        additional: {craft: 5, staff: 0, expat: 0},
        requirement: {craft: 15, staff: 3, expat: 0},
      },
    ],
  },

  {
    departmentCode: '2101',
    department: 'Human Resource Department',
    siteBranch: 'Head Site A',
    section: 'HR',
    rows: [
      {
        no: 1,
        workgroup: '201-Human Resource Admin Workgroup',
        current: {craft: 5, staff: 2, expat: 0},
        additional: {craft: 0, staff: 0, expat: 0},
        requirement: {craft: 5, staff: 2, expat: 0},
      },
      {
        no: 2,
        workgroup: '202-Human Resource Payroll Workgroup',
        current: {craft: 2, staff: 1, expat: 0},
        additional: {craft: 0, staff: 0, expat: 0},
        requirement: {craft: 2, staff: 1, expat: 0},
      },
    ],
  },

  {
    departmentCode: '4101',
    department: 'Finance Accounting Department',
    siteBranch: 'Head Site A',
    section: 'Finance',
    rows: [
      {
        no: 1,
        workgroup: '301-Finance Workgroup',
        current: {craft: 4, staff: 2, expat: 1},
        additional: {craft: 0, staff: 1, expat: 0},
        requirement: {craft: 4, staff: 3, expat: 1},
      },
    ],
  },
]
