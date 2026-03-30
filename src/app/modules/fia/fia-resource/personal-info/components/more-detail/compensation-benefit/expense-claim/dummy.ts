export type ExpenseClaimRow = {
  no: number
  transNo: string
  description: string
  transDate: string // biarkan string agar sama persis dengan tampilan
  costCenter: string
  expense?: number // pakai number lalu format di UI -> "20,000,000.00"
  receipt?: number
  balance: number
}

export const expenseClaimDummy: Record<string, ExpenseClaimRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      transNo: '2301-001',
      description: 'Cash Advance Business Trip',
      transDate: '1 Jan 23',
      costCenter: '01-001-Production Cost Center',
      expense: 20000000,
      balance: 20000000,
    },
    {
      no: 2,
      transNo: '2301-002',
      description: 'Expense Claim Trans No2302-002',
      transDate: '4 Feb 23',
      costCenter: '01-001-Production Cost Center',
      receipt: 5000000,
      balance: 15000000,
    },
    {
      no: 3,
      transNo: '2301-003',
      description: 'Expense Claim Trans No2302-002',
      transDate: '31 Feb 23',
      costCenter: '01-001-Production Cost Center',
      receipt: 2500000,
      balance: 12500000,
    },
    {
      no: 4,
      transNo: '2301-004',
      description: 'Expense Claim Trans No2302-002',
      transDate: '1 Mar 23',
      costCenter: '01-001-Production Cost Center',
      receipt: 7500000,
      balance: 5000000,
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      transNo: '2306-010',
      description: 'Cash Advance Business Trip',
      transDate: '10 Jun 23',
      costCenter: '02-003-Marketing Cost Center',
      expense: 8000000,
      balance: 8000000,
    },
    {
      no: 2,
      transNo: '2306-011',
      description: 'Expense Claim Trans No2306-010',
      transDate: '20 Jun 23',
      costCenter: '02-003-Marketing Cost Center',
      receipt: 3000000,
      balance: 5000000,
    },
  ],
}
