// ../dummy/accountabilitySummaryDummy.ts

export type EmpCount = {
  nonStaff?: number
  staff?: number
  total?: number
}

export type WorkingDays = {
  total?: number
  average?: number
}

export type AccSummaryRow = {
  no: number
  workgroup: string
  numberEmployee: EmpCount
  workingDays: WorkingDays
  totalLostDays: number
  monthlyAbsenceRate: string
}

export type AccSummaryBlock = {
  departmentCode: string
  department: string
  rows: AccSummaryRow[]
}

export const accountabilitySummaryBlocks: AccSummaryBlock[] = [
  {
    departmentCode: '1101',
    department: 'Operation Department',
    rows: [
      {
        no: 1,
        workgroup: '101-Operation Hauling Workgroup',
        numberEmployee: {nonStaff: 4, staff: 2, total: 6},
        workingDays: {total: 150, average: 25},
        totalLostDays: 15,
        monthlyAbsenceRate: '10%',
      },
      {
        no: 2,
        workgroup: '102-Operation Drilling Workgroup',
        numberEmployee: {nonStaff: 4, staff: 3, total: 7},
        workingDays: {total: 175, average: 25},
        totalLostDays: 14,
        monthlyAbsenceRate: '8%',
      },
      {
        no: 3,
        workgroup: '103-Operation Maintenance Workgroup',
        numberEmployee: {nonStaff: 2, staff: 1, total: 3},
        workingDays: {total: 75, average: 25},
        totalLostDays: 12,
        monthlyAbsenceRate: '16%',
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
        numberEmployee: {nonStaff: 1, staff: 0, total: 1},
        workingDays: {total: 25, average: 25},
        totalLostDays: 15,
        monthlyAbsenceRate: '60%',
      },
      {
        no: 2,
        workgroup: '202-Human Resource Payroll Workgroup',
        numberEmployee: {nonStaff: 1, staff: 0, total: 1},
        workingDays: {total: 25, average: 25},
        totalLostDays: 13,
        monthlyAbsenceRate: '52%',
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
        numberEmployee: {nonStaff: 2, staff: 1, total: 3},
        workingDays: {total: 75, average: 25},
        totalLostDays: 20,
        monthlyAbsenceRate: '27%',
      },
    ],
  },
]
