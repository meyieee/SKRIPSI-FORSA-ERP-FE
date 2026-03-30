export type WarrantyRow = {
  warrantyNo: string
  warrantyPeriod: string
  failureDescription: string
  failureDate: string
  warrantyStatus: string
  status: string
}

export const warrantyDummy: Record<string, WarrantyRow[]> = {
  DD001: [
    {
      warrantyNo: 'WR250101',
      warrantyPeriod: '2 Years',
      failureDescription: 'Engine Problem',
      failureDate: '01-Jan-24',
      warrantyStatus: 'Under Warranty/Out of Warranty',
      status: 'Approved/Pending/Reject',
    },
    {
      warrantyNo: 'WR250260',
      warrantyPeriod: '1 Years',
      failureDescription: 'Engine Cooler Leaking',
      failureDate: '01-Jan-24',
      warrantyStatus: 'Under Warranty/Out of Warranty',
      status: 'Approved/Pending/Reject',
    },
  ],
}
