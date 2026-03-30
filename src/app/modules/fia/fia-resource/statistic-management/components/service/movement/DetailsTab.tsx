import React, {useMemo, useRef, useState} from 'react'
import {KTSVG} from '../../../../../../../../_metronic'
import {movementDetailsRows} from '../dummy/movement/movementDetailsDummy'
import Title from '../../../../my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'

// pakai ProfileContext yg sama
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'
// pakai panel inline yang sama
import RecapInlinePersonalInfoPanel from '../../../../components/InlinePersonalInfoPanel'

const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'

const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

export const ServiceMovementDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()
  const {setProfile, setSelectedId} = useProfile()

  // state untuk munculin panel detail
  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  // Apply filters from context
  const rows = movementDetailsRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  /**
   * Grouping structure:
   * Department -> Workgroup -> items
   */
  const grouped = useMemo(() => {
    // Dept level
    const deptMap = new Map<string, typeof rows>()
    rows.forEach((r) => {
      const deptKey = `${r.departmentCode}—${r.department}`
      if (!deptMap.has(deptKey)) deptMap.set(deptKey, [])
      deptMap.get(deptKey)!.push(r)
    })

    // For each dept, build workgroup buckets
    return Array.from(deptMap.entries()).map(([deptKey, items]) => {
      const wgMap = new Map<string, typeof items>()
      items.forEach((it) => {
        const wgKey = it.workgroup || '—'
        if (!wgMap.has(wgKey)) wgMap.set(wgKey, [])
        wgMap.get(wgKey)!.push(it)
      })
      return {deptKey, workgroups: Array.from(wgMap.entries())}
    })
  }, [rows])

  const handleView = (row: typeof movementDetailsRows[number], deptName: string) => {
    setProfile({
      id: row.idNumber,
      name: row.fullName,
      position: row.jobTitle,
      email: nameToEmail(row.fullName),
      supervisor: '', // dummy, karena dummy movement tidak punya field supervisor
      department: cleanDept(deptName),
      employeeType: row.employeeType,
      photo_key: 'photo1',
    })
    setSelectedId(row.idNumber)

    if (!hasDetail) setHasDetail(true)

    // scroll ke panel
    setTimeout(() => {
      anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }, 0)
  }

  const handleEdit = (id: string) => console.log('Edit', id)

  return (
    <div>
      <Title text2='MANPOWER MOVEMENT DETAILS' style={{fontSize: '17px'}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='bg-secondary fw-bold'>
            <tr>
              <th className='min-w-40px'>No</th>
              <th className='min-w-120px'>ID Number</th>
              <th className='min-w-220px'>Full Name</th>
              <th className='min-w-130px'>Employee Type</th>
              <th className='min-w-260px'>Job Title</th>
              <th className='min-w-90px'>Type</th>
              <th className='min-w-140px'>Hire/Left Date</th>
              <th className='min-w-200px'>Cost Center</th>
              <th className='min-w-90px text-end'>Action</th>
            </tr>
          </thead>

          <tbody>
            {grouped.length === 0 ? (
              <tr>
                <td colSpan={9} className='text-center py-10'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              grouped.map(({deptKey, workgroups}) => {
                const [deptCode, deptName] = deptKey.split('—')

                return (
                  <React.Fragment key={deptKey}>
                    {/* Department header bar */}
                    <tr className='fw-bold bg-light-primary'>
                      <td colSpan={9} className='text-start'>
                        {deptCode} – {deptName}
                      </td>
                    </tr>

                    {workgroups.map(([wgName, items]) => {
                      // reset number per workgroup like the screenshot
                      let counter = 1
                      return (
                        <React.Fragment key={`${deptKey}-${wgName}`}>
                          {/* Workgroup header row (light background) */}
                          <tr className='fw-semibold bg-light-success'>
                            <td colSpan={9} className='text-start'>
                              {wgName}
                            </td>
                          </tr>

                          {items.map((r) => (
                            <tr key={r.positionNo}>
                              <td className='text-center'>{counter++}</td>
                              <td className='text-center'>{r.idNumber}</td>
                              <td className='text-start'>{r.fullName}</td>
                              <td className='text-center'>{r.employeeType}</td>
                              <td className='text-start'>{r.jobTitle}</td>
                              <td className='text-center'>{r.type}</td>
                              <td className='text-center'>{r.hireLeftDate}</td>
                              <td className='text-start'>{r.costCenter}</td>
                              <td className='text-end'>
                                {/* View = magnifier */}
                                <button
                                  type='button'
                                  className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                                  title='View'
                                  aria-label='View'
                                  onClick={() => handleView(r, deptName)}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/general/gen004.svg'
                                    className='svg-icon-3'
                                  />
                                </button>

                                {/* Edit = pencil */}
                                <button
                                  type='button'
                                  className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                                  title='Edit'
                                  aria-label='Edit'
                                  onClick={() => handleEdit(r.positionNo)}
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
                      )
                    })}
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Anchor untuk scroll ke panel info */}
      <div ref={anchorRef} />

      {/* Panel personal info recap (inline) */}
      <div className={hasDetail ? '' : 'd-none'}>
        <RecapInlinePersonalInfoPanel />
      </div>
    </div>
  )
}

export default ServiceMovementDetailsTab
