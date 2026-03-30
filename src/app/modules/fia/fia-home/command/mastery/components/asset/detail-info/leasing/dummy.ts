export type LeasingRow = {
  leaseNo: string
  leaseStartDate: string
  leaseEndDate: string
  leaseTerm: string
  monthlyPayment: string
  totalPayment: string
  lessee: string
}

export const leasingDummy: Record<string, LeasingRow[]> = {
  DD001: [
    {
      leaseNo: 'LS250101',
      leaseStartDate: '01-Jan-23',
      leaseEndDate: '01-Jan-26',
      leaseTerm: '36 Months',
      monthlyPayment: '10,000,000.00',
      totalPayment: '360,000,000.00',
      lessee: 'Andalan Banua Sejahtera',
    },
  ],
}
