import React, {useMemo, useState, useEffect} from 'react'
import {rosterRows, attendanceByEmp, type RosterRow, monthContext} from '../dummy/dummyWorkRoster'

type Filters = {
  site: string
  department: string
  section: string
  element: string
  date: string // YYYY-MM-DD (untuk initial month)
}

const dayKey = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

const computeMonth = (baseDate: Date) => {
  const y = baseDate.getFullYear()
  const m = baseDate.getMonth()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const weekdayLetters = Array.from({length: daysInMonth}, (_, i) => {
    const wd = new Date(y, m, i + 1).getDay() // 0=Sun
    return 'SMTWTFS'[wd]
  })
  return {y, m, daysInMonth, weekdayLetters}
}

/** Cell kalender:
 * - 'N' = kotak hitam teks putih
 * - lainnya = kotak border saja, bg ikut row (hover aman)
 */
const Cell: React.FC<{code?: string | null}> = ({code}) => {
  const c = (code || '').toUpperCase().trim()
  const isBlackBlock = c === 'N'

  if (isBlackBlock) {
    return (
      <span
        className='d-inline-flex justify-content-center align-items-center bg-black text-white'
        style={{
          width: 22,
          height: 22,
          fontSize: 11,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        {c}
      </span>
    )
  }

  return (
    <span
      className='d-inline-flex justify-content-center align-items-center border rounded-1'
      style={{
        width: 22,
        height: 22,
        fontSize: 11,
        borderRadius: 2,
        fontWeight: 600,
        textTransform: 'uppercase',
        lineHeight: 1,
        borderColor: 'var(--bs-border-color)',
      }}
    >
      {c}
    </span>
  )
}

// style tanggal & hari – disamakan dengan referensi ScheduleDetailsTab
const calStyles = {
  thDay: {
    background: 'var(--kt-gray-200)',
    color: 'var(--kt-gray-700)',
    textAlign: 'center',
    minWidth: 26,
    padding: '4px 2px',
    borderColor: 'var(--kt-border-color)',
  } as React.CSSProperties,
  thDow: {
    background: 'var(--kt-gray-300)',
    color: 'var(--kt-gray-600)',
    textAlign: 'center',
    fontSize: 11,
    minWidth: 26,
    padding: '2px 2px',
    borderColor: 'var(--kt-border-color)',
  } as React.CSSProperties,
  pad: {
    background: 'transparent',
    borderColor: 'transparent',
  } as React.CSSProperties,
}

export const WorkforceRosterTab: React.FC = () => {
  const [filters] = useState<Filters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: monthContext.defaultDate,
  })

  // Paksa nav tab aktif (sesuai code awal)
  useEffect(() => {
    const el = document.querySelector("[data-tab='workforce-roster']")
    el?.classList.add('active')
    return () => el?.classList.remove('active')
  }, [])

  // ===== State bulan (Prev / Next) =====
  const [currentDate, setCurrentDate] = useState<Date>(() =>
    filters.date ? new Date(filters.date) : new Date(monthContext.defaultDate)
  )

  const {y, m, daysInMonth, weekdayLetters} = useMemo(
    () => computeMonth(currentDate),
    [currentDate]
  )

  const monthLabel = currentDate.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  const changeMonth = (delta: number) => {
    setCurrentDate((prev) => {
      const d = new Date(prev)
      d.setMonth(d.getMonth() + delta)
      return d
    })
  }

  // ===== Filter rows =====
  const filtered = useMemo<RosterRow[]>(() => {
    return rosterRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.department === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
      .sort(
        (a, b) =>
          a.department.localeCompare(b.department) ||
          a.workgroup.localeCompare(b.workgroup) ||
          a.crew.localeCompare(b.crew) ||
          a.empNo.localeCompare(b.empNo)
      )
  }, [filters])

  // header baris grup (dept / workgroup / crew)
  const headerRow = (label: string, colSpan: number, tone: 'dept' | 'wg' | 'crew') => {
    let cls = 'fw-semibold text-start'

    if (tone === 'dept') {
      cls += ' bg-light-primary text-primary'
    } else if (tone === 'wg') {
      cls += ' bg-light-success'
    } else {
      cls += ' bg-light-warning fst-italic'
    }

    return (
      <tr>
        <td colSpan={colSpan} className={cls}>
          {label}
        </td>
      </tr>
    )
  }

  const total = filtered.length
  const counterByCrew = new Map<string, number>()
  const fullColSpan = 4 + daysInMonth // No + Emp + Job + Sup + days (tanpa Action)

  return (
    <div>
      {/* Header + navigasi bulan */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h5 className='mb-0'>WORKFORCE ROSTER</h5>
        <div className='d-flex align-items-center gap-2'>
          <button type='button' className='btn btn-sm btn-light' onClick={() => changeMonth(-1)}>
            Prev
          </button>
          <span className='fw-semibold'>{monthLabel}</span>
          <button type='button' className='btn btn-sm btn-light' onClick={() => changeMonth(1)}>
            Next
          </button>
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            {/* satu baris header utama; tanggal & DOW di body per crew */}
            <tr className='fw-bold align-middle bg-secondary'>
              <th className='min-w-30px'>No</th>
              <th className='min-w-220px'>Employee</th>
              <th className='min-w-160px'>Job Title</th>
              <th className='min-w-160px'>Supervisor</th>
              {Array.from({length: daysInMonth}, (_, i) => (
                <th
                  key={`h-sp-${i + 1}`}
                  className='text-center'
                  style={{minWidth: 26, padding: '6px 4px'}}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={fullColSpan} className='text-center text-muted py-10'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              (() => {
                const out: React.ReactNode[] = []
                let lastDept = ''
                let lastWg = ''
                let lastCrew = ''

                filtered.forEach((r) => {
                  // DEPARTMENT
                  if (r.department !== lastDept) {
                    out.push(headerRow(r.department.toUpperCase(), fullColSpan, 'dept'))
                    lastDept = r.department
                    lastWg = ''
                    lastCrew = ''
                  }
                  // WORKGROUP
                  if (r.workgroup !== lastWg) {
                    out.push(headerRow(r.workgroup, fullColSpan, 'wg'))
                    lastWg = r.workgroup
                    lastCrew = ''
                  }
                  // CREW + baris tanggal/DOW baru setiap ganti crew
                  if (r.crew !== lastCrew) {
                    out.push(headerRow(r.crew, fullColSpan, 'crew'))
                    lastCrew = r.crew
                    counterByCrew.set(r.crew, 0)

                    // baris tanggal (1..n)
                    out.push(
                      <tr key={`days-${lastDept}-${lastWg}-${lastCrew}`}>
                        <td colSpan={4} style={calStyles.pad} />
                        {Array.from({length: daysInMonth}, (_, i) => (
                          <td
                            key={`d-${lastDept}-${lastWg}-${lastCrew}-${i + 1}`}
                            style={calStyles.thDay}
                          >
                            {i + 1}
                          </td>
                        ))}
                      </tr>
                    )

                    // baris huruf hari (S / M / T / ...)
                    out.push(
                      <tr key={`dow-${lastDept}-${lastWg}-${lastCrew}`}>
                        <td colSpan={4} style={calStyles.pad} />
                        {weekdayLetters.map((l, i) => (
                          <td
                            key={`dw-${lastDept}-${lastWg}-${lastCrew}-${i}`}
                            style={calStyles.thDow}
                          >
                            {l}
                          </td>
                        ))}
                      </tr>
                    )
                  }

                  const n = (counterByCrew.get(r.crew) ?? 0) + 1
                  counterByCrew.set(r.crew, n)

                  const att = attendanceByEmp[r.empNo] || {}

                  out.push(
                    <tr key={r.id}>
                      <td>{n}</td>
                      <td>
                        <div className='fw-semibold'>{r.empNo}</div>
                        <div className='text-gray-800'>{r.empName}</div>
                      </td>
                      <td>{r.jobTitle}</td>
                      <td>{r.supervisor}</td>

                      {/* kolom kalender (sesuai hari di bulan aktif) */}
                      {Array.from({length: daysInMonth}, (_, i) => {
                        const d = i + 1
                        const key = dayKey(y, m, d)
                        const code = att[key] || ''
                        return (
                          <td key={`c-${r.id}-${d}`} className='text-center' style={{padding: 2}}>
                            <Cell code={code} />
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
                return out
              })()
            )}
          </tbody>
        </table>
      </div>

      <div className='small text-muted mt-2'>
        Showing <span className='fw-semibold'>{total}</span> record{total !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default WorkforceRosterTab
