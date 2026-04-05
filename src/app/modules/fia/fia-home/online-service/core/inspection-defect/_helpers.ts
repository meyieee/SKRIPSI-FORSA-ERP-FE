import { OnlineCategoryKey } from '../../registry'
import { InspectionDefectForm } from './_models'

/**
 * Inspection Defect Helper Functions
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function getInspectionDefectForm(cat: OnlineCategoryKey, type: string): Promise<InspectionDefectForm> {
  console.log('🔍 Inspection Defect API: getForm called for', cat, type)
  
  await delay(350 + Math.random() * 300)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Inspection Defect API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Inspection Defect API: No draft found, generating new data')
  
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
  
  const result: InspectionDefectForm = {
    header: {
      requestId: '25-0000003',
      requestType: 'Inspection',
      refRequestNo: 'IDQ-2510-0001',
    },
    requestInfo: {
      requestDate: new Date().toISOString().slice(0, 10),
      requestBy: 'EMP001 - John Doe',
      requestFor: '',
      requestPurpose: '',
      priority: 'Medium',
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
    },
    inspectionInfo: {
      inspectionDate: new Date().toISOString().slice(0, 10),
      inspectionType: '',
      inspectionDescription: '',
      inspectionBy: 'EMP001 - John Doe',
      inspectionByJobTitle: '',
      inspectionFor: 'EMP002 - Jane Smith',
      inspectionForJobTitle: '',
      priority: '',
      department: deptMap[cat] || '',
      relevantDocs: '',
      costCenter: costCenterMap[cat] || '',
      justificationReason: '',
      justificationBenefit: '',
    },
    inspectionDetailInfo: {
      assetNo: '',
      assetDescription: '',
      assetType: '',
      assetModel: '',
      location: '',
      inspectionSummary: '',
      notesComments: '',
      additionalNotes: '',
    },
    defectDetails: [
      {
        id: '1',
        no: 1,
        defectDescription: '',
        condition: 'Good' as const,
        category: 'Mechanical' as const,
        recommendedAction: '',
        assignedTo: '',
        dueDate: '',
        actionTaken: 'None' as const,
        result: 'Pass' as const,
        status: 'Open' as const,
      },
    ],
    approvals: {
      immediateSupervisor: '',
      departmentHead: 'HD-' + (deptMap[cat] || 'GEN').slice(0, 3).toUpperCase() + ' - Bella',
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
  
  console.log('✅ Inspection Defect API: Generated new form data:', result)
  return result
}

export async function saveInspectionDefectDraft(cat: OnlineCategoryKey, type: string, payload: InspectionDefectForm): Promise<void> {
  await delay(150)
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

export async function submitInspectionDefect(cat: OnlineCategoryKey, type: string, payload: InspectionDefectForm): Promise<{ requestId: string }> {
  await delay(400)
  if (Math.random() < 0.05) throw new Error('Random submit failure (dummy)')
  
  const requestId = `ID-${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`
  sessionStorage.removeItem(`draft:${cat}:${type}`)
  return { requestId }
}

export function getRequestPurposeOptions() {
  return [
    { value: 'routine-inspection', label: 'Routine Inspection' },
    { value: 'non-routine-inspection', label: 'Non-routine Inspection' },
    { value: 'special-inspection', label: 'Special Inspection' },
    { value: 'defect-report', label: 'Defect Report' },
    { value: 'maintenance-check', label: 'Maintenance Check' },
    { value: 'safety-audit', label: 'Safety Audit' },
    { value: 'quality-control', label: 'Quality Control' },
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
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Security', label: 'Security' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Quality Control', label: 'Quality Control' },
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

export function getInspectionTypeOptions() {
  return [
    { value: 'Routine', label: 'Routine' },
    { value: 'Non-routine', label: 'Non-routine' },
    { value: 'Special', label: 'Special' },
  ]
}

export function getConditionOptions() {
  return [
    { value: 'Good', label: 'Good' },
    { value: 'Fair', label: 'Fair' },
    { value: 'Poor', label: 'Poor' },
  ]
}

export function getCategoryOptions() {
  return [
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'General', label: 'General' },
    { value: 'Other', label: 'Other' },
  ]
}

export function getActionTakenOptions() {
  return [
    { value: 'None', label: 'None' },
    { value: 'Schedule Repair', label: 'Schedule Repair' },
    { value: 'Out of Service', label: 'Out of Service' },
    { value: 'Other - Describe', label: 'Other - Describe' },
  ]
}

export function getResultOptions() {
  return [
    { value: 'Pass', label: 'Pass' },
    { value: 'Fail', label: 'Fail' },
  ]
}

export function getStatusOptions() {
  return [
    { value: 'Open', label: 'Open' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ]
}

export function getAssetOptions() {
  return [
    { value: 'AST-001', description: 'Pump Motor A1', type: 'Mechanical', model: 'PM-2024' },
    { value: 'AST-002', description: 'Generator B2', type: 'Electrical', model: 'GEN-500' },
    { value: 'AST-003', description: 'Conveyor Belt C3', type: 'Mechanical', model: 'CB-1000' },
    { value: 'AST-004', description: 'Control Panel D4', type: 'Electrical', model: 'CP-300' },
    { value: 'AST-005', description: 'Compressor E5', type: 'Mechanical', model: 'COMP-200' },
    { value: 'AST-006', description: 'Transformer F6', type: 'Electrical', model: 'TRANS-150' },
  ]
}

export function getAssetDetails(assetNo: string) {
  const asset = getAssetOptions().find(a => a.value === assetNo)
  return asset ? {
    assetDescription: asset.description,
    assetType: asset.type,
    assetModel: asset.model
  } : null
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

