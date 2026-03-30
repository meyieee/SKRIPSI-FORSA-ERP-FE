export type MaterialRow = {
  requestNo: string
  item: number | string
  stockcode: string
  description: string
  uom: string
  bin: string
  qtyIssued: number | string
  costCenter: string
  workorder: string
  accountCode: number | string
  issuedDate: string
}

export const materialDummy: Record<string, MaterialRow[]> = {
  DD001: [
    {
      requestNo: 'MIS2501-001',
      item: 1,
      stockcode: '10001-001',
      description: 'Spare Part Seal For Drill Machine',
      uom: 'EA',
      bin: 'AA-01',
      qtyIssued: 5,
      costCenter: 'CC-001',
      workorder: 'WO2303-001',
      accountCode: 2010,
      issuedDate: '01-Jan-25',
    },
    {
      requestNo: 'MIS2501-002',
      item: 2,
      stockcode: '10001-002',
      description: 'Compressor Drill Model 123',
      uom: 'EA',
      bin: 'AA-02',
      qtyIssued: 15,
      costCenter: 'CC-001',
      workorder: 'WO2303-001',
      accountCode: 2010,
      issuedDate: '01-Jan-25',
    },
  ],
}
