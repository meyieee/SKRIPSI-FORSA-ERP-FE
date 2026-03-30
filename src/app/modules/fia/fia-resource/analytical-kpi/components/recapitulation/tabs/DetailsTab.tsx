// RecapitulationDetailsTab.tsx
import React, {useMemo, useRef, useState} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {recapDetailBlocks, RecapDetailEmployee} from '../dummy/detailsDummy'
import {useAnalyticalFilters} from '../../../AnalyticalFilterContext'

// pakai ProfileContext yg sama
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'
// pakai panel baru khusus recap
import RecapInlinePersonalInfoPanel from '../../../../components/InlinePersonalInfoPanel'

type EmpType = 'Staff' | 'Craft' | 'Expat'

const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'

const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

export const RecapitulationDetailsTab: React.FC = () => {
  const {filters} = useAnalyticalFilters()

  const {setProfile, setSelectedId} = useProfile()

  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const blocks = recapDetailBlocks
    .filter((b) => (filters.site ? b.siteBranch === filters.site : true))
    .filter((b) => (filters.department ? b.department === filters.department : true))
    .filter((b) => (filters.section ? b.section === filters.section : true))
    .filter((b) => (filters.element ? b.element === filters.element : true))

  const allEmployees: RecapDetailEmployee[] = useMemo(
    () => blocks.flatMap((b) => b.workgroups.flatMap((wg) => wg.employees)),
    [blocks]
  )

  const countBy = (t: EmpType) => allEmployees.filter((e) => e.type === t).length
  const total = allEmployees.length

  const onView = (emp: RecapDetailEmployee, department: string) => {
    setProfile({
      id: emp.idNumber,
      name: emp.fullName,
      position: emp.jobTitle,
      email: nameToEmail(emp.fullName),
      supervisor: emp.supervisor,
      department: cleanDept(department),
      employeeType: emp.type,
      photo_key: 'photo1', // sesuaikan kalau ada mapping photo
    })
    setSelectedId(emp.idNumber)

    if (!hasDetail) setHasDetail(true)

    setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
  }

  return (
    <div>
      <Title text2='EMPLOYEE RECAPITULATION DETAILS' style={{fontSize: '17px'}} className='mb-5' />

      {/* Ringkasan atas */}
      <div className='row g-3 mb-4'>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>STAFF</div>
              <div className='text-muted small'>({countBy('Staff')} Employees)</div>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>CRAFT</div>
              <div className='text-muted small'>({countBy('Craft')} Employees)</div>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>EXPAT</div>
              <div className='text-muted small'>({countBy('Expat')} Employees)</div>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>TOTAL</div>
              <div className='text-muted small'>({total} Employees)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='bg-secondary fw-bold'>
            <tr>
              <th className='min-w-60px'>No</th>
              <th className='min-w-140px'>ID Number</th>
              <th className='min-w-230px'>Full Name</th>
              <th className='min-w-260px'>Job Title</th>
              <th className='min-w-100px'>Type</th>
              <th className='min-w-220px'>Supervisor</th>
              <th className='min-w-140px'>Phone</th>
              <th className='min-w-180px'>Work Location</th>
              <th className='min-w-30px'>Action</th>
            </tr>
          </thead>

          <tbody>
            {blocks.map((dept) => (
              <React.Fragment key={dept.departmentCode}>
                <tr className='fw-bold bg-light-primary'>
                  <td colSpan={9} className='text-start'>
                    {dept.departmentCode} {dept.department}
                  </td>
                </tr>

                {dept.workgroups.map((wg, idx) => (
                  <React.Fragment key={`${dept.departmentCode}-${wg.code}`}>
                    <tr className='fw-semibold bg-light-success'>
                      <td className='text-start'>{idx + 1}</td>
                      <td colSpan={8} className='text-start'>
                        {wg.code}-{wg.name}
                      </td>
                    </tr>

                    {wg.employees.map((e, i) => (
                      <tr key={`${wg.code}-${e.idNumber}`}>
                        <td className='text-center'>{i + 1}</td>
                        <td className='text-center'>{e.idNumber}</td>
                        <td className='fw-semibold'>{e.fullName}</td>
                        <td>{e.jobTitle}</td>
                        <td className='text-center'>{e.type}</td>
                        <td>{e.supervisor}</td>
                        <td className='text-center'>{e.phone}</td>
                        <td>{e.workLocation}</td>
                        <td className='text-center'>
                          <button
                            className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                            title='View'
                            aria-label='View'
                            onClick={() => onView(e, dept.department)}
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

      {/* Anchor untuk scroll */}
      <div ref={anchorRef} />

      {/* Panel personal info recap */}
      <div className={hasDetail ? '' : 'd-none'}>
        <RecapInlinePersonalInfoPanel />
      </div>
    </div>
  )
}

export default RecapitulationDetailsTab
