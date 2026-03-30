export type WarningRow = {
  no: number
  warningNo: string
  warningCategory: string
  violationDateTime: string
  validity: string
  violationType: string
  violationLocation: string
}

export const warningDummy: Record<string, WarningRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      warningNo: '2301-001',
      warningCategory: '1st Warning',
      violationDateTime: '6-1-25 12:00 AM',
      validity: 'One Month from Date of Warning',
      violationType: 'Leaving work station early',
      violationLocation: 'Surface Mining',
    },
    {
      no: 2,
      warningNo: '2301-002',
      warningCategory: '2nd Warning',
      violationDateTime: '3-1-25 12:00 AM',
      validity: 'Three Months from Date of Warning',
      violationType: 'Absenteeism',
      violationLocation: 'Underground Mine Loation',
    },
    {
      no: 3,
      warningNo: '2301-003',
      warningCategory: '3rd Warning',
      violationDateTime: '12-1-24 12:00 AM',
      validity: 'Six Months from Date of Warning',
      violationType: 'Not Wearning PPE',
      violationLocation: 'Administration Office',
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      warningNo: '2306-001',
      warningCategory: '1st Warning',
      violationDateTime: '15-6-23 09:00 AM',
      validity: 'One Month from Date of Warning',
      violationType: 'Late Attendance',
      violationLocation: 'Head Office',
    },
  ],
}
