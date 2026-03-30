export type HireRateRow = {
  assignedDate: string
  description: string
  rateType: string
  percentage?: string
  internalRate?: string
  externalRate?: string
}

export const hireDummy: Record<string, HireRateRow[]> = {
  DD001: [
    {
      assignedDate: '01-Jan-24',
      description: 'New Hire Rate',
      rateType: 'Fixed',
      percentage: '500000',
      internalRate: '2,000,000.00',
      externalRate: '3,000,000.00',
    },
    {
      assignedDate: '01-Jan-25',
      description: 'Amendment Hire Rate',
      rateType: 'Percentage',
      percentage: '10%',
      internalRate: '2,200,000.00',
      externalRate: '3,300,000.00',
    },
  ],
}
