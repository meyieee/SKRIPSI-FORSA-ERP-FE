import React, { useState, useMemo, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { KTSVG } from '../../../../../../../../_metronic'
import { inspectionRows } from '../dummy/inspectionDummy'

const uniq = (arr: (string | undefined)[]) =>
  Array.from(new Set(arr.filter((v): v is string => !!v && v.trim() !== '')))

const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {day: '2-digit', month: 'short', year: 'numeric'})
    : ''

type Filters = {
  site: string
  department: string
  section: string
  element: string
  date: string // '' | YYYY-MM-DD  (Request Date)
}

export const InspectionDefectControlTab: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })

  const onChange =
    (key: keyof typeof filters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFilters((prev) => ({ ...prev, [key]: e.target.value }))

  // options
  const siteOptions = useMemo(() => uniq(inspectionRows.map((r) => r.siteBranch)), [])
  const deptOptions = useMemo(() => uniq(inspectionRows.map((r) => r.department)), [])
  const sectionOptions = useMemo(() => uniq(inspectionRows.map((r) => r.section)), [])
  const elementOptions = useMemo(() => uniq(inspectionRows.map((r) => r.element)), [])

  // filtered rows
  const rows = useMemo(() => {
    return inspectionRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.department === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
      .filter((r) => (filters.date ? r.inspDate === filters.date : true))
      .sort(
        (a, b) =>
          a.department.localeCompare(b.department) ||
          a.workgroup.localeCompare(b.workgroup) ||
          a.inspDate.localeCompare(b.inspDate) ||
          a.reqNo.localeCompare(b.reqNo)
      )
  }, [filters])

  const renderHeaderRow = (label: string, colSpan: number, tone: 'dept' | 'wg' | 'crew') => {
    const base = 'fw-semibold'
    const cls =
      tone === 'dept'
        ? `bg-light-primary text-primary ${base}`
        : tone === 'wg'
        ? `bg-light ${base}`
        : `bg-light-subtle ${base} fst-italic`
    return (
      <tr>
        <td colSpan={colSpan} className={cls}>
          {label}
        </td>
      </tr>
    )
  }

  const total = rows.length
  const counterByCrew = new Map<string, number>()

  const handleCreate = () => console.log('Create clicked', filters)
  const handleUpdate = () => console.log('Update clicked', filters)

  return (
    <div>
      {/* Filter Section */}
      <div className="mb-3 p-3 border rounded">
        <Row className="g-3 align-items-end">
          <Col md={2}>
            <Form.Label className="fw-semibold">Site | Branch</Form.Label>
            <Form.Select value={filters.site} onChange={onChange('site')}>
              <option value="">[Default All]</option>
              {siteOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Label className="fw-semibold">Department</Form.Label>
            <Form.Select value={filters.department} onChange={onChange('department')}>
              <option value="">[Default All]</option>
              {deptOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Label className="fw-semibold">Section</Form.Label>
            <Form.Select value={filters.section} onChange={onChange('section')}>
              <option value="">[Default All]</option>
              {sectionOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Label className="fw-semibold">Element</Form.Label>
            <Form.Select value={filters.element} onChange={onChange('element')}>
              <option value="">[Default All]</option>
              {elementOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Label className="fw-semibold">Date</Form.Label>
            <Form.Control type="date" value={filters.date} onChange={onChange('date')} />
          </Col>
          <Col md={2} className="d-flex justify-content-end">
            <div className="d-flex flex-column gap-2 w-100" style={{ maxWidth: 160 }}>
              <Button variant="success" size="sm">Update</Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Main Table */}
      <div className="table-responsive border rounded p-3 mb-3">
        <table className="table table-rounded border table-row-bordered align-middle gs-4 gy-2 gx-3">
          <thead>
            <tr className="fw-bold bg-secondary">
              <th className='min-w-30px py-3'>No.</th>
              <th className='min-w-30px py-3'>Request No.</th>
              <th className='min-w-30px py-3'>Inspection Description</th>
              <th className='min-w-30px py-3'>Asset Description</th>
              <th className='min-w-30px py-3'>Inspector</th>
              <th className='min-w-30px py-3'>Inspect Date</th>
              <th className='min-w-30px py-3'>Priority</th>
              <th className='min-w-30px py-3'>Location</th>
              <th className='min-w-30px py-3'>Cost Center</th>
              <th className='min-w-30px py-3'>Status</th>
              <th className='min-w-30px py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={11} className='text-center text-muted py-10'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              (() => {
                const out: React.ReactNode[] = []
                let lastDept = ''
                let lastWg = ''
          
                rows.forEach((r) => {
                  if (r.department !== lastDept) {
                    out.push(renderHeaderRow(r.department.toUpperCase(), 11, 'dept'))
                    lastDept = r.department
                    lastWg = ''
                  }

                  const n = (counterByCrew.get(r.workgroup) ?? 0) + 1
                  counterByCrew.set(r.workgroup, n)

                  out.push(
                    <tr key={r.id}>
                    <td>{n}</td>
                      <td>{r.reqNo}</td>
                      <td>{r.inspDescription}</td>
                      <td>{r.assetDescription}</td>
                      <td>{r.inspector}</td>
                      <td>{fmtDate(r.inspDate)}</td>
                      <td>{r.priority}</td>
                      <td>{r.location}</td>
                      <td>{r.costCenter}</td>
                      <td>{r.status}</td>
                      <td className='text-end'>
                        {/* View */}
                          <button
                            type='button'
                            className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                            aria-label='View'
                            title='View'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen004.svg'
                              className='svg-icon-3'
                            />
                          </button>
                          {/* Edit */}
                          <button
                            type='button'
                            className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                            aria-label='Edit'
                            title='Edit'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                  return out
                })()
              )}
            </tbody>
          </table>
          <div className='small text-gray-600 mt-2'>
            Showing <span className='fw-semibold'>{total}</span> record{total !== 1 ? 's' : ''}
          </div>
        </div>
    </div>
  )
}

export default InspectionDefectControlTab
