// statistic-management/components/plan/dummy/planRosterDummy.ts

export type RosterCode = 'D' | 'N' | 'O' | 'V' | '' // Day, Night, Off, Vacation, kosong

export type PlanRosterRow = {
  id: number
  departmentCode: string
  department: string
  workgroup: string // “Workgroup - Cost Center”
  rosterPattern: string // contoh: "5-2", "6-1"
  siteBranch: string
  section?: string
  element?: string
  // array kode per tanggal (index 0 = tanggal 1)
  days: RosterCode[]
}

// helper kecil
const d = (codes: string) => codes.split('') as RosterCode[]
const seg = (...parts: string[]) => parts.join('') // hindari "no-useless-concat"

export const planRosterRows: PlanRosterRow[] = [
  // 1001 - Administration
  {
    id: 1,
    departmentCode: '1001',
    department: 'Administration Department',
    workgroup: '101-Administration Workgroup',
    rosterPattern: '5-2',
    siteBranch: 'Head Site A',
    section: 'Admin General',
    days: d(
      seg(
        'DDDDDOONNNNNNOO',
        'DDDDDOONNNNNNNO' // total 31 char
      )
    ),
  },

  // 1101 - Operation
  {
    id: 2,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '111-Operation Hauling Workgroup',
    rosterPattern: '6-1',
    siteBranch: 'Head Site A',
    section: 'Admin General',
    days: d(
      seg(
        'VVVVOOOONNNNNNN',
        'OOONNNNN' // 31
      )
    ),
  },
  {
    id: 3,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '112-Operation Drilling Workgroup',
    rosterPattern: '6-1',
    siteBranch: 'Head Site A',
    section: 'Admin General',
    days: d(
      seg(
        'NOOODDDDDOOONNN',
        'NNDDOOONNN' // 31
      )
    ),
  },
  {
    id: 4,
    departmentCode: '1101',
    department: 'Operation Department',
    workgroup: '113-Operation Support Workgroup',
    rosterPattern: '6-1',
    siteBranch: 'Head Site A',
    section: 'Admin General',
    days: d(
      seg(
        'ONNNNNNOOOODDDD',
        'DOONNNNNDDOO' // 31
      )
    ),
  },

  // 1201 - Maintenance
  {
    id: 5,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '121-Mine Maintenance Workgroup',
    rosterPattern: '5-2',
    siteBranch: 'Head Site A',
    section: 'Admin General',
    days: d(
      seg(
        'DDDDDOONNNNNNNO',
        'OONNNNNNOOO' // 31
      )
    ),
  },
  {
    id: 6,
    departmentCode: '1201',
    department: 'Maintenance Department',
    workgroup: '122-Maintenance Workgroup',
    rosterPattern: '5-2',
    siteBranch: 'Head Site A',
    section: 'Admin General',
    days: d(
      seg(
        'DDDDDOONNNNNNNO',
        'OONNNNNNOOO' // 31
      )
    ),
  },
]
