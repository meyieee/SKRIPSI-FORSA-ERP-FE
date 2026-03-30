import { OnlineCategoryKey } from '../../registry'
import { VisitorRequestForm } from './_models'
import { 
  getVisitorRequestNew,
  postVisitorRequest
} from './_requests'

/**
 * Visitor Request Helper Functions
 * Mengikuti pola accommodation-request: sessionStorage untuk draft, API untuk submit
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get Visitor Request Form
 * Flow (mengikuti accommodation-request):
 * 1. Cek sessionStorage untuk draft
 * 2. Jika ada draft, return draft
 * 3. Jika tidak ada, ambil new form dari API
 * 4. Jika API gagal, fallback ke dummy data
 */
export async function getVisitorRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<VisitorRequestForm> {
  console.log('🔍 Visitor Request API: getForm called for', cat, type)
  
  // Step 1: Cek sessionStorage untuk draft (seperti accommodation-request)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Visitor Request API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Visitor Request API: No draft found, fetching from API')
  
  try {
    // Step 2: Ambil new form dari API
    const formData = await getVisitorRequestNew()
    console.log('✅ Visitor Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching visitor request form from API, using fallback:', error)
    // Step 3: Fallback ke dummy data jika API gagal
    return getDummyVisitorRequestForm(cat, type)
  }
}

/**
 * Save draft to sessionStorage (mengikuti accommodation-request)
 * Tidak perlu API untuk draft, cukup sessionStorage
 */
export async function saveVisitorRequestDraft(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: VisitorRequestForm
): Promise<void> {
  console.log('💾 Visitor Request API: Saving draft for', cat, type)
  await delay(200) // Simulasi delay seperti accommodation-request
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

/**
 * Submit Visitor Request
 * Menggunakan API untuk submit (seperti postAccommodationRequest)
 */
export async function submitVisitorRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: VisitorRequestForm
): Promise<{ requestId: string }> {
  console.log('✅ Visitor Request API: Submitting for', cat, type)
  
  try {
    const response = await postVisitorRequest(payload)
    console.log('✅ Visitor Request API: Submitted successfully:', response)
    
    // Clear draft dari sessionStorage setelah submit berhasil
    sessionStorage.removeItem(`draft:${cat}:${type}`)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting visitor request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Visitor Request Form
 * Digunakan jika API gagal
 */
function getDummyVisitorRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): VisitorRequestForm {
  const deptMap: Record<OnlineCategoryKey, string> = {
    operation: 'Operations',
    resource: 'Human Resources',
    department: 'Finance',
    general: 'Administration'
  }

  return {
    header: {
      requestId: '25-000012',
      requestType: 'Visitor Request',
      refRequestNo: 'VTQ-2530-0001',
    },
    requestInfo: {
      requestDate: new Date().toISOString().slice(0, 10),
      requestBy: '',
      requestFor: '',
      requestPurpose: '',
      priority: '',
      branchSite: '',
      department: deptMap[cat] || '',
      costCenter: '',
      requestDescription: '',
      justification: '',
      commentRemarkNote: '',
      additionalComments: '',
      relevantDocs: '',
      relevantDocsSecond: '',
      location: '',
    },
    visitorDetails: {
      visitorName: '',
      companyOrg: '',
      contactNoEmail: '',
    },
    visitDetails: {
      dateOfVisit: '',
      timeOfVisit: '',
      expectedDuration: '',
    },
    hostDetails: {
      hostName: '',
      department: '',
      contactNumber: '',
    },
    securityClearance: {
      clearanceRequired: '',
      typeOfClearance: '',
      comments: '',
    },
    specialRequirements: {
      meetingRoom: '',
      equipmentRequirements: '',
      comments: '',
    },
    visitorRegistration: {
      visitorId: '',
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

export function getRequestPurposeOptions() {
  return [
    { value: 'meeting', label: 'Meeting' },
    { value: 'interview', label: 'Interview' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'training', label: 'Training' },
    { value: 'site-visit', label: 'Site Visit' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'maintenance', label: 'Maintenance' },
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

export function getClearanceTypeOptions() {
  return [
    { value: 'basic', label: 'Basic' },
    { value: 'standard', label: 'Standard' },
    { value: 'high', label: 'High' },
    { value: 'confidential', label: 'Confidential' },
    { value: 'top-secret', label: 'Top Secret' },
  ]
}

export function getMeetingRoomOptions() {
  return [
    { value: 'conference-room-a', label: 'Conference Room A' },
    { value: 'conference-room-b', label: 'Conference Room B' },
    { value: 'boardroom', label: 'Boardroom' },
    { value: 'training-room', label: 'Training Room' },
    { value: 'meeting-room-1', label: 'Meeting Room 1' },
    { value: 'meeting-room-2', label: 'Meeting Room 2' },
    { value: 'other', label: 'Other' },
  ]
}

export function getTimeOptions() {
  return [
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
  ]
}

export function getYesNoOptions() {
  return [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ]
}

export function getDepartmentOptions() {
  return [
    { value: 'operations', label: 'Operations' },
    { value: 'human-resources', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'administration', label: 'Administration' },
    { value: 'it', label: 'Information Technology' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'security', label: 'Security' },
    { value: 'other', label: 'Other' },
  ]
}

export function getCostCenterOptions() {
  return [
    { value: 'OPS-1001', label: 'OPS-1001' },
    { value: 'HR-2001', label: 'HR-2001' },
    { value: 'FIN-3001', label: 'FIN-3001' },
    { value: 'ADM-4001', label: 'ADM-4001' },
    { value: 'IT-5001', label: 'IT-5001' },
    { value: 'MKT-6001', label: 'MKT-6001' },
    { value: 'SAL-7001', label: 'SAL-7001' },
    { value: 'SEC-8001', label: 'SEC-8001' },
  ]
}

export function getDurationOptions() {
  return [
    { value: '30-minutes', label: '30 minutes' },
    { value: '1-hour', label: '1 hour' },
    { value: '2-hours', label: '2 hours' },
    { value: '3-hours', label: '3 hours' },
    { value: '4-hours', label: '4 hours' },
    { value: 'half-day', label: 'Half day' },
    { value: 'full-day', label: 'Full day' },
    { value: 'multiple-days', label: 'Multiple days' },
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

export function getSupervisorOptions() {
  return [
    { value: 'SPV-001 - Adam Smith', label: 'SPV-001 - Adam Smith' },
    { value: 'SPV-002 - Bob Johnson', label: 'SPV-002 - Bob Johnson' },
    { value: 'SPV-003 - Carol Williams', label: 'SPV-003 - Carol Williams' },
    { value: 'SPV-004 - David Brown', label: 'SPV-004 - David Brown' },
    { value: 'SPV-005 - Emma Davis', label: 'SPV-005 - Emma Davis' },
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

