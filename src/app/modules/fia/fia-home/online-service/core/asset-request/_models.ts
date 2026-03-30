import { OnlineCategoryKey } from '../../registry'

/**
 * Asset Request Types & Models
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

export type AssetRequestInfo = {
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

export type AssetRequestForm = {
  header: {
    requestId: string
    requestType: string
    refRequestNo: string
  }
  requestInfo: AssetRequestInfo
  assetDetails: {
    assetType: string
    assetModel: string
    assetSpecification: string
    quantity: number
    comments: string
  }
  approvals: {
    immediateSupervisor: string
    departmentHead: string
    relatedManager: string
  }
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Asset Request
 */
export function validateAssetRequestAll(v: AssetRequestForm): string[] {
  const errs: string[] = []
  
  if (!v.requestInfo.requestDate) errs.push('Request Date is required')
  if (!v.requestInfo.requestBy) errs.push('Request By is required')
  if (!v.requestInfo.requestPurpose) errs.push('Request Purpose is required')
  if (!v.assetDetails.assetType) errs.push('Asset Type is required')
  if (!v.assetDetails.assetModel) errs.push('Asset Model is required')
  if (!v.assetDetails.quantity || v.assetDetails.quantity < 1) errs.push('Quantity must be at least 1')
  
  return errs
}

