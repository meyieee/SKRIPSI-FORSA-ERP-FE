import { OnlineCategoryKey } from '../../registry'
import { WorkforceRequestForm } from './_models'
import { 
  getWorkforceRequestNew,
  postWorkforceRequest
} from './_requests'

/**
 * Workforce Request Helper Functions
 */

/**
 * Get Workforce Request Form — API, atau dummy jika API gagal
 */
export async function getWorkforceRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<WorkforceRequestForm> {
  console.log('🔍 Workforce Request API: getForm called for', cat, type)

  try {
    const formData = await getWorkforceRequestNew()
    console.log('✅ Workforce Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching workforce request form from API, using fallback:', error)
    return getDummyWorkforceRequestForm(cat, type)
  }
}

/**
 * Submit Workforce Request
 */
export async function submitWorkforceRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: WorkforceRequestForm
): Promise<{ requestId: string }> {
  console.log('✅ Workforce Request API: Submitting for', cat, type)
  
  try {
    const response = await postWorkforceRequest(payload)
    console.log('✅ Workforce Request API: Submitted successfully:', response)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting workforce request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Workforce Request Form
 * Digunakan jika API gagal
 */
function getDummyWorkforceRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): WorkforceRequestForm {
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
      requestId: '25-0000006',
      requestType: 'Workforce Request',
      refRequestNo: 'WFQ-2510-0001',
    },
    requestInfo: {
      requestDate: new Date().toISOString().slice(0, 10),
      requestBy: '',
      requestFor: '',
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
      requestByJobTitle: '',
      requestForJobTitle: '',
    },
    workforceSpecs: {
      jobTitle: '',
      positions: '',
      employmentType: '',
      overtimeRequired: false,
      workSchedule: '',
      workLocation: '',
      shift: '',
    },
    jobRequirements: {
      jobDescription: '',
      keyResponsibilities: '',
      requiredSkills: '',
      experience: '',
      education: '',
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

export function getRequestPurposeOptions() {
  return [
    { value: 'New Position', label: 'New Position' },
    { value: 'Replacement', label: 'Replacement' },
    { value: 'Intern', label: 'Intern' },
    { value: 'Temporary', label: 'Temporary' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Other', label: 'Other' },
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
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Security', label: 'Security' },
    { value: 'Other', label: 'Other' },
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

export function getEmploymentTypeOptions() {
  return [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Intern', label: 'Intern' },
    { value: 'Temporary', label: 'Temporary' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Other', label: 'Other' },
  ]
}

export function getShiftOptions() {
  return [
    { value: 'Day', label: 'Day' },
    { value: 'Night', label: 'Night' },
    { value: 'Rotating', label: 'Rotating' },
    { value: 'Swing', label: 'Swing' },
  ]
}

export function getYesNoOptions() {
  return [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
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

