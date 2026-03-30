import { OnlineCategoryKey } from '../../registry'
import { TravelRequestForm } from './_models'
import { 
  getTravelRequestNew,
  postTravelRequest
} from './_requests'

/**
 * Travel Request Helper Functions
 * Mengikuti pola accommodation-request: sessionStorage untuk draft, API untuk submit
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get Travel Request Form
 * Flow (mengikuti accommodation-request):
 * 1. Cek sessionStorage untuk draft
 * 2. Jika ada draft, return draft
 * 3. Jika tidak ada, ambil new form dari API
 * 4. Jika API gagal, fallback ke dummy data
 */
export async function getTravelRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<TravelRequestForm> {
  console.log('🔍 Travel Request API: getForm called for', cat, type)
  
  // Step 1: Cek sessionStorage untuk draft (seperti accommodation-request)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Travel Request API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Travel Request API: No draft found, fetching from API')
  
  try {
    // Step 2: Ambil new form dari API
    const formData = await getTravelRequestNew()
    console.log('✅ Travel Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching travel request form from API, using fallback:', error)
    // Step 3: Fallback ke dummy data jika API gagal
    return getDummyTravelRequestForm(cat, type)
  }
}

/**
 * Save draft to sessionStorage (mengikuti accommodation-request)
 * Tidak perlu API untuk draft, cukup sessionStorage
 */
export async function saveTravelRequestDraft(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: TravelRequestForm
): Promise<void> {
  console.log('💾 Travel Request API: Saving draft for', cat, type)
  await delay(200) // Simulasi delay seperti accommodation-request
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

/**
 * Submit Travel Request
 * Menggunakan API untuk submit (seperti postAccommodationRequest)
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
    
    // Clear draft dari sessionStorage setelah submit berhasil
    sessionStorage.removeItem(`draft:${cat}:${type}`)
    
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

export const getPriorityOptions = () => [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
]

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

