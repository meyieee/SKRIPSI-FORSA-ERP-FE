import React, {useMemo, useState, useRef} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'
import {planRosterDetailRows, PlanRosterDetailRow, RosterCode} from '../dummy/detailsDummy'
import {KTSVG} from '../../../../../../../../_metronic'

// pakai ProfileContext & panel inline yang sama
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'
import RecapInlinePersonalInfoPanel from '../../../../components/InlinePersonalInfoPanel'

const INVERT: RosterCode[] = ['N', 'O']

const useCalendar = (dateStr?: string) => {
  const base = dateStr ? new Date(dateStr) : new Date()
  const y = base.getFullYear()
  const m = base.getMonth()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const days = Array.from({length: daysInMonth}, (_, i) => i + 1)
  const dowLetters = days.map(
    (d) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(y, m, d).getDay()]
  )
  return {daysInMonth, days, dowLetters}
}

// ===== inline styles (Metronic vars) =====
const CELL_MIN_W = 30
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
    borderColor: 'transparent',
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

type Grouped = Record<string, Record<string, Record<string, PlanRosterDetailRow[]>>>

const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'

const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

export const ScheduleDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()
  const {setProfile, setSelectedId} = useProfile()

  const [currentDate, setCurrentDate] = useState<Date>(() =>
    filters.date ? new Date(filters.date) : new Date()
  )
  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  const cal = useCalendar(currentDate.toISOString())
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

  // ===== filter data global =====
  const filtered = useMemo(
    () =>
      planRosterDetailRows
        .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
        .filter((r) => (filters.department ? r.department === filters.department : true))
        .filter((r) => (filters.section ? r.section === filters.section : true))
        .filter((r) => (filters.element ? r.element === filters.element : true)),
    [filters]
  )

  // normalkan panjang days sesuai jumlah hari bulan aktif
  const normalized = useMemo<PlanRosterDetailRow[]>(
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

  const grouped = useMemo<Grouped>(() => {
    const g: Grouped = {}
    normalized.forEach((r) => {
      const d = r.departmentCode
      const w = r.workgroup
      const c = r.crew ?? '_no_crew_'
      g[d] ??= {}
      g[d][w] ??= {}
      g[d][w][c] ??= []
      g[d][w][c].push(r)
    })
    return g
  }, [normalized])

  let rowNo = 0
  // No + ID + Full Name + Job Title + Roster + days + Action
  const fullColSpan = 6 + cal.daysInMonth

  const handleView = (row: PlanRosterDetailRow, department: string) => {
    setProfile({
      id: row.empNo,
      name: row.empName,
      position: row.jobTitle,
      email: nameToEmail(row.empName),
      supervisor: '', // tidak ada di dummy, dikosongkan saja
      department: cleanDept(department),
      employeeType: 'Non Staff', // default, karena tidak ada field employeeType di row
      photo_key: 'photo1',
    })
    setSelectedId(row.empNo)

    if (!hasDetail) setHasDetail(true)

    setTimeout(() => {
      anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }, 0)
  }

  return (
    <div>
      {/* Title + navigasi bulan */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <Title text2='WORKFORCE ROSTER DETAILS' style={{fontSize: 17}} className='mb-0' />
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

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            {/* HEADER UTAMA – cuma label kolom, tanpa tanggal & DOW di sini */}
            <tr className='fw-bold align-middle'>
              <th className='text-center' style={styles.thBlock}>
                No
              </th>
              <th className='text-start' style={styles.thBlock}>
                ID Number
              </th>
              <th className='text-start' style={styles.thBlock}>
                Full Name
              </th>
              <th className='text-start' style={styles.thBlock}>
                Job Title
              </th>
              <th className='text-center' style={styles.thBlock}>
                Roster
              </th>
              {cal.days.map((_, i) => (
                <th key={`h-${i}`} style={styles.thBlock}></th>
              ))}
              <th className='text-center' style={styles.thBlock}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(grouped).map(([deptCode, wgMap]) => {
              const firstWg = Object.values(wgMap)[0]
              const firstCrew = firstWg[Object.keys(firstWg)[0]]
              const deptName = firstCrew[0].department

              return (
                <React.Fragment key={deptCode}>
                  {/* Department header – satu baris, span seluruh kolom */}
                  <tr className='fw-bold'>
                    <td colSpan={fullColSpan} className='text-start' style={styles.thBlockPrimary}>
                      {deptName.toUpperCase()}
                    </td>
                  </tr>

                  {Object.entries(wgMap).map(([wg, crewMap]) => (
                    <React.Fragment key={wg}>
                      {/* Workgroup header */}
                      <tr>
                        <td
                          colSpan={fullColSpan}
                          className='text-start bg-light-success fw-semibold'
                          style={styles.thBlock}
                        >
                          {wg}
                        </td>
                      </tr>

                      {Object.entries(crewMap).map(([crew, rows]) => (
                        <React.Fragment key={crew}>
                          {/* Crew header (opsional) */}
                          {crew !== '_no_crew_' && (
                            <tr>
                              <td
                                colSpan={fullColSpan}
                                className='fw-semibold fst-italic bg-light-warning'
                                style={styles.thBlock}
                              >
                                {crew}
                              </td>
                            </tr>
                          )}

                          {/* Baris tanggal (1..n) – sejajar dengan Workgroup/Crew */}
                          <tr>
                            <td colSpan={5} style={styles.pad} />
                            {cal.days.map((d) => (
                              <td key={`d-${wg}-${crew}-${d}`} style={styles.thDay}>
                                {d}
                              </td>
                            ))}
                            <td style={styles.pad} />
                          </tr>

                          {/* Baris huruf hari (S/M/T/..) */}
                          <tr>
                            <td colSpan={5} style={styles.pad} />
                            {cal.dowLetters.map((l, i) => (
                              <td key={`dw-${wg}-${crew}-${i}`} style={styles.thDow}>
                                {l}
                              </td>
                            ))}
                            <td style={styles.pad} />
                          </tr>

                          {/* Baris karyawan */}
                          {rows.map((r) => (
                            <tr key={r.id} className='align-middle'>
                              <td className='text-center' style={styles.cell}>
                                {++rowNo}
                              </td>
                              <td className='text-start' style={styles.cell}>
                                <span className='fw-semibold'>{r.empNo}</span>
                              </td>
                              <td className='text-start' style={styles.cell}>
                                {r.empName}
                              </td>
                              <td className='text-start' style={styles.cell}>
                                {r.jobTitle}
                              </td>
                              <td className='text-center fw-semibold' style={styles.cell}>
                                {r.rosterPattern}
                              </td>

                              {r.days.map((code, i) => {
                                const st = INVERT.includes(code)
                                  ? {...styles.cell, ...styles.cellInvert}
                                  : styles.cell
                                return (
                                  <td key={`${r.id}-${i}`} style={st}>
                                    {code}
                                  </td>
                                )
                              })}

                              <td className='text-center' style={styles.cell}>
                                <button
                                  type='button'
                                  className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                                  title='View'
                                  aria-label='View'
                                  onClick={() => handleView(r, deptName)}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/general/gen004.svg'
                                    className='svg-icon-3'
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Anchor untuk scroll ke panel detail */}
      <div ref={anchorRef} />

      {/* Panel personal info recap */}
      <div className={hasDetail ? '' : 'd-none'}>
        <RecapInlinePersonalInfoPanel />
      </div>
    </div>
  )
}

export default ScheduleDetailsTab
