import { OnlineCategoryKey } from '../../registry'

/**
 * Fleet Request Types & Models
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

export type FleetRequestInfo = {
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

export type FleetDetails = {
  fleetType: string
  additionInformation: string
  numberOfUnits: string
  specifications: string
}

export type TransferDetails = {
  currentOwner: string
  fleetLocation: string
  workLocation: string
  reasonForTransfer: string
}

export type FleetApprovals = {
  immediateSupervisor: string
  departmentHead: string
  relatedManager: string
}

export type FleetForm = {
  header: {
    requestId: string
    requestType: string
    refRequestNo: string
  }
  requestInfo: FleetRequestInfo
  fleetDetails: FleetDetails
  transferDetails: TransferDetails
  approvals: FleetApprovals
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Fleet Request
 */
export function validateFleetRequestAll(v: FleetForm): string[] {
  const errs: string[] = []
  
  if (!v.requestInfo.requestDate) errs.push('Request Date is required')
  if (!v.requestInfo.requestBy) errs.push('Request By is required')
  if (!v.requestInfo.requestPurpose) errs.push('Request Purpose is required')
  if (!v.requestInfo.priority) errs.push('Priority is required')
  if (!v.fleetDetails.fleetType) errs.push('Fleet Type is required')
  if (!v.fleetDetails.numberOfUnits) errs.push('Number of Units is required')
  
  return errs
}

