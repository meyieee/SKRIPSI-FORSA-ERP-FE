export type ManhoursRow = {
  transNo: number | string
  resource: string
  man: number | string
  hours: number | string
  duration: string
  rate: number | string
  amount: number | string
  transDate: string
}

export const manhoursDummy: Record<string, ManhoursRow[]> = {
  DD001: [
    {
      transNo: 1,
      resource: 'Mechanic A',
      man: 2,
      hours: 4,
      duration: '4:00',
      rate: 150000,
      amount: 600000,
      transDate: '01-Jan-25',
    },
    {
      transNo: 2,
      resource: 'Electrician B',
      man: 1,
      hours: 3,
      duration: '3:00',
      rate: 175000,
      amount: 175000 * 3,
      transDate: '01-Jan-25',
    },
    {
      transNo: 3,
      resource: 'Welder C',
      man: 1,
      hours: 5,
      duration: '5:00',
      rate: 160000,
      amount: 160000 * 5,
      transDate: '02-Jan-25',
    },
  ],
}
