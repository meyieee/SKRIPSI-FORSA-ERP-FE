import React, {useMemo, useRef, useState} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {trainingDetailRows, TrainingDetailRow} from '../dummy/development/developmentDetailsDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

// context + panel inline yang sama dipakai recap
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'
import RecapInlinePersonalInfoPanel from '../../../../components/InlinePersonalInfoPanel'

const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'

const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

export const ServiceDevelopmentDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()
  const {setProfile, setSelectedId} = useProfile()

  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  // Filter dasar
  const rows = trainingDetailRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // Group: Department -> Workgroup
  const grouped = useMemo(() => {
    // Map deptKey -> rows
    const byDept = new Map<string, TrainingDetailRow[]>()
    rows.forEach((r) => {
      const k = `${r.departmentCode}||${r.department}`
      if (!byDept.has(k)) byDept.set(k, [])
      byDept.get(k)!.push(r)
    })

    // Dalam tiap dept, pecah lagi per workgroup
    return Array.from(byDept.entries()).map(([deptKey, deptRows]) => {
      const [departmentCode, department] = deptKey.split('||')
      const byWG = new Map<string, TrainingDetailRow[]>()
      deptRows.forEach((r) => {
        if (!byWG.has(r.workgroup)) byWG.set(r.workgroup, [])
        byWG.get(r.workgroup)!.push(r)
      })
      const workgroups = Array.from(byWG.entries()).map(([workgroup, items]) => ({
        workgroup,
        items,
      }))
      return {departmentCode, department, workgroups}
    })
  }, [rows])

  const handleView = (row: TrainingDetailRow, department: string) => {
    setProfile({
      id: row.empId, // pakai ID Number sebagai key
      name: row.fullName,
      position: row.jobTitle,
      email: nameToEmail(row.fullName),
      supervisor: '', // dummy (data training detail tidak punya supervisor)
      department: cleanDept(department),
      employeeType: row.employeeType,
      photo_key: 'photo1',
    })
    setSelectedId(row.empId)

    if (!hasDetail) setHasDetail(true)

    // scroll ke panel
    setTimeout(() => {
      anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }, 0)
  }

  return (
    <div>
      <Title text2='MANPOWER TRAINING DETAILS' style={{fontSize: '17px'}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary text-white'>
              <th className='min-w-60px'>No</th>
              <th className='min-w-140px'>ID Number</th>
              <th className='min-w-220px'>Full Name</th>
              <th className='min-w-220px'>Job Title</th>
              <th className='min-w-240px'>Training Title</th>
              <th className='min-w-140px'>Training Date</th>
              <th className='min-w-160px'>Status</th>
              <th className='min-w-200px'>Cost Center</th>
              <th className='min-w-90px text-end'>Action</th>
            </tr>
          </thead>

          <tbody>
            {grouped.length === 0 ? (
              <tr>
                <td colSpan={9} className='text-center text-muted py-8'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              grouped.map(({departmentCode, department, workgroups}) => (
                <React.Fragment key={departmentCode}>
                  {/* Header Department */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={9} className='text-start'>
                      {departmentCode} – {department}
                    </td>
                  </tr>

                  {/* Header Workgroup + rows */}
                  {workgroups.map(({workgroup, items}) => (
                    <React.Fragment key={workgroup}>
                      {/* Baris Workgroup (sebagai sub-header) */}
                      <tr className='fw-semibold bg-light-success'>
                        <td colSpan={9} className='text-start'>
                          {workgroup}
                        </td>
                      </tr>

                      {/* Data karyawan pada workgroup, nomor reset per WG */}
                      {items.map((r, i) => (
                        <tr key={r.id}>
                          <td className='text-center'>{i + 1}</td>
                          <td className='text-center'>{r.empId}</td>
                          <td>
                            <div className='fw-semibold'>{r.fullName}</div>
                            <div className='text-gray-600 small'>{r.employeeType}</div>
                          </td>
                          <td>{r.jobTitle}</td>
                          <td>{r.trainingTitle}</td>
                          <td className='text-center'>
                            {new Date(r.trainingDate).toLocaleDateString(undefined, {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                          <td className='text-center'>{r.status}</td>
                          <td className='text-center'>{r.costCenter}</td>
                          <td className='text-end'>
                            <button
                              type='button'
                              className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                              aria-label='View'
                              title='View'
                              onClick={() => handleView(r, department)}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Anchor scroll ke panel detail */}
      <div ref={anchorRef} />

      {/* Panel personal info recap inline */}
      <div className={hasDetail ? '' : 'd-none'}>
        <RecapInlinePersonalInfoPanel />
      </div>
    </div>
  )
}

export default ServiceDevelopmentDetailsTab
