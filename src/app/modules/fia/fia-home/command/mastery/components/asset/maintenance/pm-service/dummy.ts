export type PMServiceRow = {
  pmNo: string
  description: string
  lastDone: string
  startDateTime: string
  finishDateTime: string
  duration: number | string
  reading: number | string
  workOrder: string
}

export const pmServiceDummy: Record<string, PMServiceRow[]> = {
  DD001: [
    {
      pmNo: 'PM2306-001',
      description: 'PM Service 250',
      lastDone: '6-4-23 12:00 PM',
      startDateTime: '6-4-23 12:00 PM',
      finishDateTime: '6-5-23 12:00 PM',
      duration: 20,
      reading: 20,
      workOrder: 'WO2306-001',
    },
    {
      pmNo: 'PM2306-002',
      description: 'PM Service 500',
      lastDone: '6-9-23 12:00 PM',
      startDateTime: '6-9-23 12:00 PM',
      finishDateTime: '6-12-23 12:00 PM',
      duration: 30,
      reading: 30,
      workOrder: 'WO2306-002',
    },
    {
      pmNo: 'PM2306-003',
      description: 'PM Service 1000',
      lastDone: '6-11-23 12:00 PM',
      startDateTime: '6-11-23 12:00 PM',
      finishDateTime: '6-12-23 12:00 PM',
      duration: 10,
      reading: 10,
      workOrder: 'WO2306-003',
    },
    {
      pmNo: 'PM2306-004',
      description: 'PM Service 2000',
      lastDone: '6-16-23 12:00 PM',
      startDateTime: '6-16-23 12:00 PM',
      finishDateTime: '6-24-23 12:00 PM',
      duration: 45,
      reading: 45,
      workOrder: 'WO2306-004',
    },
  ],
}
