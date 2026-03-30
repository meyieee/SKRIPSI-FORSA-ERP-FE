export type AssetUniformOverviewRow = {
  id: number
  departmentCode: string
  departmentName: string
  ppe: {
    shoes: number
    helmet: number
    glasses: number
    vest: number
  }
  uniform: {
    tshirt: number
    pants: number
  }
  asset: {
    building: number
    machinery: number
    equipment: number
    supplies: number
  }
  siteBranch: string
  section?: string
  element?: string
  date?: string
}

export const assetUniformOverviewRows: AssetUniformOverviewRow[] = [
  {
    id: 1,
    departmentCode: '1001',
    departmentName: 'Administration Department',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 2,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    ppe: {shoes: 0, helmet: 1, glasses: 0, vest: 0},
    uniform: {tshirt: 1, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 1, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 3,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 4,
    departmentCode: '2101',
    departmentName: 'HR Admin Department',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 5,
    departmentCode: '2302',
    departmentName: 'EHS Department',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 6,
    departmentCode: '3101',
    departmentName: 'SCM Procurement Department',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 7,
    departmentCode: '3301',
    departmentName: 'SCM Warehouse Department',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
  {
    id: 8,
    departmentCode: '4101',
    departmentName: 'FA Finance Department',
    ppe: {shoes: 0, helmet: 0, glasses: 0, vest: 0},
    uniform: {tshirt: 0, pants: 0},
    asset: {building: 0, machinery: 0, equipment: 0, supplies: 0},
    siteBranch: 'Head Site A',
  },
]
