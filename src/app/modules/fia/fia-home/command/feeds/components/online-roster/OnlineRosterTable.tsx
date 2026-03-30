import React, { useMemo } from 'react'
import { KTSVG } from '../../../../../../../../_metronic'
import { OnlineRoster } from './types'

type Props = {
  roster: OnlineRoster[]
  selectedDate: string // YYYY-MM-DD format
  onView?: (roster: OnlineRoster) => void
}

// Calendar utilities
const dayKey = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

const computeMonth = (isoYYYYMMDD: string) => {
  const base = isoYYYYMMDD ? new Date(isoYYYYMMDD) : new Date()
  const y = base.getFullYear()
  const m = base.getMonth()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const weekdayLetters = Array.from({length: daysInMonth}, (_, i) => {
    const wd = new Date(y, m, i + 1).getDay() // 0=Sun
    return 'SMTWTFS'[wd]
  })
  return {y, m, daysInMonth, weekdayLetters}
}

// Cell component for shift codes
const Cell: React.FC<{code?: string | null}> = ({code}) => {
  const c = (code || '').toUpperCase().trim()
  const isBlackBlock = c === 'N'
  if (isBlackBlock) {
    return (
      <span
        className='d-inline-flex justify-content-center align-items-center bg-black text-white'
        style={{
          width: 20,
          height: 20,
          fontSize: 10,
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
      className='d-inline-flex justify-content-center align-items-center bg-body text-body border'
      style={{
        width: 20,
        height: 20,
        fontSize: 10,
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

const OnlineRosterTable: React.FC<Props> = ({ roster, selectedDate, onView }) => {
  console.log('Roster data:', roster.length)
  console.log('Selected date:', selectedDate)
  console.log('First roster attendance:', roster[0]?.attendance)
  // ... rest of code
  const {y, m, daysInMonth, weekdayLetters} = computeMonth(selectedDate)

  // Grouping logic: Department > Workgroup > Crew
  const groupedRoster = useMemo(() => {
    const sorted = [...roster].sort(
      (a, b) =>
        a.department.localeCompare(b.department) ||
        a.workgroup.localeCompare(b.workgroup) ||
        a.crew.localeCompare(b.crew) ||
        a.empNo.localeCompare(b.empNo)
    )
    return sorted
  }, [roster])

  // Header row for grouping
  const headerRow = (label: string, colSpan: number, tone: 'dept' | 'wg' | 'crew') => {
    const cls =
      tone === 'dept'
        ? 'bg-body-secondary fw-semibold'
        : tone === 'wg'
        ? 'bg-body-tertiary fw-semibold'
        : 'bg-body fw-semibold fst-italic'
    return (
      <tr>
        <td colSpan={colSpan} className={cls}>
          {label}
        </td>
      </tr>
    )
  }

  const totalCols = 4 + 31 + 1 // No, Employee (ID+Name), Job Title, Roster, + 31 days + Action
  const total = groupedRoster.length

  return (
    <div>
      {/* Title */}
      <div className='mb-3'>
        <h3 className='fw-bold fs-3 mb-0'>ONLINE ROSTER CONTROL</h3>
      </div>

      {/* ===== Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
          <thead>
            {/* baris judul kolom utama: abu gelap adaptif */}
            <tr className='fw-bold align-middle bg-secondary'>
              <th className='min-w-30px'>No</th>
              <th className='min-w-180px'>FullName</th>
              <th className='min-w-140px'>Job Title</th>
              <th className='min-w-80px'>Roster</th>
              {Array.from({length: 31}, (_, i) => (
                <th
                  key={`h-sp-${i + 1}`}
                  className='text-center'
                  style={{minWidth: 24, padding: '4px 2px', width: 24}}
                />
              ))}
              <th className='text-end min-w-40px'></th>
            </tr>

            {/* baris huruf hari (S M T W T F S): hitam & putih bawaan bootstrap */}
            <tr className='bg-secondary text-dark'>
              <th></th>
              <th colSpan={3}></th>
              {Array.from({length: 31}, (_, i) => {
                const within = i + 1 <= daysInMonth
                const isSunday = within && weekdayLetters[i] === 'S'
                return (
                  <th
                    key={`h-w-${i + 1}`}
                    className={`text-center ${within ? (isSunday ? 'bg-danger text-white' : '') : 'bg-secondary text-secondary'}`}
                    style={{minWidth: 24, padding: '2px 1px', width: 24}}
                    title={within ? dayKey(y, m, i + 1) : 'N/A'}
                  >
                    {within ? weekdayLetters[i] : '•'}
                  </th>
                )
              })}
              <th></th>
            </tr>

            {/* baris angka tanggal: pakai bg-body-secondary agar nyesuai tema */}
            <tr className='bg-body-secondary'>
              <th></th>
              <th colSpan={3}></th>
              {Array.from({length: 31}, (_, i) => {
                const within = i + 1 <= daysInMonth
                const isSunday = within && weekdayLetters[i] === 'S'
                return (
                  <th
                    key={`h-d-${i + 1}`}
                    className={`text-center ${within ? (isSunday ? 'text-danger fw-bold' : 'text-body') : 'text-secondary'}`}
                    style={{minWidth: 24, padding: '2px 1px', width: 24}}
                  >
                    {i + 1}
                  </th>
                )
              })}
              <th></th>
            </tr>
          </thead>

            <tbody>
              {groupedRoster.length === 0 ? (
                <tr>
                  <td colSpan={totalCols} className='text-center text-muted py-10'>
                    No data found for current filters.
                  </td>
                </tr>
              ) : (
                (() => {
                  const out: React.ReactNode[] = []
                  let lastDept = ''
                  let lastWg = ''
                  let lastCrew = ''
                  const counterByCrew = new Map<string, number>()

                  groupedRoster.forEach((r) => {
                    if (r.department !== lastDept) {
                      out.push(headerRow(r.department.toUpperCase(), totalCols, 'dept'))
                      lastDept = r.department
                      lastWg = ''
                      lastCrew = ''
                    }
                    if (r.workgroup !== lastWg) {
                      out.push(headerRow(r.workgroup, totalCols, 'wg'))
                      lastWg = r.workgroup
                      lastCrew = ''
                    }
                    if (r.crew !== lastCrew) {
                      out.push(headerRow(r.crew, totalCols, 'crew'))
                      lastCrew = r.crew
                    }

                    const n = (counterByCrew.get(r.crew) ?? 0) + 1
                    counterByCrew.set(r.crew, n)

                    const att = r.attendance || {}
                    out.push(
                      <tr key={r.id}>
                        <td>{n}</td>
                        <td>
                          <div className='fw-semibold'>{r.empNo}</div>
                          <div className='text-body'>{r.empName}</div>
                        </td>
                        <td>{r.jobTitle}</td>
                        <td>{r.roster}</td>

                        {/* 31 kolom kalender */}
                        {Array.from({length: 31}, (_, i) => {
                          const d = i + 1
                          const key = dayKey(y, m, d)
                          const code = d <= daysInMonth ? att[key] : ''
                          return (
                            <td key={`c-${r.id}-${d}`} className='text-center' style={{padding: 2, width: 24}}>
                              <Cell code={code} />
                            </td>
                          )
                        })}

                        <td className='text-end'>
                          {onView && (
                            <button
                              type='button'
                              className='btn btn-sm btn-link btn-color-dark btn-active-color-gray-700'
                              title='More'
                              onClick={() => onView(r)}
                            >
                              <KTSVG
                                path='/media/icons/duotune/arrows/arr071.svg'
                                className='svg-icon-3'
                              />
                            </button>
                          )}
                        </td>
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

export default OnlineRosterTable

