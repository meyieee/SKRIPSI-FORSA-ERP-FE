// ---- Types
export type ViolationRow = {
  id: number
  department: string
  present: number
  dayOff: number
  leave: number
  absent: number
  sick: number
  total: number
  available: number // %
  rawAvailable: number // %
  effective: number // %
  siteBranch?: string
  section?: string
  element?: string
}

export type WarningRow = {
  id: number
  department: string
  verbal: number
  warn1: number
  warn2: number
  warn3: number
  suspension: number
  termination: number
  siteBranch?: string
  section?: string
  element?: string
}

// ---- Dummies (angka meniru nuansa pada foto)
export const violationRows: ViolationRow[] = [
  {
    id: 1,
    department: '1001-Administration Department',
    present: 20,
    dayOff: 10,
    leave: 0,
    absent: 0,
    sick: 0,
    total: 30,
    available: 66.7,
    rawAvailable: 100.0,
    effective: 66.7,
    siteBranch: 'Head Site A',
    section: 'General',
    element: 'Violation',
  },
  {
    id: 2,
    department: '1101-Operation Department',
    present: 10,
    dayOff: 2,
    leave: 0,
    absent: 10,
    sick: 0,
    total: 22,
    available: 45.5,
    rawAvailable: 54.5,
    effective: 45.5,
    siteBranch: 'Head Site A',
    section: 'General',
    element: 'Violation',
  },
  {
    id: 3,
    department: '1201-Maintenance Department',
    present: 15,
    dayOff: 10,
    leave: 0,
    absent: 5,
    sick: 0,
    total: 30,
    available: 50.0,
    rawAvailable: 83.3,
    effective: 50.0,
  },
  {
    id: 4,
    department: '2101-HR Admin Department',
    present: 20,
    dayOff: 10,
    leave: 0,
    absent: 0,
    sick: 0,
    total: 30,
    available: 66.7,
    rawAvailable: 100.0,
    effective: 66.7,
  },
  {
    id: 5,
    department: '2302-EHS Department',
    present: 10,
    dayOff: 2,
    leave: 0,
    absent: 10,
    sick: 2,
    total: 22,
    available: 45.5,
    rawAvailable: 54.5,
    effective: 45.5,
  },
  {
    id: 6,
    department: '3101-SCM Procurement Department',
    present: 15,
    dayOff: 10,
    leave: 0,
    absent: 5,
    sick: 0,
    total: 30,
    available: 50.0,
    rawAvailable: 83.3,
    effective: 50.0,
  },
  {
    id: 7,
    department: '3301-SCM Warehouse Department',
    present: 10,
    dayOff: 2,
    leave: 0,
    absent: 10,
    sick: 0,
    total: 22,
    available: 45.5,
    rawAvailable: 54.5,
    effective: 45.5,
  },
  {
    id: 8,
    department: '4101-FA Finance Department',
    present: 15,
    dayOff: 10,
    leave: 0,
    absent: 5,
    sick: 0,
    total: 30,
    available: 50.0,
    rawAvailable: 83.3,
    effective: 50.0,
  },
]

export const warningRows: WarningRow[] = [
  {
    id: 1,
    department: '1001-Administration Department',
    verbal: 2,
    warn1: 0,
    warn2: 0,
    warn3: 0,
    suspension: 1,
    termination: 0,
  },
  {
    id: 2,
    department: '1101-Operation Department',
    verbal: 0,
    warn1: 5,
    warn2: 0,
    warn3: 0,
    suspension: 0,
    termination: 0,
  },
  {
    id: 3,
    department: '1201-Maintenance Department',
    verbal: 0,
    warn1: 0,
    warn2: 1,
    warn3: 0,
    suspension: 0,
    termination: 1,
  },
  {
    id: 4,
    department: '2101-HR Admin Department',
    verbal: 1,
    warn1: 0,
    warn2: 0,
    warn3: 0,
    suspension: 1,
    termination: 0,
  },
  {
    id: 5,
    department: '2302-EHS Department',
    verbal: 0,
    warn1: 2,
    warn2: 0,
    warn3: 0,
    suspension: 0,
    termination: 0,
  },
  {
    id: 6,
    department: '3101-SCM Procurement Department',
    verbal: 3,
    warn1: 1,
    warn2: 0,
    warn3: 0,
    suspension: 0,
    termination: 0,
  },
  {
    id: 7,
    department: '3301-SCM Warehouse Department',
    verbal: 0,
    warn1: 0,
    warn2: 0,
    warn3: 1,
    suspension: 0,
    termination: 1,
  },
  {
    id: 8,
    department: '4101-FA Finance Department',
    verbal: 2,
    warn1: 0,
    warn2: 0,
    warn3: 0,
    suspension: 0,
    termination: 0,
  },
]
