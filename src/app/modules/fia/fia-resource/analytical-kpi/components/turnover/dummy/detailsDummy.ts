// ../dummy/turnoverDetailsDummy.ts

export type EmpType = 'Staff' | 'Craft' | 'Expat'
export type TurnoverCategory = 'Opening' | 'Hire' | 'Left' | 'Closing'

export type TurnoverDetailEmployee = {
  idNumber: string
  fullName: string
  jobTitle: string
  type: EmpType
  supervisor: string
  hireDate: string
  terminationDate?: string
  workLocation: string
  category: TurnoverCategory
}

export type TurnoverDetailWorkgroup = {
  code: string
  name: string
  employees: TurnoverDetailEmployee[]
}

export type TurnoverDetailBlock = {
  departmentCode: string
  department: string
  siteBranch: string
  section?: string
  element?: string
  workgroups: TurnoverDetailWorkgroup[]
}

export const turnoverDetailBlocks: TurnoverDetailBlock[] = [
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
            supervisor: 'Sesca Stevanova',
            hireDate: '10-Feb-25',
            workLocation: 'Admin Building',
            category: 'Opening',
          },
          {
            idNumber: '254876',
            fullName: 'Jannice Felicia',
            jobTitle: 'Operation Manager',
            type: 'Staff',
            supervisor: 'Sesca Stevanova',
            hireDate: '10-Feb-25',
            workLocation: 'Admin Building',
            category: 'Opening',
          },
          {
            idNumber: '254877',
            fullName: 'Eduard Salindeho',
            jobTitle: 'Operation Gen Superintendent',
            type: 'Staff',
            supervisor: 'Jannice Felicia',
            hireDate: '10-Nov-25',
            workLocation: 'Admin Building',
            category: 'Hire',
          },
          {
            idNumber: '254878',
            fullName: 'Vallerie Joanna',
            jobTitle: 'Operation Gen Superintendent',
            type: 'Expat',
            supervisor: 'Sesca Stevanova',
            hireDate: '10-Nov-25',
            workLocation: 'Workshop Area AAA',
            category: 'Hire',
          },
          {
            idNumber: '254879',
            fullName: 'Atlas Busu',
            jobTitle: 'Hauling Operator',
            type: 'Craft',
            supervisor: 'Vallerie Joanna',
            hireDate: '10-Nov-25',
            workLocation: 'Workshop Area AAA',
            category: 'Opening',
          },
          {
            idNumber: '254881',
            fullName: 'Kobe Obi Tobi',
            jobTitle: 'Hauling Operator',
            type: 'Craft',
            supervisor: 'Vallerie Joanna',
            hireDate: '10-Nov-25',
            terminationDate: '10-Nov-25',
            workLocation: 'Workshop Area AAA',
            category: 'Left',
          },
          {
            idNumber: '254882',
            fullName: 'Simon Forsa',
            jobTitle: 'Hauling Operator',
            type: 'Craft',
            supervisor: 'Sesca Stevanova',
            hireDate: '10-Nov-25',
            workLocation: 'Workshop Area AAA',
            category: 'Opening',
          },
          {
            idNumber: '254883',
            fullName: 'Chris Forsa',
            jobTitle: 'Hauling Operator',
            type: 'Craft',
            supervisor: 'Simon Forsa',
            hireDate: '10-Nov-25',
            workLocation: 'Workshop Area AAA',
            category: 'Opening',
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
            supervisor: 'Sesca Stevanova',
            hireDate: '10-Feb-25',
            workLocation: 'Admin Building',
            category: 'Opening',
          },
          {
            idNumber: '254992',
            fullName: 'Yaya Lala',
            jobTitle: 'General Foreman',
            type: 'Staff',
            supervisor: 'Sesca Stevanova',
            hireDate: '10-Feb-25',
            workLocation: 'Admin Building',
            category: 'Opening',
          },
        ],
      },
    ],
  },
]
