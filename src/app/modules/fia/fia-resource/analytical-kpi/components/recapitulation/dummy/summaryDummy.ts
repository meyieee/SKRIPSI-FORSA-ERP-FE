// ===== Types + Dummy (sesuai tampilan summary) =====
export type C4 = {craft?: number; staff?: number; expat?: number; total?: number}

export type RecapSummaryRow = {
  no: number
  role: string // Director, Manager, ...
  level: string | number // 6,5,4,3,2,1,A,A1,A2,A3
  current: C4
  additional: C4
  requirement: C4
}

export type RecapSummaryBlock = {
  departmentCode: string
  department: string
  siteBranch: string
  section?: string
  element?: string
  workgroups: Array<{
    code: string
    name: string
    rows: RecapSummaryRow[]
  }>
}

// auto-total jika total tak diisi
export const T = (c: C4): Required<C4> => ({
  craft: c.craft ?? 0,
  staff: c.staff ?? 0,
  expat: c.expat ?? 0,
  total: c.total ?? (c.craft ?? 0) + (c.staff ?? 0) + (c.expat ?? 0),
})

// helper baris standar Level/Role
const ladder = (
  numbers: Partial<
    Record<'curC' | 'curS' | 'curE' | 'addC' | 'addS' | 'addE' | 'reqC' | 'reqS' | 'reqE', number>
  >[] = []
): RecapSummaryRow[] => {
  const defs = [
    {role: 'Director', level: 6},
    {role: 'Manager', level: 5},
    {role: 'General Superintendent', level: 4},
    {role: 'Superintendent', level: 3},
    {role: 'General Foreman', level: 2},
    {role: 'Supervisor', level: 1},
    {role: 'Leader', level: 'A'},
    {role: 'Non Staff Level 1', level: 'A1'},
    {role: 'Non Staff Level 2', level: 'A2'},
    {role: 'Non Staff Level 3', level: 'A3'},
  ]
  return defs.map((d, i) => {
    const n = numbers[i] || {}
    return {
      no: i + 1,
      role: d.role,
      level: d.level,
      current: {craft: n.curC ?? 0, staff: n.curS ?? 0, expat: n.curE ?? 0},
      additional: {craft: n.addC ?? 0, staff: n.addS ?? 0, expat: n.addE ?? 0},
      requirement: {craft: n.reqC ?? 0, staff: n.reqS ?? 0, expat: n.reqE ?? 0},
    }
  })
}

export const recapSummaryBlocks: RecapSummaryBlock[] = [
  {
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    workgroups: [
      {
        code: '10101',
        name: 'Operation Hauling Workgroup',
        rows: ladder([
          {curS: 1, reqS: 1}, // Director
          {curS: 1, reqS: 1}, // Manager
          {curS: 1, reqS: 1}, // Gen Sup
          {curE: 1, reqS: 1}, // Superintendent
          {curS: 0, reqS: 1}, // General Foreman
          {curS: 2, addS: 1, reqS: 3}, // Supervisor
          {reqC: 1}, // Leader
          {curC: 8, addC: 1, reqC: 9}, // A1
          {curC: 4, reqC: 4}, // A2
          {curC: 1, reqC: 1}, // A3
        ]),
      },
      {
        code: '10102',
        name: 'Operation Drilling Workgroup',
        rows: ladder([
          {curS: 1}, // Director
          {curS: 1}, // Manager
          {curS: 1, reqS: 1}, // Gen Sup
          {curE: 1, reqS: 1}, // Superintendent
          {curS: 1, reqS: 1}, // General Foreman
          {curS: 2, reqS: 3}, // Supervisor
          {}, // Leader
          {curC: 4, reqC: 4}, // A1
          {curC: 3, reqC: 3}, // A2
          {}, // A3
        ]),
      },
    ],
  },
]
