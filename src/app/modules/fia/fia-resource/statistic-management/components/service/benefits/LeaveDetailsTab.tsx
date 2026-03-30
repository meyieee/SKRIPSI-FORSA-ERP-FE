import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {leaveTravelDetailRows} from '../dummy/benefit/benefitsLeaveDetailsDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

type LeaveRow = typeof leaveTravelDetailRows[number]

// helper sum & avg
const sum = (rows: LeaveRow[], key: keyof LeaveRow) =>
  rows.reduce((a, b) => a + (b[key] as unknown as number), 0)

const avg = (rows: LeaveRow[], key: 'available' | 'rawAvailable' | 'effective') =>
  rows.length ? (rows.reduce((a, b) => a + (b[key] as number), 0) / rows.length).toFixed(1) : '0.0'

export const ServiceBenefitsLeaveDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  // 1) Filter sekali, memoized
  const filteredRows = useMemo(() => {
    return leaveTravelDetailRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.departmentName === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
  }, [filters])

  // 2) Group Dept -> Workgroup -> Crew
  const grouped = useMemo(() => {
    const g: Record<string, Record<string, Record<string, LeaveRow[]>>> = {}

    filteredRows.forEach((r) => {
      const d = `${r.departmentCode}||${r.departmentName}`
      const w = r.workgroup
      const c = r.crew ?? '_no_crew_'

      g[d] ??= {}
      g[d][w] ??= {}
      g[d][w][c] ??= []
      g[d][w][c].push(r)
    })

    return g
  }, [filteredRows])

  // 3) Fleet total (berdasarkan rows yang sudah difilter)
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
      <Title text2='WORKFORCE LEAVE AND TRAVEL DETAILS' style={{fontSize: 17}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-50px text-center'>No</th>
              <th className='text-start min-w-160px'>Employee</th>
              <th className='text-start min-w-200px'>Job Title</th>
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
            {Object.entries(grouped).map(([deptKey, wgMap]) => {
              const [, deptName] = deptKey.split('||')

              return (
                <React.Fragment key={deptKey}>
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
                          {/* Crew header (opsional) */}
                          {crew !== '_no_crew_' && (
                            <tr>
                              <td
                                colSpan={12}
                                className='fw-semibold fst-italic bg-light-warning text-start'
                              >
                                {crew}
                              </td>
                            </tr>
                          )}

                          {/* Detail karyawan */}
                          {rows.map((r) => (
                            <tr key={r.id} className='text-center'>
                              <td>{++rowNo}</td>
                              <td className='text-start'>
                                {r.empNo && <div className='fw-semibold'>{r.empNo}</div>}
                                <div className='text-gray-800'>{r.fullName}</div>
                              </td>
                              <td className='text-start'>{r.jobTitle}</td>
                              <td>{r.present}</td>
                              <td>{r.dayOff}</td>
                              <td>{r.leave}</td>
                              <td>{r.absent}</td>
                              <td>{r.sick}</td>
                              <td className='fw-semibold'>{r.total}</td>
                              <td>{r.available.toFixed(1)}</td>
                              <td>{r.rawAvailable.toFixed(1)}</td>
                              <td>{r.effective.toFixed(1)}</td>
                            </tr>
                          ))}

                          {/* Subtotal per crew (kalau crew ada) */}
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

            {/* Fleet Total (sesuai filter) */}
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

export default ServiceBenefitsLeaveDetailsTab
