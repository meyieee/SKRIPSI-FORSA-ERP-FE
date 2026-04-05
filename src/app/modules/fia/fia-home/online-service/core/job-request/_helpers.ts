import { OnlineCategoryKey } from '../../registry'
import { JobRequestForm } from './_models'
import { 
  getJobRequestNew,
  postJobRequest
} from './_requests'

/**
 * Job Request Helper Functions
 * Mengikuti pola accommodation-request: sessionStorage untuk draft, API untuk submit
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get Job Request Form
 * Flow (mengikuti accommodation-request):
 * 1. Cek sessionStorage untuk draft
 * 2. Jika ada draft, return draft
 * 3. Jika tidak ada, ambil new form dari API
 * 4. Jika API gagal, fallback ke dummy data
 */
export async function getJobRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<JobRequestForm> {
  console.log('🔍 Job Request API: getForm called for', cat, type)
  
  // Step 1: Cek sessionStorage untuk draft (seperti accommodation-request)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Job Request API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Job Request API: No draft found, fetching from API')
  
  try {
    // Step 2: Ambil new form dari API
    const formData = await getJobRequestNew()
    console.log('✅ Job Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching job request form from API, using fallback:', error)
    // Step 3: Fallback ke dummy data jika API gagal
    return getDummyJobRequestForm(cat, type)
  }
}

/**
 * Save draft to sessionStorage (mengikuti accommodation-request)
 * Tidak perlu API untuk draft, cukup sessionStorage
 */
