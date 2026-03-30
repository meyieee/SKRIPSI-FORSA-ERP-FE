export type EmployeeRow = {
  no: number
  idNumber: string
  fullName: string
  jobTitle: string
  type: string
  supervisor: string
  phone: string
  workLocation: string
}

export type DepartmentBlock = {
  department: string
  rows: EmployeeRow[]
}

export const workforceTableDummy: DepartmentBlock[] = [
  {
    department: 'Operation Department',
    rows: [
      {
        no: 1,

        idNumber: '254875',
        fullName: 'Eduard Salindeho',
        jobTitle: 'Business Analyst',
        type: 'Craft',
        supervisor: 'Jannice Felicia',
        phone: '0811-123-456',
        workLocation: 'Operation Area',
      },
      {
        no: 2,
        idNumber: '987654',
        fullName: 'Jannice Felicia',
        jobTitle: 'Operation Manager',
        type: 'Staff',
        supervisor: 'Sesca Stevanova',
        phone: '0813-1234-6789',
        workLocation: 'Operation Area',
      },
      {
        no: 3,
        idNumber: '254874',
        fullName: 'Sesca Stevanova',
        jobTitle: 'Production Manager',
        type: 'Staff',
        supervisor: 'Sesca Stevanova',
        phone: '0813-1234-5678',
        workLocation: 'Operation Area',
      },
    ],
  },
  {
    department: 'Maintenance Department',
    rows: [
      {
        no: 1,
        idNumber: '254879',
        fullName: 'Vallerie Joanna',
        jobTitle: 'Maintenance Manager',
        type: 'Staff',
        supervisor: 'Sesca Stevanova',
        phone: '0813-1234-5678',
        workLocation: 'Maintenance Workshop',
      },
      {
        no: 2,
        idNumber: '254880',
        fullName: 'Atlas Busu',
        jobTitle: 'Mechanical Engineer',
        type: 'Expat',
        supervisor: 'Vallerie Joanna',
        phone: '0813-1234-6789',
        workLocation: 'Maintenance Workshop',
      },
      {
        no: 3,
        idNumber: '254881',
        fullName: 'Kobe Obi Tobi',
        jobTitle: 'Service Superintendent',
        type: 'Expat',
        supervisor: 'Vallerie Joanna',
        phone: '0811-123-456',
        workLocation: 'Maintenance Workshop',
      },
    ],
  },
  {
    department: 'Human Resource Department',
    rows: [
      {
        no: 1,
        idNumber: '254882',
        fullName: 'Simon Forsa',
        jobTitle: 'HR Manager',
        type: 'Staff',
        supervisor: 'Sesca Stevanova',
        phone: '0813-1234-5678',
        workLocation: 'Admin Building',
      },
      {
        no: 2,
        idNumber: '254883',
        fullName: 'Chris Forsa',
        jobTitle: 'HR Clerk',
        type: 'Craft',
        supervisor: 'Simon Forsa',
        phone: '0813-1234-6789',
        workLocation: 'Admin Building',
      },
    ],
  },
  {
    department: 'Finance Department',
    rows: [
      {
        no: 1,
        idNumber: '254884',
        fullName: 'Milo Strong',
        jobTitle: 'Accountant',
        type: 'Staff',
        supervisor: 'Sesca Stevanova',
        phone: '0813-1234-5611',
        workLocation: 'Admin Building',
      },
      {
        no: 2,
        idNumber: '254885',
        fullName: 'Chok Big',
        jobTitle: 'Finance Supervisor',
        type: 'Staff',
        supervisor: 'Milo Strong',
        phone: '0813-1234-6712',
        workLocation: 'Admin Building',
      },
    ],
  },
]
