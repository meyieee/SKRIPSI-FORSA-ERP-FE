export type LeaveTravelRow = {
  no: number
  leaveNo: string
  tripPurpose: string
  requestOut: string
  requestIn: string
  actualOut: string
  actualIn: string
  takenDays: number
  from: string
  to: string
  flightStatus: string
}

export const leaveTravelDummy: Record<string, LeaveTravelRow[]> = {
  '254875': [
    {
      no: 1,
      leaveNo: 'Z201-001',
      tripPurpose: 'Roster',
      requestOut: '1 Jan 23',
      requestIn: '1 Jan 23',
      actualOut: '01-Jan-23',
      actualIn: '01-Jan-23',
      takenDays: 1.0,
      from: 'Manado',
      to: 'Jakarta',
      flightStatus: 'OK',
    },
    {
      no: 2,
      leaveNo: 'Z201-002',
      tripPurpose: 'Annual',
      requestOut: '2 Feb 23',
      requestIn: '4 Feb 23',
      actualOut: '02-Feb-23',
      actualIn: '04-Feb-23',
      takenDays: 3.0,
      from: 'Manado',
      to: 'Jakarta',
      flightStatus: 'OK',
    },
    {
      no: 3,
      leaveNo: 'Z201-003',
      tripPurpose: 'Training',
      requestOut: '31 Feb 23',
      requestIn: '31 Feb 23',
      actualOut: '02-Mar-23',
      actualIn: '04-Mar-23',
      takenDays: 3.0,
      from: 'Manado',
      to: 'Jakarta',
      flightStatus: 'OK',
    },
    {
      no: 4,
      leaveNo: 'Z201-004',
      tripPurpose: 'Cobus',
      requestOut: '1 Mar 23',
      requestIn: '1 Mar 23',
      actualOut: '01-Mar-23',
      actualIn: '01-Mar-23',
      takenDays: 1.0,
      from: 'Manado',
      to: 'Jakarta',
      flightStatus: 'OK',
    },
  ],
  '987654': [
    {
      no: 1,
      leaveNo: 'Z301-011',
      tripPurpose: 'Annual',
      requestOut: '10 Jun 23',
      requestIn: '12 Jun 23',
      actualOut: '10-Jun-23',
      actualIn: '12-Jun-23',
      takenDays: 3.0,
      from: 'Surabaya',
      to: 'Jakarta',
      flightStatus: 'OK',
    },
  ],
}
