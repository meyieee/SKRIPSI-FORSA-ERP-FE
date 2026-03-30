export type AppraisalRow = {
  no: number
  appraisalNo: string
  reason: string
  appraisalDate: string
  dateOfAppraisal: string
  dateLastAppraisal?: string
  appraiser: string
}

export const appraisalDummy: Record<string, AppraisalRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      appraisalNo: '2001-001',
      reason: 'After Probation',
      appraisalDate: '1 Jan 20',
      dateOfAppraisal: '31 Jan 21',
      dateLastAppraisal: '',
      appraiser: 'Atlas Kobe',
    },
    {
      no: 2,
      appraisalNo: '2101-002',
      reason: 'Tahunan/Yearly',
      appraisalDate: '2 Feb 21',
      dateOfAppraisal: '31 Jan 21',
      dateLastAppraisal: '',
      appraiser: 'Atlas Kobe',
    },
    {
      no: 3,
      appraisalNo: '2201-001',
      reason: 'Promosi/Promotion',
      appraisalDate: '31 Jan 22',
      dateOfAppraisal: '31 Jan 22',
      dateLastAppraisal: '',
      appraiser: 'Atlas Kobe',
    },
    {
      no: 4,
      appraisalNo: '2301-001',
      reason: 'Performance unsatisfied',
      appraisalDate: '1 Mar 23',
      dateOfAppraisal: '31 Jan 23',
      dateLastAppraisal: '31 Jan 22',
      appraiser: 'Atlas Kobe',
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      appraisalNo: '2206-010',
      reason: 'Tahunan/Yearly',
      appraisalDate: '15 Jun 22',
      dateOfAppraisal: '30 Jun 22',
      dateLastAppraisal: '',
      appraiser: 'Nora Quinn',
    },
    {
      no: 2,
      appraisalNo: '2306-004',
      reason: 'Promotion',
      appraisalDate: '12 Jun 23',
      dateOfAppraisal: '30 Jun 23',
      dateLastAppraisal: '30 Jun 22',
      appraiser: 'Nora Quinn',
    },
  ],
}
