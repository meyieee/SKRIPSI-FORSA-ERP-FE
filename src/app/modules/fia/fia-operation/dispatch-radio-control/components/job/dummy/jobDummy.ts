export type JobRow = {
  id: string
  reqNo: string
  jobDescription: string
  reqBy: string
  reqDate: string
  priority: number
  planStart: string
  planFinish: string
  jobLocation: string
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
export const jobRows: JobRow[] = [
  // OPERATION DEPARTMENT
  {
    id: 'op-1',
    reqNo: 'JOB-2510-010',
    jobDescription: 'Surface Road Block A',
    reqBy: 'Kobe Kobistan',
    reqDate: '2025-03-09',
    priority: 1,
    planStart: '2025-03-09',
    planFinish: '2025-03-09',
    jobLocation: 'Surface Mine',
    costCenter: 'Ops Cost Center',
    status: 'New Request',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Job',
    workgroup: 'Operation Hauling Workgroup',
  },
  {
    id: 'op-2',
    reqNo: 'JOB-2510-011',
    jobDescription: 'Haul Shop Lighting',
    reqBy: 'Kobe Kobistan',
    reqDate: '2025-03-09',
    priority: 2,
    planStart: '2025-03-09',
    planFinish: '2025-03-09',
    jobLocation: 'Surface Mine',
    costCenter: 'Ops Cost Center',
    status: 'New Request',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Job',
    workgroup: 'Operation Hauling Workgroup',
  },
  {
    id: 'op-3',
    reqNo: 'JOB-2510-012',
    jobDescription: 'Hauling Shop Crane',
    reqBy: 'Kobe Kobistan',
    reqDate: '2025-05-04',
    priority: 1,
    planStart: '2025-05-04',
    planFinish: '2025-05-04',
    jobLocation: 'Surface Mine',
    costCenter: 'Ops Cost Center',
    status: 'Waiting for Approval',
    siteBranch: 'Head Site A',
    department: 'Operation Department',
    section: 'Operation',
    element: 'Job',
    workgroup: 'Operation Hauling Workgroup',
  },
  
  // HUMAN RESOURCES DEPARTMENT
  {
    id: 'hr-1',
    reqNo: 'JOB-2510-013',
    jobDescription: 'Admin Building Paint',
    reqBy: 'Muffin Apinton',
    reqDate: '2025-04-04',
    priority: 1,
    planStart: '2025-04-04',
    planFinish: '2025-04-04',
    jobLocation: 'Admin Building',
    costCenter: 'HR Cost Center',
    status: 'Waiting for Approval',
    siteBranch: 'Head Site A',
    department: 'Human Resources Department',
    section: 'Employee Admin',
    element: 'Job',
    workgroup: 'Employee Admin Workgroup',
  },
  {
    id: 'hr-2',
    reqNo: 'JOB-2510-014',
    jobDescription: 'Admin Janitor Room',
    reqBy: 'Muffin Apinton',
    reqDate: '2025-04-09',
    priority: 1,
    planStart: '2025-04-09',
    planFinish: '2025-04-09',
    jobLocation: 'Admin Building',
    costCenter: 'HR Cost Center',
    status: 'Waiting for Approval',
    siteBranch: 'Head Site A',
    department: 'Human Resources Department',
    section: 'Employee Admin',
    element: 'Job',
    workgroup: 'Employee Admin Workgroup',
  },
]