export type FleetRow = {
  id: string
  reqNo: string
  jobDescription: string
  typeModel: string
  unitNo: number
  reqBy: string
  reqDate: string
  priority: number
  fleetLocation: string
  costCenter: string
  status: 'New Request' | 'Waiting for Approval' | 'Approved' | 'Rejected' | 'Scheduled' | string
  
  // grouping
  siteBranch: string
  department: string
  section: string
  element?: string
  workgroup: string
}

// Fallback dummy data
export const fleetRows: FleetRow[] = [
  // OPERATION DEPARTMENT
  {
    id: 'op-1',
    reqNo: 'FLR-2510-010',
    jobDescription: 'Increase Shovel Load',
    typeModel: 'Shovel Model A123',
    unitNo: 1,
    reqBy: 'Kobe Kobistan',
    reqDate: '2025-03-09',
    priority: 1,
    fleetLocation: 'Surface Mine',
    costCenter: 'Ops Cost Center',
    status: 'New Request',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Fleet',
    workgroup: 'Operation Hauling Workgroup',
  },
  {
    id: 'op-2',
    reqNo: 'FLR-2510-011',
    jobDescription: 'Increase Haul Tonnage',
    typeModel: 'Haul Model AAA',
    unitNo: 2,
    reqBy: 'Kobe Kobistan',
    reqDate: '2025-03-09',
    priority: 2,
    fleetLocation: 'Surface Mine',
    costCenter: 'Ops Cost Center',
    status: 'New Request',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Fleet',
    workgroup: 'Operation Hauling Workgroup',
  },
  {
    id: 'op-3',
    reqNo: 'FLR-2510-012',
    jobDescription: 'Increase Haul Tonnage',
    typeModel: 'Haul Model BBB',
    unitNo: 1,
    reqBy: 'Kobe Kobistan',
    reqDate: '2025-05-04',
    priority: 1,
    fleetLocation: 'Surface Mine',
    costCenter: 'Ops Cost Center',
    status: 'Waiting for Approval',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Fleet',
    workgroup: 'Operation Hauling Workgroup',
  },
]