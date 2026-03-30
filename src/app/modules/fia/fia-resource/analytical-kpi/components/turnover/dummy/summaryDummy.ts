// src/app/.../dummy/turnoverSummaryDummy.ts

export type TurnoverC4 = {craft?: number; staff?: number; expat?: number; total?: number}

export type TurnoverRow = {
  no: number
  workgroup: string
  opening: TurnoverC4
  hire: TurnoverC4
  left: TurnoverC4
  closing: TurnoverC4
  rate: string
}

export type TurnoverBlock = {
  departmentCode: string
  department: string
  rows: TurnoverRow[]
}

export const T = (c: TurnoverC4): Required<TurnoverC4> => ({
  craft: c.craft ?? 0,
  staff: c.staff ?? 0,
  expat: c.expat ?? 0,
  total: c.total ?? (c.craft ?? 0) + (c.staff ?? 0) + (c.expat ?? 0),
})

export const turnoverBlocks: TurnoverBlock[] = [
  {
    departmentCode: '1101',
    department: 'Operation Department',
    rows: [
      {
        no: 1,
        workgroup: '101-Operation Hauling Workgroup',
        opening: {craft: 15, staff: 3, expat: 1},
        hire: {craft: 1, staff: 0, expat: 0},
        left: {craft: 1, staff: 0, expat: 0},
        closing: {craft: 16, staff: 2, expat: 1},
        rate: '5%',
      },
      {
        no: 2,
        workgroup: '102-Operation Drilling Workgroup',
        opening: {craft: 10, staff: 3, expat: 0},
        hire: {craft: 0, staff: 0, expat: 0},
        left: {craft: 0, staff: 0, expat: 0},
        closing: {craft: 11, staff: 3, expat: 0},
        rate: '0%',
      },
      {
        no: 3,
        workgroup: '103-Operation Maintenance Workgroup',
        opening: {craft: 6, staff: 3, expat: 0},
        hire: {craft: 3, staff: 0, expat: 0},
        left: {craft: 0, staff: 0, expat: 0},
        closing: {craft: 9, staff: 3, expat: 0},
        rate: '0%',
      },
    ],
  },
  {
    departmentCode: '2101',
    department: 'Human Resource Department',
    rows: [
      {
        no: 1,
        workgroup: '201-Human Resource Admin Workgroup',
        opening: {craft: 5, staff: 2, expat: 0},
        hire: {craft: 0, staff: 0, expat: 0},
        left: {craft: 1, staff: 0, expat: 0},
        closing: {craft: 4, staff: 2, expat: 0},
        rate: '17%',
      },
      {
        no: 2,
        workgroup: '202-Human Resource Payroll Workgroup',
        opening: {craft: 2, staff: 1, expat: 0},
        hire: {craft: 0, staff: 0, expat: 0},
        left: {craft: 0, staff: 0, expat: 0},
        closing: {craft: 3, staff: 1, expat: 0},
        rate: '11%',
      },
    ],
  },
  {
    departmentCode: '4101',
    department: 'Finance Accounting Department',
    rows: [
      {
        no: 1,
        workgroup: '301-Finance Workgroup',
        opening: {craft: 4, staff: 2, expat: 1},
        hire: {craft: 0, staff: 0, expat: 0},
        left: {craft: 0, staff: 0, expat: 0},
        closing: {craft: 4, staff: 2, expat: 1},
        rate: '0%',
      },
    ],
  },
]
