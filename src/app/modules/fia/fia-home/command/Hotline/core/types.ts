export interface HotlineContact {
  type: 'phone' | 'wa' | 'email'
  label: string
  values: string[]
}

export interface InChargePerson {
  fullName: string
  jobTitle: string
  phone: string
}

export interface HelpdeskRequest {
  id: string
  refDocNo: string
  description: string
  transType: string
  requestor: string
  priority: string
  requestDate: string
  expired: string
  status: string
}

export interface HotlineFilters {
  site: string
  department: string
  section: string
  element: string
  date: string
}














