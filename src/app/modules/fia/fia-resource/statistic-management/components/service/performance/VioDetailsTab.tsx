import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {
  violationDetailRows,
  ViolationDetailRow,
} from '../dummy/performance/performanceViolationDetailsDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

const sum = (rows: ViolationDetailRow[], pick: keyof ViolationDetailRow['att']) =>
  rows.reduce((a, b) => a + (b.att[pick] as number), 0)

const avg = (rows: ViolationDetailRow[], pick: 'available' | 'rawAvailable' | 'effective') =>
  rows.length ? (rows.reduce((a, b) => a + b.att[pick], 0) / rows.length).toFixed(1) : '0.0'

export const ServicePerformanceViolationDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  // 1) Filter rows sekali, memoized
  const filteredRows = useMemo(() => {
    return violationDetailRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.departmentName === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
    // .filter((r) => (filters.date ? r.date === filters.date : true)) // aktifkan jika ada kolom date
  }, [filters])

  // 2) Grouping berdasarkan hasil filter
  const grouped = useMemo(() => {
    const g: Record<string, Record<string, Record<string, ViolationDetailRow[]>>> = {}
    filteredRows.forEach((r) => {
      const d = r.departmentCode
      const w = r.workgroup
      const c = r.crew ?? '_no_crew_'
      g[d] ??= {}
      g[d][w] ??= {}
      g[d][w][c] ??= []
      g[d][w][c].push(r)
    })
    return g
  }, [filteredRows])

  // 3) Grand total berdasarkan hasil filter
  const grand = useMemo(() => {
    const rows = filteredRows
    return {
      present: sum(rows, 'present'),
      dayOff: sum(rows, 'dayOff'),
      leave: sum(rows, 'leave'),
      absent: sum(rows, 'absent'),
      sick: sum(rows, 'sick'),
      total: sum(rows, 'total'),
      available: avg(rows, 'available'),
      raw: avg(rows, 'rawAvailable'),
      eff: avg(rows, 'effective'),
    }
  }, [filteredRows])

  let rowNo = 0

  return (
    <div>
      <Title text2='WORKFORCE VIOLATION DETAILS' style={{fontSize: 17}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-50px text-center'>No</th>
              <th className='min-w-140px'>Employee</th>
              <th className='min-w-200px text-start'>Job Title</th>
              <th>Present</th>
              <th>Day Off</th>
              <th>Leave</th>
              <th>Absent</th>
              <th>Sick</th>
              <th>Total</th>
              <th>Available</th>
              <th>Raw Available</th>
              <th>Effective</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).map(([deptCode, wgMap]) => {
              // aman karena hanya dipanggil saat ada rows pada dept tsb
              const anyWg = Object.values(wgMap)[0]
              const firstCrewKey = Object.keys(anyWg)[0]
              const deptName = anyWg[firstCrewKey][0].departmentName

              return (
                <React.Fragment key={deptCode}>
                  {/* Department header */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={12}>{deptName.toUpperCase()}</td>
                  </tr>

                  {Object.entries(wgMap).map(([wg, crewMap]) => (
                    <React.Fragment key={wg}>
                      {/* Workgroup header */}
                      <tr className='fw-semibold bg-light-success'>
                        <td colSpan={12} className='text-start'>
                          {wg}
                        </td>
                      </tr>

                      {Object.entries(crewMap).map(([crew, rows]) => (
                        <React.Fragment key={crew}>
                          {crew !== '_no_crew_' && (
                            <tr>
                              <td colSpan={12} className='fw-semibold fst-italic bg-light-warning'>
                                {crew}
                              </td>
                            </tr>
                          )}

                          {rows.map((r) => (
                            <tr key={r.id} className='text-center'>
                              <td>{++rowNo}</td>
                              <td className='text-start'>
                                {r.empNo ? <div className='fw-semibold'>{r.empNo}</div> : null}
                                <div className='text-gray-800'>{r.empName}</div>
                              </td>
                              <td className='text-start'>{r.jobTitle}</td>
                              <td>{r.att.present}</td>
                              <td>{r.att.dayOff}</td>
                              <td>{r.att.leave}</td>
                              <td>{r.att.absent}</td>
                              <td>{r.att.sick}</td>
                              <td className='fw-semibold'>{r.att.total}</td>
                              <td>{r.att.available.toFixed(1)}</td>
                              <td>{r.att.rawAvailable.toFixed(1)}</td>
                              <td>{r.att.effective.toFixed(1)}</td>
                            </tr>
                          ))}

                          {/* Crew subtotal (jika ada crew) */}
                          {crew !== '_no_crew_' && (
                            <tr className='fw-semibold bg-light text-center'>
                              <td colSpan={3} className='text-end pe-2'>
                                {wg} - {crew} :
                              </td>
                              <td>{sum(rows, 'present')}</td>
                              <td>{sum(rows, 'dayOff')}</td>
                              <td>{sum(rows, 'leave')}</td>
                              <td>{sum(rows, 'absent')}</td>
                              <td>{sum(rows, 'sick')}</td>
                              <td>{sum(rows, 'total')}</td>
                              <td>{avg(rows, 'available')}</td>
                              <td>{avg(rows, 'rawAvailable')}</td>
                              <td>{avg(rows, 'effective')}</td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )
            })}

            {/* Fleet total (sesuai filter) */}
            <tr className='fw-bold bg-secondary text-center'>
              <td colSpan={3} className='text-end pe-2'>
                Fleet Total :
              </td>
              <td>{grand.present}</td>
              <td>{grand.dayOff}</td>
              <td>{grand.leave}</td>
              <td>{grand.absent}</td>
              <td>{grand.sick}</td>
              <td>{grand.total}</td>
              <td>{grand.available}</td>
              <td>{grand.raw}</td>
              <td>{grand.eff}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServicePerformanceViolationDetailsTab
