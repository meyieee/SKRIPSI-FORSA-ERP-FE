export type BreakdownRow = {
  id: string
  assetCode: string
  date: string
  time: string
  duration: string
  currentLocation: string
  type: number
  typeDesc: string
  status: string
  jobCode: string
  comment: string
  assetModel: string
  siteBranch: string
  department: string
  section: string
  element?: string
}

// Fallback dummy data
export const breakdownRows: BreakdownRow[] = [
  {
    id: 'ddm-1',
    assetCode: 'DD001',
    date: '1-Jul-23',
    time: '0:00:00',
    duration: '0:00:00',
    currentLocation: '',
    type: 100,
    typeDesc: 'Operating|Work',
    status: 'Ready',
    jobCode: 'Productive Time',
    comment: '',
    assetModel: 'Diesel Drill Model DD-Z01',
    siteBranch: 'Site A',
    department: 'Mining',
    section: 'Section 1',
    element: 'Breakdown',
  },
  {
    id: 'ddm-1',
    assetCode: 'DD002',
    date: '1-Jul-23',
    time: '0:00:00',
    duration: '0:00:00',
    currentLocation: '',
    type: 401,
    typeDesc: 'PM',
    status: 'Down',
    jobCode: 'Planned Loss',
    comment: 'Preventive Maintenance 500H',
    assetModel: 'Diesel Drill Model DD-Z01',
    siteBranch: 'Site A',
    department: 'Mining',
    section: 'Section 1',
    element: 'Breakdown',
  },
  {
    id: 'e-a-1',
    assetCode: 'EXA001',
    date: '1-Jul-23',
    time: '0:00:00',
    duration: '0:00:00',
    currentLocation: '',
    type: 100,
    typeDesc: 'Operating|Work',
    status: 'Ready',
    jobCode: 'Productive Time',
    comment: '',
    assetModel: 'Excavator EXC-AAA',
    siteBranch: 'Site B',
    department: 'Operations',
    section: 'Section 2',
    element: 'Breakdown',
  },
  {
    id: 'e-a-1',
    assetCode: 'EXA002',
    date: '1-Jul-23',
    time: '0:00:00',
    duration: '0:00:00',
    currentLocation: '',
    type: 303,
    typeDesc: 'No Manned/No Oprt',
    status: 'Standby',
    jobCode: 'Standby',
    comment: 'Operator Late',
    assetModel: 'Excavator EXC-AAA',
    siteBranch: 'Site B',
    department: 'Operations',
    section: 'Section 2',
    element: 'Breakdown',
  },
  {
    id: 'e-a-1',
    assetCode: 'EXB001',
    date: '1-Jul-23',
    time: '0:00:00',
    duration: '0:00:00',
    currentLocation: '',
    type: 303,
    typeDesc: 'No Manned/No Oprt',
    status: 'Standby',
    jobCode: 'Standby',
    comment: 'Operator Late',
    assetModel: 'Excavator EXC-BBB',
    siteBranch: 'Site B',
    department: 'Operations',
    section: 'Section 3',
    element: 'Breakdown',
  },
  {
    id: 'ht-a-1',
    assetCode: 'HL001',
    date: '1-Jul-23',
    time: '0:00:00',
    duration: '0:00:00',
    currentLocation: '',
    type: 202,
    typeDesc: 'Weather (Wet | Cloud)',
    status: 'Delay',
    jobCode: 'Operation Delay',
    comment: 'Heavy Rain whole day',
    assetModel: 'Haul Truck HT-007',
    siteBranch: 'Site C',
    department: 'Mining',
    section: 'Section 3',
    element: 'Breakdown',
  },
  {
    id: 'ht-a-1',
    assetCode: 'HL002',
    date: '1-Jul-23',
    time: '0:00:00',
    duration: '0:00:00',
    currentLocation: '',
    type: 507,
    typeDesc: 'Accident Damage',
    status: 'Down',
    jobCode: 'Accident | Abuse',
    comment: 'Cooler Radiator Leaking hit b',
    assetModel: 'Haul Truck HT-007',
    siteBranch: 'Site C',
    department: 'Mining',
    section: 'Section 3',
    element: 'Breakdown',
  },
  {
    id: 'ht-a-1',
    assetCode: 'HL003',
    date: '1-Jul-23',
    time: '0:00:00',
    duration: '0:00:00',
    currentLocation: '',
    type: 514,
    typeDesc: 'Stranded | Natura Di:',
    status: 'Down',
    jobCode: 'Extended Loss',
    comment: 'Landslide road blocked',
    assetModel: 'Haul Truck HTZ08',
    siteBranch: 'Site C',
    department: 'Mining',
    section: 'Section 3',
    element: 'Breakdown',
  },
  {
    id: 'ht-a-1',
    assetCode: 'HL004',
    date: '1-Jul-23',
    time: '0:00:00',
    duration: '0:00:00',
    currentLocation: '',
    type: 100,
    typeDesc: 'Operating|Work',
    status: 'Ready',
    jobCode: 'Productive Time',
    comment: '',
    assetModel: 'Haul Truck HTZ08',
    siteBranch: 'Site C',
    department: 'Mining',
    section: 'Section 3',
    element: 'Breakdown',
  },
]

export type breakdownStatusChangeRow = {
  id: string
  date: string
  time: string
  status: string
  type: string
  typeDesc: string
  reasons: string
  comments: string
  correctiveAction: string
}

export const breakdownStatusChangeMap: breakdownStatusChangeRow[] = [
  {
    id: '1',
    date: '1-Jul-23',
    time: '0:00:00',
    status: 'Standby',
    type: '205',
    typeDesc: 'Jam | Block',
    reasons: 'Block',
    comments: 'Road Blocked',
    correctiveAction: ''
  },
  {
    id: '2',
    date: '1-Jul-23',
    time: '0:00:00',
    status: 'Down',
    type: '302',
    typeDesc: 'Mechanical Vital',
    reasons: 'Engine broken',
    comments: 'Engine broken',
    correctiveAction: ''
  },
  {
    id: '3',
    date: '1-Jul-23',
    time: '0:00:00',
    status: 'Ready',
    type: '0',
    typeDesc: 'Operating',
    reasons: 'Productive Time',
    comments: '',
    correctiveAction: ''
  }
]