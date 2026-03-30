import React from 'react'
import {KTSVG} from '../../../../../../../../_metronic'
import {
  workforceRequestBlocks,
  WorkforceRequestBlock,
  WorkforceRequestWorkgroup,
  WorkforceRequest,
} from '../dummy/requestDummy'
import {useWorkforceFilters} from '../../../WorkforceFilterContext'

export const WorkforceRequestTab: React.FC = () => {
  const {filters} = useWorkforceFilters()

  const blocks: WorkforceRequestBlock[] = workforceRequestBlocks
    .filter((b) => (filters.site ? b.siteBranch === filters.site : true))
    .filter((b) => (filters.department ? b.department === filters.department : true))
    .filter((b) => (filters.section ? b.section === filters.section : true))
    .filter((b) => (filters.element ? b.element === filters.element : true))

  const onView = (req: WorkforceRequest) => console.log('VIEW', req)
  const onEdit = (req: WorkforceRequest) => console.log('EDIT/UPDATE', req)
  const onDelete = (req: WorkforceRequest) => console.log('DELETE', req)

  const handleAction = (code: string, req: WorkforceRequest) => {
    const c = code.trim().toUpperCase()
    if (c === 'V') return onView(req)
    if (c === 'U' || c === 'E') return onEdit(req)
    if (c === 'D') return onDelete(req)
  }

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
        <thead className='bg-secondary'>
          <tr className='fw-bold'>
            <th className='min-w-60px py-3'>No</th>
            <th className='min-w-150px py-3'>Request No</th>
            <th className='min-w-260px py-3'>Job Position</th>
            <th className='min-w-140px py-3'>Request Date</th>
            <th className='min-w-120px py-3'>No of Position</th>
            <th className='min-w-150px py-3'>Employment Type</th>
            <th className='min-w-180px py-3'>Work Location</th>
            <th className='min-w-160px py-3'>Status</th>
            <th className='min-w-110px text-end py-3'>Action</th>
          </tr>
        </thead>

        <tbody>
          {blocks.map((dept) => (
            <React.Fragment key={dept.departmentCode}>
              {/* Department header */}
              <tr className='bg-light-primary fw-semibold text-primary'>
                <td colSpan={9} className='text-start'>
                  {dept.department.toUpperCase()}
                </td>
              </tr>

              {dept.workgroups.map((wg: WorkforceRequestWorkgroup, idx) => (
                <React.Fragment key={`${dept.departmentCode}-${wg.code}`}>
                  {/* Workgroup header */}
                  <tr className='fw-semibold bg-light-success'>
                    <td className='text-start'>{idx + 1}</td>
                    <td colSpan={8} className='text-start'>
                      {wg.name}
                    </td>
                  </tr>

                  {/* Rows */}
                  {wg.requests.map((r: WorkforceRequest, i) => (
                    <tr key={`${wg.code}-${r.requestNo}`}>
                      <td className='text-center'>{i + 1}</td>
                      <td className='text-center'>{r.requestNo}</td>
                      <td>{r.jobPosition}</td>
                      <td className='text-center'>{r.requestDate}</td>
                      <td className='text-center'>{r.numberOfPosition}</td>
                      <td className='text-center'>{r.employmentType}</td>
                      <td>{r.workLocation}</td>
                      <td>{r.status}</td>
                      <td className='text-end'>
                        {r.actionCode.split('|').map((code, idx2) => {
                          const c = code.trim().toUpperCase()
                          if (!c) return null

                          if (c === 'V') {
                            return (
                              <button
                                key={idx2}
                                className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                                title='View'
                                aria-label='View'
                                onClick={() => handleAction(c, r)}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/general/gen004.svg'
                                  className='svg-icon-3'
                                />
                              </button>
                            )
                          }

                          if (c === 'U' || c === 'E') {
                            return (
                              <button
                                key={idx2}
                                className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                                title='Edit'
                                aria-label='Edit'
                                onClick={() => handleAction(c, r)}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/art/art005.svg'
                                  className='svg-icon-3'
                                />
                              </button>
                            )
                          }

                          if (c === 'D') {
                            return (
                              <button
                                key={idx2}
                                className='btn btn-sm btn-link btn-color-dark btn-active-color-danger'
                                title='Delete'
                                aria-label='Delete'
                                onClick={() => handleAction(c, r)}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/general/gen027.svg'
                                  className='svg-icon-3'
                                />
                              </button>
                            )
                          }

                          return null
                        })}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}

          {blocks.length === 0 && (
            <tr>
              <td colSpan={9} className='text-center text-muted py-8'>
                No data found for current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
