// ../dummy/accountabilityDetailsDummy.ts

export type EmpType = 'Staff' | 'Craft' | 'Expat'

export type AccountabilityDetailEmployee = {
  idNumber: string
  fullName: string
  jobTitle: string
  type: EmpType
  disciplineDate: string
  disciplineStatus: string
  reasonForAbsent: string
  actionTaken: string
}

export type AccountabilityDetailWorkgroup = {
  code: string
  name: string
  employees: AccountabilityDetailEmployee[]
}

export type AccountabilityDetailBlock = {
  departmentCode: string
  department: string
  siteBranch: string
  section?: string
  element?: string
  workgroups: AccountabilityDetailWorkgroup[]
}

export const accountabilityDetailBlocks: AccountabilityDetailBlock[] = [
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
            idNumber: '254879',
            fullName: 'Vallerie Joanna',
            jobTitle: 'Operation Gen Superinten',
            type: 'Expat',
            disciplineDate: '05-Nov-25',
            disciplineStatus: 'Absent',
            reasonForAbsent: 'No Information',
            actionTaken: 'Warning Letter',
          },
          {
            idNumber: '254880',
            fullName: 'Atlas Busu',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            disciplineDate: '05-Nov-25',
            disciplineStatus: 'Training',
            reasonForAbsent: 'Operator Training',
            actionTaken: 'Warning Letter',
          },
          {
            idNumber: '254881',
            fullName: 'Kobe Obi Tobi',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            disciplineDate: '05-Nov-25',
            disciplineStatus: 'Sick',
            reasonForAbsent: 'Sick Leave',
            actionTaken: 'Sick Letter provided',
          },
          {
            idNumber: '254882',
            fullName: 'Simon Forsa',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            disciplineDate: '05-Nov-25',
            disciplineStatus: 'Absent',
            reasonForAbsent: 'No Information',
            actionTaken: 'Warning Letter',
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
            disciplineDate: '05-Nov-25',
            disciplineStatus: 'Absent',
            reasonForAbsent: 'No Information',
            actionTaken: 'Warning Letter',
          },
          {
            idNumber: '254992',
            fullName: 'Yaya Lala',
            jobTitle: 'General Foreman',
            type: 'Staff',
            disciplineDate: '05-Nov-25',
            disciplineStatus: 'Sick',
            reasonForAbsent: 'Sick Leave',
            actionTaken: 'Sick Letter provided',
          },
        ],
      },
    ],
  },
]
