import React, { useMemo, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { KTCard, KTCardBody, KTSVG } from '../../../../../../../../_metronic'
import UpdateStatusForm from '../components/UpdateStatusForm'
import UpdateLocation from '../components/UpdateLocation'
import { breakdownRows, breakdownStatusChangeMap, type breakdownStatusChangeRow } from '../dummy/breakdownDummy'
import { usePermission } from '../../../../../../../../app/custom-hooks'

// Utility functions
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

export const ReadyTab: React.FC = () => {
  // Permission checks
  const canCreate = usePermission('/fia-operation/dispatch_radio_control/breakdown', 'Create')
  const canUpdate = usePermission('/fia-operation/dispatch_radio_control/breakdown', 'Update')
  const canRead = usePermission('/fia-operation/dispatch_radio_control/breakdown', 'Read')
  
  // Filter state
  const [filters, setFilters] = useState<Filters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })

  // Tab state
  const [activeTab, setActiveTab] = useState('ready')

  // Modal states
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [pendingLocation, setPendingLocation] = useState('')
  const [selectedRowForLocation, setSelectedRowForLocation] = useState<any>(null)

  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false)
  const [selectedRowForStatus, setSelectedRowForStatus] = useState<any>(null)

  // Filter handlers
  const onChange =
    (key: keyof Filters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFilters((s) => ({ ...s, [key]: e.target.value }))

  const clearAll = () => setFilters({ site: '', department: '', section: '', element: '', date: '' })

  // Options for filters
  const siteOptions = useMemo(() => uniq(breakdownRows.map((r) => r.siteBranch)), [])
  const deptOptions = useMemo(() => uniq(breakdownRows.map((r) => r.department)), [])
  const sectionOptions = useMemo(() => uniq(breakdownRows.map((r) => r.section)), [])
  const elementOptions = useMemo(() => uniq(breakdownRows.map((r) => r.element)), [])

  // Filtered Rows
  const filteredRows = useMemo(() => {
    return breakdownRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.department === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
      .filter((r) => {
        if (!filters.date) return true
        const rowDate = new Date(r.date).toISOString().split('T')[0]
        return rowDate === filters.date
      })
  }, [filters])

  // Grouping logic - group by Asset Model
  const groupedData = useMemo(() => {
    const grouped = new Map<string, typeof breakdownRows>()

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
        rows: rows.sort((a, b) => a.assetCode.localeCompare(b.assetCode))
      }))
      .sort((a, b) => {
        const dateA = new Date(a.rows[0]?.date || '').getTime()
        const dateB = new Date(b.rows[0]?.date || '').getTime()
        if (dateB !== dateA) return dateB - dateA
        return a.assetModel.localeCompare(b.assetModel)
      })
  }, [filteredRows])

  // Calculate total rows
  const totalRows = useMemo(() => groupedData.reduce((sum, g) => sum + g.rows.length, 0), [groupedData])

  // Status badge helper
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready':
        return 'badge-success'
      case 'standby':
        return 'badge-warning'
      case 'delay':
        return 'badge-info'
      case 'down':
        return 'badge-danger'
      default:
        return 'badge-secondary'
    }
  }

  // Modal handlers - Location
  const openLocationModal = (row: any) => {
    setSelectedRowForLocation(row)
    setPendingLocation(row.currentLocation || '')
    setIsLocationModalOpen(true)
  }

  const handleLocationSubmit = (payload: { newLocation: string }) => {
    console.log('Update Location:', payload)
    // Update logic here - you can update your data state or make API call
    setIsLocationModalOpen(false)
    setSelectedRowForLocation(null)
    setPendingLocation('')
  }

  // Modal handlers - Status
  const openUpdateStatusModal = (row: any) => {
    setSelectedRowForStatus(row)
    setIsUpdateStatusModalOpen(true)
  }

  const handleUpdateStatusSubmit = (formData: any) => {
    console.log('Update Status Form Data:', formData)
    // Update logic here - you can update your data state or make API call
    setIsUpdateStatusModalOpen(false)
    setSelectedRowForStatus(null)
  }

  // Button handlers
  const handleCreate = () => console.log('Create clicked', filters)
  const handleUpdate = () => console.log('Update clicked', filters)

  return (
    <div className='dispatcher-content'>
      {/* Filter Bar */}
      <div className='mb-3 p-3 border rounded'>
        <Row className='g-3 align-items-end'>
          <Col md={2}>
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

          <Col md={2}>
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

          <Col md={2}>
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

          <Col md={2}>
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

          <Col md={2}>
            <Form.Label className='fw-semibold'>Date</Form.Label>
            <Form.Control type='date' value={filters.date} onChange={onChange('date')} />
          </Col>

          <Col md={2} className='d-flex justify-content-end'>
            <div className='d-flex flex-column gap-2 w-100' style={{ maxWidth: 140 }}>
              {canCreate && (
                <Button variant='success' size='sm' onClick={handleCreate}>
                  Create
                </Button>
              )}
              {canUpdate && (
                <Button variant='primary' size='sm' onClick={handleUpdate}>
                  Update
                </Button>
              )}
            </div>
          </Col>
        </Row>

        <Row className='mt-2'>
          <Col>
            <div className='small text-muted'>
              Showing <span className='fw-semibold'>{totalRows}</span> record{totalRows !== 1 ? 's' : ''}
            </div>
          </Col>
        </Row>
      </div>

      {/* Fleet Operation - Event Section */}
      <KTCard className='mb-6'>
        <KTCardBody>
          {/* Tabs */}
          <div className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
            <button
              className={`nav-link ${activeTab === 'ready' ? 'active' : ''}`}
              onClick={() => setActiveTab('ready')}
            >
              READY
            </button>
            <button
              className={`nav-link ${activeTab === 'standby' ? 'active' : ''}`}
              onClick={() => setActiveTab('standby')}
            >
              STANDBY
            </button>
            <button
              className={`nav-link ${activeTab === 'delay' ? 'active' : ''}`}
              onClick={() => setActiveTab('delay')}
            >
              DELAY
            </button>
            <button
              className={`nav-link ${activeTab === 'down' ? 'active' : ''}`}
              onClick={() => setActiveTab('down')}
            >
              DOWN
            </button>
            <button
              className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              ALL FLEET
            </button>
          </div>

          {/* Fleet Operation Table */}
          <div className='table-responsive'>
            <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
              <thead>
                <tr className='fw-bold bg-secondary'>
                  <th className='min-w-30px py-3'>No</th>
                  <th className='min-w-80px py-3'>Asset No</th>
                  <th className='min-w-90px py-3'>Date</th>
                  <th className='min-w-60px py-3'>Time</th>
                  <th className='min-w-60px py-3'>Duration</th>
                  <th className='min-w-50px py-3'>Current Location</th>
                  <th className='min-w-50px py-3'>Type</th>
                  <th className='min-w-160px py-3'>Description</th>
                  <th className='min-w-70px py-3'>Status</th>
                  <th className='min-w-100px py-3'>Type Description</th>
                  <th className='min-w-100px py-3'>Comment</th>
                  <th className='min-w-70px text-end py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                {groupedData.length === 0 ? (
                  <tr>
                    <td colSpan={12} className='text-center text-muted py-10'>
                      No data found for current filters.
                    </td>
                  </tr>
                ) : (
                  groupedData.map((group) => (
                    <React.Fragment key={group.assetModel}>
                      {/* Group Title Row */}
                      <tr style={{ backgroundColor: '#3f4254', color: '#fff' }}>
                        <td colSpan={12} className='fw-semibold py-2'>
                          {group.assetModel}
                        </td>
                      </tr>
                      {/* Data Rows */}
                      {group.rows.map((item, rIdx) => (
                        <tr key={item.id}>
                          <td>{rIdx + 1}</td>
                          <td>
                            <div className='fw-semibold'>{item.assetCode}</div>
                          </td>
                          <td>{item.date}</td>
                          <td>{item.time}</td>
                          <td>{item.duration}</td>
                          <td>
                            <div className='d-flex align-items-center gap-2'>
                              <span>{item.currentLocation || '-'}</span>
                              {canUpdate && (
                                <button
                                  type='button'
                                  className='btn btn-sm text-primary fw-bold border-0 p-1'
                                  aria-label='Update location'
                                  title='Update location'
                                  onClick={() => openLocationModal(item)}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/abstract/abs037.svg'
                                    className='svg-icon-3'
                                  />
                                </button>
                              )}
                            </div>
                          </td>
                          <td>{item.type}</td>
                          <td className='text-wrap'>{item.typeDesc}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>{item.typeDesc}</td>
                          <td
                            className='text-truncate'
                            style={{ maxWidth: '280px' }}
                            title={item.comment || '-'}
                          >
                            {item.comment || '-'}
                          </td>
                          <td className='text-end'>
                            {/* View */}
                            {canRead && (
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
                            )}
                            {/* Edit */}
                            {canUpdate && (
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
                            )}
                            {/* Update Status */}
                            {canUpdate && (
                              <button
                                type='button'
                                className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                                aria-label='Update Status'
                                title='Update Status'
                                onClick={() => openUpdateStatusModal(item)}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/abstract/abs037.svg'
                                  className='svg-icon-3'
                                />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </KTCard>

      {/* Status Change History Section */}
      <KTCard>
        <KTCardBody>
          <h5 className='fw-bold mb-4'>Status Change for D0001-Diesel Drill Model DD-Z01</h5>

          <div className='table-responsive'>
            <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
              <thead>
                <tr className='fw-bold bg-secondary'>
                  <th className='min-w-100px py-3'>Date</th>
                  <th className='min-w-100px py-3'>Time</th>
                  <th className='min-w-100px py-3'>Status</th>
                  <th className='min-w-100px py-3'>Type</th>
                  <th className='min-w-200px py-3'>Type Description</th>
                  <th className='min-w-150px py-3'>Reasons</th>
                  <th className='min-w-200px py-3'>Comments</th>
                  <th className='min-w-200px py-3'>Corrective Action</th>
                </tr>
              </thead>
              <tbody>
                {breakdownStatusChangeMap.length === 0 ? (
                  <tr>
                    <td colSpan={8} className='text-center text-muted py-10'>
                      No status change history available.
                    </td>
                  </tr>
                ) : (
                  breakdownStatusChangeMap.map((item: breakdownStatusChangeRow) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>{item.type}</td>
                      <td>{item.typeDesc}</td>
                      <td>{item.reasons}</td>
                      <td>{item.comments || '-'}</td>
                      <td>{item.correctiveAction || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </KTCard>

      {/* Update Location Modal */}
      <UpdateLocation
        isOpen={isLocationModalOpen}
        onClose={() => {
          setIsLocationModalOpen(false)
          setSelectedRowForLocation(null)
          setPendingLocation('')
        }}
        assetData={
          selectedRowForLocation
            ? {
                assetCode: selectedRowForLocation.assetCode,
                assetName: selectedRowForLocation.assetModel,
                latestLocation: selectedRowForLocation.currentLocation || '-',
                lastUpdate: `${selectedRowForLocation.date} - ${selectedRowForLocation.time}`,
              }
            : null
        }
        onSubmit={handleLocationSubmit}
      />

      {/* Update Status Modal */}
      <UpdateStatusForm
        isOpen={isUpdateStatusModalOpen}
        onClose={() => {
          setIsUpdateStatusModalOpen(false)
          setSelectedRowForStatus(null)
        }}
        assetData={
          selectedRowForStatus
            ? {
                assetCode: selectedRowForStatus.assetCode,
                assetName: selectedRowForStatus.assetModel,
                currentStatus: selectedRowForStatus.status,
                statusCode: selectedRowForStatus.type,
                lastUpdate: `${selectedRowForStatus.date} - ${selectedRowForStatus.time}`,
              }
            : null
        }
        onSubmit={handleUpdateStatusSubmit}
      />
    </div>
  )
}

export default ReadyTab