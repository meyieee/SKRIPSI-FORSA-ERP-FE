import { OnlineCategoryKey } from '../../registry'
import { PurchaseRequisitionForm } from './_models'
import { 
  getPurchaseRequisitionNew,
  postPurchaseRequisition
} from './_requests'

/**
 * Purchase Requisition Helper Functions
 * Mengikuti pola accommodation-request: sessionStorage untuk draft, API untuk submit
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get Purchase Requisition Form
 * Flow (mengikuti accommodation-request):
 * 1. Cek sessionStorage untuk draft
 * 2. Jika ada draft, return draft
 * 3. Jika tidak ada, ambil new form dari API
 * 4. Jika API gagal, fallback ke dummy data
 */
export async function getPurchaseRequisitionForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<PurchaseRequisitionForm> {
  console.log('🔍 Purchase Requisition API: getForm called for', cat, type)
  
  // Step 1: Cek sessionStorage untuk draft (seperti accommodation-request)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Purchase Requisition API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Purchase Requisition API: No draft found, fetching from API')
  
  try {
    // Step 2: Ambil new form dari API
    const formData = await getPurchaseRequisitionNew()
    console.log('✅ Purchase Requisition API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching purchase requisition form from API, using fallback:', error)
    // Step 3: Fallback ke dummy data jika API gagal
    return getDummyPurchaseRequisitionForm(cat, type)
  }
}

/**
 * Save draft to sessionStorage (mengikuti accommodation-request)
 * Tidak perlu API untuk draft, cukup sessionStorage
 */
export async function savePurchaseRequisitionDraft(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: PurchaseRequisitionForm
): Promise<void> {
  console.log('💾 Purchase Requisition API: Saving draft for', cat, type)
  await delay(200) // Simulasi delay seperti accommodation-request
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

/**
 * Submit Purchase Requisition
 * Menggunakan API untuk submit (seperti postAccommodationRequest)
 */
export async function submitPurchaseRequisition(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: PurchaseRequisitionForm
): Promise<{ requestId: string }> {
  console.log('✅ Purchase Requisition API: Submitting for', cat, type)
  
  try {
    const response = await postPurchaseRequisition(payload)
    console.log('✅ Purchase Requisition API: Submitted successfully:', response)
    
    // Clear draft dari sessionStorage setelah submit berhasil
    sessionStorage.removeItem(`draft:${cat}:${type}`)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requisitionId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting purchase requisition:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Purchase Requisition Form
 * Digunakan jika API gagal
 */
function getDummyPurchaseRequisitionForm(
  cat: OnlineCategoryKey, 
  type: string
): PurchaseRequisitionForm {
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

  const result: PurchaseRequisitionForm = {
    header: {
      requisitionId: 'PR-00000001',
      requestType: 'Purchase Requisition',
      refRequestNo: 'PR-2510-0001',
      fullPaymentMethod: 'Bank Transfer',
    },
    requestInfo: {
      requisitionDate: new Date().toISOString().slice(0, 10),
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
      commentRemarkNote: '',
      additionalComments: '',
      relevantDocs: '',
      relevantDocsSecond: '',
      location: '',
      amount: '',
      estimatedTime: '',
      firstService: '',
    },
    requisitionInfo: {
      supplier: '',
      supplierAddress: '',
      supplierContact: '',
      comments: '',
    },
    itemDetails: [
      {
        id: '1',
        no: 1,
        stockcode: '',
        stock_description: '',
        item_type: '',
        quantity: '',
        unit_price: '',
        totalPrice: '',
      },
      {
        id: '2',
        no: 2,
        stockcode: '',
        stock_description: '',
        item_type: '',
        quantity: '',
        unit_price: '',
        totalPrice: '',
      },
      {
        id: '3',
        no: 3,
        stockcode: '',
        stock_description: '',
        item_type: '',
        quantity: '',
        unit_price: '',
        totalPrice: '',
      },
    ],
    estimatedTotalCost: '1000.00',
    remark: '',
    internalNote: '',
    attachment: '',
    status: 'Pending',
    createdBy: 'John Doe',
    createdDate: new Date().toISOString().slice(0, 10),
    lastModifiedBy: '',
    lastModifiedDate: '',
    approvedBy: '',
    approvedDate: '',
    rejectedBy: '',
    rejectedDate: '',
    reasonForRejection: '',
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
  
  console.log('✅ Purchase Requisition API: Generated dummy form data:', result)
  return result
}

export function getRequestPurposeOptions() {
  return [
    { value: 'purchase', label: 'Purchase' },
    { value: 'service', label: 'Service' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'repair', label: 'Repair' },
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
    { value: 'Operations', label: 'Operations' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Administration', label: 'Administration' },
    { value: 'IT', label: 'IT' },
  ]
}

export function getCostCenterOptions() {
  return [
    { value: 'OPS-1001', label: 'OPS-1001' },
    { value: 'HR-2001', label: 'HR-2001' },
    { value: 'FIN-3001', label: 'FIN-3001' },
    { value: 'ADM-4001', label: 'ADM-4001' },
    { value: 'IT-5001', label: 'IT-5001' },
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

