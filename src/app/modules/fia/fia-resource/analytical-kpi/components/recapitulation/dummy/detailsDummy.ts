export type RecapDetailEmployee = {
  idNumber: string
  fullName: string
  jobTitle: string
  type: 'Staff' | 'Craft' | 'Expat'
  supervisor: string
  phone: string
  workLocation: string
}

export type RecapDetailBlock = {
  departmentCode: string
  department: string
  siteBranch: string
  section?: string
  element?: string
  workgroups: Array<{
    code: string
    name: string
    employees: RecapDetailEmployee[]
  }>
}

export const recapDetailBlocks: RecapDetailBlock[] = [
  {
    departmentCode: '101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
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
            phone: '0813-1234-5678',
            workLocation: 'Admin Building',
          },
          {
            idNumber: '254876',
            fullName: 'Jannice Felicia',
            jobTitle: 'Operation Manager',
            type: 'Staff',
            supervisor: 'Sesca Stevanova',
            phone: '0813-1234-6789',
            workLocation: 'Admin Building',
          },
          {
            idNumber: '254877',
            fullName: 'Eduard Salindeho',
            jobTitle: 'Operation Gen Superintendent',
            type: 'Expat',
            supervisor: 'Sesca Stevanova',
            phone: '0811-123-456',
            workLocation: 'Workshop Area AAA',
          },
          {
            idNumber: '254879',
            fullName: 'Vallerie Joanna',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            supervisor: 'Vallerie Joanna',
            phone: '0813-1234-6789',
            workLocation: 'Workshop Area AAA',
          },
          {
            idNumber: '254880',
            fullName: 'Atlas Busu',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            supervisor: 'Vallerie Joanna',
            phone: '0811-123-456',
            workLocation: 'Workshop Area AAA',
          },
          {
            idNumber: '254881',
            fullName: 'Kobe Obi Tobi',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            supervisor: 'Sesca Stevanova',
            phone: '0813-1234-5678',
            workLocation: 'Workshop Area AAA',
          },
          {
            idNumber: '254882',
            fullName: 'Simon Forsa',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            supervisor: 'Simon Forsa',
            phone: '0813-1234-6789',
            workLocation: 'Workshop Area AAA',
          },
          {
            idNumber: '254883',
            fullName: 'Chris Forsa',
            jobTitle: 'Huling Operator',
            type: 'Craft',
            supervisor: 'Simon Forsa',
            phone: '0813-1234-6789',
            workLocation: 'Workshop Area AAA',
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
            phone: '0813-1234-5678',
            workLocation: 'Admin Building',
          },
          {
            idNumber: '254992',
            fullName: 'Yaya Lala',
            jobTitle: 'General Foreman',
            type: 'Staff',
            supervisor: 'Sesca Stevanova',
            phone: '0813-1234-6789',
            workLocation: 'Admin Building',
          },
        ],
      },
    ],
  },
]
