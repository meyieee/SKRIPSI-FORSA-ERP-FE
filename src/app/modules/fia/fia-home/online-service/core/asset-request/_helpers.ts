import { OnlineCategoryKey } from '../../registry'
import { AssetRequestForm } from './_models'
import { 
  getAssetRequestNew,
  postAssetRequest
} from './_requests'

/**
 * Asset Request Helper Functions
 * Mengikuti pola accommodation-request: sessionStorage untuk draft, API untuk submit
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get Asset Request Form
 * Flow (mengikuti accommodation-request):
 * 1. Cek sessionStorage untuk draft
 * 2. Jika ada draft, return draft
 * 3. Jika tidak ada, ambil new form dari API
 * 4. Jika API gagal, fallback ke dummy data
 */
export async function getAssetRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<AssetRequestForm> {
  console.log('🔍 Asset Request API: getForm called for', cat, type)
  
  // Step 1: Cek sessionStorage untuk draft (seperti accommodation-request)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Asset Request API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Asset Request API: No draft found, fetching from API')
  
  try {
    // Step 2: Ambil new form dari API
    const formData = await getAssetRequestNew()
    console.log('✅ Asset Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching asset request form from API, using fallback:', error)
    // Step 3: Fallback ke dummy data jika API gagal
    return getDummyAssetRequestForm(cat, type)
  }
}

/**
 * Save draft to sessionStorage (mengikuti accommodation-request)
 * Tidak perlu API untuk draft, cukup sessionStorage
 */
export async function saveAssetRequestDraft(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: AssetRequestForm
): Promise<void> {
  console.log('💾 Asset Request API: Saving draft for', cat, type)
  await delay(200) // Simulasi delay seperti accommodation-request
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

/**
 * Submit Asset Request
 * Menggunakan API untuk submit (seperti postAssetRequest)
 */
export async function submitAssetRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: AssetRequestForm
): Promise<{ requestId: string }> {
  console.log('✅ Asset Request API: Submitting for', cat, type)
  
  try {
    const response = await postAssetRequest(payload)
    console.log('✅ Asset Request API: Submitted successfully:', response)
    
    // Clear draft dari sessionStorage setelah submit berhasil
    sessionStorage.removeItem(`draft:${cat}:${type}`)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting asset request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Asset Request Form
 * Digunakan jika API gagal
 */
function getDummyAssetRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): AssetRequestForm {
  const deptMap: Record<OnlineCategoryKey, string> = {
    operation: 'Operations',
    resource: 'Human Resources',
    department: 'Finance',
    general: 'Administration'
  }

  return {
    header: {
      requestId: '25-0000007',
      requestType: 'Asset Request',
      refRequestNo: 'ASQ-2510-0001',
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
    assetDetails: {
      assetType: '',
      assetModel: '',
      assetSpecification: '',
      quantity: 1,
      comments: '',
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
    { value: 'new-asset', label: 'New Asset' },
    { value: 'replacement', label: 'Replacement' },
    { value: 'upgrade', label: 'Upgrade' },
    { value: 'maintenance', label: 'Maintenance' },
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


export function getAssetTypeOptions() {
  return [
    { value: 'Computer', label: 'Computer' },
    { value: 'Laptop', label: 'Laptop' },
    { value: 'Printer', label: 'Printer' },
    { value: 'Monitor', label: 'Monitor' },
    { value: 'Network Equipment', label: 'Network Equipment' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Office Equipment', label: 'Office Equipment' },
  ]
}

export function getDepartmentOptions() {
  return [
    { value: 'IT', label: 'IT' },
    { value: 'OPS', label: 'Operations' },
    { value: 'HR', label: 'HR' },
    { value: 'FIN', label: 'Finance' },
    { value: 'ADM', label: 'Administration' },
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