export type EarningsRow = {
  no: number
  transNo: string
  description: string
  transDate: string
  costCenter: string
  amount: number
}

export const earningsDummy: Record<string, EarningsRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      transNo: '2301-001',
      description: 'Payroll Period Jan 23',
      transDate: '1 Jan 23',
      costCenter: '01-001-Production Cost Center',
      amount: 1500000,
    },
    {
      no: 2,
      transNo: '2301-002',
      description: 'Payroll Perio Feb 23',
      transDate: '4 Feb 23',
      costCenter: '01-001-Production Cost Center',
      amount: 1500000,
    },
    {
      no: 3,
      transNo: '2301-003',
      description: 'Annual Bonus 23',
      transDate: '31 Feb 23',
      costCenter: '01-001-Production Cost Center',
      amount: 750000,
    },
    {
      no: 4,
      transNo: '2301-004',
      description: 'Payroll Period March 25',
      transDate: '1 Mar 23',
      costCenter: '01-001-Production Cost Center',
      amount: 1500000,
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      transNo: '2306-010',
      description: 'Payroll Period Jun 23',
      transDate: '10 Jun 23',
      costCenter: '02-003-Marketing Cost Center',
      amount: 2000000,
    },
  ],
}
