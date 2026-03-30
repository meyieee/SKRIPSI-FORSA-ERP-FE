export type WorkorderRow = {
  no: number
  woNo: string
  woDescription: string
  priority: string
  assetNo: string
  assetDescription: string
  dueStart: string
  dueFinish: string
  dateStarted: string
  dateFinish: string
  status: string
}

export const workorderDummy: Record<string, WorkorderRow[]> = {
  DD001: [
    {
      no: 1,
      woNo: 'WO2306-009',
      woDescription: 'Radiator Leaking',
      priority: 'Within 3 days',
      assetNo: 'DD001',
      assetDescription: 'Diesel Drill Model AA',
      dueStart: '04-Jun-23',
      dueFinish: '05-Jun-23',
      dateStarted: '04-Jun-23',
      dateFinish: '05-Jun-23',
      status: 'Scheduled',
    },
    {
      no: 2,
      woNo: 'WO2306-010',
      woDescription: 'Need to change Alternator',
      priority: 'Within 3 days',
      assetNo: 'DD001',
      assetDescription: 'Diesel Drill Model BB',
      dueStart: '09-Jun-23',
      dueFinish: '12-Jun-23',
      dateStarted: '09-Jun-23',
      dateFinish: '12-Jun-23',
      status: 'Scheduled',
    },
    {
      no: 3,
      woNo: 'WO2306-011',
      woDescription: 'Radiator Leaking',
      priority: 'Within 7 Days',
      assetNo: 'DD001',
      assetDescription: 'Shovel Model AAA',
      dueStart: '04-Jun-23',
      dueFinish: '05-Jun-23',
      dateStarted: '04-Jun-23',
      dateFinish: '05-Jun-23',
      status: 'Scheduled',
    },
    {
      no: 4,
      woNo: 'WO2306-012',
      woDescription: 'Need to change Alternator',
      priority: 'Within 7 Days',
      assetNo: 'DD001',
      assetDescription: 'Shovel Model BBB',
      dueStart: '09-Jun-23',
      dueFinish: '12-Jun-23',
      dateStarted: '09-Jun-23',
      dateFinish: '12-Jun-23',
      status: 'Scheduled',
    },
  ],
}
