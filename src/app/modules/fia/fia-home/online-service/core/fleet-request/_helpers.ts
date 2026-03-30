import { OnlineCategoryKey } from '../../registry'
import { FleetForm } from './_models'
import { 
  getFleetRequestNew,
  postFleetRequest
} from './_requests'

/**
 * Fleet Request Helper Functions
 * Mengikuti pola accommodation-request: sessionStorage untuk draft, API untuk submit
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get Fleet Request Form
 * Flow (mengikuti accommodation-request):
 * 1. Cek sessionStorage untuk draft
 * 2. Jika ada draft, return draft
 * 3. Jika tidak ada, ambil new form dari API
 * 4. Jika API gagal, fallback ke dummy data
 */
export async function getFleetRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): Promise<FleetForm> {
  console.log('🔍 Fleet Request API: getForm called for', cat, type)
  
  // Step 1: Cek sessionStorage untuk draft (seperti accommodation-request)
  const draft = sessionStorage.getItem(`draft:${cat}:${type}`)
  if (draft) {
    console.log('📄 Fleet Request API: Found draft, returning cached data')
    return JSON.parse(draft)
  }
  
  console.log('🆕 Fleet Request API: No draft found, fetching from API')
  
  try {
    // Step 2: Ambil new form dari API
    const formData = await getFleetRequestNew()
    console.log('✅ Fleet Request API: Fetched new form from API:', formData)
    return formData
  } catch (error) {
    console.error('❌ Error fetching fleet request form from API, using fallback:', error)
    // Step 3: Fallback ke dummy data jika API gagal
    return getDummyFleetRequestForm(cat, type)
  }
}

/**
 * Save draft to sessionStorage (mengikuti accommodation-request)
 * Tidak perlu API untuk draft, cukup sessionStorage
 */
export async function saveFleetRequestDraft(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: FleetForm
): Promise<void> {
  console.log('💾 Fleet Request API: Saving draft for', cat, type)
  await delay(200) // Simulasi delay seperti accommodation-request
  sessionStorage.setItem(`draft:${cat}:${type}`, JSON.stringify(payload))
}

/**
 * Submit Fleet Request
 * Menggunakan API untuk submit (seperti postAccommodationRequest)
 */
export async function submitFleetRequest(
  cat: OnlineCategoryKey, 
  type: string, 
  payload: FleetForm
): Promise<{ requestId: string }> {
  console.log('✅ Fleet Request API: Submitting for', cat, type)
  
  try {
    const response = await postFleetRequest(payload)
    console.log('✅ Fleet Request API: Submitted successfully:', response)
    
    // Clear draft dari sessionStorage setelah submit berhasil
    sessionStorage.removeItem(`draft:${cat}:${type}`)
    
    // Extract requestId dari response
    const requestId = response.data?.header?.requestId || 
                     response.data?.header?.refRequestNo || 
                     'N/A'
    
    return { requestId }
  } catch (error) {
    console.error('❌ Error submitting fleet request:', error)
    throw error
  }
}

/**
 * Fallback: Dummy Fleet Request Form
 * Digunakan jika API gagal
 */
