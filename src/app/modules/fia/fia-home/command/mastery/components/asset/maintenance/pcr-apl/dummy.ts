export type PCRAplsRow = {
  replaceNo: string
  componentName: string
  position: string
  replacedDate: string
  serialNo: number | string
  installed: number | string
  removed: number | string
  actualLife: number | string
  targetLife: number | string
  reason: string
  workorder: string
  qty: number | string
}

export const pcrAplsDummy: Record<string, PCRAplsRow[]> = {
  DD001: [
    {
      replaceNo: 'PCR#001',
      componentName: 'Track Idler',
      position: 'Left',
      replacedDate: '20-Dec-05',
      serialNo: 12345,
      installed: 0,
      removed: 15517,
      actualLife: 15517,
      targetLife: 15000,
      reason: 'Was Cracking',
      workorder: 'WO1234',
      qty: 1,
    },
    {
      replaceNo: 'PCR#002',
      componentName: 'Track Group',
      position: 'Left',
      replacedDate: '20-Dec-05',
      serialNo: 23456,
      installed: 0,
      removed: 15517,
      actualLife: 15517,
      targetLife: 15000,
      reason: 'The Link Many Cracking',
      workorder: 'WO1235',
      qty: 1,
    },
    {
      replaceNo: 'PCR#003',
      componentName: 'Track Sprocket',
      position: 'left',
      replacedDate: '20-Dec-05',
      serialNo: 34567,
      installed: 0,
      removed: 15517,
      actualLife: 15517,
      targetLife: 15000,
      reason: 'Teeth Worn Out',
      workorder: 'WO1236',
      qty: 1,
    },
    {
      replaceNo: 'PCR#004',
      componentName: 'Rotation Motor',
      position: 'Left',
      replacedDate: '7-Dec-05',
      serialNo: 45678,
      installed: 17592,
      removed: 17884,
      actualLife: 292,
      targetLife: 8000,
      reason: 'Failure',
      workorder: 'WO1237',
      qty: 1,
    },
    {
      replaceNo: 'PCR#005',
      componentName: 'Rotation Motor',
      position: 'Right',
      replacedDate: '7-Dec-05',
      serialNo: 567810,
      installed: 17592,
      removed: 17884,
      actualLife: 292,
      targetLife: 8000,
      reason: 'Failure',
      workorder: 'WO1238',
      qty: 1,
    },
  ],
}
