// src/core/approvals/_requests.ts

import type {GetApprovalsResponse, ApprovalActionPayload, ApprovalActionResponse} from './_models'
import {client} from '../../../../../../functions'

export const getCurrentApprovals = async () => {
  const res = await client().get<GetApprovalsResponse>('/fia-resource/approvals')
  return res.data
}

export const getApprovalHistory = async () => {
  const res = await client().get<GetApprovalsResponse>('/fia-resource/approvals/history')
  return res.data
}

export const postApprovalAction = async (payload: ApprovalActionPayload) => {
  const res = await client().post<ApprovalActionResponse>(
    '/fia-resource/approvals/actions',
    payload
  )
  return res.data
}
