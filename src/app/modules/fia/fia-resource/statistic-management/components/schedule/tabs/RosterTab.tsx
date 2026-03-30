import React, {useMemo, useState} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'
import {planRosterRows, PlanRosterRow, RosterCode} from '../dummy/rosterDummy'

const INVERT: RosterCode[] = ['N', 'O'] // sel yang digelapkan

// Kalender dari baseDate (Date) atau dari string
const useCalendar = (dateStr?: string) => {
  const base = dateStr ? new Date(dateStr) : new Date()
  const year = base.getFullYear()
  const month = base.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = Array.from({length: daysInMonth}, (_, i) => i + 1)
  const dowLetters = days.map(
    (d) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(year, month, d).getDay()]
  )
  return {year, month, daysInMonth, days, dowLetters}
}

// ===== Inline styles (pakai CSS variables Metronic) =====
const CELL_MIN_W = 30 // px

const styles = {
  thBlock: {
    background: 'var(--kt-gray-200)',
    color: 'var(--kt-gray-800)',
    borderColor: 'var(--kt-border-color)',
  } as React.CSSProperties,
  thBlockPrimary: {
    background: 'var(--kt-primary-light)',
    color: 'var(--kt-primary)',
    borderColor: 'var(--kt-border-color)',
  } as React.CSSProperties,
  thDay: {
    background: 'var(--kt-gray-200)',
    color: 'var(--kt-gray-700)',
    textAlign: 'center',
    minWidth: CELL_MIN_W,
    padding: '4px 6px',
    borderColor: 'var(--kt-border-color)',
  } as React.CSSProperties,
  thDow: {
    background: 'var(--kt-gray-300)',
    color: 'var(--kt-gray-600)',
    textAlign: 'center',
    fontSize: 12,
    minWidth: CELL_MIN_W,
    padding: '2px 6px',
    borderColor: 'var(--kt-border-color)',
  } as React.CSSProperties,
  pad: {
    background: 'transparent',
    borderColor: 'var(--kt-border-color)',
  } as React.CSSProperties,
  cell: {
    background: 'var(--kt-body-bg)',
    color: 'var(--kt-body-color)',
    textAlign: 'center',
    minWidth: CELL_MIN_W,
    padding: '2px 6px',
    lineHeight: 1,
    borderColor: 'var(--kt-border-color)',
  } as React.CSSProperties,
  cellInvert: {
    background: 'var(--kt-gray-900)',
    color: 'var(--kt-gray-100)',
  } as React.CSSProperties,
}

const groupByDept = (rows: PlanRosterRow[]) =>
  rows.reduce<Record<string, PlanRosterRow[]>>((acc, r) => {
    ;(acc[r.departmentCode] ||= []).push(r)
    return acc
  }, {})

export const ScheduleRosterTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  // ===== state bulan yang ditampilkan =====
  const [baseDate, setBaseDate] = useState<Date>(() =>
    filters.date ? new Date(filters.date) : new Date()
  )

  const cal = useCalendar(baseDate.toISOString())

  // filter global
  const filtered = useMemo(
    () =>
      planRosterRows
        .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
        .filter((r) => (filters.department ? r.department === filters.department : true))
        .filter((r) => (filters.section ? r.section === filters.section : true))
        .filter((r) => (filters.element ? r.element === filters.element : true)),
    [filters]
  )

  // normalkan panjang hari = daysInMonth
  const normalized = useMemo<PlanRosterRow[]>(
    () =>
      filtered.map((r) => {
        let days = r.days.slice(0, cal.daysInMonth)
        if (days.length < cal.daysInMonth) {
          days = [...days, ...Array(cal.daysInMonth - days.length).fill('' as RosterCode)]
        }
        return {...r, days}
      }),
    [filtered, cal.daysInMonth]
  )

  const grouped = useMemo(() => groupByDept(normalized), [normalized])

  const handlePrevMonth = () => {
    setBaseDate((prev) => {
      const d = new Date(prev)
      d.setMonth(d.getMonth() - 1)
      return d
    })
  }

  const handleNextMonth = () => {
    setBaseDate((prev) => {
      const d = new Date(prev)
      d.setMonth(d.getMonth() + 1)
      return d
    })
  }

  const monthLabel = baseDate.toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div>
      {/* Title + navigasi bulan */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <Title text2='MASTER WORKFORCE ROSTER' style={{fontSize: 17}} className='mb-0' />

        <div className='d-flex align-items-center gap-2'>
          <button type='button' className='btn btn-sm btn-light' onClick={handlePrevMonth}>
            Prev
          </button>
          <span className='fw-semibold'>{monthLabel}</span>
          <button type='button' className='btn btn-sm btn-light' onClick={handleNextMonth}>
            Next
          </button>
        </div>
      </div>

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            {/* HEADER BARIS 1: No / Workgroup / Roster rowSpan 2 */}
            <tr className='fw-bold'>
              <th rowSpan={2} className='text-center align-middle' style={styles.thBlock}>
                No
              </th>
              <th rowSpan={2} className='text-start align-middle' style={styles.thBlock}>
                Workgroup - Cost Center
              </th>
              <th rowSpan={2} className='text-center align-middle' style={styles.thBlock}>
                Roster
              </th>
              {cal.days.map((d) => (
                <th key={`d-${d}`} style={styles.thDay}>
                  {d}
                </th>
              ))}
            </tr>
            {/* HEADER BARIS 2: hanya huruf hari (S, M, T...) */}
            <tr>
              {cal.dowLetters.map((l, i) => (
                <th key={`dow-${i}`} style={styles.thDow}>
                  {l}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Object.entries(grouped).map(([deptCode, list]) => {
              const deptName = list[0].department
              return (
                <React.Fragment key={deptCode}>
                  {/* Department header */}
                  <tr className='fw-bold'>
                    <td colSpan={3} className='text-start' style={styles.thBlockPrimary}>
                      {deptCode} &nbsp; {deptName}
                    </td>
                    {cal.days.map((d) => (
                      <td key={`pad-${deptCode}-${d}`} style={styles.pad} />
                    ))}
                  </tr>

                  {/* Workgroup rows */}
                  {list.map((r, idx) => (
                    <tr key={r.id} className='align-middle'>
                      <td className='text-gray-600' style={styles.cell}>
                        {idx + 1}
                      </td>
                      <td className='text-start' style={styles.cell}>
                        {r.workgroup}
                      </td>
                      <td className='text-center fw-semibold' style={styles.cell}>
                        {r.rosterPattern}
                      </td>

                      {r.days.map((code, i) => {
                        const invert = INVERT.includes(code)
                        const st = invert ? {...styles.cell, ...styles.cellInvert} : styles.cell
                        return (
                          <td key={`${r.id}-${i}`} style={st}>
                            {code}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ScheduleRosterTab
