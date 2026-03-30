export type EducationRow = {
  no: number
  instituteName: string
  location: string
  field: string
  start: number | string
  to: number | string
  duration: string
  certificated: string
  comments: string
}

export const educationDummy: Record<string, EducationRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      instituteName: 'SDYPK Minanga',
      location: 'Sanger',
      field: '-',
      start: 1975,
      to: 1981,
      duration: '6 years',
      certificated: 'Graduated',
      comments: '-',
    },
    {
      no: 2,
      instituteName: 'SMP Kristen Agape',
      location: 'Manado',
      field: '-',
      start: 1981,
      to: 1984,
      duration: '3 years',
      certificated: 'Graduated',
      comments: '-',
    },
    {
      no: 3,
      instituteName: 'SMA Pioneer',
      location: 'Manado',
      field: 'IPS',
      start: 1984,
      to: 1987,
      duration: '3 years',
      certificated: 'Graduated',
      comments: '-',
    },
    {
      no: 4,
      instituteName: 'Universitas Klabat',
      location: 'Manado',
      field: 'S1-Accounting',
      start: 1987,
      to: 1991,
      duration: '4 years',
      certificated: 'Graduated',
      comments: '-',
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      instituteName: 'SMAN 1 Bandung',
      location: 'Bandung',
      field: 'IPA',
      start: 2012,
      to: 2015,
      duration: '3 years',
      certificated: 'Graduated',
      comments: '-',
    },
    {
      no: 2,
      instituteName: 'Universitas Contoso',
      location: 'Bandung',
      field: 'S1-Psychology',
      start: 2015,
      to: 2019,
      duration: '4 years',
      certificated: 'Graduated',
      comments: '-',
    },
  ],
}
