export type PPERow = {
  no: number
  ppe: string
  dateReplace: string
  reasonToReplace: string
  checkedBy: string
  approvedBy: string
  stockcode: string
}

export const ppeDummy: Record<string, PPERow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      ppe: 'Shoes',
      dateReplace: '1 Jan 23',
      reasonToReplace: 'Broken',
      checkedBy: 'Kope',
      approvedBy: 'Muffin',
      stockcode: '12345',
    },
    {
      no: 2,
      ppe: 'Hard Hat',
      dateReplace: '4 Feb 23',
      reasonToReplace: 'Missing',
      checkedBy: 'Atlas',
      approvedBy: 'Muffin',
      stockcode: '23456',
    },
    {
      no: 3,
      ppe: 'Respiratory',
      dateReplace: '31 Feb 23',
      reasonToReplace: 'New',
      checkedBy: 'Atlas',
      approvedBy: 'Muffin',
      stockcode: '34567',
    },
    {
      no: 4,
      ppe: 'Uniform T-Shirt',
      dateReplace: '1 Mar 23',
      reasonToReplace: 'Time to Change',
      checkedBy: 'Atlas',
      approvedBy: 'Muffin',
      stockcode: '45678',
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      ppe: 'Safety Glasses',
      dateReplace: '10 Jun 23',
      reasonToReplace: 'Broken',
      checkedBy: 'Steve',
      approvedBy: 'Nora',
      stockcode: '77889',
    },
  ],
}
