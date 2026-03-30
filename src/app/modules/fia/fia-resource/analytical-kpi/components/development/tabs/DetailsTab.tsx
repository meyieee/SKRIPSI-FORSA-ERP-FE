import React, {useMemo, useRef, useState} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {
  trainingAppraisalDetailBlocks,
  TrainingAppraisalDetailBlock,
  TrainingAppraisalDetailEmployee,
} from '../dummy/detailsDummy'
import {useAnalyticalFilters} from '../../../AnalyticalFilterContext'

// tambahkan ini: pakai ProfileContext & panel personal info
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'
import RecapInlinePersonalInfoPanel from '../../../../components/InlinePersonalInfoPanel'

type SummaryKey = 'trainingSchedule' | 'trainingActual' | 'appraisalSchedule' | 'appraisalActual'

// helper sama seperti recap/turnover
const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'

const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

export const DevelopmentDetailsTab: React.FC = () => {
  const {filters} = useAnalyticalFilters()
  const {setProfile, setSelectedId} = useProfile()

  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  // filter basic
  const blocks: TrainingAppraisalDetailBlock[] = trainingAppraisalDetailBlocks
    .filter((b) => (filters.site ? b.siteBranch === filters.site : true))
    .filter((b) => (filters.department ? b.department === filters.department : true))
    .filter((b) => (filters.section ? b.section === filters.section : true))
    .filter((b) => (filters.element ? b.element === filters.element : true))

  // flatten for summary
  const allEmployees: TrainingAppraisalDetailEmployee[] = useMemo(
    () => blocks.flatMap((b) => b.workgroups.flatMap((wg) => wg.employees)),
    [blocks]
  )

  const countBy = (key: SummaryKey) => allEmployees.filter((e) => e[key]).length

  const onView = (emp: TrainingAppraisalDetailEmployee, department: string) => {
    // isi profile global, biar GeneralInfo + tab-tab personal info bisa baca
    setProfile({
      id: emp.idNumber,
      name: emp.fullName,
      position: emp.jobTitle,
      email: nameToEmail(emp.fullName),
      supervisor: emp.appraiser || '-', // di file ini tidak ada field supervisor, jadi pakai appraiser
      department: cleanDept(department),
      employeeType: emp.type,
      photo_key: 'photo1', // sesuaikan kalau nanti ada mapping photo di dummy
    })
    setSelectedId(emp.idNumber)

    if (!hasDetail) setHasDetail(true)

    setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
  }

  return (
    <div>
      <Title
        text2='EMPLOYEE TRAINING DETAILS - Month November 2025 | EMPLOYEE APPRAISAL DETAILS - Month November 2025'
        style={{fontSize: '17px'}}
        className='mb-5'
      />

      {/* ===== Summary cards (Training / Appraisal) ===== */}
      <div className='row g-3 mb-4'>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>TRAINING SCHEDULE</div>
              <div className='text-muted small'>({countBy('trainingSchedule')} Employees)</div>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>TRAINING ACTUAL</div>
              <div className='text-muted small'>({countBy('trainingActual')} Employees)</div>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>APPRAISAL SCHEDULE</div>
              <div className='text-muted small'>({countBy('appraisalSchedule')} Employees)</div>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>APPRAISAL ACTUAL</div>
              <div className='text-muted small'>({countBy('appraisalActual')} Employees)</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='bg-secondary fw-bold'>
            <tr>
              <th className='min-w-60px'>No</th>
              <th className='min-w-120px'>ID Number</th>
              <th className='min-w-220px'>Full Name</th>
              <th className='min-w-260px'>Job Title</th>
              <th className='min-w-80px'>Type</th>
              <th className='min-w-120px'>Appraisal Date</th>
              <th className='min-w-180px'>Appraisal Reason</th>
              <th className='min-w-120px'>Last Date</th>
              <th className='min-w-140px'>Schedule Date</th>
              <th className='min-w-200px'>Appraiser</th>
              <th className='min-w-80px text-end'>Action</th>
            </tr>
          </thead>

          <tbody>
            {blocks.map((dept) => (
              <React.Fragment key={dept.departmentCode}>
                {/* Department header (101 Operation Department) */}
                <tr className='fw-bold bg-light-primary'>
                  <td colSpan={11}>
                    {dept.departmentCode} {dept.department}
                  </td>
                </tr>

                {dept.workgroups.map((wg, idx) => (
                  <React.Fragment key={`${dept.departmentCode}-${wg.code}`}>
                    {/* Workgroup header (1 10101-Operation Hauling Workgroup) */}
                    <tr className='fw-semibold bg-light-success'>
                      <td>{idx + 1}</td>
                      <td colSpan={10}>
                        {wg.code}-{wg.name}
                      </td>
                    </tr>

                    {/* Employee rows */}
                    {wg.employees.map((e, i) => (
                      <tr key={`${wg.code}-${e.idNumber}`}>
                        <td className='text-center'>{i + 1}</td>
                        <td>{e.idNumber}</td>
                        <td className='fw-semibold'>{e.fullName}</td>
                        <td>{e.jobTitle}</td>
                        <td>{e.type}</td>
                        <td>{e.appraisalDate}</td>
                        <td>{e.appraisalReason}</td>
                        <td>{e.lastDate}</td>
                        <td>{e.scheduleDate}</td>
                        <td>{e.appraiser}</td>
                        <td className='text-end'>
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
                <td colSpan={11} className=' text-muted py-8'>
                  No data found for current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Anchor untuk scroll ke panel */}
      <div ref={anchorRef} />

      {/* Panel personal info */}
      <div className={hasDetail ? '' : 'd-none'}>
        <RecapInlinePersonalInfoPanel />
      </div>
    </div>
  )
}

export default DevelopmentDetailsTab
