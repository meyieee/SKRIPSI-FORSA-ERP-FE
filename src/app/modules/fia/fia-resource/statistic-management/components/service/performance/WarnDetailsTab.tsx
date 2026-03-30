import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {
  warningDetailRows,
  WarningDetailRow,
} from '../dummy/performance/performanceWarningDetailsDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

const sum = (rows: WarningDetailRow[], key: keyof WarningDetailRow['stat']) =>
  rows.reduce((a, b) => a + (b.stat[key] as number), 0)

export const ServicePerformanceWarningDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  // 1) Filter data sekali (ikut filter global)
  const filteredRows = useMemo(() => {
    return warningDetailRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.departmentName === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
    // .filter((r) => (filters.date ? r.date === filters.date : true)) // aktifkan bila ada kolom date
  }, [filters])

  // 2) Group: dept -> workgroup -> crew (berdasarkan hasil filter)
  const grouped = useMemo(() => {
    const g: Record<string, Record<string, Record<string, WarningDetailRow[]>>> = {}
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

  // 3) Grand total (berdasarkan hasil filter)
  const grand = useMemo(() => {
    const rows = filteredRows
    return {
      verbal: sum(rows, 'verbal'),
      warn1: sum(rows, 'warn1'),
      warn2: sum(rows, 'warn2'),
      warn3: sum(rows, 'warn3'),
      suspension: sum(rows, 'suspension'),
      termination: sum(rows, 'termination'),
    }
  }, [filteredRows])

  let rowNo = 0

  return (
    <div>
      <Title text2='WORKFORCE WARNING DETAILS' style={{fontSize: 17}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary text-center'>
              <th className='min-w-50px'>No</th>
              <th className='min-w-160px text-start'>Employee</th>
              <th className='min-w-220px text-start'>Job Title</th>
              <th>Verbal Warning</th>
              <th>Warning 1</th>
              <th>Warning 2</th>
              <th>Warning 3</th>
              <th>Suspension</th>
              <th>Termination</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).map(([deptCode, wgMap]) => {
              const anyWg = Object.values(wgMap)[0]
              const firstCrewKey = Object.keys(anyWg)[0]
              const deptName = anyWg[firstCrewKey][0].departmentName

              return (
                <React.Fragment key={deptCode}>
                  {/* Department header */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={9}>{deptName}</td>
                  </tr>

                  {Object.entries(wgMap).map(([wg, crewMap]) => (
                    <React.Fragment key={wg}>
                      {/* Workgroup header */}
                      <tr className='fw-semibold bg-light-success'>
                        <td colSpan={9} className='text-start'>
                          {wg}
                        </td>
                      </tr>

                      {Object.entries(crewMap).map(([crew, rows]) => (
                        <React.Fragment key={crew}>
                          {crew !== '_no_crew_' && (
                            <tr>
                              <td colSpan={9} className='fw-semibold fst-italic bg-light-warning'>
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
                              <td>{r.stat.verbal}</td>
                              <td>{r.stat.warn1}</td>
                              <td>{r.stat.warn2}</td>
                              <td>{r.stat.warn3}</td>
                              <td>{r.stat.suspension}</td>
                              <td>{r.stat.termination}</td>
                            </tr>
                          ))}

                          {/* Crew subtotal */}
                          {crew !== '_no_crew_' && (
                            <tr className='fw-semibold bg-light text-center'>
                              <td colSpan={3} className='text-end pe-2'>
                                {wg} - {crew} :
                              </td>
                              <td>{sum(rows, 'verbal')}</td>
                              <td>{sum(rows, 'warn1')}</td>
                              <td>{sum(rows, 'warn2')}</td>
                              <td>{sum(rows, 'warn3')}</td>
                              <td>{sum(rows, 'suspension')}</td>
                              <td>{sum(rows, 'termination')}</td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )
            })}

            {/* Fleet total (ikut filter global) */}
            <tr className='fw-bold bg-secondary text-center'>
              <td colSpan={3} className='text-end pe-2'>
                Fleet Total :
              </td>
              <td>{grand.verbal}</td>
              <td>{grand.warn1}</td>
              <td>{grand.warn2}</td>
              <td>{grand.warn3}</td>
              <td>{grand.suspension}</td>
              <td>{grand.termination}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServicePerformanceWarningDetailsTab
