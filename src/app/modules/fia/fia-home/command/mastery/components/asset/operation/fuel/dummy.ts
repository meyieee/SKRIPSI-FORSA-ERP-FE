export type FuelRow = {
  no: number
  requestNo: string
  dateTime: string
  requestor: number | string
  reading: number | string
  stockcode: string
  amount: number | string
  uom: string
  fuelBay: string
  fuelCard: number | string
}

export const fuelDummy: Record<string, FuelRow[]> = {
  DD001: [
    {
      no: 1,
      requestNo: 'FLR2305-001',
      dateTime: '3-10-23 0:00',
      requestor: 254875,
      reading: 25000,
      stockcode: '1234-001 - Diesel Fuel Octan Xxx',
      amount: 200,
      uom: 'Gallon',
      fuelBay: 'Fuel Bay A',
      fuelCard: 123456,
    },
    {
      no: 2,
      requestNo: 'FLR2305-002',
      dateTime: '3-10-23 0:00',
      requestor: 254876,
      reading: 24500,
      stockcode: '1234-001 - Diesel Fuel Octan Xxx',
      amount: 250,
      uom: 'Gallon',
      fuelBay: 'Fuel Bay A',
      fuelCard: 123457,
    },
    {
      no: 3,
      requestNo: 'FLR2305-003',
      dateTime: '3-10-23 0:00',
      requestor: 254877,
      reading: 24000,
      stockcode: '1234-001 - Diesel Fuel Octan Xxx',
      amount: 50,
      uom: 'Gallon',
      fuelBay: 'Fuel Bay B',
      fuelCard: 123458,
    },
    {
      no: 4,
      requestNo: 'FLR2305-004',
      dateTime: '3-10-23 0:00',
      requestor: 254878,
      reading: 23500,
      stockcode: '1234-001 - Diesel Fuel Octan Xxx',
      amount: 75,
      uom: 'Gallon',
      fuelBay: 'Fuel Bay C',
      fuelCard: 123459,
    },
  ],
}
