export type PrecheckSuggestion = 'approve' | 'reject' | null

export interface ApprovalRow {
  id: number
  document_no: string
  request_type: string
  created: string
  raised_by: string
  project_desc: string
  status: string
  notes: string
  processed_date?: string
  precheck?: PrecheckSuggestion
  precheck_by?: string
  precheck_notes?: string
  pending_since?: string
}

export type ApprovalItem = ApprovalRow

export interface ApprovalContextType {
  approvalRows: ApprovalRow[]
  setApprovalRows: (rows: ApprovalRow[]) => void
  historyRows: ApprovalRow[]
  setHistoryRows: (rows: ApprovalRow[]) => void
  selectedItems: ApprovalRow[]
  setSelectedItems: (items: ApprovalRow[]) => void
  updateStatusAndNotes: (
    docNos: string[],
    actionType: 'Approve' | 'Pending' | 'Reject',
    newNotes: Record<string, string>
  ) => Promise<void>
  getApprovalCount: () => number

  userFirstName: string
  refreshCurrentApprovals: () => Promise<void>
  refreshApprovalHistory: () => Promise<void>
}
