import { OnlineCategoryKey } from '../../registry'

/**
 * Transport Request Types & Models
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

export type TransportRequestHeader = {
  requestId: string
  requestType: string
  refRequestNo: string
}

export type TransportRequestInfo = {
  requestDate: string
  requestBy: string
  requestByJobTitle?: string
  requestFor: string
  requestForJobTitle?: string
  requestPurpose: string
  priority: string
  branchSite: string
  department: string
  costCenter: string
  requestDescription: string
  justification: string
  justificationReason?: string
  justificationBenefit?: string
  commentRemarkNote: string
  additionalComments: string
  relevantDocs: string
  relevantDocsSecond: string
  location: string
  relevantDates: string
}

export type TransportationDetails = {
  destination: string
  modeOfTransport: string
  noOfPassengers: string
  pickUpTime: string
  specialRequirement: string
  dropOffTime: string
  comments: string
}

export type OfficeUseDetails = {
  vehicleNo: string
  driverName: string
  contactNo: string
}

export type TransportApprovals = {
  immediateSupervisor: string
  departmentHead: string
  relatedManager: string
}

export type TransportRequestForm = {
  header: TransportRequestHeader
  requestInfo: TransportRequestInfo
  transportationDetails: TransportationDetails
  officeUseDetails: OfficeUseDetails
  approvals: TransportApprovals
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Transport Request
 */
export function validateTransportRequest(values: TransportRequestForm): string[] {
  const errors: string[] = []
  
  if (!values.requestInfo.requestDate) errors.push('Request Date is required')
  if (!values.requestInfo.requestBy) errors.push('Request By is required')
  if (!values.requestInfo.requestPurpose) errors.push('Request Purpose is required')
  if (!values.requestInfo.priority) errors.push('Priority is required')
  if (!values.transportationDetails.destination) errors.push('Destination is required')
  if (!values.transportationDetails.modeOfTransport) errors.push('Mode of Transport is required')
  if (!values.transportationDetails.noOfPassengers) errors.push('Number of Passengers is required')
  
  if (values.transportationDetails.noOfPassengers && 
      (isNaN(Number(values.transportationDetails.noOfPassengers)) || 
       Number(values.transportationDetails.noOfPassengers) <= 0)) {
    errors.push('Number of Passengers must be a positive number')
  }
  
  if (values.transportationDetails.noOfPassengers && 
      Number(values.transportationDetails.noOfPassengers) > 50) {
    errors.push('Number of Passengers cannot exceed 50')
  }
  
  if (values.requestInfo.requestDate) {
    const requestDate = new Date(values.requestInfo.requestDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (requestDate < today) {
      errors.push('Request Date cannot be in the past')
    }
  }
  
  if (values.transportationDetails.pickUpTime && values.transportationDetails.dropOffTime) {
    const pickUpTime = values.transportationDetails.pickUpTime
    const dropOffTime = values.transportationDetails.dropOffTime
    
    if (pickUpTime >= dropOffTime) {
      errors.push('Drop off time must be after pick up time')
    }
  }
  
  if (values.officeUseDetails.contactNo && 
      !/^[\+]?[0-9\s\-\(\)]{8,15}$/.test(values.officeUseDetails.contactNo)) {
    errors.push('Contact number format is invalid')
  }
  
  return errors
}

