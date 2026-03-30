export interface RequestsRow {
  id: number
  ref_doc_no: string
  description: string
  trans_type: string
  priority: string
  request_date: string
  status: string
  approval_comment?: string
}

export interface RequestHistoryRow {
  id: number
  routine_label: string
  status: string
  comment: string
  approver_name: string
  action_date: string
}

export interface RequestDetailPayload {
  ref_doc_no: string
  request_type: string
  detail: Record<string, any>
}

export interface RequestsContextType {
  requestsRows: RequestsRow[]
  setRequestsRows: React.Dispatch<React.SetStateAction<RequestsRow[]>>
  getRequestsCount: () => number

  // optional
  isLoading?: boolean
  error?: any
}
