import React, {useMemo, useState} from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {KTSVG} from '../../../../../../../../_metronic'
import { componentRows, ComponentRow } from '../dummy/componentDummy'

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

// Badge color for "Due Days" column
const dueDaysBadge = (days: number) => {
  let cls = 'bg-secondary'
  let label = days.toString()
  
  if (days >= 7) {
    cls = 'bg-success' // Behind above 7 Days
  } else if (days >= 4) {
    cls = 'bg-warning' // Behind Within 4-7 Days
  } else if (days >= 1) {
    cls = 'bg-danger' // Behind Within 1-3 Days
  } else {
    cls = 'bg-secondary' // All Status
  }
  
  return <span className={`badge ${cls} w-50px d-inline-flex justify-content-center`}>{label}</span>
}

export const TrackingandMonitoringTab: React.FC = () => {
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
  const siteOptions = useMemo(() => uniq(componentRows.map((r) => r.siteBranch)), [])
  const deptOptions = useMemo(() => uniq(componentRows.map((r) => r.department)), [])
  const sectionOptions = useMemo(() => uniq(componentRows.map((r) => r.section)), [])
  const elementOptions = useMemo(() => uniq(componentRows.map((r) => r.element)), [])

  // Filtered Rows
  const filteredRows = useMemo(() => {
    return componentRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.department === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
      .filter((r) => {
        if (!filters.date) return true
        const rowDate = new Date(r.dateChanged).toISOString().split('T')[0]
        return rowDate === filters.date
      })
  }, [filters])

  // Grouping logic - group by Asset Model
  const groupedData = useMemo(() => {
    const grouped = new Map<string, ComponentRow[]>()

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
      rows: rows.sort((a, b) => a.fleetComponentRegister.localeCompare(b.fleetComponentRegister))
    }))
    .sort((a, b) => {
      // Sort by Date Changed descending, then by Asset Model
      const dateA = new Date(a.rows[0]?.dateChanged || '').getTime()
      const dateB = new Date(b.rows[0]?.dateChanged || '').getTime()
      if (dateB !== dateA) return dateB - dateA
      return a.assetModel.localeCompare(b.assetModel)
    })
  }, [filteredRows])

  // Calculate total rows
  const totalRows = useMemo(() => groupedData.reduce((sum, g) => sum + g.rows.length, 0), [groupedData])

  // Legend counts
  const behind7Plus = filteredRows.filter((r) => r.dueDays >= 7).length
  const behind4to7 = filteredRows.filter((r) => r.dueDays >= 4 && r.dueDays < 7).length
  const behind1to3 = filteredRows.filter((r) => r.dueDays >= 1 && r.dueDays < 4).length
  const allStatus = filteredRows.length

  // Legend
  const Legend = () => (
    <div className='d-flex align-items-center flex-wrap gap-2 small'>
      <span className='me-1'>Legend :</span>
      <span className='badge bg-success'>Behind above 7 Days ({behind7Plus})</span>
      <span className='badge bg-warning'>Behind Within 4-7 Days ({behind4to7})</span>
      <span className='badge bg-danger'>Behind Within 1-3 Days ({behind1to3})</span>
      <span className='badge bg-secondary text-dark'>All Status ({allStatus})</span>
    </div>
  )

  const handleUpdate = () => console.log('Update clicked', filters)

  return (
    <div>
      {/* ===== Filter Bar ===== */}
      <div className='mb-3 p-3 border rounded'>
        <Row className='g-3 align-items-end row-cols-1 row-cols-md-5'>
          <Col>
            <Form.Label className='fw-semibold'>Site | Branch</Form.Label>
            <Form.Select value={filters.site} onChange={onChange('site')}>
              <option value=''>[Default All]</option>
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
              <option value=''>[Default All]</option>
              {deptOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label className='fw-semibold'>Section</Form.Label>
            <Form.Select value={filters.section} onChange={onChange('section')}>
              <option value=''>[Default All]</option>
              {sectionOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label className='fw-semibold'>Element</Form.Label>
            <Form.Select value={filters.element} onChange={onChange('element')}>
              <option value=''>[Default All]</option>
              {elementOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label className='fw-semibold'>Date</Form.Label>
            <Form.Control type='date' value={filters.date} onChange={onChange('date')} />
          </Col>
        </Row>

        <Row className='mt-3 align-items-center flex-nowrap'>
          <Col className='d-flex align-items-center text-nowrap overflow-auto'>
            <Legend />
          </Col>
          <Col xs='auto' className='ms-auto d-flex align-items-center gap-2 flex-nowrap'>
            <Button variant='primary' size='sm' onClick={handleUpdate}>
              Update
            </Button>
          </Col>
        </Row>
      </div>

      {/* ===== Main Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px py-3'>No.</th>
              <th className='min-w-200px py-3'>Fleet | Component Register</th>
              <th className='min-w-140px py-3'>Position</th>
              <th className='min-w-120px py-3'>Type</th>
              <th className='min-w-140px py-3'>Date Changed</th>
              <th className='min-w-140px py-3'>Installed Reading</th>
              <th className='min-w-140px py-3'>Current Reading</th>
              <th className='min-w-140px py-3'>Actual Life</th>
              <th className='min-w-140px py-3'>Target</th>
              <th className='min-w-140px py-3'>Reading Date</th>
              <th className='min-w-140px py-3'>Forecast</th>
              <th className='min-w-120px py-3'>Due Days</th>
              <th className='min-w-120px py-3'>Scheduled</th>
              <th className='min-w-120px py-3'>Monitoring</th>
              <th className='min-w-110px text-end py-3'>Action</th>
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
                        <div className='fw-semibold'>{r.fleetComponentRegister}</div>
                      </td>
                      <td>{r.position}</td>
                      <td>{r.type}</td>
                      <td>{fmtDate(r.dateChanged)}</td>
                      <td>{r.installedReading.toLocaleString()}</td>
                      <td>{r.currentReading.toLocaleString()}</td>
                      <td>{r.actualLife.toLocaleString()}</td>
                      <td>{r.target.toLocaleString()}</td>
                      <td>{fmtDate(r.readingDate)}</td>
                      <td>{r.forecast}</td>
                      <td>{dueDaysBadge(r.dueDays)}</td>
                      <td>{r.scheduled}</td>
                      <td>{r.monitoring}</td>
                      <td className='text-end'>
                        {/* View */}
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          aria-label='View'
                          title='View'
                          onClick={() => console.log('View', r.id)}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen004.svg'
                            className='svg-icon-3'
                          />
                        </button>
                        {/* Update */}
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                          aria-label='Update'
                          title='Update'
                          onClick={() => console.log('Update', r.id)}
                        >
                          <KTSVG 
                            path='/media/icons/duotune/abstract/abs037.svg'
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
        <div className='small text-gray-600 mt-2'>
          Showing <span className='fw-semibold'>{totalRows}</span> record{totalRows !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}

export default TrackingandMonitoringTab