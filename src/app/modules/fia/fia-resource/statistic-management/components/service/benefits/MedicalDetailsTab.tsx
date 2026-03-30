import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {medicalDetailRows} from '../dummy/benefit/benefitsMedicalDetailsDummy'
import {KTSVG} from '../../../../../../../../_metronic'
import {useStatisticFilters} from '../../../StatisticFilterContext'

type RowT = typeof medicalDetailRows[number]

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

export const ServiceBenefitsMedicalDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  // 1) Filter sekali
  const filteredRows = useMemo(
    () =>
      medicalDetailRows
        .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
        .filter((r) => (filters.department ? r.departmentName === filters.department : true))
        .filter((r) => (filters.section ? r.section === filters.section : true))
        .filter((r) => (filters.element ? r.element === filters.element : true)),
    [filters]
  )

  // 2) Group Dept -> Workgroup -> Crew
  const grouped = useMemo(() => {
    const g: Record<string, Record<string, Record<string, RowT[]>>> = {}

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

  let rowNo = 0

  return (
    <div>
      <Title text2='WORKFORCE MEDICAL DETAILS' style={{fontSize: 17}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-40px'>No</th>
              <th className='min-w-240px text-start'>Employee</th>
              <th className='min-w-220px text-start'>Job Title</th>
              <th className='min-w-160px'>Request Purpose</th>
              <th className='min-w-110px'>No of Person</th>
              <th className='min-w-130px'>Departure</th>
              <th className='min-w-130px'>Return</th>
              <th className='min-w-110px'>No of Days</th>
              <th className='min-w-150px'>Return to Work</th>
              <th className='min-w-140px'>Request Date</th>
              <th className='min-w-90px text-end'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).map(([deptKey, wgMap]) => {
              const [, deptName] = deptKey.split('||')

              return (
                <React.Fragment key={deptKey}>
                  {/* Department header */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={11}>{deptName.toUpperCase()}</td>
                  </tr>

                  {Object.entries(wgMap).map(([wg, crewMap]) => (
                    <React.Fragment key={wg}>
                      {/* Workgroup header */}
                      <tr className='fw-semibold bg-light-success'>
                        <td colSpan={11} className='text-start'>
                          {wg}
                        </td>
                      </tr>

                      {Object.entries(crewMap).map(([crew, rows]) => (
                        <React.Fragment key={crew}>
                          {/* Crew header (opsional) */}
                          {crew !== '_no_crew_' && (
                            <tr>
                              <td
                                colSpan={11}
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
                              <td>{r.requestPurpose}</td>
                              <td>{r.noOfPerson}</td>
                              <td>{fmt(r.departure)}</td>
                              <td>{fmt(r.returnDate)}</td>
                              <td>{r.noOfDays}</td>
                              <td>{fmt(r.returnToWork)}</td>
                              <td>{fmt(r.requestDate)}</td>
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

export default ServiceBenefitsMedicalDetailsTab
