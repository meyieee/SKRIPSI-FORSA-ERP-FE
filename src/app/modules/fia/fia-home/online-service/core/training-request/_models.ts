import { OnlineCategoryKey } from '../../registry'

/**
 * Training Request Types & Models
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

export type TrainingRequestHeader = {
  requestId: string
  requestType: string
  refRequestNo: string
}

export type TrainingRequestInfo = {
  requestDate: string
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
  justificationReason: string
  justificationBenefit: string
  commentRemarkNote: string
  additionalComments: string
  relevantDocs: string
  relevantDocsSecond: string
  location: string
}

export type TrainingDetails = {
  trainingTitle: string
  trainingDuration: string
  trainingMethod: string
  lastAttended: string
  organizerProvider: string
  organizerDate: string
  organizerVenue: string
  organizerFees: string
  identifiedByEmployee: string
  identifiedBySupervisor: string
  identifiedByOther: string
}

export type TrainingApprovals = {
  immediateSupervisor: string
  departmentHead: string
  humanResource: string
}

export type TrainingRequestForm = {
  header: TrainingRequestHeader
  requestInfo: TrainingRequestInfo
  trainingDetails: TrainingDetails
  approvals: TrainingApprovals
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Training Request
 */
export function validateTrainingRequest(values: TrainingRequestForm): string[] {
  const errors: string[] = []
  
  if (!values.requestInfo.requestDate) errors.push('Request Date is required')
  if (!values.requestInfo.requestPurpose) errors.push('Request Purpose is required')
  if (!values.requestInfo.requestDescription) errors.push('Request Description is required')
  if (!values.requestInfo.priority) errors.push('Priority is required')
  if (!values.requestInfo.department) errors.push('Department is required')
  
  if (!values.trainingDetails.trainingTitle) errors.push('Training Title is required')
  if (!values.trainingDetails.trainingDuration) errors.push('Training Duration is required')
  if (!values.trainingDetails.trainingMethod) errors.push('Training Method is required')
  if (!values.trainingDetails.organizerDate) errors.push('Date of Training is required')
  
  return errors
}

