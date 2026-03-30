export type WfMedSummaryRow = {
  id: number
  departmentCode: string
  departmentName: string
  workgroup: string
  ppe: {shoes: number; helmet: number; glasses: number; vest: number}
  uniform: {tshirt: number; pants: number}
  asset: {building: number; machinery: number; equipment: number; supplies: number}
  siteBranch: string
  section?: string
  element?: string
  date?: string
}

export const wfMedSummaryRows: WfMedSummaryRow[] = [
  // 1001 – Administration
  {
    id: 1,
    departmentCode: '1001',
    departmentName: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },

  // 1101 – Operation
  {
    id: 2,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 3,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 4,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    workgroup: '113-Operation Support Workgroup',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },

  // 1201 – Maintenance
  {
    id: 5,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 6,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
]
