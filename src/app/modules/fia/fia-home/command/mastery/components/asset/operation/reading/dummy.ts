export type ReadingRow = {
  dateTime: string
  entered: number | string
  accumulative: number | string
  increment: number | string
  averageUsing: number | string
  status: string
  type: string
  updateDate: string
  remarks?: string
}

export const readingDummy: Record<string, ReadingRow[]> = {
  DD001: [
    {
      dateTime: '6-30-23 0:00',
      entered: 3240,
      accumulative: 3240,
      increment: 20,
      averageUsing: 3240,
      status: 'Continue',
      type: 'Hour',
      updateDate: '6-30-23 0:00',
      remarks: '',
    },
    {
      dateTime: '6-29-23 0:00',
      entered: 3220,
      accumulative: 3220,
      increment: 20,
      averageUsing: 3220,
      status: 'Continue',
      type: 'Hour',
      updateDate: '6-29-23 0:00',
      remarks: '',
    },
    {
      dateTime: '6-28-23 0:00',
      entered: 3200,
      accumulative: 3200,
      increment: 20,
      averageUsing: 3200,
      status: 'Continue',
      type: 'Hour',
      updateDate: '6-28-23 0:00',
      remarks: '',
    },
    {
      dateTime: '6-27-23 0:00',
      entered: 3180,
      accumulative: 3180,
      increment: 0,
      averageUsing: 3180,
      status: 'Continue',
      type: 'Hour',
      updateDate: '6-27-23 0:00',
      remarks: '',
    },
  ],
}
