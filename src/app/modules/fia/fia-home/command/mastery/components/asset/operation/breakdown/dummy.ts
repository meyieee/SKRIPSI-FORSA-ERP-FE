export type BreakdownRow = {
  no: number
  assetNo: string
  date: string
  time: string
  duration: string
  reading: number | string
  resp: string
  status: string
  type: number | string
  description: string
  category: string
  comment?: string
}

export const breakdownDummy: Record<string, BreakdownRow[]> = {
  DD001: [
    {
      no: 1,
      assetNo: 'DD001',
      date: '1-Jul-23',
      time: '0:00:00',
      duration: '0:00:00',
      reading: 0,
      resp: 'C',
      status: 'Ready',
      type: 100,
      description: 'Operating | Work',
      category: 'Productive Time',
      comment: '',
    },
    {
      no: 2,
      assetNo: 'DD001',
      date: '1-Jul-23',
      time: '0:00:00',
      duration: '0:00:00',
      reading: 0,
      resp: 'C',
      status: 'Down',
      type: 401,
      description: 'PM',
      category: 'Planned Loss',
      comment: 'Preventive Maintenance 500Hrs',
    },
    {
      no: 1,
      assetNo: 'DD001',
      date: '1-Jul-23',
      time: '0:00:00',
      duration: '0:00:00',
      reading: 0,
      resp: 'C',
      status: 'Ready',
      type: 100,
      description: 'Operating | Work',
      category: 'Productive Time',
      comment: '',
    },
    {
      no: 2,
      assetNo: 'DD001',
      date: '1-Jul-23',
      time: '0:00:00',
      duration: '0:00:00',
      reading: 0,
      resp: 'C',
      status: 'Standby',
      type: 303,
      description: 'No Manned/No Oprt',
      category: 'Standby',
      comment: 'Operator Late',
    },
  ],
}
