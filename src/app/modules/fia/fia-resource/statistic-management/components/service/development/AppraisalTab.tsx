import React, {useMemo, useRef, useState} from 'react'
import {Form, Row, Col} from 'react-bootstrap'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {
  appraisalDetailRows,
  AppraisalDetailRow,
} from '../dummy/development/developmentAppraisalDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

// pakai context & panel inline yang sama dengan recap details
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'
import RecapInlinePersonalInfoPanel from '../../../../components/InlinePersonalInfoPanel'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'

const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

export const ServiceDevelopmentAppraisalTab: React.FC = () => {
  const {filters} = useStatisticFilters()
  const {setProfile, setSelectedId} = useProfile()

  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  const rows = appraisalDetailRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // ==== Group: Department -> Workgroup ====
  const grouped = useMemo(() => {
    // deptKey = "code||name"
    const byDept = new Map<string, AppraisalDetailRow[]>()
    rows.forEach((r) => {
      const key = `${r.departmentCode}||${r.department}`
      if (!byDept.has(key)) byDept.set(key, [])
      byDept.get(key)!.push(r)
    })

    return Array.from(byDept.entries()).map(([deptKey, deptRows]) => {
      const [departmentCode, department] = deptKey.split('||')

      // pecah lagi per workgroup
      const byWG = new Map<string, AppraisalDetailRow[]>()
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

  const handleView = (row: AppraisalDetailRow, department: string) => {
    setProfile({
      id: row.empId,
      name: row.fullName,
      position: row.jobTitle,
      email: nameToEmail(row.fullName),
      supervisor: row.appraiser ?? '',
      department: cleanDept(department),
      employeeType: row.employeeType,
      photo_key: 'photo1',
    })
    setSelectedId(row.empId)

    if (!hasDetail) setHasDetail(true)

    setTimeout(() => {
      anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }, 0)
  }

  return (
    <div>
      <Title text2='PERFORMANCE APPRAISAL DETAILS' style={{fontSize: '17px'}} className='mb-5' />

      {/* ===== Date Filter (Start/End di kanan) ===== */}
      <div className='mb-3 p-1 border rounded'>
        <Row className='g-3 align-items-end justify-content-between'>
          <Col xs={12} md className='d-flex justify-content-start'>
            <h3 className='mb-0 p-8'>Performance Appraisal History Details</h3>
          </Col>
          <Col xs='auto' className='d-flex gap-3'>
            <div>
              <Form.Label className='fw-semibold me-2 d-block'>Start Date</Form.Label>
              <Form.Control type='date' style={{width: 170}} />
            </div>
            <div>
              <Form.Label className='fw-semibold me-2 d-block'>End Date</Form.Label>
              <Form.Control type='date' style={{width: 170}} />
            </div>
          </Col>
        </Row>
      </div>

      {/* ===== Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary text-white'>
              <th className='min-w-50px'>No</th>
              <th className='min-w-140px'>ID Number</th>
              <th className='min-w-220px'>Full Name</th>
              <th className='min-w-160px'>Employee Type</th>
              <th className='min-w-260px'>Job Title</th>
              <th className='min-w-140px'>Appraisal Date</th>
              <th className='min-w-220px'>Appraisal Period</th>
              <th className='min-w-200px'>Appraiser</th>
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

                  {/* Workgroup blocks */}
                  {workgroups.map(({workgroup, items}) => (
                    <React.Fragment key={workgroup}>
                      {/* Sub-header Workgroup */}
                      <tr className='fw-semibold bg-light-success'>
                        <td colSpan={9} className='text-start'>
                          {workgroup}
                        </td>
                      </tr>

                      {/* Rows per workgroup (No di-reset) */}
                      {items.map((r, i) => (
                        <tr key={r.id}>
                          <td className='text-center'>{i + 1}</td>
                          <td className='text-center'>{r.empId}</td>
                          <td>
                            <div className='fw-semibold'>{r.fullName}</div>
                          </td>
                          <td className='text-center'>{r.employeeType}</td>
                          <td>{r.jobTitle}</td>
                          <td className='text-center'>{fmtDate(r.appraisalDate)}</td>
                          <td className='text-center'>
                            {fmtDate(r.appraisalPeriodStart)} – {fmtDate(r.appraisalPeriodEnd)}
                          </td>
                          <td className='text-center'>{r.appraiser}</td>
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

      {/* Panel inline personal info */}
      <div className={hasDetail ? '' : 'd-none'}>
        <RecapInlinePersonalInfoPanel />
      </div>
    </div>
  )
}

export default ServiceDevelopmentAppraisalTab
