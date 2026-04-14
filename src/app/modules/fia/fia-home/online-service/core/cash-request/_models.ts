import { OnlineCategoryKey } from '../../registry'

/**
 * Cash Request Types & Models
 */

export type WorkflowTracking = {
  checkBy: string
  checkDate: string
  checkComments: string
  reviewBy: string
  reviewDate: string
  reviewComments: string
  approveOneBy: string
  approveOneDate: string
  approveOneComments: string
  approveSecondBy: string
  approveSecondDate: string
  approveSecondComments: string
  approveThirdBy: string
  approveThirdDate: string
  approveThirdComments: string
  createdAt: string
  updatedAt: string
}

export type CashRequestInfo = {
  requestDate: string
  requestBy: string
  requestFor: string
  requestPurpose: string
  priority: string
  branchSite: string
  department: string
  costCenter: string
  requestDescription: string
  justification: string
  commentRemarkNote: string
  additionalComments: string
  relevantDocs: string
  relevantDocsSecond: string
  location: string
}

export type CashRequestForm = {
  header: {
    requestId: string
    requestType: string
    refRequestNo: string
  }
  requestInfo: CashRequestInfo
  cashRequestDetails: {
    expenseType: string
    amountRequest: number
    paymentMethod: string
    bankAccount: string
    currency: string
  }
  approvals: {
    immediateSupervisor: string
    departmentHead: string
    financeManager: string
  }
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Cash Request
 */
export function validateCashRequestAll(v: CashRequestForm): string[] {
  const errs: string[] = []
  
  if (!v.requestInfo.requestDate) errs.push('Request Date is required')
  if (!v.requestInfo.requestBy) errs.push('Request By is required')
  if (!v.requestInfo.requestPurpose) errs.push('Request Purpose is required')
  if (!v.requestInfo.priority) errs.push('Priority is required')
  if (!v.cashRequestDetails.expenseType) errs.push('Expense Type is required')
  if (!v.cashRequestDetails.amountRequest || v.cashRequestDetails.amountRequest <= 0) errs.push('Amount Request must be greater than 0')
  if (!v.cashRequestDetails.paymentMethod) errs.push('Payment Method is required')
  
  return errs
}

