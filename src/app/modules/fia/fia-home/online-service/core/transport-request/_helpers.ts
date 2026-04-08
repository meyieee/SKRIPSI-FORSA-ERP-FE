import { OnlineCategoryKey } from '../../registry'
import { TransportRequestForm } from './_models'
import { 
  getTransportRequestNew,
  postTransportRequest
} from './_requests'
import { fetchHrBranchSiteOptions } from '../employee-search/_hrMasterOptions'

/**
 * Transport Request Helper Functions
 */

/**
 * Get Transport Request Form — API, atau dummy jika API gagal
 */
export async function getTransportRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<TransportRequestForm> {
  console.log('🔍 Transport Request API: getForm called for', cat, type)

  try {
    const formData = await getTransportRequestNew()
    console.log('✅ Transport Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching transport request form from API, using fallback:', error)
    return getDummyTransportRequestForm(cat, type)
  }
}

/**
 * Submit Transport Request
 */
export async function submitTransportRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: TransportRequestForm
): Promise<{ requestId: string }> {
  console.log('✅ Transport Request API: Submitting for', cat, type)
  
  try {
    const response = await postTransportRequest(payload)
    console.log('✅ Transport Request API: Submitted successfully:', response)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting transport request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Transport Request Form
 * Digunakan jika API gagal
 */
function getDummyTransportRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): TransportRequestForm {
  const deptMap: Record<OnlineCategoryKey, string> = {
    operation: 'Operations',
    resource: 'Human Resources',
    department: 'Finance',
    general: 'Administration'
  }

  return {
    header: {
      requestId: '25-0000311',
      requestType: 'Transport Request',
      refRequestNo: 'TRQ-2510-8001',
    },
    requestInfo: {
      requestDate: new Date().toISOString().slice(0, 10),
      requestBy: '',
      requestByJobTitle: '',
      requestFor: '',
      requestForJobTitle: '',
      requestPurpose: '',
      priority: '3',
      branchSite: '',
      department: deptMap[cat] || '',
      costCenter: '',
      requestDescription: '',
      justification: '',
      justificationReason: '',
      justificationBenefit: '',
      commentRemarkNote: '',
      additionalComments: '',
      relevantDocs: '',
      relevantDocsSecond: '',
      location: '',
      relevantDates: '',
    },
    transportationDetails: {
      destination: '',
      modeOfTransport: '',
      noOfPassengers: '',
      pickUpTime: '',
      specialRequirement: '',
      dropOffTime: '',
      comments: '',
    },
    officeUseDetails: {
      vehicleNo: '',
      driverName: '',
      contactNo: '',
    },
    approvals: {
      immediateSupervisor: '',
      departmentHead: '',
      relatedManager: '',
    },
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
// Static Data Options (Dummy Data)
// ============================================

export function getRequestPurposeOptions() {
  return [
    { value: 'business-trip', label: 'Business Trip' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'training', label: 'Training' },
    { value: 'conference', label: 'Conference' },
    { value: 'site-visit', label: 'Site Visit' },
    { value: 'client-visit', label: 'Client Visit' },
    { value: 'other', label: 'Other' },
  ]
}

export function getPriorityOptions() {
  return [
    { value: 'P#1', label: 'P#1' },
    { value: 'P#2', label: 'P#2' },
    { value: 'P#3', label: 'P#3' },
  ]
}


export function getModeOfTransportOptions() {
  return [
    { value: 'car', label: 'Car' },
    { value: 'van', label: 'Van' },
    { value: 'bus', label: 'Bus' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'taxi', label: 'Taxi' },
    { value: 'company-vehicle', label: 'Company Vehicle' },
    { value: 'other', label: 'Other' },
  ]
}

export function getTimeOptions() {
  return [
    { value: '06:00', label: '06:00' },
    { value: '06:30', label: '06:30' },
    { value: '07:00', label: '07:00' },
    { value: '07:30', label: '07:30' },
    { value: '08:00', label: '08:00' },
    { value: '08:30', label: '08:30' },
    { value: '09:00', label: '09:00' },
    { value: '09:30', label: '09:30' },
    { value: '10:00', label: '10:00' },
    { value: '10:30', label: '10:30' },
    { value: '11:00', label: '11:00' },
    { value: '11:30', label: '11:30' },
    { value: '12:00', label: '12:00' },
    { value: '12:30', label: '12:30' },
    { value: '13:00', label: '13:00' },
    { value: '13:30', label: '13:30' },
    { value: '14:00', label: '14:00' },
    { value: '14:30', label: '14:30' },
    { value: '15:00', label: '15:00' },
    { value: '15:30', label: '15:30' },
    { value: '16:00', label: '16:00' },
    { value: '16:30', label: '16:30' },
    { value: '17:00', label: '17:00' },
    { value: '17:30', label: '17:30' },
    { value: '18:00', label: '18:00' },
    { value: '18:30', label: '18:30' },
    { value: '19:00', label: '19:00' },
    { value: '19:30', label: '19:30' },
    { value: '20:00', label: '20:00' },
  ]
}

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

export function getDepartmentOptions() {
  return [
    { value: 'FIN', label: 'Finance' },
    { value: 'OPS', label: 'Operations' },
    { value: 'HR', label: 'HR' },
    { value: 'IT', label: 'IT' },
    { value: 'ADM', label: 'Administration' },
  ]
}

export function getSupervisorOptions() {
  return [
    { value: 'supervisor-1', label: 'Supervisor 1' },
    { value: 'supervisor-2', label: 'Supervisor 2' },
    { value: 'supervisor-3', label: 'Supervisor 3' },
    { value: 'manager-1', label: 'Manager 1' },
    { value: 'manager-2', label: 'Manager 2' },
    { value: 'director-1', label: 'Director 1' },
  ]
}

export function getDateOptions() {
  const today = new Date()
  const options: Array<{ value: string; label: string }> = []
  
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