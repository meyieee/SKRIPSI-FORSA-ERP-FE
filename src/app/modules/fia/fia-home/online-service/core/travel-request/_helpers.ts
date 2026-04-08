import { OnlineCategoryKey } from '../../registry'
import { TravelRequestForm } from './_models'
import { 
  getTravelRequestNew,
  postTravelRequest
} from './_requests'
import { fetchHrBranchSiteOptions } from '../employee-search/_hrMasterOptions'

/**
 * Travel Request Helper Functions
 */

/**
 * Get Travel Request Form — API, atau dummy jika API gagal
 */
export async function getTravelRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<TravelRequestForm> {
  console.log('🔍 Travel Request API: getForm called for', cat, type)

  try {
    const formData = await getTravelRequestNew()
    console.log('✅ Travel Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching travel request form from API, using fallback:', error)
    return getDummyTravelRequestForm(cat, type)
  }
}

/**
 * Submit Travel Request
 */
export async function submitTravelRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: TravelRequestForm
): Promise<{ requestId: string }> {
  console.log('✅ Travel Request API: Submitting for', cat, type)
  
  try {
    const response = await postTravelRequest(payload)
    console.log('✅ Travel Request API: Submitted successfully:', response)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting travel request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Travel Request Form
 * Digunakan jika API gagal
 */
function getDummyTravelRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): TravelRequestForm {
  const deptMap: Record<OnlineCategoryKey, string> = {
    operation: 'Operations',
    resource: 'Human Resources',
    department: 'Finance',
    general: 'Administration'
  }

  const costCenterMap: Record<OnlineCategoryKey, string> = {
    operation: 'OPS-1001',
    resource: 'HR-2001',
    department: 'FIN-3001',
    general: 'ADM-4001'
  }

  return {
    header: {
      requestId: '25-0000004',
      requestType: 'Travel Request',
      refRequestNo: 'TRQ-2510-0001',
    },
    requestInfo: {
      requestDate: new Date().toISOString().slice(0, 10),
      requestBy: '',
      requestByJobTitle: '',
      requestFor: '',
      requestForJobTitle: '',
      requestPurpose: '',
      priority: '',
      branchSite: '',
      department: deptMap[cat] || '',
      costCenter: costCenterMap[cat] || '',
      requestDescription: '',
      justification: '',
      justificationReason: '',
      justificationBenefit: '',
      commentRemarkNote: '',
      additionalComments: '',
      relevantDocs: '',
      relevantDocsSecond: '',
      location: '',
    },
    travelDetails: {
      numberOfPerson: 1,
      noDaysAbsent: 0,
      departure: '',
      return: '',
      dateReturnToWork: '',
      contactDuringLeave: '',
      pointOfLeave: '',
      totalLeaveDaysRemaining: 0,
      totalDayTakenOnThisHoliday: 0,
      dayOffHoliday: 0,
      totalDaysTakenOnThisVacation: 0,
      lastBalanceEntitlement: 0,
      firstWorkDayAbsentFromWork: '',
      lastWorkDayAbsentFromWork: '',
      totalNumberOfDaysAbsent: 0,
      lessStatutoryPublicHolidaySundayIncluded: 0,
      netWorkingDaysLeaveRequested: 0,
    },
    travelers: [
      {
        no: 1,
        lastName: '',
        firstName: '',
        category: '',
        comments: '',
      },
    ],
    workflowTracking: {
      checkBy: '',
      checkDate: '',
      checkComments: '',
      reviewBy: '',
      reviewDate: '',
      reviewComments: '',
      approveOneBy: '',
      approveOneDate: '',
      approveOneComments: '',
      approveSecondBy: '',
      approveSecondDate: '',
      approveSecondComments: '',
      approveThirdBy: '',
      approveThirdDate: '',
      approveThirdComments: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }
}

// ============================================
// Static Data Options (Frontend)
// ============================================

export const getRequestPurposeOptions = () => [
  { value: 'Business Trip', label: 'Business Trip' },
  { value: 'Training', label: 'Training' },
  { value: 'Conference', label: 'Conference' },
  { value: 'Meeting', label: 'Meeting' },
]

export const getDepartmentOptions = () => [
  { value: 'Operations', label: 'Operations' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Administration', label: 'Administration' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
]

export function getPriorityOptions() {
  return [
    { value: 'P#1', label: 'P#1' },
    { value: 'P#2', label: 'P#2' },
    { value: 'P#3', label: 'P#3' },
  ]
}


export const getCategoryOptions = () => [
  { value: 'Adult', label: 'Adult' },
  { value: 'Child', label: 'Child' },
  { value: 'Infant', label: 'Infant' },
]

export const getSupervisorOptions = () => [
  { value: 'SPV-001 - Adam Smith', label: 'SPV-001 - Adam Smith' },
  { value: 'SPV-002 - Bob Johnson', label: 'SPV-002 - Bob Johnson' },
  { value: 'SPV-003 - Carol Williams', label: 'SPV-003 - Carol Williams' },
  { value: 'SPV-004 - David Brown', label: 'SPV-004 - David Brown' },
  { value: 'SPV-005 - Emma Davis', label: 'SPV-005 - Emma Davis' },
]

export async function getBranchSiteOptions(): Promise<
  Array<{ value: string; label: string }>
> {
  return fetchHrBranchSiteOptions()
}

export function getLocationOptions() {
  return [
    { value: 'jakarta', label: 'Jakarta' },
    { value: 'surabaya', label: 'Surabaya' },
    { value: 'bandung', label: 'Bandung' },
    { value: 'medan', label: 'Medan' },
    { value: 'semarang', label: 'Semarang' },
    { value: 'makassar', label: 'Makassar' },
    { value: 'other', label: 'Other' },
  ]
}

export function getDateOptions() {
  const today = new Date()
  const options: Array<{ value: string; label: string }> = []
  
  // Generate options for next 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateStr = date.toISOString().slice(0, 10)
    const label = date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
    options.push({ value: dateStr, label })
  }
  
  return options
}

