import { OnlineCategoryKey } from '../../registry'

/**
 * Visitor Request Types & Models
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

export type VisitorRequestHeader = {
  requestId: string
  requestType: string
  refRequestNo: string
}

export type VisitorRequestInfo = {
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

export type VisitorDetails = {
  visitorName: string
  companyOrg: string
  contactNoEmail: string
}

export type VisitDetails = {
  dateOfVisit: string
  timeOfVisit: string
  expectedDuration: string
}

export type HostDetails = {
  hostName: string
  department: string
  contactNumber: string
}

export type SecurityClearance = {
  clearanceRequired: string
  typeOfClearance: string
  comments: string
}

export type SpecialRequirements = {
  meetingRoom: string
  equipmentRequirements: string
  comments: string
}

export type VisitorRegistration = {
  visitorId: string
  checkInTime: string
  checkOutTime: string
}

export type VisitorApprovals = {
  immediateSupervisor: string
  departmentHead: string
  relatedManager: string
}

export type VisitorRequestForm = {
  header: VisitorRequestHeader
  requestInfo: VisitorRequestInfo
  visitorDetails: VisitorDetails
  visitDetails: VisitDetails
  hostDetails: HostDetails
  securityClearance: SecurityClearance
  specialRequirements: SpecialRequirements
  visitorRegistration: VisitorRegistration
  approvals: VisitorApprovals
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Visitor Request
 */
export function validateVisitorRequest(values: VisitorRequestForm): string[] {
  const errors: string[] = []
  
  if (!values.requestInfo.requestDate) errors.push('Request Date is required')
  if (!values.requestInfo.requestBy) errors.push('Request By is required')
  if (!values.requestInfo.requestPurpose) errors.push('Request Purpose is required')
  if (!values.requestInfo.priority) errors.push('Priority is required')
  if (!values.visitorDetails.visitorName) errors.push('Visitor Name is required')
  if (!values.visitDetails.dateOfVisit) errors.push('Date of Visit is required')
  if (!values.visitDetails.timeOfVisit) errors.push('Time of Visit is required')
  if (!values.visitDetails.expectedDuration) errors.push('Expected Duration is required')
  if (!values.hostDetails.hostName) errors.push('Host Name is required')
  if (!values.hostDetails.department) errors.push('Host Department is required')
  if (!values.hostDetails.contactNumber) errors.push('Host Contact Number is required')
  
  if (values.requestInfo.requestDate) {
    const requestDate = new Date(values.requestInfo.requestDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (requestDate < today) {
      errors.push('Request Date cannot be in the past')
    }
  }
  
  if (values.visitDetails.dateOfVisit) {
    const visitDate = new Date(values.visitDetails.dateOfVisit)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (visitDate < today) {
      errors.push('Visit Date cannot be in the past')
    }
  }
  
  if (values.visitorRegistration.checkInTime && values.visitorRegistration.checkOutTime) {
    const checkIn = values.visitorRegistration.checkInTime
    const checkOut = values.visitorRegistration.checkOutTime
    
    if (checkIn >= checkOut) {
      errors.push('Check out time must be after check in time')
    }
  }
  
  if (values.visitorDetails.contactNoEmail && 
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.visitorDetails.contactNoEmail)) {
    errors.push('Contact Email format is invalid')
  }
  
  if (values.hostDetails.contactNumber && 
      !/^[\+]?[0-9\s\-\(\)]{8,28}$/.test(values.hostDetails.contactNumber.trim())) {
    errors.push('Host Contact Number format is invalid')
  }
  
  return errors
}

