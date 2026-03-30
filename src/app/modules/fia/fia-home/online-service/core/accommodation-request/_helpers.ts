import { OnlineCategoryKey } from '../../registry'
import { AccommodationRequestForm } from './_models'
import { 
  getAccommodationRequestNew,
  postAccommodationRequest
} from './_requests'

/**
 * Accommodation Request Helper Functions
 * Mengikuti pola job-request: sessionStorage untuk draft, API untuk submit
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get Accommodation Request Form
 * Flow (mengikuti job-request):
 * 1. Cek sessionStorage untuk draft
 * 2. Jika ada draft, return draft
 * 3. Jika tidak ada, ambil new form dari API
 * 4. Jika API gagal, fallback ke dummy data
 */
export async function getAccommodationRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<AccommodationRequestForm> {
  console.log('🔍 Accommodation Request API: getForm called for', cat, type)
  
  // Step 1: Cek sessionStorage untuk draft (seperti job-request)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Accommodation Request API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Accommodation Request API: No draft found, fetching from API')
  
  try {
    // Step 2: Ambil new form dari API
    const formData = await getAccommodationRequestNew()
    console.log('✅ Accommodation Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching accommodation request form from API, using fallback:', error)
    // Step 3: Fallback ke dummy data jika API gagal
    return getDummyAccommodationRequestForm(cat, type)
  }
}

/**
 * Save draft to sessionStorage (mengikuti job-request)
 * Tidak perlu API untuk draft, cukup sessionStorage
 */
export async function saveAccommodationRequestDraft(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: AccommodationRequestForm
): Promise<void> {
  console.log('💾 Accommodation Request API: Saving draft for', cat, type)
  await delay(200) // Simulasi delay seperti job-request
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

/**
 * Submit Accommodation Request
 * Menggunakan API untuk submit (seperti postJobRequest)
 */
export async function submitAccommodationRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: AccommodationRequestForm
): Promise<{ requestId: string }> {
  console.log('✅ Accommodation Request API: Submitting for', cat, type)
  
  try {
    const response = await postAccommodationRequest(payload)
    console.log('✅ Accommodation Request API: Submitted successfully:', response)
    
    // Clear draft dari sessionStorage setelah submit berhasil
    sessionStorage.removeItem(`draft:${cat}:${type}`)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting accommodation request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Accommodation Request Form
 * Digunakan jika API gagal
 */
function getDummyAccommodationRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): AccommodationRequestForm {
  const deptMap: Record<OnlineCategoryKey, string> = {
    operation: 'Operations',
    resource: 'Human Resources',
    department: 'Finance',
    general: 'Administration'
  }

  return {
    header: {
      requestId: '25-0000010',
      requestType: 'Accommodation Request',
      refRequestNo: 'QOD-2500-0001',
    },
    requestInfo: {
      requestDate: new Date().toISOString().slice(0, 10),
      requestBy: '',
      requestFor: '',
      requestPurpose: '',
      priority: '',
      branchSite: '',
      department: deptMap[cat],
      costCenter: '',
      requestDescription: '',
      justification: '',
      commentRemarkNote: '',
      additionalComments: '',
      relevantDocs: '',
      relevantDocsSecond: '',
      location: '',
    },
    extendedRequestDetails: {
      visitorName: '',
      durationOfStay: '',
      comments: '',
    },
    accommodationRequirements: {
      accommodationType: '',
      numberOfNights: '',
      extraBed: '',
      mealProvided: '',
    },
    accommodationDetails: {
      arrivalLocation: '',
      accommodationLocation: '',
      roomNumber: '',
      checkInTime: '',
      checkOutTime: '',
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
// Semua options menggunakan dummy data
// ============================================

export function getRequestPurposeOptions() {
  return [
    { value: 'business-trip', label: 'Business Trip' },
    { value: 'training', label: 'Training' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'conference', label: 'Conference' },
    { value: 'project-work', label: 'Project Work' },
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

export function getAccommodationTypeOptions() {
  return [
    { value: 'hotel', label: 'Hotel' },
    { value: 'guest-house', label: 'Guest House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'hostel', label: 'Hostel' },
    { value: 'resort', label: 'Resort' },
  ]
}

export function getDurationOptions() {
  return [
    { value: '1-day', label: '1 Day' },
    { value: '2-3-days', label: '2-3 Days' },
    { value: '1-week', label: '1 Week' },
    { value: '2-weeks', label: '2 Weeks' },
    { value: '1-month', label: '1 Month' },
    { value: 'long-term', label: 'Long Term' },
  ]
}

export function getYesNoOptions() {
  return [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ]
}

export function getTimeOptions() {
  return [
    { value: '06:00', label: '06:00' },
    { value: '07:00', label: '07:00' },
    { value: '08:00', label: '08:00' },
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '12:00', label: '12:00' },
    { value: '13:00', label: '13:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' },
    { value: '18:00', label: '18:00' },
    { value: '19:00', label: '19:00' },
    { value: '20:00', label: '20:00' },
    { value: '21:00', label: '21:00' },
    { value: '22:00', label: '22:00' },
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

