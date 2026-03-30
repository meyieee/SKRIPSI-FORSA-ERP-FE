export type InspectionRow = {
  id: string
  reqNo: string
  inspDescription: string
  assetDescription: string
  inspector: string
  inspDate: string
  priority: number
  location: string
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
export const inspectionRows: InspectionRow[] = [
  // OPERATION DEPARTMENT
  {
    id: 'op-1',
    reqNo: 'INS-2510-010',
    inspDescription: 'General Inspection',
    assetDescription: 'DD001 - Diesel Drill Model DD-Z01',
    inspector: 'Kobe Kobistan',
    inspDate: '2025-03-09',
    priority: 1,
    location: 'Surface Mine',
    costCenter: 'Ops Cost Center',
    status: 'New Request',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Inspection',
    workgroup: 'Operation Hauling Workgroup',
  },
  {
    id: 'op-2',
    reqNo: 'INS-2510-011',
    inspDescription: 'Schedule Inspection',
    assetDescription: 'EXB001 - Excavator EXC-BBB',
    inspector: 'Kobe Kobistan',
    inspDate: '2025-03-09',
    priority: 2,
    location: 'Surface Mine',
    costCenter: 'Ops Cost Center',
    status: 'New Request',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Inspection',
    workgroup: 'Operation Hauling Workgroup',
  },
  {
    id: 'op-3',
    reqNo: 'INS-2510-012',
    inspDescription: 'Schedule Inspection',
    assetDescription: 'DD002 - Diesel Drill Model DD-Z01',
    inspector: 'Kobe Kobistan',
    inspDate: '2025-05-04',
    priority: 1,
    location: 'Surface Mine',
    costCenter: 'Ops Cost Center',
    status: 'Waiting for Approval',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Inspection',
    workgroup: 'Operation Hauling Workgroup',
  },
  {
    id: 'hr-1',
    reqNo: 'INS-2510-013',
    inspDescription: 'General Inspection',
    assetDescription: 'ADM001 - Main Office',
    inspector: 'Muffin Apinton',
    inspDate: '2025-04-04',
    priority: 1,
    location: 'Admin Building',
    costCenter: 'HR Cost Center',
    status: 'Waiting for Approval',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Inspection',
    workgroup: 'Employee Admin Workgroup',
  },
  {
    id: 'hr-2',
    reqNo: 'INS-2510-014',
    inspDescription: 'Schedule Inspection',
    assetDescription: 'ADM002 - Admin Building',
    inspector: 'Muffin Apinton',
    inspDate: '2025-04-09',
    priority: 1,
    location: 'Admin Building',
    costCenter: 'HR Cost Center',
    status: 'Waiting for Approval',
    siteBranch: 'Head Site A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Inspection',
    workgroup: 'Employee Admin Workgroup',
  },
]