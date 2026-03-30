export type Count4 = {staff?: number; non?: number; expat?: number; total?: number}

export type MovementSummaryLevel = {
  no: number
  level: string // 6, 5, 4, 3, 2, 1, A, A1, ...
  title: string // Director, Manager, ...
  current: Count4
  hire: Count4
  left: Count4
  requirement: Count4
}

export type MovementSummaryBlock = {
  departmentCode: string
  department: string
  workgroup: string
  rows: MovementSummaryLevel[]
  siteBranch: string
  section?: string
  element?: string
}

const T = (c: Count4): Required<Count4> => ({
  staff: c.staff ?? 0,
  non: c.non ?? 0,
  expat: c.expat ?? 0,
  total: c.total ?? (c.staff ?? 0) + (c.non ?? 0) + (c.expat ?? 0),
})

export const movementSummaryBlocks: MovementSummaryBlock[] = [
  {
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    rows: [
      {
        no: 1,
        level: '6',
        title: 'Director',
        current: T({staff: 1, non: 0, expat: 0}),
        hire: T({}),
        left: T({}),
        requirement: T({staff: 1}),
      },
      {
        no: 2,
        level: '5',
        title: 'Manager',
        current: T({staff: 1}),
        hire: T({staff: 1, non: 1}),
        left: T({}),
        requirement: T({staff: 2}),
      },
      {
        no: 3,
        level: '4',
        title: 'General Superintendent',
        current: T({staff: 1}),
        hire: T({staff: 1}),
        left: T({}),
        requirement: T({staff: 2}),
      },
      {
        no: 4,
        level: '3',
        title: 'Superintendent',
        current: T({staff: 1}),
        hire: T({}),
        left: T({}),
        requirement: T({staff: 1}),
      },
      {
        no: 5,
        level: '2',
        title: 'General Foreman',
        current: T({staff: 1}),
        hire: T({}),
        left: T({staff: 1}),
        requirement: T({staff: 1}),
      },
      {
        no: 6,
        level: '1',
        title: 'Supervisor',
        current: T({staff: 1}),
        hire: T({non: 1}),
        left: T({}),
        requirement: T({staff: 1}),
      },
      {
        no: 7,
        level: 'A',
        title: 'Leader',
        current: T({non: 1}),
        hire: T({}),
        left: T({}),
        requirement: T({non: 1}),
      },
      {
        no: 8,
        level: 'A1',
        title: 'Non Staff Level 1',
        current: T({non: 1}),
        hire: T({}),
        left: T({}),
        requirement: T({non: 1}),
      },
      {
        no: 9,
        level: 'A2',
        title: 'Non Staff Level 2',
        current: T({non: 1}),
        hire: T({}),
        left: T({}),
        requirement: T({non: 1}),
      },
      {
        no: 10,
        level: 'A3',
        title: 'Non Staff Level 3',
        current: T({non: 1}),
        hire: T({}),
        left: T({}),
        requirement: T({non: 1}),
      },
    ],
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },

  // contoh tambahan (optional), biar subtotal/grand total keliatan
  {
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    rows: [
      {
        no: 1,
        level: '5',
        title: 'Manager',
        current: T({staff: 1}),
        hire: T({}),
        left: T({}),
        requirement: T({staff: 1}),
      },
      {
        no: 2,
        level: '3',
        title: 'Superintendent',
        current: T({staff: 0, non: 1}),
        hire: T({non: 1}),
        left: T({}),
        requirement: T({non: 2}),
      },
      {
        no: 3,
        level: 'A1',
        title: 'Non Staff Level 1',
        current: T({non: 1}),
        hire: T({}),
        left: T({}),
        requirement: T({non: 1}),
      },
    ],
    siteBranch: 'Head Site A',
    section: 'Admin General',
  },
]
