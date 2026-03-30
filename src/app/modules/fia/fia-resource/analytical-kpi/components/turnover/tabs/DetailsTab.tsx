import React, {useMemo, useRef, useState} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {
  turnoverDetailBlocks,
  TurnoverDetailEmployee,
  TurnoverDetailBlock,
  TurnoverCategory,
} from '../dummy/detailsDummy'
import {useAnalyticalFilters} from '../../../AnalyticalFilterContext'

// pakai ProfileContext yg sama seperti personal info / recap
import {useProfile} from '../../../../personal-info/components/ProfileContext'
// pakai panel personal info yang sudah kamu buat untuk recap
import RecapInlinePersonalInfoPanel from '../../../../components/InlinePersonalInfoPanel'

const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'

const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

export const TurnoverDetailsTab: React.FC = () => {
  const {filters} = useAnalyticalFilters()
  const {setProfile, setSelectedId} = useProfile()

  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  // ===== Filter dasar (site / department / section / element) =====
  const blocks: TurnoverDetailBlock[] = turnoverDetailBlocks
    .filter((b) => (filters.site ? b.siteBranch === filters.site : true))
    .filter((b) => (filters.department ? b.department === filters.department : true))
    .filter((b) => (filters.section ? b.section === filters.section : true))
    .filter((b) => (filters.element ? b.element === filters.element : true))

  // ===== Ambil semua karyawan setelah filter =====
  const allEmployees: TurnoverDetailEmployee[] = useMemo(
    () => blocks.flatMap((b) => b.workgroups.flatMap((wg) => wg.employees)),
    [blocks]
  )

  const countByCategory = (c: TurnoverCategory) =>
    allEmployees.filter((e) => e.category === c).length

  const totalClosing = countByCategory('Closing') || allEmployees.length

  const onView = (emp: TurnoverDetailEmployee, department: string) => {
    // isi profile global (dipakai GeneralInfo + sub-tab personal info)
    setProfile({
      id: emp.idNumber,
      name: emp.fullName,
      position: emp.jobTitle,
      email: nameToEmail(emp.fullName),
      supervisor: emp.supervisor,
      department: cleanDept(department),
      employeeType: emp.type,
      photo_key: 'photo1', // ganti kalau nanti ada mapping foto di dummy
    })
    setSelectedId(emp.idNumber)

    if (!hasDetail) setHasDetail(true)

    setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
  }

  return (
    <div>
      <Title
        text2='EMPLOYEE TURNOVER DETAILS - Month November 2025'
        style={{fontSize: '17px'}}
        className='mb-5'
      />

      {/* ===== Ringkasan di atas: Opening / Hire / Left / Closing ===== */}
      <div className='row g-3 mb-4'>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>OPENING BALANCE</div>
              <div className='text-muted small'>({countByCategory('Opening')} Employees)</div>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>EMPLOYEE HIRE</div>
              <div className='text-muted small'>({countByCategory('Hire')} Employees)</div>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>EMPLOYEE LEFT</div>
              <div className='text-muted small'>({countByCategory('Left')} Employees)</div>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className='card border h-100'>
            <div className='card-body py-3'>
              <div className='fw-bold'>CLOSING BALANCE</div>
              <div className='text-muted small'>({totalClosing} Employees)</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Tabel utama ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='bg-secondary fw-bold'>
            <tr>
              <th className='min-w-60px'>No</th>
              <th className='min-w-140px'>ID Number</th>
              <th className='min-w-230px'>Full Name</th>
              <th className='min-w-260px'>Job Title</th>
              <th className='min-w-80px'>Type</th>
              <th className='min-w-220px'>Supervisor</th>
              <th className='min-w-120px'>Hire Date</th>
              <th className='min-w-140px'>Termination Date</th>
              <th className='min-w-180px'>Work Location</th>
              <th className='min-w-30px '>Action</th>
            </tr>
          </thead>

          <tbody>
            {blocks.map((dept) => (
              <React.Fragment key={dept.departmentCode}>
                {/* Baris department (101 Operation Department) */}
                <tr className='fw-bold bg-light-primary'>
                  <td colSpan={10}>
                    {dept.departmentCode} {dept.department}
                  </td>
                </tr>

                {dept.workgroups.map((wg, idx) => (
                  <React.Fragment key={`${dept.departmentCode}-${wg.code}`}>
                    {/* Header workgroup (1 10101-Operation Hauling Workgroup) */}
                    <tr className='fw-semibold bg-light-success'>
                      <td>{idx + 1}</td>
                      <td colSpan={9}>
                        {wg.code}-{wg.name}
                      </td>
                    </tr>

                    {/* Data employee di dalam workgroup */}
                    {wg.employees.map((e, i) => (
                      <tr key={`${wg.code}-${e.idNumber}`}>
                        <td className='text-center'>{i + 1}</td>
                        <td>{e.idNumber}</td>
                        <td className='fw-semibold'>{e.fullName}</td>
                        <td>{e.jobTitle}</td>
                        <td>{e.type}</td>
                        <td>{e.supervisor}</td>
                        <td>{e.hireDate}</td>
                        <td>{e.terminationDate ?? '-'}</td>
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
                <td colSpan={10} className='text-center text-muted py-8'>
                  No data found for current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Anchor untuk scroll ke panel personal info */}
      <div ref={anchorRef} />

      {/* Panel personal info (pakai panel recap yang sama) */}
      <div className={hasDetail ? '' : 'd-none'}>
        <RecapInlinePersonalInfoPanel />
      </div>
    </div>
  )
}

export default TurnoverDetailsTab
