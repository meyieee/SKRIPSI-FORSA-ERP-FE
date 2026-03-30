import React, {useMemo, useState, useRef, useEffect} from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {KTSVG} from '../../../../../../../../_metronic'
import {readingRows, ReadingRow, readingHistoryMap} from '../dummy/readingDummy'
import UpdateMeterReadingForm from '../components/UpdateMeterReadingForm'

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

type HistoryTarget = {assetNo: string; assetModel: string} | null

// type for the asset we pass to the modal
type SelectedAssetForUpdate = {
  assetCode: string
  assetName: string
  latestReading: string | number
  readingType: string
  lastUpdate: string
}

export const MeterReadingTab: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })

  const [historyFor, setHistoryFor] = useState<HistoryTarget>(null)
  const [histStart, setHistStart] = useState<string>('') // YYYY-MM-DD
  const [histEnd, setHistEnd] = useState<string>('') // YYYY-MM-DD
  const [histFilterKey, setHistFilterKey] = useState<number>(0)

  const historyRef = useRef<HTMLDivElement | null>(null)

  // modal state for "Update Meter Reading"
  const [isUpdateMeterReadingOpen, setIsUpdateMeterReadingOpen] = useState(false)
  const [selectedAssetForUpdate, setSelectedAssetForUpdate] =
    useState<SelectedAssetForUpdate | null>(null)

  const onChange =
    (key: keyof Filters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFilters((s) => ({...s, [key]: e.target.value}))

  const clearAll = () => setFilters({site: '', department: '', section: '', element: '', date: ''})

  // Options for filters
  const siteOptions = useMemo(() => uniq(readingRows.map((r) => r.siteBranch)), [])
  const deptOptions = useMemo(() => uniq(readingRows.map((r) => r.department)), [])
  const sectionOptions = useMemo(() => uniq(readingRows.map((r) => r.section)), [])
  const elementOptions = useMemo(() => uniq(readingRows.map((r) => r.element)), [])

  // Filtered rows
  const filteredRows = useMemo(() => {
    return readingRows
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
    const grouped = new Map<string, ReadingRow[]>()

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
        rows: rows.sort((a, b) => a.assetNo.localeCompare(b.assetNo)),
      }))
      .sort((a, b) => {
        // Sort by Date descending, then by Asset Model
        const dateA = new Date(a.rows[0]?.date || '').getTime()
        const dateB = new Date(b.rows[0]?.date || '').getTime()
        if (dateB !== dateA) return dateB - dateA
        return a.assetModel.localeCompare(b.assetModel)
      })
  }, [filteredRows])

  // Calculate total rows
  const totalRows = useMemo(
    () => groupedData.reduce((sum, g) => sum + g.rows.length, 0),
    [groupedData]
  )

  // Auto scroll to history panel when opened
  useEffect(() => {
    if (!historyFor) return
    const id = requestAnimationFrame(() =>
      historyRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    )
    return () => cancelAnimationFrame(id)
  }, [historyFor])

  // history rows (filtered by Start/End after "View" is clicked)
  const historyRows = useMemo(() => {
    if (!historyFor) return []
    const list = readingHistoryMap[historyFor.assetNo] ?? []
    if (!histStart && !histEnd) return list

    const start = histStart ? new Date(histStart) : null
    const end = histEnd ? new Date(histEnd) : null

    return list.filter((r) => {
      const d = new Date(r.date)
      const gteStart = start ? d >= start : true
      const lteEnd = end ? d <= end : true
      return gteStart && lteEnd
    })
  }, [historyFor, histStart, histEnd, histFilterKey])

  const handleCreate = () => console.log('Create clicked', filters)

  // open the "Update Meter Reading" modal for a row
  const openUpdateMeterReading = (groupAssetModel: string, row: ReadingRow) => {
    setSelectedAssetForUpdate({
      assetCode: row.assetNo,
      assetName: groupAssetModel,
      // choose what you consider "latest reading"
      latestReading: row.accumReading ?? row.enteredReading,
      readingType: row.type,
      lastUpdate: `${fmtDate(row.date)} ${row.time}`,
    })
    setIsUpdateMeterReadingOpen(true)
  }

  const handleUpdateStatusSubmit = (formData: any) => {
    console.log('Update Meter Reading Form Data:', formData)
    // TODO: update readingRows state if needed
    setIsUpdateMeterReadingOpen(false)
    setSelectedAssetForUpdate(null)
  }

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
            <div className='d-flex flex-column gap-2 w-100' style={{maxWidth: 160}}>
              <Button variant='success' size='sm' onClick={handleCreate}>
                Create
              </Button>
            </div>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col>
            <div className='small text-muted'>
              Showing <span className='fw-semibold'>{totalRows}</span> record
              {totalRows !== 1 ? 's' : ''}
            </div>
          </Col>
        </Row>
      </div>

      {/* ===== Main Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px py-3'>No.</th>
              <th className='min-w-200px py-3'>Asset No</th>
              <th className='min-w-120px py-3'>Type</th>
              <th className='min-w-140px py-3'>Average Using</th>
              <th className='min-w-140px py-3'>Date/Time</th>
              <th className='min-w-140px py-3'>Entered Reading</th>
              <th className='min-w-140px py-3'>Increment</th>
              <th className='min-w-140px py-3'>Accumulative Reading</th>
              <th className='min-w-140px py-3'>Status</th>
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
                        <div className='fw-semibold'>{r.assetNo}</div>
                      </td>
                      <td>{r.type}</td>
                      <td>{r.averageUsing}</td>
                      <td>
                        {fmtDate(r.date)} {r.time}
                      </td>
                      <td>{r.enteredReading}</td>
                      <td>{r.increment}</td>
                      <td>{r.accumReading}</td>
                      <td>{r.status}</td>
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
                        {/* Edit */}
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          aria-label='Edit'
                          title='Edit'
                          onClick={() => console.log('Edit', r.id)}
                        >
                          <KTSVG
                            path='/media/icons/duotune/art/art005.svg'
                            className='svg-icon-3'
                          />
                        </button>
                        {/* Update -> open modal */}
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          aria-label='Update'
                          title='Update'
                          onClick={() => openUpdateMeterReading(group.assetModel, r)}
                        >
                          <KTSVG
                            path='/media/icons/duotune/abstract/abs037.svg'
                            className='svg-icon-3'
                          />
                        </button>
                        {/* History */}
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                          aria-label='History'
                          title='History'
                          onClick={() =>
                            setHistoryFor({assetNo: r.assetNo, assetModel: group.assetModel})
                          }
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg'
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

      {/* History Panel */}
      {historyFor && (
        <div className='mt-5' ref={historyRef}>
          <div className='bg-secondary px-3 py-2 d-flex justify-content-between align-items-center rounded-top'>
            <div className='fw-semibold'>
              Meter Reading History - {historyFor.assetModel} - {historyFor.assetNo}
            </div>
            <div className='d-flex align-items-center'>
              <div className='text-nowrap small'>Start Date</div>
              <input
                type='date'
                className='form-control form-control-sm border-secondary'
                value={histStart}
                onChange={(e) => setHistStart(e.target.value)}
                style={{width: 155}}
              />
              <div className='text-nowrap small ms-2'>End Date</div>
              <input
                type='date'
                className='form-control form-control-sm border-secondary'
                value={histEnd}
                onChange={(e) => setHistEnd(e.target.value)}
                style={{width: 155}}
              />
              <button
                className='btn btn-sm btn-info'
                onClick={() => setHistFilterKey((k) => k + 1)}
                title='View'
              >
                View
              </button>
              <Button
                size='sm'
                variant='light-dark'
                onClick={() => {
                  setHistoryFor(null)
                  setHistStart('')
                  setHistEnd('')
                  setHistFilterKey((k) => k + 1)
                }}
              >
                Close
              </Button>
            </div>
          </div>

          <div className='table-responsive border border-top-0 rounded-bottom'>
            <table className='table table-sm align-middle mb-0 gs-3'>
              <thead className='table-dark'>
                <tr>
                  <th className='min-w-140px'>Date / Time</th>
                  <th className='min-w-100px'>Type</th>
                  <th className='min-w-120px'>Average Using</th>
                  <th className='min-w-140px'>Entered Reading</th>
                  <th className='min-w-100px'>Increment</th>
                  <th className='min-w-160px'>Accumulative Reading</th>
                  <th className='min-w-100px'>Status</th>
                  <th className='text-end min-w-90px'>Action</th>
                </tr>
              </thead>
              <tbody>
                {historyRows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className='text-center text-muted py-6'>
                      No history found.
                    </td>
                  </tr>
                ) : (
                  historyRows.map((h) => (
                    <tr key={h.id}>
                      <td>
                        {fmtDate(h.date)} {h.time}
                      </td>
                      <td>{h.type}</td>
                      <td>{h.averageUsing}</td>
                      <td>{h.enteredReading}</td>
                      <td>{h.increment}</td>
                      <td>{h.accumReading}</td>
                      <td>{h.status}</td>
                      <td className='text-end'>
                        <button
                          type='button'
                          className='btn btn-link btn-sm btn-color-light btn-active-color-primary p-0'
                          title='View'
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==== Update Meter Reading Modal ==== */}
      <UpdateMeterReadingForm
        isOpen={isUpdateMeterReadingOpen}
        onClose={() => {
          setIsUpdateMeterReadingOpen(false)
          setSelectedAssetForUpdate(null)
        }}
        assetData={selectedAssetForUpdate}
        onSubmit={handleUpdateStatusSubmit}
      />
    </div>
  )
}

export default MeterReadingTab
