import { OnlineCategoryKey } from '../../registry'
import { TransportRequestForm } from './_models'
import { 
  getTransportRequestNew,
  postTransportRequest
} from './_requests'

/**
 * Transport Request Helper Functions
 * Mengikuti pola accommodation-request: sessionStorage untuk draft, API untuk submit
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get Transport Request Form
 * Flow (mengikuti accommodation-request):
 * 1. Cek sessionStorage untuk draft
 * 2. Jika ada draft, return draft
 * 3. Jika tidak ada, ambil new form dari API
 * 4. Jika API gagal, fallback ke dummy data
 */
export async function getTransportRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<TransportRequestForm> {
  console.log('🔍 Transport Request API: getForm called for', cat, type)
  
  // Step 1: Cek sessionStorage untuk draft (seperti accommodation-request)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Transport Request API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Transport Request API: No draft found, fetching from API')
  
  try {
    // Step 2: Ambil new form dari API
    const formData = await getTransportRequestNew()
    console.log('✅ Transport Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching transport request form from API, using fallback:', error)
    // Step 3: Fallback ke dummy data jika API gagal
    return getDummyTransportRequestForm(cat, type)
  }
}

/**
 * Save draft to sessionStorage (mengikuti accommodation-request)
 * Tidak perlu API untuk draft, cukup sessionStorage
 */
export async function saveTransportRequestDraft(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: TransportRequestForm
): Promise<void> {
  console.log('💾 Transport Request API: Saving draft for', cat, type)
  await delay(200) // Simulasi delay seperti accommodation-request
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

/**
 * Submit Transport Request
 * Menggunakan API untuk submit (seperti postTransportRequest)
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
    
    // Clear draft dari sessionStorage setelah submit berhasil
    sessionStorage.removeItem(`draft:${cat}:${type}`)
    
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
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
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

export function getBranchSiteOptions() {
  return [
    { value: 'site-1', label: 'Site 1' },
    { value: 'site-2', label: 'Site 2' },
    { value: 'site-3', label: 'Site 3' },
    { value: 'head-office', label: 'Head Office' },
    { value: 'branch-a', label: 'Branch A' },
    { value: 'branch-b', label: 'Branch B' },
  ]
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

/**
 * Fetch User/Employee options from backend API (for Request By, Request For, etc.)
 * Uses Employee API as users are employees
 * With fallback dummy data
 */
export async function getUserOptions(): Promise<Array<{ value: string; label: string }>> {
  try {
    const response = await fetch('/api/employeeregister', {
      credentials: 'include',
    })
    
    if (!response.ok) {
      console.error('Failed to fetch user options:', response.statusText)
      return getDummyUserOptions() // ← FALLBACK
    }
    
    const result = await response.json()
    const employees = result.data || []
    
    if (employees.length === 0) {
      return getDummyUserOptions() // ← FALLBACK jika kosong
    }
    
    const mappedUsers = employees
      .filter((emp: any) => emp.status === 'Active')
      .map((emp: any) => {
        const fullName = `${emp.first_name || ''} ${emp.middle_name || ''} ${emp.last_name || ''}`.trim()
        const jobTitle = emp.job_title_detail?.title_des || emp.job_title || emp.position || ''
        const label = jobTitle ? `${fullName} - ${jobTitle}` : fullName
        
        return {
          value: emp.id_number || emp.id?.toString() || '',
          label: label || 'Unknown User',
        }
      })
    
    // Jika setelah filter tidak ada data, gunakan dummy
    if (mappedUsers.length === 0) {
      return getDummyUserOptions() // ← FALLBACK
    }
    
    return mappedUsers
  } catch (error) {
    console.error('Error fetching user options:', error)
    return getDummyUserOptions() // ← FALLBACK
  }
}

/**
 * Dummy User options for fallback
 */
function getDummyUserOptions(): Array<{ value: string; label: string }> {
  return [
    { value: 'user-001', label: 'John Doe - Manager' },
    { value: 'user-002', label: 'Jane Smith - Supervisor' },
    { value: 'user-003', label: 'Bob Johnson - Director' },
    { value: 'user-004', label: 'Alice Williams - Manager' },
    { value: 'user-005', label: 'Charlie Brown - Supervisor' },
    { value: 'user-006', label: 'Diana Prince - Director' },
    { value: 'user-007', label: 'Edward Wilson - Manager' },
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