import { OnlineCategoryKey } from '../../registry'

/**
 * Workforce Request Types & Models
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

export type WorkforceRequestInfo = {
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
  justificationReason: string
  justificationBenefit: string
  commentRemarkNote: string
  additionalComments: string
  relevantDocs: string
  relevantDocsSecond: string
  location: string
  requestByJobTitle: string
  requestForJobTitle: string
}

export type WorkforceSpecs = {
  jobTitle: string
  positions: number | string
  employmentType: string
  overtimeRequired: boolean
  workSchedule: string
  workLocation: string
  shift: '' | 'Day' | 'Night' | 'Rotating' | 'Swing'
}

export type JobRequirements = {
  jobDescription: string
  keyResponsibilities: string
  requiredSkills: string
  experience: string
  education: string
}

export type WorkforceApprovals = {
  immediateSupervisor: string
  departmentHead: string
  humanResource: string
}

export type WorkforceRequestForm = {
  header: { requestId: string; requestType: string; refRequestNo: string }
  requestInfo: WorkforceRequestInfo
  workforceSpecs: WorkforceSpecs
  jobRequirements: JobRequirements
  approvals: WorkforceApprovals
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Workforce Request
 */
export function validateWorkforceRequest(step: number, v: WorkforceRequestForm): string[] {
  const errs: string[] = []
  if (step === 0) {
    if (!v.requestInfo.requestDate) errs.push('Request Date is required')
    if (!v.requestInfo.requestPurpose) errs.push('Request Purpose is required')
  }
  if (step === 1) {
    if (!v.workforceSpecs.jobTitle) errs.push('Job Title is required')
    if (!v.workforceSpecs.positions) errs.push('Number of Position is required')
  }
  if (step === 2) {
    if (!v.jobRequirements.jobDescription) errs.push('Job Description is required')
  }
  return errs
}

export function validateWorkforceRequestAll(v: WorkforceRequestForm): string[] {
  const all: string[] = []
  ;[0, 1, 2].forEach((s) => {
    all.push(...validateWorkforceRequest(s, v))
  })
  if (!v.requestInfo.requestBy) all.push('Request By is required')
  if (!v.requestInfo.requestDescription) all.push('Request Description is required')
  return all
}

