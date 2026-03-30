// ../dummy/trainingAppraisalDetailsDummy.ts

export type EmpType = 'Staff' | 'Craft' | 'Expat'

export type TrainingAppraisalDetailEmployee = {
  idNumber: string
  fullName: string
  jobTitle: string
  type: EmpType
  appraisalDate: string
  appraisalReason: string
  lastDate: string
  scheduleDate: string
  appraiser: string

  // flags untuk summary box di atas
  trainingSchedule?: boolean
  trainingActual?: boolean
  appraisalSchedule?: boolean
  appraisalActual?: boolean
}

export type TrainingAppraisalDetailWorkgroup = {
  code: string
  name: string
  employees: TrainingAppraisalDetailEmployee[]
}

export type TrainingAppraisalDetailBlock = {
  departmentCode: string
  department: string
  siteBranch: string
  section?: string
  element?: string
  workgroups: TrainingAppraisalDetailWorkgroup[]
}

export const trainingAppraisalDetailBlocks: TrainingAppraisalDetailBlock[] = [
  {
    departmentCode: '101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    section: 'Operation',
    workgroups: [
      {
        code: '10101',
        name: 'Operation Hauling Workgroup',
        employees: [
          {
            idNumber: '254875',
            fullName: 'Sesca Stevanova',
            jobTitle: 'Production Manager',
            type: 'Staff',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'Yearly',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Sesca Stevanova',
            trainingSchedule: true,
            trainingActual: true,
            appraisalSchedule: true,
            appraisalActual: true,
          },
          {
            idNumber: '254876',
            fullName: 'Jannice Felicia',
            jobTitle: 'Operation Manager',
            type: 'Staff',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'Promotion',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Sesca Stevanova',
            trainingSchedule: true,
            trainingActual: true,
            appraisalSchedule: true,
            appraisalActual: true,
          },
          {
            idNumber: '254877',
            fullName: 'Eduard Salindeho',
            jobTitle: 'Operation Gen Superintendent',
            type: 'Staff',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'Perform Unsatisfied',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Jannice Felicia',
            trainingSchedule: true,
            appraisalSchedule: true,
          },
          {
            idNumber: '254879',
            fullName: 'Vallerie Joanna',
            jobTitle: 'Operation Gen Superintendent',
            type: 'Expat',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'After Probation',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Sesca Stevanova',
            trainingSchedule: true,
            appraisalSchedule: true,
          },
          {
            idNumber: '254880',
            fullName: 'Atlas Busu',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'Other Reason',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Vallerie Joanna',
            trainingSchedule: true,
            appraisalSchedule: true,
          },
          {
            idNumber: '254881',
            fullName: 'Kobe Obi Tobi',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'Yearly',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Vallerie Joanna',
            trainingSchedule: true,
            appraisalSchedule: true,
          },
          {
            idNumber: '254882',
            fullName: 'Simon Forsa',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'Promotion',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Sesca Stevanova',
            trainingSchedule: true,
            appraisalSchedule: true,
          },
          {
            idNumber: '254883',
            fullName: 'Chris Forsa',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'Perform Unsatisfied',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Simon Forsa',
            trainingSchedule: true,
            appraisalSchedule: true,
          },
        ],
      },
      {
        code: '10102',
        name: 'Operation Drilling Workgroup',
        employees: [
          {
            idNumber: '254991',
            fullName: 'Muffin Stone',
            jobTitle: 'Superintendent',
            type: 'Staff',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'Yearly',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Sesca Stevanova',
            trainingSchedule: true,
            appraisalSchedule: true,
          },
          {
            idNumber: '254992',
            fullName: 'Yaya Lala',
            jobTitle: 'General Foreman',
            type: 'Staff',
            appraisalDate: '05-Nov-25',
            appraisalReason: 'Promotion',
            lastDate: '01-Apr-25',
            scheduleDate: '01-Nov-25',
            appraiser: 'Sesca Stevanova',
            trainingSchedule: true,
            appraisalSchedule: true,
          },
        ],
      },
    ],
  },
]
