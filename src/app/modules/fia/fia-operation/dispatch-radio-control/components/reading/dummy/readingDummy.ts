export type ReadingRow = {
  id: string
  assetNo: string
  type: 'Hours' | 'Km' | string
  averageUsing: string
  date: string
  time: string
  enteredReading: number
  increment: number
  accumReading: number
  status: string
  assetModel: string
  siteBranch: string
  department: string
  section: string
  element?: string
}

// Fallback dummy data
export const readingRows: ReadingRow[] = [
  {
    id: 'ddm-1',
    assetNo: 'DD001',
    type: 'Hours',
    averageUsing: '#DIV/0!',
    date: '2025-09-20',
    time: '0:00:00',
    enteredReading: 3000,
    increment: 20,
    accumReading: 3000,
    status: 'Continue',
    assetModel: 'Diesel Drill Model DD-Z01',
    siteBranch: 'Jakarta',
    department: 'Mining',
    section: 'Section 1',
    element: 'Fuel',
  },
  {
    id: 'ddm-2',
    assetNo: 'DD002',
    type: 'Hours',
    averageUsing: '0',
    date: '2025-09-20',
    time: '0:00:00',
    enteredReading: 2000,
    increment: 20,
    accumReading: 2000,
    status: 'Continue',
    assetModel: 'Diesel Drill Model DD-Z01',
    siteBranch: 'Jakarta',
    department: 'Mining',
    section: 'Section 1',
    element: 'Fuel',
  },
  {
    id: 'e-a-1',
    assetNo: 'EXA001',
    type: 'Hours',
    averageUsing: '#DIV/0!',
    date: '2025-09-20',
    time: '0:00:00',
    enteredReading: 3030,
    increment: 15,
    accumReading: 3030,
    status: 'Continue',
    assetModel: 'Excavator EXC-AAA',
    siteBranch: 'Jakarta',
    department: 'Operations',
    section: 'Section 2',
    element: 'Fuel',
  },
  {
    id: 'e-a-2',
    assetNo: 'EXA002',
    type: 'Hours',
    averageUsing: '0',
    date: '2025-09-20',
    time: '0:00:00',
    enteredReading: 1500,
    increment: 15,
    accumReading: 1500,
    status: 'Continue',
    assetModel: 'Excavator EXC-AAA',
    siteBranch: 'Jakarta',
    department: 'Operations',
    section: 'Section 2',
    element: 'Fuel',
  },
  {
    id: 'e-b-1',
    assetNo: 'EXB001',
    type: 'Hours',
    averageUsing: '0',
    date: '2025-09-20',
    time: '0:00:00',
    enteredReading: 4040,
    increment: 24,
    accumReading: 4040,
    status: 'Continue',
    assetModel: 'Excavator EXC-BBB',
    siteBranch: 'Jakarta',
    department: 'Operations',
    section: 'Section 3',
    element: 'Fuel',
  },
  {
    id: 'ht-a-1',
    assetNo: 'HL001',
    type: 'Km',
    averageUsing: '#DIV/0!',
    date: '2025-09-20',
    time: '0:00:00',
    enteredReading: 3030,
    increment: 20,
    accumReading: 3030,
    status: 'Continue',
    assetModel: 'Haul Truck HTZ07',
    siteBranch: 'Surabaya',
    department: 'Hauling',
    section: 'Section 4',
    element: 'Km',
  },
  {
    id: 'ht-a-2',
    assetNo: 'HL002',
    type: 'Km',
    averageUsing: '0',
    date: '2025-09-20',
    time: '0:00:00',
    enteredReading: 1500,
    increment: 20,
    accumReading: 1500,
    status: 'Continue',
    assetModel: 'Haul Truck HTZ07',
    siteBranch: 'Surabaya',
    department: 'Hauling',
    section: 'Section 4',
    element: 'Km',
  },
  {
    id: 'ht-b-1',
    assetNo: 'HL003',
    type: 'Km',
    averageUsing: '#DIV/0!',
    date: '2025-09-20',
    time: '0:00:00',
    enteredReading: 2026,
    increment: 20,
    accumReading: 2026,
    status: 'Continue',
    assetModel: 'Haul Truck HTZ08',
    siteBranch: 'Surabaya',
    department: 'Hauling',
    section: 'Section 5',
    element: 'Km',
  },
  {
    id: 'ht-b-2',
    assetNo: 'HL004',
    type: 'Km',
    averageUsing: '0',
    date: '2025-09-20',
    time: '0:00:00',
    enteredReading: 3500,
    increment: 20,
    accumReading: 3500,
    status: 'Continue',
    assetModel: 'Haul Truck HTZ08',
    siteBranch: 'Surabaya',
    department: 'Hauling',
    section: 'Section 5',
    element: 'Km',
  },
]

export type readingHistoryRow = {
  id: string
  assetNo: string
  assetModel: string
  date: string
  time: string
  type: 'Hours' | 'Km' | string
  averageUsing: string
  enteredReading: number
  increment: number
  accumReading: number
  status: string
}

export const readingHistoryMap: Record<string, readingHistoryRow[]> = {
  'DD001': [
    {
      id: 'rd-dd001-2025-09-20',
      assetNo: 'DD001',
      assetModel: 'Diesel Drill Model DD-Z01',
      date: '2025-09-20',
      time: '0:00:00',
      type: 'Hours',
      averageUsing: '#DIV/0!',
      enteredReading: 3000,
      increment: 20,
      accumReading: 3000,
      status: 'Continue',
    },
    {
      id: 'rd-dd001-2025-09-19',
      assetNo: 'DD001',
      assetModel: 'Diesel Drill Model DD-Z01',
      date: '2025-09-19',
      time: '0:00:00',
      type: 'Hours',
      averageUsing: '#DIV/0!',
      enteredReading: 2980,
      increment: 15,
      accumReading: 3000,
      status: 'Continue',
    },
    {
      id: 'rd-dd001-2025-09-18',
      assetNo: 'DD001',
      assetModel: 'Diesel Drill Model DD-Z01',
      date: '2025-09-18',
      time: '0:00:00',
      type: 'Hours',
      averageUsing: '#DIV/0!',
      enteredReading: 2965,
      increment: 10,
      accumReading: 3000,
      status: 'Continue',
    },
    {
      id: 'rd-dd001-2025-09-17',
      assetNo: 'DD001',
      assetModel: 'Diesel Drill Model DD-Z01',
      date: '2025-09-17',
      time: '0:00:00',
      type: 'Hours',
      averageUsing: '#DIV/0!',
      enteredReading: 2955,
      increment: 20,
      accumReading: 2000,
      status: 'Continue',
    },
  ],

  'DD002': [
    {
      id: 'rd-dd002-2025-09-20',
      assetNo: 'DD002',
      assetModel: 'Diesel Drill Model DD-Z01',
      date: '2025-09-20',
      time: '0:00:00',
      type: 'Hours',
      averageUsing: '0',
      enteredReading: 2000,
      increment: 20,
      accumReading: 2000,
      status: 'Continue',
    },
    {
      id: 'rd-dd002-2025-09-19',
      assetNo: 'DD002',
      assetModel: 'Diesel Drill Model DD-Z01',
      date: '2025-09-19',
      time: '0:00:00',
      type: 'Hours',
      averageUsing: '0',
      enteredReading: 1980,
      increment: 18,
      accumReading: 2000,
      status: 'Continue',
    },
],
}