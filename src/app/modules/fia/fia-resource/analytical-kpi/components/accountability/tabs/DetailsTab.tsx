import React, {useRef, useState} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {
  accountabilityDetailBlocks,
  AccountabilityDetailBlock,
  AccountabilityDetailWorkgroup,
  AccountabilityDetailEmployee,
} from '../dummy/detailsDummy'
import {useAnalyticalFilters} from '../../../AnalyticalFilterContext'

// tambahkan: pakai ProfileContext & panel personal info recap
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'
import RecapInlinePersonalInfoPanel from '../../../../components/InlinePersonalInfoPanel'

const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'

const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

export const AccountabilityDetailsTab: React.FC = () => {
  const {filters} = useAnalyticalFilters()
  const {setProfile, setSelectedId} = useProfile()

  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const blocks: AccountabilityDetailBlock[] = accountabilityDetailBlocks
    .filter((b) => (filters.site ? b.siteBranch === filters.site : true))
    .filter((b) => (filters.department ? b.department === filters.department : true))
    .filter((b) => (filters.section ? b.section === filters.section : true))
    .filter((b) => (filters.element ? b.element === filters.element : true))

  const onView = (emp: AccountabilityDetailEmployee, department: string) => {
    setProfile({
      id: emp.idNumber,
      name: emp.fullName,
      position: emp.jobTitle,
      email: nameToEmail(emp.fullName),
      supervisor: '-', // di dummy accountability tidak ada field supervisor
      department: cleanDept(department),
      employeeType: emp.type,
      photo_key: 'photo1', // ganti kalau nanti kamu punya mapping foto
    })
    setSelectedId(emp.idNumber)

    if (!hasDetail) setHasDetail(true)

    setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
  }

  return (
    <div>
      <Title
        text2='EMPLOYEE ACCOUNTABILITY DETAILS - Month November 2025'
        style={{fontSize: '17px'}}
        className='mb-5'
      />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='bg-secondary fw-bold'>
            <tr>
              <th className='min-w-60px'>No</th>
              <th className='min-w-120px'>ID Number</th>
              <th className='min-w-220px'>Full Name</th>
              <th className='min-w-260px'>Job Title</th>
              <th className='min-w-80px'>Type</th>
              <th className='min-w-130px'>Discipline Date</th>
              <th className='min-w-140px'>Discipline Status</th>
              <th className='min-w-200px'>Reason for Absent</th>
              <th className='min-w-180px'>Action Taken</th>
              <th className='min-w-80px text-end'>Action</th>
            </tr>
          </thead>

          <tbody>
            {blocks.map((dept) => (
              <React.Fragment key={dept.departmentCode}>
                {/* Baris Department: "101 Operation Department" */}
                <tr className='fw-bold bg-light-primary'>
                  <td colSpan={10} className='text-start'>
                    {dept.departmentCode} {dept.department}
                  </td>
                </tr>

                {dept.workgroups.map((wg: AccountabilityDetailWorkgroup, idx) => (
                  <React.Fragment key={`${dept.departmentCode}-${wg.code}`}>
                    {/* Baris Workgroup: "1 10101-Operation Hauling Workgroup" */}
                    <tr className='fw-semibold bg-light-success'>
                      <td className='text-start'>{idx + 1}</td>
                      <td colSpan={9} className='text-start'>
                        {wg.code}-{wg.name}
                      </td>
                    </tr>

                    {/* Baris karyawan dalam workgroup */}
                    {wg.employees.map((e: AccountabilityDetailEmployee, i) => (
                      <tr key={`${wg.code}-${e.idNumber}`}>
                        <td className='text-center'>{i + 1}</td>
                        <td>{e.idNumber}</td>
                        <td className='fw-semibold'>{e.fullName}</td>
                        <td>{e.jobTitle}</td>
                        <td>{e.type}</td>
                        <td>{e.disciplineDate}</td>
                        <td>{e.disciplineStatus}</td>
                        <td>{e.reasonForAbsent}</td>
                        <td>{e.actionTaken}</td>
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
                <td colSpan={10} className='text-center text-muted py-8'>
                  No data found for current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* anchor untuk scroll ke panel detail */}
      <div ref={anchorRef} />

      {/* Panel personal info recap */}
      <div className={hasDetail ? '' : 'd-none'}>
        <RecapInlinePersonalInfoPanel />
      </div>
    </div>
  )
}

export default AccountabilityDetailsTab
