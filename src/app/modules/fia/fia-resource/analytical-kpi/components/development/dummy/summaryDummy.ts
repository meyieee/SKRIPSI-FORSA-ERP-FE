// ../dummy/developmentSummaryDummy.ts

export type DevC3 = {schedule?: number; actual?: number; realization?: string}

export type DevRow = {
  no: number
  workgroup: string
  training: DevC3
  appraisalNonStaff: DevC3
  appraisalStaff: DevC3
  appraisalRealization: string
}

export type DevBlock = {
  departmentCode: string
  department: string
  rows: DevRow[]
}

export const developmentBlocks: DevBlock[] = [
  {
    departmentCode: '1101',
    department: 'Operation Department',
    rows: [
      {
        no: 1,
        workgroup: '101-Operation Hauling Workgroup',
        training: {schedule: 4, actual: 2, realization: '50%'},
        appraisalNonStaff: {schedule: 15, actual: 3, realization: '20%'},
        appraisalStaff: {schedule: 5, actual: 3, realization: '60%'},
        appraisalRealization: '30%',
      },
      {
        no: 2,
        workgroup: '102-Operation Drilling Workgroup',
        training: {schedule: 4, actual: 3, realization: '75%'},
        appraisalNonStaff: {schedule: 10, actual: 3, realization: '30%'},
        appraisalStaff: {schedule: 5, actual: 3, realization: '60%'},
        appraisalRealization: '40%',
      },
      {
        no: 3,
        workgroup: '103-Operation Maintenance Workgroup',
        training: {schedule: 2, actual: 1, realization: '50%'},
        appraisalNonStaff: {schedule: 6, actual: 3, realization: '100%'},
        appraisalStaff: {schedule: 2, actual: 2, realization: '100%'},
        appraisalRealization: '100%',
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
        training: {schedule: 1, actual: 0, realization: '0%'},
        appraisalNonStaff: {schedule: 5, actual: 2, realization: '40%'},
        appraisalStaff: {schedule: 3, actual: 2, realization: '67%'},
        appraisalRealization: '50%',
      },
      {
        no: 2,
        workgroup: '202-Human Resource Payroll Workgroup',
        training: {schedule: 1, actual: 0, realization: '0%'},
        appraisalNonStaff: {schedule: 2, actual: 1, realization: '50%'},
        appraisalStaff: {schedule: 2, actual: 1, realization: '50%'},
        appraisalRealization: '50%',
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
        training: {schedule: 2, actual: 1, realization: '50%'},
        appraisalNonStaff: {schedule: 4, actual: 2, realization: '50%'},
        appraisalStaff: {schedule: 2, actual: 2, realization: '100%'},
        appraisalRealization: '67%',
      },
    ],
  },
]
