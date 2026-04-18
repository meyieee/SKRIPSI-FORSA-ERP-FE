import { OnlineCategoryKey } from '../../registry'

/**
 * Accommodation Request Types & Models
 */

export type AccommodationRequestHeader = {
  requestId: string
  requestType: string
  refRequestNo: string
}

export type AccommodationRequestInfo = {
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

export type ExtendedRequestDetails = {
  visitorName: string
  durationOfStay: string
  comments: string
}

export type AccommodationRequirements = {
  accommodationType: string
  numberOfNights: string
  extraBed: string
  mealProvided: string
}

export type AccommodationDetails = {
  arrivalLocation: string
  accommodationLocation: string
  roomNumber: string
  checkInTime: string
  checkOutTime: string
}

export type AccommodationApprovals = {
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

export type AccommodationRequestForm = {
  header: AccommodationRequestHeader
  requestInfo: AccommodationRequestInfo
  extendedRequestDetails: ExtendedRequestDetails
  accommodationRequirements: AccommodationRequirements
  accommodationDetails: AccommodationDetails
  approvals: AccommodationApprovals
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Accommodation Request
 */
export function validateAccommodationRequest(values: AccommodationRequestForm): string[] {
  const errors: string[] = []
  
  if (!values.requestInfo.requestDate) errors.push('Request Date is required')
  if (!values.requestInfo.requestBy) errors.push('Request By is required')
  if (!values.requestInfo.requestPurpose) errors.push('Request Purpose is required')
  if (!values.requestInfo.priority) errors.push('Priority is required')
  if (!values.extendedRequestDetails.visitorName) errors.push('Visitor Name is required')
  if (!values.accommodationRequirements.accommodationType) errors.push('Accommodation Type is required')
  if (!values.accommodationRequirements.numberOfNights) errors.push('Number of Nights is required')
  
  if (values.accommodationRequirements.numberOfNights && 
      (isNaN(Number(values.accommodationRequirements.numberOfNights)) || 
       Number(values.accommodationRequirements.numberOfNights) <= 0)) {
    errors.push('Number of Nights must be a positive number')
  }
  
  if (values.accommodationDetails.roomNumber && 
      (isNaN(Number(values.accommodationDetails.roomNumber)) || 
       Number(values.accommodationDetails.roomNumber) <= 0)) {
    errors.push('Room Number must be a positive number')
  }
  
  if (values.requestInfo.requestDate) {
    const requestDate = new Date(values.requestInfo.requestDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (requestDate < today) {
      errors.push('Request Date cannot be in the past')
    }
  }
  
  return errors
}

