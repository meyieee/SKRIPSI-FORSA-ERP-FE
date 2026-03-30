export type EFilingRow = {
  no: number
  fileType: string
  registeredDate: string
  institution: string
  issuedDate: string
  shortDescription: string
  attached: boolean
  scanUrl?: string // image or pdf url
}

export const eFilingDummy: Record<string, EFilingRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      fileType: 'Junior High School',
      registeredDate: '1 Jan 23',
      institution: 'SDYPK Minanga',
      issuedDate: '1 Jan 23',
      shortDescription: 'Elementary School Certificate',
      attached: true,
      scanUrl: '../../../../../../../../../../../media/books/1.png',
    },
    {
      no: 2,
      fileType: 'Senior High School',
      registeredDate: '4 Feb 23',
      institution: 'SMP Agape',
      issuedDate: '4 Feb 23',
      shortDescription: 'Junior High School',
      attached: true,
      scanUrl: '../../../../../../../../../../../media/books/2.png',
    },
    {
      no: 3,
      fileType: 'University',
      registeredDate: '31 Feb 23',
      institution: 'SMA Pioneer',
      issuedDate: '31 Feb 23',
      shortDescription: 'Senior High School',
      attached: true,
      scanUrl: '../../../../../../../../../../../media/books/3.png',
    },
    {
      no: 4,
      fileType: 'InPatient',
      registeredDate: '1 Mar 23',
      institution: 'Hospital No Name',
      issuedDate: '1 Mar 23',
      shortDescription: 'Hospital No Name',
      attached: true,
      scanUrl: '../../../../../../../../../../../media/books/4.png',
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      fileType: 'University',
      registeredDate: '10 Jun 23',
      institution: 'State University',
      issuedDate: '10 Jun 23',
      shortDescription: 'Bachelor Degree',
      attached: false,
    },
    {
      no: 2,
      fileType: 'Medical',
      registeredDate: '12 Jun 23',
      institution: 'City Hospital',
      issuedDate: '12 Jun 23',
      shortDescription: 'Medical Certificate',
      attached: true,
      scanUrl: '../../../../../../../../../../../media/books/5.png',
    },
  ],
}
