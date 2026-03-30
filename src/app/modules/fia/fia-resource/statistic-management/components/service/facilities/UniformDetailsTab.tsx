import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {uniformPpeRows} from '../dummy/facilities/facilitiesUniformDetailsDummy'
import {KTSVG} from '../../../../../../../../_metronic'
import {useStatisticFilters} from '../../../StatisticFilterContext'

export const ServiceFacilitiesUniformDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = uniformPpeRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.departmentName === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  type RowT = typeof rows[number]

  // group -> departmentName -> workgroup -> crew
  const groups = useMemo(() => {
    const byDept = new Map<string, RowT[]>()

    rows.forEach((r) => {
      const key = r.departmentName // ⬅️ pakai nama departemen
      if (!byDept.has(key)) byDept.set(key, [])
      byDept.get(key)!.push(r)
    })

    return byDept
  }, [rows])

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

  return (
    <div>
      <Title
        text2='WORKFORCE UNIFORM & PERSONAL PROTECTIVE EQUIPMENT DETAILS'
        style={{fontSize: 17}}
        className='mb-5'
      />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary'>
              <th style={{width: 60}}>No</th>
              <th>Employee</th>
              <th>Job Title</th>
              <th>Request No</th>
              <th>Stockcode</th>
              <th>Stock Description</th>
              <th>Cons Type</th>
              <th style={{width: 90}}>Quantity</th>
              <th style={{width: 150}}>Received Date</th>
              <th style={{width: 90}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className='text-center text-muted py-8'>
                  No data found for current filters.
                </td>
              </tr>
            )}

            {Array.from(groups.entries()).map(([deptName, deptRows]) => {
              // group by workgroup di dalam department
              const byWG = new Map<string, RowT[]>()
              deptRows.forEach((r) => {
                const key = r.workgroup || '(No Workgroup)'
                if (!byWG.has(key)) byWG.set(key, [])
                byWG.get(key)!.push(r)
              })

              return (
                <React.Fragment key={deptName}>
                  {/* HEADER DEPARTMENT */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={10}>{deptName.toUpperCase()}</td>
                  </tr>

                  {Array.from(byWG.entries()).map(([wg, wgRows]) => {
                    // group by crew di dalam workgroup
                    const byCrew = new Map<string, RowT[]>()
                    wgRows.forEach((r) => {
                      const key = r.crew ?? '_NO_CREW_'
                      if (!byCrew.has(key)) byCrew.set(key, [])
                      byCrew.get(key)!.push(r)
                    })

                    return (
                      <React.Fragment key={wg}>
                        {/* HEADER WORKGROUP */}
                        <tr className='fw-semibold bg-light-success'>
                          <td colSpan={10} className='text-start'>
                            {wg}
                          </td>
                        </tr>

                        {Array.from(byCrew.entries()).map(([crewKey, cRows]) => (
                          <React.Fragment key={crewKey}>
                            {/* HEADER CREW (opsional) */}
                            {crewKey !== '_NO_CREW_' && (
                              <tr>
                                <td
                                  colSpan={10}
                                  className='ps-5 fst-italic bg-light-warning fw-semibold'
                                >
                                  {crewKey}
                                </td>
                              </tr>
                            )}

                            {/* DATA ROWS (tidak diubah struktur datanya) */}
                            {cRows.map((r) => (
                              <tr key={r.id} className='text-center'>
                                <td>{r.no}</td>
                                <td className='text-start'>
                                  <div className='fw-semibold'>
                                    {r.employeeId} &nbsp; {r.employeeName}
                                  </div>
                                </td>
                                <td className='text-start'>{r.jobTitle}</td>
                                <td>{r.requestNo}</td>
                                <td>{r.stockCode}</td>
                                <td className='text-start'>{r.stockDesc}</td>
                                <td>{r.consType}</td>
                                <td>{r.qty}</td>
                                <td>{formatDate(r.receivedDate)}</td>
                                <td className='text-end'>
                                  <button
                                    type='button'
                                    className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                                    title='View'
                                    aria-label='View'
                                  >
                                    <KTSVG
                                      path='/media/icons/duotune/general/gen004.svg'
                                      className='svg-icon-3'
                                    />
                                  </button>
                                  <button
                                    type='button'
                                    className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                                    title='Edit'
                                    aria-label='Edit'
                                  >
                                    <KTSVG
                                      path='/media/icons/duotune/art/art005.svg'
                                      className='svg-icon-3'
                                    />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServiceFacilitiesUniformDetailsTab
