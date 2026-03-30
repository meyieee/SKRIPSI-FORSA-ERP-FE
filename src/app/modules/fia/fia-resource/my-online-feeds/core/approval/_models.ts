// src/core/approvals/_models.ts

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
  pending_since?: string
}

export type ApprovalItem = ApprovalRow

export interface GetApprovalsResponse {
  userFirstName?: string | null
  data: ApprovalRow[]
}

export interface ApprovalActionPayload {
  docNos: string[]
  actionType: 'Approve' | 'Pending' | 'Reject'
  notes: Record<string, string>
}

export interface ApprovalActionResult {
  docNo: string
  ok: boolean
  message?: string
}

export interface ApprovalActionResponse {
  results: ApprovalActionResult[]
}
