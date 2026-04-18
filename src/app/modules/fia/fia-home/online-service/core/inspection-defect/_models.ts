import { OnlineCategoryKey } from '../../registry'

/**
 * Inspection Defect Types & Models
 */

export type InspectionDefectHeader = {
  requestId: string
  requestType: string
  refRequestNo: string
}

export type InspectionRequestInfo = {
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

export type InspectionInfo = {
  inspectionDate: string
  inspectionType: string
  inspectionDescription: string
  inspectionBy: string
  inspectionByJobTitle: string
  inspectionFor: string
  inspectionForJobTitle: string
  priority: string
  department: string
  relevantDocs: string
  costCenter: string
  justificationReason: string
  justificationBenefit: string
}

export type InspectionDetailInfo = {
  assetNo: string
  assetDescription: string
  assetType: string
  assetModel: string
  location: string
  inspectionSummary: string
  notesComments: string
  additionalNotes: string
}

export type DefectDetail = {
  id: string
  no: number
  defectDescription: string
  condition: 'Good' | 'Fair' | 'Poor'
  category: 'Mechanical' | 'Electrical' | 'General' | 'Other'
  recommendedAction: string
  assignedTo: string
  dueDate: string
  actionTaken: 'None' | 'Schedule Repair' | 'Out of Service' | 'Other - Describe'
  result: 'Pass' | 'Fail'
  status: 'Open' | 'In Progress' | 'Completed'
}

export type InspectionApprovals = {
  immediateSupervisor: string
  departmentHead: string
  relatedManager: string
}

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

export type InspectionDefectForm = {
  header: InspectionDefectHeader
  requestInfo: InspectionRequestInfo
  inspectionInfo: InspectionInfo
  inspectionDetailInfo: InspectionDetailInfo
  defectDetails: DefectDetail[]
  approvals: InspectionApprovals
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Inspection Defect
 */
export function validateInspectionDefect(values: InspectionDefectForm): string[] {
  const errors: string[] = []
  
  if (!values.requestInfo.requestDate) errors.push('Request Date is required')
  if (!values.requestInfo.requestBy) errors.push('Request By is required')
  if (!values.requestInfo.requestPurpose) errors.push('Request Purpose is required')
  if (!values.requestInfo.priority) errors.push('Priority is required')
  if (!values.requestInfo.requestDescription) errors.push('Request Description is required')
  
  if (!values.inspectionInfo.inspectionDate) errors.push('Inspection Date is required')
  if (!values.inspectionInfo.inspectionType) errors.push('Inspection Type is required')
  if (!values.inspectionInfo.inspectionDescription) errors.push('Inspection Description is required')
  if (!values.inspectionInfo.inspectionBy) errors.push('Inspection By is required')
  
  return errors
}

