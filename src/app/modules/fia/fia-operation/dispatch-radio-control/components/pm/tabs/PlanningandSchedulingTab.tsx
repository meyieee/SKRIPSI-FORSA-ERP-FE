import React, {FC, useMemo, useEffect, useState} from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import { pmRows, PMRow } from '../dummy/pmDummy'

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
  date: string
}

export const PlanningSchedulingTab: FC = () => {
  const [filters, setFilters] = useState<Filters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })

  const onChange =
    (key: keyof Filters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFilters((s) => ({...s, [key]: e.target.value}))

  const clearAll = () => setFilters({site: '', department: '', section: '', element: '', date: ''})

  // Options for filters
    const siteOptions = useMemo(() => uniq(pmRows.map((r) => r.siteBranch)), [])
    const deptOptions = useMemo(() => uniq(pmRows.map((r) => r.department)), [])
    const sectionOptions = useMemo(() => uniq(pmRows.map((r) => r.section)), [])
    const elementOptions = useMemo(() => uniq(pmRows.map((r) => r.element)), [])
  
    // Filtered Rows
    const filteredRows = useMemo(() => {
      return pmRows
        .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
        .filter((r) => (filters.department ? r.department === filters.department : true))
        .filter((r) => (filters.section ? r.section === filters.section : true))
        .filter((r) => (filters.element ? r.element === filters.element : true))
        .filter((r) => {
          if (!filters.date) return true
          const rowDate = new Date(r.planStartDate).toISOString().split('T')[0]
          return rowDate === filters.date
        })
    }, [filters])

  // Grouping logic - group by Asset Model
  const groupedData = useMemo(() => {
    const grouped = new Map<string, PMRow[]>()

    filteredRows.forEach((row) => {
      const key = row.assetModel
      if (!grouped.has(key)) {
        grouped.set(key, [])
      }
      grouped.get(key)!.push(row)
    })

    return Array.from(grouped.entries())
      .map(([assetModel, rows]) => ({
        assetModel,
        rows: rows.sort((a, b) => a.pmNo.localeCompare(b.pmNo))
      }))
      .sort((a, b) => {
        // Sort by Date Changed descending, then by Asset Model
        const dateA = new Date(a.rows[0]?.planStartDate || '').getTime()
        const dateB = new Date(b.rows[0]?.planStartDate || '').getTime()
        if (dateB !== dateA) return dateB - dateA
        return a.assetModel.localeCompare(b.assetModel)
      })
  }, [filteredRows])

  // Calculate total rows
  const totalRows = useMemo(() => groupedData.reduce((sum, g) => sum + g.rows.length, 0), [groupedData])

  const handleUpdate = () => console.log('Update clicked', filters)

  return (
    <div>
      {/* ===== Filter Bar ===== */}
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
        <Row className="mt-2">
          <Col>
            <div className="small text-muted">
              Showing <span className="fw-semibold">{totalRows}</span> record{totalRows !== 1 ? 's' : ''}
            </div>
          </Col>
        </Row>
      </div>

      {/* Main Table */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
          <thead>
            <tr className="fw-bold bg-secondary">
              <th className='min-w-30px py-3'>No.</th>
              <th className='min-w-200px py-3'>PM No. - Description</th>
              <th className='min-w-120px py-3'>Asset No.</th>
              <th className='min-w-120px py-3'>Priority</th>
              <th className='min-w-120px py-3'>Lead Time</th>
              <th className='min-w-140px py-3'>Plan Start Date Time</th>
              <th className='min-w-140px py-3'>Plan Finish Date Time</th>
              <th className='min-w-140px py-3'>Remarks</th>
              <th className='min-w-140px py-3'>Last Done</th>
              <th className='min-w-120px py-3'>Duration</th>
              <th className='min-w-140px py-3'>Work Order</th>
            </tr>
          </thead>
          <tbody>
            {groupedData.length === 0 ? (
              <tr>
                <td colSpan={15} className='text-center text-muted py-10'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              groupedData.map((group) => (
                <React.Fragment key={group.assetModel}>
                  {/* Group Title Row */}
                  <tr style={{backgroundColor: '#3f4254', color: '#fff'}}>
                    <td colSpan={15} className='fw-semibold py-2'>
                      {group.assetModel}
                    </td>
                  </tr>
                  {/* Data Rows */}
                  {group.rows.map((r, rIdx) => (
                    <tr key={r.id}>
                      <td>{rIdx + 1}</td>
                      <td>
                        <div className='fw-semibold'>{r.pmNo}</div>
                        <div className='text-gray-800'>{r.description}</div>
                      </td>
                      <td>{r.assetNo}</td>
                      <td>{r.priority}</td>
                      <td>{r.leadTime}</td>
                      <td>{fmtDate(r.planStartDate)} {r.planStartTime}</td>
                      <td>{fmtDate(r.planFinishDate)} {r.planFinishTime}</td>
                      <td>{r.remark}</td>
                      <td>{r.lastDone}</td>
                      <td>{r.duration}</td>
                      <td>{r.workOrder}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlanningSchedulingTab
