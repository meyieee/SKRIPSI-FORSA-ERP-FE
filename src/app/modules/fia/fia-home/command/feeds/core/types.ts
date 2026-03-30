export interface FeedsFilters {
  site: string
  department: string
  section: string
  element: string
  date: string
}

export interface OnlineRequest {
  id: string
  no: number
  refDocNo: string
  description: string
  transType: string
  requestor: string
  priority: string
  requestDate: string
  expired: string
  status: string
}

export interface OnlineTask {
  id: string
  no: number
  tasksNo: string
  tasksTitle: string
  assignedBy: string
  assignedTo: string
  priority: string
  tasksDate: string
  expired: string
  status: string
}

export interface OnlineReminder {
  id: string
  no: number
  docNo: string
  title: string
  personIncharge: string
  actualDue: string
  willDue: string
  notification: string
}

export interface OnlineRoster {
  id: string
  siteBranch: string
  department: string
  section: string
  element: string
  workgroup: string
  crew: string
  empNo: string
  empName: string
  jobTitle: string
  roster: string // e.g., "6-1", "5-2"
  attendance?: Record<string, string> // Record<dateKey, shiftCode> e.g., {"2025-03-01": "D", "2025-03-02": "O"}
}

