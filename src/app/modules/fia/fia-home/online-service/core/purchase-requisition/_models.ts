import { OnlineCategoryKey } from '../../registry'

/**
 * Purchase Requisition Types & Models
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

export type PurchaseRequisitionHeader = {
  requisitionId: string
  requestType: string
  refRequestNo: string
  fullPaymentMethod: string
}

export type PurchaseRequisitionInfo = {
  requisitionDate: string
  requestBy: string
  requestByJobTitle: string
  requestFor: string
  requestForJobTitle: string
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
  amount: string
  estimatedTime: string
  firstService: string
}

export type RequisitionInformation = {
  supplier: string
  supplierAddress: string
  supplierContact: string
  comments: string
}

export type ItemDetail = {
  id: string
  no: number
  ref_request_no?: string
  stockcode: string
  stock_description: string
  item_type: string
  quantity: string
  unit_price: string
  totalPrice: string // Calculated field for display
}

export type PurchaseRequisitionForm = {
  header: PurchaseRequisitionHeader
  requestInfo: PurchaseRequisitionInfo
  requisitionInfo: RequisitionInformation
  itemDetails: ItemDetail[]
  estimatedTotalCost: string
  remark: string
  internalNote: string
  attachment: string
  status: string
  createdBy: string
  createdDate: string
  lastModifiedBy: string
  lastModifiedDate: string
  approvedBy: string
  approvedDate: string
  rejectedBy: string
  rejectedDate: string
  reasonForRejection: string
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Purchase Requisition
 */
export function validatePurchaseRequisition(values: PurchaseRequisitionForm): string[] {
  const errors: string[] = []
  
  if (!values.requestInfo.requisitionDate) errors.push('Requisition Date is required')
  if (!values.requestInfo.requestBy) errors.push('Request By is required')
  if (!values.requestInfo.priority) errors.push('Priority is required')
  if (!values.requestInfo.amount) errors.push('Amount is required')
  if (!values.requisitionInfo.supplier) errors.push('Supplier is required')
  
  return errors
}

