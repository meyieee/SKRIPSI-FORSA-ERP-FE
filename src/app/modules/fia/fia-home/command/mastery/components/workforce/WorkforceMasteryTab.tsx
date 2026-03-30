// WorkforceMasteryTab.tsx
import React, {useMemo, useRef, useState} from 'react'
import {KTSVG, KTCard, KTCardBody} from '../../../../../../../../_metronic'
import {workforceTableDummy} from './dummy'
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'
import InlinePersonalInfoPanel from './InlinePersonalInfoPanel'
import {Form, Row, Col, Button} from 'react-bootstrap'

const nameToEmail = (fullName: string) =>
  fullName ? `${fullName.toLowerCase().replace(/\s+/g, '.')}@forsa.com` : 'user@forsa.com'
const cleanDept = (dept: string) => dept.replace(/\s*Department\s*$/i, '')

// ambil field pertama yang terisi dari beberapa kandidat
const pick = (obj: any, keys: string[]) => {
  for (const k of keys) {
    const v = obj?.[k]
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim()
  }
  return ''
}

const readSite = (r: any) =>
  pick(r, ['siteBranch', 'site', 'branch', 'workLocation', 'work_site', 'location'])
const readSection = (r: any) =>
  pick(r, ['sectionCc', 'section', 'cc', 'costCenter', 'cost_center', 'section_cc'])

const WorkforceMasteryTab: React.FC = () => {
  const {setProfile, setSelectedId} = useProfile()
  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  // Filter State
  const [filters, setFilters] = useState({
    site: '',
    department: '',
    section: '',
    employee: '',
  })

  const onChange =
    (key: keyof typeof filters) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) =>
      setFilters((s) => ({...s, [key]: e.target.value}))

  const clearAll = () =>
    setFilters({
      site: '',
      department: '',
      section: '',
      employee: '',
    })

  // Option untuk baca dari atas
  const departmentOptions = useMemo(() => workforceTableDummy.map((b) => b.department), [])
  const siteOptions = useMemo(() => {
    const set = new Set<string>()
    workforceTableDummy.forEach((b) => b.rows.forEach((r: any) => set.add(readSite(r))))
    set.delete('')
    return Array.from(set)
  }, [])
  const sectionOptions = useMemo(() => {
    const set = new Set<string>()
    workforceTableDummy.forEach((b) => b.rows.forEach((r: any) => set.add(readSection(r))))
    set.delete('')
    return Array.from(set)
  }, [])

  // filter data
  const filteredBlocks = useMemo(() => {
    const q = filters.employee.toLowerCase().trim()
    const qDigits = q.replace(/\D/g, '')

    return (
      workforceTableDummy
        // filter per department
        .filter((block) => (filters.department ? block.department === filters.department : true))
        // filter per row
        .map((block) => {
          const rows = block.rows.filter((r: any) => {
            const bySite = filters.site ? readSite(r) === filters.site : true
            const bySection = filters.section ? readSection(r) === filters.section : true

            // hanya search di kolom id, full name, supervisor, dan no telp
            const phoneDigits = String(r.phone || '').replace(/\D/g, '')
            const byQ = q
              ? String(r.idNumber || '')
                  .toLowerCase()
                  .includes(q) ||
                String(r.fullName || '')
                  .toLowerCase()
                  .includes(q) ||
                String(r.supervisor || '')
                  .toLowerCase()
                  .includes(q) ||
                (qDigits !== '' && phoneDigits.includes(qDigits))
              : true

            return bySite && bySection && byQ
          })
          return {...block, rows}
        })
        .filter((block) => block.rows.length > 0)
    )
  }, [filters])

  const totalVisible = useMemo(
    () => filteredBlocks.reduce((acc, b) => acc + b.rows.length, 0),
    [filteredBlocks]
  )

  // melakukan aksi ketika tekan tombol view
  const handleView = (row: any, department: string) => {
    setProfile({
      id: row.idNumber,
      name: row.fullName,
      position: row.jobTitle,
      email: nameToEmail(row.fullName),
      supervisor: row.supervisor,
      department: cleanDept(department),
      employeeType: row.type,
      photo_key: 'photo1',
    })
    setSelectedId(row.idNumber)
    if (!hasDetail) setHasDetail(true)
    setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
  }

  return (
    <KTCard className='mb-5'>
      <KTCardBody>
      {/* Bar filter */}
      <div className='mb-3 p-3 border rounded'>
        <Row className='g-3 align-items-end row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5'>
          <Col>
            <Form.Label className='fw-semibold'>Site | Branch</Form.Label>
            <Form.Select value={filters.site} onChange={onChange('site')}>
              <option value=''>default: All</option>
              {siteOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Label className='fw-semibold'>Department</Form.Label>
            <Form.Select value={filters.department} onChange={onChange('department')}>
              <option value=''>default: All</option>
              {departmentOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Label className='fw-semibold'>Section | CC</Form.Label>
            <Form.Select value={filters.section} onChange={onChange('section')}>
              <option value=''>default: All</option>
              {sectionOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Label className='fw-semibold'>Employee</Form.Label>
            <Form.Control
              placeholder='default: All'
              value={filters.employee}
              onChange={onChange('employee')}
            />
          </Col>

          <Col>
            <Form.Label className='fw-semibold invisible'>Actions</Form.Label>
            <div className='d-flex align-items-center justify-content-between gap-2 flex-wrap'>
              <div className='text-gray-800 small mb-0'>
                Showing <span className='fw-semibold'>{totalVisible}</span> item
                {totalVisible !== 1 ? 's' : ''}
              </div>
              <Button variant='light-dark' size='sm' onClick={clearAll}>
                Reset
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Mulai tabel*/}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px  py-3'>No</th>
              <th className='min-w-120px  py-3'>ID Number</th>
              <th className='min-w-220px  py-3'>Full Name</th>
              <th className='min-w-220px  py-3'>Job Title</th>
              <th className='min-w-90px  py-3'>Type</th>
              <th className='min-w-220px  py-3'>Supervisor</th>
              <th className='min-w-140px  py-3'>Phone</th>
              <th className='min-w-180px  py-3'>Work Location</th>
              <th className='min-w-60px  py-3 text-end'>Action</th>
            </tr>
          </thead>

          <tbody className='text-gray-800'>
            {filteredBlocks.length === 0 ? (
              <tr>
                <td colSpan={9} className='text-center text-muted py-10'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              filteredBlocks.map((block) => (
                <React.Fragment key={block.department}>
                  <tr>
                    <td colSpan={9} className='fw-bolder text-dark bg-light'>
                      {block.department}
                    </td>
                  </tr>
                  {block.rows.map((r: any) => (
                    <tr key={`${block.department}-${r.no}-${r.idNumber}`}>
                      <td>{r.no}</td>
                      <td>{r.idNumber}</td>
                      <td>{r.fullName}</td>
                      <td>{r.jobTitle}</td>
                      <td>{r.type}</td>
                      <td>{r.supervisor}</td>
                      <td>{r.phone}</td>
                      <td>{r.workLocation}</td>
                      <td className='text-end'>
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          onClick={() => handleView(r, block.department)}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* untuk auto-scroll */}
      <div ref={anchorRef} />

      <div className={hasDetail ? '' : 'd-none'}>
        <InlinePersonalInfoPanel />
      </div>
      </KTCardBody>
    </KTCard>
  )
}

export default WorkforceMasteryTab
