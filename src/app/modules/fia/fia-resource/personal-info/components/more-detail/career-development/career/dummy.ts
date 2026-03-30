export type CareerRow = {
  no: number
  company: string
  location: string
  from: number
  to: number
  lastPosition: string
  remarks: string
}

export const careerDummy: Record<string, CareerRow[]> = {
  // Eduard
  '254875': [
    {
      no: 1,
      company: 'Rudy Hadisuwarno',
      location: 'Jakarta',
      from: 1991,
      to: 1992,
      lastPosition: 'Accountant',
      remarks: 'Resigned',
    },
    {
      no: 2,
      company: 'Fluor Daniel',
      location: 'Tembagapura',
      from: 1992,
      to: 1995,
      lastPosition: 'Project Control Officer',
      remarks: 'Contract Completion',
    },
    {
      no: 3,
      company: 'Freeport Indonesia',
      location: 'Tembagapura',
      from: 1995,
      to: 1999,
      lastPosition: 'Senior Coordinator Engineering & Project',
      remarks: 'Resigned',
    },
    {
      no: 4,
      company: 'Bhakti Capital Indonesia',
      location: 'Jakarta',
      from: 2001,
      to: 2002,
      lastPosition: 'Controller Market Capital',
      remarks: 'Resigned',
    },
    {
      no: 5,
      company: 'O&K Terex Mining',
      location: 'Tembagapura',
      from: 2002,
      to: 2004,
      lastPosition: 'Project Manager (Counterpart)',
      remarks: 'Resigned',
    },
    {
      no: 6,
      company: 'Sandvik SMC',
      location: 'Tembagapura',
      from: 2004,
      to: 2017,
      lastPosition: 'Business Analyst (Specialist)',
      remarks: 'Resigned',
    },
  ],
  // Maria
  '987654': [
    {
      no: 1,
      company: 'Contoso A',
      location: 'Jakarta',
      from: 2018,
      to: 2020,
      lastPosition: 'Analyst',
      remarks: 'Resigned',
    },
    {
      no: 2,
      company: 'Fabrikam B',
      location: 'Bandung',
      from: 2020,
      to: 2024,
      lastPosition: 'Lead',
      remarks: 'Active',
    },
  ],
}
