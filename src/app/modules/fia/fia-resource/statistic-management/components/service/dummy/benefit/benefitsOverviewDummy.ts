export type MedicalOverviewRow = {
  id: number
  departmentCode: string
  departmentName: string

  // Management
  superintendent: number
  manager: number
  director: number

  // Supervisor
  supervisor: number
  foreman: number

  // Craft
  nonStaff: number
  leadhand: number

  siteBranch?: string
  section?: string
  element?: string
}

export const medicalOverviewRows: MedicalOverviewRow[] = [
  {
    id: 1,
    departmentCode: '1001',
    departmentName: 'Administration Department',
    superintendent: 0,
    manager: 0,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 2,
    leadhand: 0,
    siteBranch: 'Head Site A',
  },
  {
    id: 2,
    departmentCode: '1101',
    departmentName: 'Operation Department',
    superintendent: 0,
    manager: 1,
    director: 1,
    supervisor: 0,
    foreman: 0,
    nonStaff: 0,
    leadhand: 1,
  },
  {
    id: 3,
    departmentCode: '1201',
    departmentName: 'Maintenance Department',
    superintendent: 1,
    manager: 0,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 2,
    leadhand: 0,
  },
  {
    id: 4,
    departmentCode: '2101',
    departmentName: 'HR Admin Department',
    superintendent: 0,
    manager: 0,
    director: 0,
    supervisor: 2,
    foreman: 0,
    nonStaff: 1,
    leadhand: 0,
  },
  {
    id: 5,
    departmentCode: '2302',
    departmentName: 'EHS Department',
    superintendent: 1,
    manager: 0,
    director: 2,
    supervisor: 0,
    foreman: 1,
    nonStaff: 3,
    leadhand: 1,
  },
  {
    id: 6,
    departmentCode: '3101',
    departmentName: 'SCM Procurement Department',
    superintendent: 0,
    manager: 1,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 1,
    leadhand: 0,
  },
  {
    id: 7,
    departmentCode: '3301',
    departmentName: 'SCM Warehouse Department',
    superintendent: 0,
    manager: 0,
    director: 0,
    supervisor: 0,
    foreman: 0,
    nonStaff: 1,
    leadhand: 0,
  },
  {
    id: 8,
    departmentCode: '4101',
    departmentName: 'FA Finance Department',
    superintendent: 2,
    manager: 0,
    director: 1,
    supervisor: 0,
    foreman: 0,
    nonStaff: 0,
    leadhand: 0,
  },
]
