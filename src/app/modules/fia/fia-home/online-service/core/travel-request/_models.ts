import { OnlineCategoryKey } from '../../registry'

/**
 * Travel Request Types & Models
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

export type TravelRequestHeader = {
  requestId: string
  requestType: string
  refRequestNo: string
}

export type TravelRequestInfo = {
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

export type TravelDetails = {
  numberOfPerson: number
  noDaysAbsent: number
  departure: string
  return: string
  dateReturnToWork: string
  contactDuringLeave: string
  pointOfLeave: string
  totalLeaveDaysRemaining: number
  totalDayTakenOnThisHoliday: number
  dayOffHoliday: number
  totalDaysTakenOnThisVacation: number
  lastBalanceEntitlement: number
  firstWorkDayAbsentFromWork: string
  lastWorkDayAbsentFromWork: string
  totalNumberOfDaysAbsent: number
  lessStatutoryPublicHolidaySundayIncluded: number
  netWorkingDaysLeaveRequested: number
}

export type Traveler = {
  no: number
  lastName: string
  firstName: string
  category: string
  comments: string
}

export type TravelRequestForm = {
  header: TravelRequestHeader
  requestInfo: TravelRequestInfo
  travelDetails: TravelDetails
  travelers: Traveler[]
  workflowTracking: WorkflowTracking
}

/**
 * Validation function for Travel Request
 */
export function validateTravelRequest(v: TravelRequestForm): string[] {
  const errs: string[] = []
  
  if (!v.requestInfo.requestDate) errs.push('Request Date is required')
  if (!v.requestInfo.requestPurpose) errs.push('Request Purpose is required')
  if (!v.requestInfo.requestDescription) errs.push('Request Description is required')
  if (!v.travelDetails.numberOfPerson || v.travelDetails.numberOfPerson < 1) errs.push('Number of Person must be at least 1')
  if (!v.travelDetails.departure) errs.push('Departure is required')
  if (!v.travelDetails.return) errs.push('Return is required')
  
  // Validate travelers
  v.travelers.forEach((traveler, index) => {
    if (!traveler.lastName) errs.push(`Traveler ${index + 1}: Last Name is required`)
    if (!traveler.firstName) errs.push(`Traveler ${index + 1}: First Name is required`)
    if (!traveler.category) errs.push(`Traveler ${index + 1}: Category is required`)
  })
  
  return errs
}

