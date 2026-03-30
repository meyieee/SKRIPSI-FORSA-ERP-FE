export type ContractRow = {
  no: number
  contractNo: string
  noOfContract: string
  commanceDate: string
  completionDate?: string
  status: string
  reportTo: string
  newTitleAssigned: string
}

export const contractDummy: Record<string, ContractRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      contractNo: 'ECON20-001',
      noOfContract: 'CNO1',
      commanceDate: '1 Jan 23',
      completionDate: '3 Feb 24',
      status: 'Contract',
      reportTo: 'Supervisor',
      newTitleAssigned: 'Crew Team Leader',
    },
    {
      no: 2,
      contractNo: 'ECON20-002',
      noOfContract: 'CNO2',
      commanceDate: '4 Feb 24',
      completionDate: '4 Feb 25',
      status: 'Contract',
      reportTo: 'Superintendent',
      newTitleAssigned: 'Crew Supervisor',
    },
    {
      no: 3,
      contractNo: 'ECON20-003',
      noOfContract: 'CNO3',
      commanceDate: '5 Feb 25',
      completionDate: '',
      status: 'Permanent',
      reportTo: 'Manager',
      newTitleAssigned: 'Crew Superintendent',
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      contractNo: 'ECON21-010',
      noOfContract: 'CNO7',
      commanceDate: '10 Jun 23',
      completionDate: '10 Jun 24',
      status: 'Contract',
      reportTo: 'HR Manager',
      newTitleAssigned: 'HR Supervisor',
    },
  ],
}
