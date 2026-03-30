import { OnlineCategoryKey } from '../../registry'
import { TrainingRequestForm } from './_models'
import { 
  getTrainingRequestNew,
  postTrainingRequest
} from './_requests'

/**
 * Training Request Helper Functions
 * Mengikuti pola accommodation-request: sessionStorage untuk draft, API untuk submit
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get Training Request Form
 * Flow (mengikuti accommodation-request):
 * 1. Cek sessionStorage untuk draft
 * 2. Jika ada draft, return draft
 * 3. Jika tidak ada, ambil new form dari API
 * 4. Jika API gagal, fallback ke dummy data
 */
export async function getTrainingRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<TrainingRequestForm> {
  console.log('🔍 Training Request API: getForm called for', cat, type)
  
  // Step 1: Cek sessionStorage untuk draft (seperti accommodation-request)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Training Request API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Training Request API: No draft found, fetching from API')
  
  try {
    // Step 2: Ambil new form dari API
    const formData = await getTrainingRequestNew()
    console.log('✅ Training Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching training request form from API, using fallback:', error)
    // Step 3: Fallback ke dummy data jika API gagal
    return getDummyTrainingRequestForm(cat, type)
  }
}

/**
 * Save draft to sessionStorage (mengikuti accommodation-request)
 * Tidak perlu API untuk draft, cukup sessionStorage
 */
export async function saveTrainingRequestDraft(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: TrainingRequestForm
): Promise<void> {
  console.log('💾 Training Request API: Saving draft for', cat, type)
  await delay(200) // Simulasi delay seperti accommodation-request
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

/**
 * Submit Training Request
 * Menggunakan API untuk submit (seperti postAccommodationRequest)
 */
export async function submitTrainingRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: TrainingRequestForm
): Promise<{ requestId: string }> {
  console.log('✅ Training Request API: Submitting for', cat, type)
  
  try {
    const response = await postTrainingRequest(payload)
    console.log('✅ Training Request API: Submitted successfully:', response)
    
    // Clear draft dari sessionStorage setelah submit berhasil
    sessionStorage.removeItem(`draft:${cat}:${type}`)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting training request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Training Request Form
 * Digunakan jika API gagal
 */
function getDummyTrainingRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): TrainingRequestForm {
  const deptMap: Record<OnlineCategoryKey, string> = {
    operation: 'Operations',
    resource: 'Human Resources',
    department: 'Finance',
    general: 'Administration'
  }

  return {
    header: {
      requestId: '25-0000003',
      requestType: 'Training Request',
      refRequestNo: 'TRQ-2520-0001',
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
    },
    trainingDetails: {
      trainingTitle: '',
      trainingDuration: '',
      trainingMethod: '',
      lastAttended: '',
      organizerProvider: '',
      organizerDate: '',
      organizerVenue: '',
      organizerFees: '',
      identifiedByEmployee: '',
      identifiedBySupervisor: '',
      identifiedByOther: '',
    },
    approvals: {
      immediateSupervisor: '',
      departmentHead: '',
      humanResource: '',
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

export function getPriorityOptions() {
  return [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
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

export function getTrainingMethodOptions() {
  return [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
    { value: 'Hybrid', label: 'Hybrid' },
  ]
}

export function getRequestPurposeOptions() {
  return [
    { value: 'Technical Skill', label: 'Technical Skill' },
    { value: 'Soft Skill', label: 'Soft Skill' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Compliance', label: 'Compliance' },
    { value: 'Conference', label: 'Conference' },
    { value: 'Other', label: 'Other' }
  ]
}

export function getDepartmentOptions() {
  return [
    { value: 'Operations', label: 'Operations' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Administration', label: 'Administration' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' }
  ]
}

export function getSupervisorOptions() {
  return [
    { value: 'SPV-001 - Adam Smith', label: 'SPV-001 - Adam Smith' },
    { value: 'SPV-002 - Bob Johnson', label: 'SPV-002 - Bob Johnson' },
    { value: 'SPV-003 - Carol Williams', label: 'SPV-003 - Carol Williams' },
    { value: 'SPV-004 - David Brown', label: 'SPV-004 - David Brown' },
    { value: 'SPV-005 - Emma Davis', label: 'SPV-005 - Emma Davis' }
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

