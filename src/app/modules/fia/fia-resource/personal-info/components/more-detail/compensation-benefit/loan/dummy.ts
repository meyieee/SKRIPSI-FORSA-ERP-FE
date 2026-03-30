export type LoanRow = {
  no: number
  loanNo: string
  loanDate: string
  loanAmount: number
  interestRate: number // simpan sebagai 5 untuk 5%
  repaymentTerm: number // dalam bulan
  monthlyRepayment: number
  outstandingBalance: number
}

export const loanDummy: Record<string, LoanRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      loanNo: '2301-001',
      loanDate: '1 Jan 23',
      loanAmount: 10000000,
      interestRate: 5,
      repaymentTerm: 24,
      monthlyRepayment: 41666.67,
      outstandingBalance: 9958333.33,
    },
    {
      no: 2,
      loanNo: '2301-002',
      loanDate: '4 Feb 23',
      loanAmount: 5000000,
      interestRate: 6,
      repaymentTerm: 12,
      monthlyRepayment: 12500.0,
      outstandingBalance: 4987500.0,
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      loanNo: '2306-010',
      loanDate: '10 Jun 23',
      loanAmount: 8000000,
      interestRate: 4,
      repaymentTerm: 24,
      monthlyRepayment: 33333.33,
      outstandingBalance: 7800000.0,
    },
  ],
}