export async function saveJobRequestDraft(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: JobRequestForm
): Promise<void> {
  console.log('💾 Job Request API: Saving draft for', cat, type)
  await delay(200) // Simulasi delay seperti accommodation-request
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

/**
 * Submit Job Request
 * Menggunakan API untuk submit (seperti postAccommodationRequest)
 */
export async function submitJobRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: JobRequestForm
): Promise<{ requestId: string }> {
  console.log('✅ Job Request API: Submitting for', cat, type)
  
  try {
    const response = await postJobRequest(payload)
    console.log('✅ Job Request API: Submitted successfully:', response)
    
    // Clear draft dari sessionStorage setelah submit berhasil
    sessionStorage.removeItem(`draft:${cat}:${type}`)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting job request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Job Request Form
 * Digunakan jika API gagal
 */
function getDummyJobRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): JobRequestForm {
  // Generate appropriate department based on category
  const deptMap: Record<OnlineCategoryKey, string> = {
    operation: 'Operations',
    resource: 'Human Resources',
    department: 'Finance',
    general: 'Administration'
  }
  
  // Generate appropriate cost center based on category
  const costCenterMap: Record<OnlineCategoryKey, string> = {
    operation: 'OPS-1001',
    resource: 'HR-2001',
    department: 'FIN-3001',
    general: 'ADM-4001'
  }
  
  return {
    header: {
      requestId: '25-0000001',
      requestType: type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      refRequestNo: 'RD-2510-0001',
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
      commentRemarkNote: '',
      additionalComments: '',
      relevantDocs: '',
      relevantDocsSecond: '',
      location: '',
    },
    jobOrder: {
      jobType: '',
      location: '',
      assetEquipment: '',
    },
    workRequirements: {
      specialInstructions: '',
      safetyPrecautions: '',
      materialRequired: '',
      toolRequired: '',
    },
    assignment: {
      assignedTo: '',
      workorderStatus: 'Open',
      workorderClosure: '',
      scheduleStartDate: '',
      actualStartDate: '',
      completionDate: '',
      actualCompletionDate: '',
      additionalComments: '',
    },
    approvals: {
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
// Static Data Options (Frontend)
// ============================================

export function getRequestPurposeOptions() {
  return [
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'repair', label: 'Repair' },
    { value: 'installation', label: 'Installation' },
    { value: 'inspection', label: 'Inspection' },
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


export function getJobTypeOptions() {
  return [
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'repair', label: 'Repair' },
    { value: 'installation', label: 'Installation' },
    { value: 'inspection', label: 'Inspection' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'other', label: 'Other' },
  ]
}

export function getWorkOrderStatusOptions() {
  return [
    { value: 'Open', label: 'Open' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
  ]
}

export function getWorkOrderClosureOptions() {
  return [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
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

// ============================================
// Dynamic Data Options (Backend API)
// ============================================

/**
 * Fetch Branch/Site options from backend API with fallback dummy data
 */
export async function getBranchSiteOptions(): Promise<Array<{ value: string; label: string }>> {
  try {
    const response = await fetch('/api/hoandbranchprofiles', {
      credentials: 'include',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch branch/site options:', response.statusText);
      return getDummyBranchSiteOptions(); // ← FALLBACK
    }
    
    const result = await response.json();
    const branches = result.data?.rows || result.data || [];
    
    if (branches.length === 0) {
      return getDummyBranchSiteOptions(); // ← FALLBACK jika kosong
    }
    
    return branches.map((branch: any) => ({
      value: branch.com_code || branch.id?.toString() || '',
      label: branch.com_name || branch.name || 'Unknown Branch',
    }));
  } catch (error) {
    console.error('Error fetching branch/site options:', error);
    return getDummyBranchSiteOptions(); // ← FALLBACK
  }
}

/**
 * Dummy Branch/Site options for fallback
 */
function getDummyBranchSiteOptions(): Array<{ value: string; label: string }> {
  return [
    { value: 'HO-001', label: 'Head Office - Jakarta' },
    { value: 'BR-001', label: 'Branch - Surabaya' },
    { value: 'BR-002', label: 'Branch - Bandung' },
    { value: 'BR-003', label: 'Branch - Medan' },
    { value: 'ST-001', label: 'Site - Plant A' },
    { value: 'ST-002', label: 'Site - Plant B' },
  ]
}

/**
 * Fetch Location options from backend API with fallback dummy data
 */
export async function getLocationOptions(): Promise<Array<{ value: string; label: string }>> {
  try {
    const response = await fetch('/api/location', {
      credentials: 'include',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch location options:', response.statusText);
      return getDummyLocationOptions(); // ← FALLBACK
    }
    
    const result = await response.json();
    const locations = result.data?.rows || result.data || [];
    
    if (locations.length === 0) {
      return getDummyLocationOptions(); // ← FALLBACK jika kosong
    }
    
    return locations
      .filter((loc: any) => loc.status !== false)
      .map((loc: any) => ({
        value: loc.loc_code || loc.id?.toString() || '',
        label: loc.loc_des || loc.description || loc.name || 'Unknown Location',
      }));
  } catch (error) {
    console.error('Error fetching location options:', error);
    return getDummyLocationOptions(); // ← FALLBACK
  }
}

/**
 * Dummy Location options for fallback
 */
function getDummyLocationOptions(): Array<{ value: string; label: string }> {
  return [
    { value: 'LOC-001', label: 'Location - Building A' },
    { value: 'LOC-002', label: 'Location - Building B' },
    { value: 'LOC-003', label: 'Location - Warehouse' },
    { value: 'LOC-004', label: 'Location - Production Area' },
    { value: 'LOC-005', label: 'Location - Office Area' },
  ]
}

/**
 * Fetch Department options from backend API with fallback dummy data
 */
export async function getDepartmentOptions(): Promise<Array<{ value: string; label: string }>> {
  try {
    const response = await fetch('/api/departments', {
      credentials: 'include',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch department options:', response.statusText);
      return getDummyDepartmentOptions(); // ← FALLBACK
    }
    
    const result = await response.json();
    const departments = result.data?.rows || result.data || [];
    
    if (departments.length === 0) {
      return getDummyDepartmentOptions(); // ← FALLBACK jika kosong
    }
    
    return departments
      .filter((dept: any) => dept.status !== false)
      .map((dept: any) => ({
        value: dept.dept_code || dept.id?.toString() || '',
        label: dept.dept_des || dept.description || dept.name || 'Unknown Department',
      }));
  } catch (error) {
    console.error('Error fetching department options:', error);
    return getDummyDepartmentOptions(); // ← FALLBACK
  }
}

/**
 * Dummy Department options for fallback
 */
function getDummyDepartmentOptions(): Array<{ value: string; label: string }> {
  return [
    { value: 'DEPT-001', label: 'Operations' },
    { value: 'DEPT-002', label: 'Human Resources' },
    { value: 'DEPT-003', label: 'Finance' },
    { value: 'DEPT-004', label: 'Administration' },
    { value: 'DEPT-005', label: 'IT' },
    { value: 'DEPT-006', label: 'Maintenance' },
  ]
}

/**
 * Fetch Cost Center options from backend API with fallback dummy data
 */
export async function getCostCenterOptions(): Promise<Array<{ value: string; label: string }>> {
  try {
    const response = await fetch('/api/costcenter', {
      credentials: 'include',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch cost center options:', response.statusText);
      return getDummyCostCenterOptions(); // ← FALLBACK
    }
    
    const result = await response.json();
    const costCenters = result.data?.rows || result.data || [];
    
    if (costCenters.length === 0) {
      return getDummyCostCenterOptions(); // ← FALLBACK jika kosong
    }
    
    return costCenters
      .filter((cc: any) => cc.status !== false)
      .map((cc: any) => ({
        value: cc.c_code || cc.id?.toString() || '',
        label: `${cc.c_code || ''} - ${cc.c_des || cc.description || cc.name || 'Unknown Cost Center'}`.trim(),
      }));
  } catch (error) {
    console.error('Error fetching cost center options:', error);
    return getDummyCostCenterOptions(); // ← FALLBACK
  }
}

/**
 * Dummy Cost Center options for fallback
 */
function getDummyCostCenterOptions(): Array<{ value: string; label: string }> {
  return [
    { value: 'CC-001', label: 'CC-001 - Operations' },
    { value: 'CC-002', label: 'CC-002 - Human Resources' },
    { value: 'CC-003', label: 'CC-003 - Finance' },
    { value: 'CC-004', label: 'CC-004 - Administration' },
    { value: 'CC-005', label: 'CC-005 - IT' },
  ]
}

/**
 * Fetch Assigned To (Employee) options from backend API
 */
export async function getAssignedToOptions(): Promise<Array<{ value: string; label: string }>> {
  try {
    const response = await fetch('/api/employeeregister', {
      credentials: 'include',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch employee options:', response.statusText);
      return [];
    }
    
    const result = await response.json();
    const employees = result.data || [];
    
    return employees
      .filter((emp: any) => emp.status === 'Active')
      .map((emp: any) => {
        const fullName = `${emp.first_name || ''} ${emp.middle_name || ''} ${emp.last_name || ''}`.trim();
        const deptName = emp.department_detail?.dept_des || emp.department || '';
        const label = deptName ? `${fullName} - ${deptName}` : fullName;
        
        return {
          value: emp.id_number || emp.id?.toString() || '',
          label: label || 'Unknown Employee',
        };
      });
  } catch (error) {
    console.error('Error fetching employee options:', error);
    return [];
  }
}

/**
 * Fetch Asset/Equipment options from backend API with fallback dummy data
 */
export async function getAssetEquipmentOptions(): Promise<Array<{ value: string; label: string }>> {
  try {
    const response = await fetch('/api/assetregister', {
      credentials: 'include',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch asset options:', response.statusText);
      return getDummyAssetEquipmentOptions(); // ← FALLBACK
    }
    
    const result = await response.json();
    const assets = result.data || [];
    
    // Handle grouped data structure (if assets are grouped by asset type)
    const flatAssets = Array.isArray(assets) 
      ? assets 
      : Object.values(assets).flat();
    
    if (flatAssets.length === 0) {
      return getDummyAssetEquipmentOptions(); // ← FALLBACK jika kosong
    }
    
    const mappedAssets = flatAssets
      .filter((asset: any) => asset.status !== 'Deleted' && asset.status !== false)
      .map((asset: any) => {
        const assetNo = asset.asset_no || '';
        const modelDesc = asset.asset_model_detail?.model_description || asset.model_description || '';
        const label = modelDesc ? `${assetNo} - ${modelDesc}` : assetNo;
        
        return {
          value: assetNo || asset.id?.toString() || '',
          label: label || 'Unknown Asset',
        };
      });
    
    // Jika setelah filter tidak ada data, gunakan dummy
    if (mappedAssets.length === 0) {
      return getDummyAssetEquipmentOptions(); // ← FALLBACK
    }
    
    return mappedAssets;
  } catch (error) {
    console.error('Error fetching asset options:', error);
    return getDummyAssetEquipmentOptions(); // ← FALLBACK
  }
}

/**
 * Dummy Asset/Equipment options for fallback
 */
function getDummyAssetEquipmentOptions(): Array<{ value: string; label: string }> {
  return [
    { value: 'AST-001', label: 'AST-001 - Pump Motor A1' },
    { value: 'AST-002', label: 'AST-002 - Generator B2' },
    { value: 'AST-003', label: 'AST-003 - Conveyor Belt C3' },
    { value: 'AST-004', label: 'AST-004 - Control Panel D4' },
    { value: 'AST-005', label: 'AST-005 - Compressor E5' },
    { value: 'AST-006', label: 'AST-006 - Transformer F6' },
    { value: 'AST-007', label: 'AST-007 - Cooling Tower G7' },
    { value: 'AST-008', label: 'AST-008 - Boiler H8' },
    { value: 'AST-009', label: 'AST-009 - Chiller I9' },
    { value: 'AST-010', label: 'AST-010 - Forklift J10' },
  ]
}
