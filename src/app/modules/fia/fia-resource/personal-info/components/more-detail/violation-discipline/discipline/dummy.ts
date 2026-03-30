export type DisciplineRow = {
  no: number
  violationNo: string
  absenteeismType: string
  dateFrom: string
  dateTo: string
  totalDays: number
  comments: string
  actionCategory: string
  actionTake: string
  actionDate: string
}

export const disciplineDummy: Record<string, DisciplineRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      violationNo: '2301-001',
      absenteeismType: 'Sick',
      dateFrom: '1 Jan 23',
      dateTo: '1 Jan 23',
      totalDays: 1,
      comments: 'Surat Sakit AAA',
      actionCategory: 'Non violation',
      actionTake: '',
      actionDate: '',
    },
    {
      no: 2,
      violationNo: '2301-002',
      absenteeismType: 'Absent',
      dateFrom: '2 Feb 23',
      dateTo: '4 Feb 23',
      totalDays: 2,
      comments: 'No Info',
      actionCategory: 'Violation',
      actionTake: 'Warning 1',
      actionDate: '6 Feb 23',
    },
    {
      no: 3,
      violationNo: '2301-003',
      absenteeismType: 'Sick',
      dateFrom: '31 Feb 23',
      dateTo: '31 Feb 23',
      totalDays: 1,
      comments: 'Tidak Ada Surat Sakit',
      actionCategory: 'Violation',
      actionTake: 'Verbal Warning',
      actionDate: '2 Mar 23',
    },
    {
      no: 4,
      violationNo: '2301-004',
      absenteeismType: 'Sick',
      dateFrom: '1 Mar 23',
      dateTo: '1 Mar 23',
      totalDays: 1,
      comments: 'Surat Sakit Dr. AAAAAAAA',
      actionCategory: 'Non violation',
      actionTake: '',
      actionDate: '',
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      violationNo: '2306-001',
      absenteeismType: 'Absent',
      dateFrom: '10 Jun 23',
      dateTo: '11 Jun 23',
      totalDays: 2,
      comments: 'Tanpa keterangan',
      actionCategory: 'Violation',
      actionTake: 'Warning 2',
      actionDate: '15 Jun 23',
    },
  ],
}
