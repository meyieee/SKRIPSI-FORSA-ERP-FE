import { OnlineCategoryKey } from '../../registry'

/**
 * Job Request Types & Models
 * All TypeScript types and interfaces for Job Request
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

export type JobRequestInfo = {
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

export type JobOrderDetails = {
  jobType: string
  location: string
  assetEquipment: string
}

export type WorkRequirements = {
  specialInstructions: string
  safetyPrecautions: string
  materialRequired: string
  toolRequired: string
}

export type AssignmentScheduling = {
  assignedTo: string
  workorderStatus: string
  workorderClosure: string
  scheduleStartDate: string
  actualStartDate: string
  completionDate: string
  actualCompletionDate: string
  additionalComments: string
}

export type JobApprovals = {
  departmentHead: string
  relatedManager: string
}

export type JobRequestForm = {
  header: {
    requestId: string
    requestType: string
    refRequestNo: string
  }
  requestInfo: JobRequestInfo
  jobOrder: JobOrderDetails
  workRequirements: WorkRequirements
  assignment: AssignmentScheduling
  approvals: JobApprovals
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Job Request
 */
export function validateJobRequestAll(v: JobRequestForm): string[] {
  const errs: string[] = []
  
  if (!v.requestInfo.requestDate) errs.push('Request Date is required')
  if (!v.requestInfo.requestBy) errs.push('Request By is required')
  if (!v.requestInfo.requestPurpose) errs.push('Request Purpose is required')
  if (!v.requestInfo.priority) errs.push('Priority is required')
  if (!v.jobOrder.jobType) errs.push('Job Type is required')
  if (!v.jobOrder.location) errs.push('Location is required')
  
  return errs
}