function getDummyFleetRequestForm(
  cat: OnlineCategoryKey, 
  type: string
): FleetForm {
  const deptMap: Record<OnlineCategoryKey, string> = {
    operation: 'Operations',
    resource: 'Human Resources',
    department: 'Finance',
    general: 'Administration'
  }

  return {
    header: {
      requestId: '25-0000002',
      requestType: 'Fleet Request',
      refRequestNo: 'FRQ-2520-0001',
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
    fleetDetails: {
      fleetType: '',
      additionInformation: '',
      numberOfUnits: '',
      specifications: '',
    },
    transferDetails: {
      currentOwner: '',
      fleetLocation: '',
      workLocation: '',
      reasonForTransfer: '',
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
    { value: 'new-fleet', label: 'New Fleet' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'replacement', label: 'Replacement' },
    { value: 'upgrade', label: 'Upgrade' },
    { value: 'other', label: 'Other' },
  ]
}

export function getPriorityOptions() {
  return [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ]
}

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

export function getSupervisorOptions() {
  return [
    { value: 'supervisor-1', label: 'Supervisor 1' },
    { value: 'supervisor-2', label: 'Supervisor 2' },
    { value: 'supervisor-3', label: 'Supervisor 3' },
    { value: 'manager-a', label: 'Manager A' },
    { value: 'director-x', label: 'Director X' },
  ]
}

export function getFleetTypeOptions() {
  return [
    { value: 'Vehicle', label: 'Vehicle' },
    { value: 'Equipment', label: 'Equipment' },
    { value: 'Machinery', label: 'Machinery' },
    { value: 'Tools', label: 'Tools' },
  ]
}

/**
 * Fetch User options from backend API (for Workflow Tracking)
 * Uses Employee API as users are employees
 * With fallback dummy data
 */
export async function getUserOptions(): Promise<Array<{ value: string; label: string }>> {
  try {
    const response = await fetch('/api/employeeregister', {
      credentials: 'include',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch user options:', response.statusText);
      return getDummyUserOptions(); // ← FALLBACK
    }
    
    const result = await response.json();
    const employees = result.data || [];
    
    if (employees.length === 0) {
      return getDummyUserOptions(); // ← FALLBACK jika kosong
    }
    
    const mappedUsers = employees
      .filter((emp: any) => emp.status === 'Active')
      .map((emp: any) => {
        const fullName = `${emp.first_name || ''} ${emp.middle_name || ''} ${emp.last_name || ''}`.trim();
        const jobTitle = emp.job_title_detail?.title_des || emp.job_title || emp.position || '';
        const label = jobTitle ? `${fullName} - ${jobTitle}` : fullName;
        
        return {
          value: emp.id_number || emp.id?.toString() || '',
          label: label || 'Unknown User',
        };
      });
    
    // Jika setelah filter tidak ada data, gunakan dummy
    if (mappedUsers.length === 0) {
      return getDummyUserOptions(); // ← FALLBACK
    }
    
    return mappedUsers;
  } catch (error) {
    console.error('Error fetching user options:', error);
    return getDummyUserOptions(); // ← FALLBACK
  }
}

/**
 * Dummy User options for fallback
 */
function getDummyUserOptions(): Array<{ value: string; label: string }> {
  return [
    { value: 'USER-001', label: 'John Doe - Manager' },
    { value: 'USER-002', label: 'Jane Smith - Supervisor' },
    { value: 'USER-003', label: 'Bob Johnson - Director' },
    { value: 'USER-004', label: 'Alice Williams - Manager' },
    { value: 'USER-005', label: 'Charlie Brown - Supervisor' },
    { value: 'USER-006', label: 'Diana Prince - Director' },
    { value: 'USER-007', label: 'Edward Wilson - Manager' },
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

export function getNumberOfUnitsOptions() {
  return [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5+', label: '5+' },
  ]
}

export function getSpecificationsOptions() {
  return [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
    { value: 'Nibryd', label: 'Nibryd' },
  ]
}

/**
 * Fetch Fleet Location options from backend API with fallback dummy data
 * Uses Location API (same as getLocationOptions) or can have separate endpoint
 */
export async function getFleetLocationOptions(): Promise<Array<{ value: string; label: string }>> {
  try {
    // Try to fetch from location API (same as getLocationOptions)
    const response = await fetch('/api/location', {
      credentials: 'include',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch fleet location options:', response.statusText);
      return getDummyFleetLocationOptions(); // ← FALLBACK
    }
    
    const result = await response.json();
    const locations = result.data?.rows || result.data || [];
    
    if (locations.length === 0) {
      return getDummyFleetLocationOptions(); // ← FALLBACK jika kosong
    }
    
    return locations
      .filter((loc: any) => loc.status !== false)
      .map((loc: any) => ({
        value: loc.loc_code || loc.id?.toString() || '',
        label: loc.loc_des || loc.description || loc.name || 'Unknown Location',
      }));
  } catch (error) {
    console.error('Error fetching fleet location options:', error);
    return getDummyFleetLocationOptions(); // ← FALLBACK
  }
}

/**
 * Dummy Fleet Location options for fallback
 */
function getDummyFleetLocationOptions(): Array<{ value: string; label: string }> {
  return [
    { value: 'FLOC-001', label: 'Fleet Location - Building A' },
    { value: 'FLOC-002', label: 'Fleet Location - Building B' },
    { value: 'FLOC-003', label: 'Fleet Location - Warehouse' },
    { value: 'FLOC-004', label: 'Fleet Location - Garage' },
    { value: 'FLOC-005', label: 'Fleet Location - Parking Area' },
  ]
}

export function getReasonForTransferOptions() {
  return [
    { value: 'Relocation', label: 'Relocation' },
    { value: 'Upgrade', label: 'Upgrade' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Reassignment', label: 'Reassignment' },
  ]
}

