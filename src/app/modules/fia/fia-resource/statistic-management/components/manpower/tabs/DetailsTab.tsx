import React, {useMemo, useRef, useState} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {manpowerDetailsRows, ManpowerDetailRow} from '../dummy/detailsDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

// pakai ProfileContext yg sama
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'
// panel inline personal info yang sama
import RecapInlinePersonalInfoPanel from '../../../../components/InlinePersonalInfoPanel'

// helper kecil sama seperti di RecapitulationDetailsTab
const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'

const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

export const ManpowerDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const {setProfile, setSelectedId} = useProfile()
  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  // apply global filters
  const rows = manpowerDetailsRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.departmentName === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // group: Department -> Workgroup
  const grouped = useMemo(() => {
    const dept = new Map<string, ManpowerDetailRow[]>()
    rows.forEach((r) => {
      const key = `${r.departmentCode}—${r.departmentName}`
      if (!dept.has(key)) dept.set(key, [])
      dept.get(key)!.push(r)
    })
    // transform to array of {deptKey, itemsGroupedByWg}
    return Array.from(dept.entries()).map(([deptKey, deptItems]) => {
      const wg = new Map<string, ManpowerDetailRow[]>()
      deptItems.forEach((it) => {
        const wk = it.workgroup ?? '(No Workgroup)'
        if (!wg.has(wk)) wg.set(wk, [])
        wg.get(wk)!.push(it)
      })
      return {deptKey, workgroups: Array.from(wg.entries())}
    })
  }, [rows])

  const onView = (row: ManpowerDetailRow, deptName: string) => {
    // isi ProfileContext (disesuaikan dengan field yang ada di dummy ini)
    setProfile({
      id: row.empId,
      name: row.fullName,
      position: row.jobTitle || row.positionTitle,
      email: nameToEmail(row.fullName),
      supervisor: '', // kalau di dummy-ga ada, nggak masalah
      department: cleanDept(deptName),
      employeeType: row.employeeType,
      photo_key: 'photo1',
    })
    setSelectedId(row.empId)

    if (!hasDetail) setHasDetail(true)

    // scroll ke panel
    setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
  }

  const onEdit = (id: string) => console.log('Edit', id)

  return (
    <div>
      <Title text2='CURRENT MANPOWER DETAILS' style={{fontSize: '17px'}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle text-white'>
              <th>No</th>
              <th>ID Number</th>
              <th>Full Name</th>
              <th>Employee Type</th>
              <th>Job Level Description</th>
              <th>Job Level</th>
              <th>Job Title</th>
              <th>Position Title</th>
              <th>Cost Center</th>
              <th className='text-end'>Action</th>
            </tr>
          </thead>

          <tbody>
            {grouped.length === 0 ? (
              <tr>
                <td colSpan={10} className='text-center text-muted py-8'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              grouped.map(({deptKey, workgroups}) => {
                const [deptCode, deptName] = deptKey.split('—')
                return (
                  <React.Fragment key={deptKey}>
                    {/* Department header */}
                    <tr className='fw-bold bg-light-primary text-primary'>
                      <td colSpan={10}>
                        {deptCode} – {deptName}
                      </td>
                    </tr>

                    {workgroups.map(([wgName, items]) => (
                      <React.Fragment key={wgName}>
                        {/* Workgroup header */}
                        <tr className='fw-semibold bg-light-success'>
                          <td colSpan={10} className='text-start'>
                            {wgName}
                          </td>
                        </tr>

                        {items.map((r, idx) => (
                          <tr key={r.id} className='text-center'>
                            <td>{idx + 1}</td>
                            <td>{r.empId}</td>
                            <td className='text-start'>{r.fullName}</td>
                            <td>{r.employeeType}</td>
                            <td>{r.jobLevelDesc}</td>
                            <td>{r.jobLevel}</td>
                            <td>{r.jobTitle}</td>
                            <td>{r.positionTitle}</td>
                            <td>{r.costCenter}</td>

                            {/* ACTION: icons 1 baris, rata kanan */}
                            <td className='text-end'>
                              <div className='d-inline-flex align-items-center'>
                                {/* View → buka inline personal info */}
                                <button
                                  type='button'
                                  className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                                  title='View'
                                  aria-label='View'
                                  onClick={() => onView(r, deptName)}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/general/gen004.svg'
                                    className='svg-icon-3'
                                  />
                                </button>

                                {/* Edit (tetap seperti semula) */}
                                <button
                                  type='button'
                                  className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                                  title='Edit'
                                  aria-label='Edit'
                                  onClick={() => onEdit(String(r.id))}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/art/art005.svg'
                                    className='svg-icon-3'
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Anchor scroll ke panel detail */}
      <div ref={anchorRef} />

      {/* Panel personal info inline (hidden sebelum ada View pertama) */}
      <div className={hasDetail ? '' : 'd-none'}>
        <RecapInlinePersonalInfoPanel />
      </div>
    </div>
  )
}

export default ManpowerDetailsTab
