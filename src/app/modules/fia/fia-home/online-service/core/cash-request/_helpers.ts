import { OnlineCategoryKey } from '../../registry'
import { CashRequestForm } from './_models'
import { 
  getCashRequestNew,
  postCashRequest
} from './_requests'
import { fetchHrBranchSiteOptions } from '../employee-search/_hrMasterOptions'

/**
 * Cash Request Helper Functions
 */

/**
 * Get Cash Request Form — API, atau dummy jika API gagal
 */
export async function getCashRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<CashRequestForm> {
  console.log('🔍 Cash Request API: getForm called for', cat, type)

  try {
    const formData = await getCashRequestNew()
    console.log('✅ Cash Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching cash request form from API, using fallback:', error)
    return getDummyCashRequestForm(cat, type)
  }
}

/**
 * Submit Cash Request
 */
export async function submitCashRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: CashRequestForm
): Promise<{ requestId: string }> {
  console.log('✅ Cash Request API: Submitting for', cat, type)
  
  try {
    const response = await postCashRequest(payload)
    console.log('✅ Cash Request API: Submitted successfully:', response)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting cash request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Cash Request Form
 * Digunakan jika API gagal
 */
function getDummyCashRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): CashRequestForm {
  const deptMap: Record<OnlineCategoryKey, string> = {
    operation: 'Operations',
    resource: 'Human Resources',
    department: 'Finance',
    general: 'Administration'
  }

  return {
    header: {
      requestId: '25-0000008',
      requestType: 'Cash Request',
      refRequestNo: 'CAQ-2511-0001',
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
    cashRequestDetails: {
      expenseType: '',
      amountRequest: 0,
      paymentMethod: '',
      bankAccount: '',
      currency: 'IDR',
    },
    approvals: {
      immediateSupervisor: '',
      departmentHead: '',
      financeManager: '',
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
    { value: 'Operational', label: 'Operational' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Equipment', label: 'Equipment' },
    { value: 'Training', label: 'Training' },
    { value: 'Emergency', label: 'Emergency' },
  ]
}

export function getPriorityOptions() {
  return [
    { value: 'P#1', label: 'P#1' },
    { value: 'P#2', label: 'P#2' },
    { value: 'P#3', label: 'P#3' },
  ]
}


export function getExpenseTypeOptions() {
  return [
    { value: 'Office Supplies', label: 'Office Supplies' },
    { value: 'Travel Expenses', label: 'Travel Expenses' },
    { value: 'Equipment Purchase', label: 'Equipment Purchase' },
    { value: 'Training Costs', label: 'Training Costs' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Utilities', label: 'Utilities' },
  ]
}

export function getPaymentMethodOptions() {
  return [
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'Cash', label: 'Cash' },
    { value: 'Check', label: 'Check' },
    { value: 'Credit Card', label: 'Credit Card' },
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
