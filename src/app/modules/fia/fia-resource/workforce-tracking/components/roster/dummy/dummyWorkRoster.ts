export type RosterRow = {
  id: string
  siteBranch: string
  department: string
  section: string
  element: string
  workgroup: string
  crew: string

  empNo: string
  empName: string
  jobTitle: string
  supervisor: string
}

// konteks bulan dummy (default Maret 2025 agar mirip foto)
export const monthContext = {
  defaultDate: '2025-03-16',
}
export const setMonthContext = (iso: string) => {
  monthContext.defaultDate = iso
}

// ===== Dummy master rows (mirip struktur foto)
export const rosterRows: RosterRow[] = [
  // OPERATION DEPARTMENT
  {
    id: 'op-a-1',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    empNo: '254875',
    empName: 'Eduard Salindeho',
    jobTitle: 'Haul Supervisor',
    supervisor: 'Muffin Stone',
  },
  {
    id: 'op-a-2',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    empNo: '123456',
    empName: 'Vallerie Joanna',
    jobTitle: 'Operator',
    supervisor: 'Muffin Stone',
  },
  {
    id: 'op-a-3',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew A',
    empNo: '123456-2',
    empName: 'Silvie Tong',
    jobTitle: 'Operator',
    supervisor: 'Muffin Stone',
  },

  {
    id: 'op-b-1',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    empNo: '234567',
    empName: 'Wong Tiara',
    jobTitle: 'Haul Supervisor',
    supervisor: 'Kobe Obi',
  },
  {
    id: 'op-b-2',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Operation Department',
    section: 'Operation Hauling',
    element: 'Default',
    workgroup: 'Operation Hauling Workgroup',
    crew: 'Crew B',
    empNo: '234567-2',
    empName: 'Jun Hale',
    jobTitle: 'Operator',
    supervisor: 'Kobe Obi',
  },

  // HUMAN RESOURCE DEPARTMENT
  {
    id: 'hr-1',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Default',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
    empNo: '345678',
    empName: 'Sesca Londah',
    jobTitle: 'Human Resource Mana',
    supervisor: 'Atlas Atantis',
  },
  {
    id: 'hr-2',
    siteBranch: 'Site Alpha | Branch A',
    department: 'Human Resource Department',
    section: 'Employee Admin',
    element: 'Default',
    workgroup: 'Employee Admin Workgroup',
    crew: 'Crew Steady Day',
    empNo: '345679',
    empName: 'Johanna Mul',
    jobTitle: 'HR Officer',
    supervisor: 'Atlas Atantis',
  },
]

// ===== Dummy Attendance
// Kode: D=Day, O=Off, V=Leave, S=Sick, N=Night/Shift (blok hitam), ''=kosong
type MapByDate = Record<string, string>
export const attendanceByEmp: Record<string, MapByDate> = {}

const fillPattern = (
  empNo: string,
  monthIso: string, // YYYY-MM-16 (tanggal bebas, kita pakai bulannya)
  pattern: string[]
) => {
  const base = new Date(monthIso)
  const y = base.getFullYear()
  const m = base.getMonth()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const map: MapByDate = {}
  for (let d = 1; d <= daysInMonth; d++) {
    const code = pattern[(d - 1) % pattern.length] || ''
    const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    map[key] = code
  }
  attendanceByEmp[empNo] = map
}

// Contoh pola; tambahkan 'N' untuk menghasilkan blok hitam seperti pada foto
fillPattern('254875', monthContext.defaultDate, [
  'D',
  'D',
  'D',
  'O',
  'D',
  'D',
  'D',
  'D',
  'V',
  'N',
  'N',
  'N',
  'O',
  'D',
  'D',
  'D',
])
fillPattern('123456', monthContext.defaultDate, [
  'D',
  'D',
  'O',
  'D',
  'D',
  'N',
  'V',
  'N',
  'N',
  'N',
  'O',
  'D',
  'D',
  'D',
  'D',
])
fillPattern('123456-2', monthContext.defaultDate, [
  'D',
  'O',
  'D',
  'D',
  'N',
  'N',
  'O',
  'D',
  'V',
  'D',
  'D',
  'D',
])
fillPattern('234567', monthContext.defaultDate, [
  'D',
  'D',
  'D',
  'O',
  'D',
  'D',
  'D',
  'D',
  'D',
  'O',
  'D',
  'V',
  'N',
  'N',
])
fillPattern('234567-2', monthContext.defaultDate, [
  'D',
  'D',
  'O',
  'N',
  'N',
  'D',
  'D',
  'O',
  'D',
  'D',
  'V',
  'D',
  'D',
  'D',
])
fillPattern('345678', monthContext.defaultDate, [
  'D',
  'D',
  'D',
  'D',
  'O',
  'N',
  'N',
  'V',
  'D',
  'D',
  'D',
  'D',
  'O',
])
fillPattern('345679', monthContext.defaultDate, [
  'D',
  'O',
  'D',
  'D',
  'D',
  'V',
  'N',
  'N',
  'D',
  'O',
  'D',
  'D',
  'D',
])
