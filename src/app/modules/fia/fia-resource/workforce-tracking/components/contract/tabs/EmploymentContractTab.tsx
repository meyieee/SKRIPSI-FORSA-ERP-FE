import React, {useMemo, useState, useRef, useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {KTSVG} from '../../../../../../../../_metronic'
import {contractRows, contractHistoryMap} from '../dummy/contractDummy'

const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {day: '2-digit', month: 'short', year: 'numeric'})
    : ''

type Filters = {
  site: string
  department: string
  section: string
  element: string
  date: string // '' | YYYY-MM-DD (created/contractDate filter)
}
type HistoryTarget = {empNo: string; empName: string} | null

// badge warna untuk kolom "Expire (Days)"
const expireBadge = (days: number) => {
  // kategori mendekati legend di foto
  let cls = 'bg-secondary'
  if (days >= 16) cls = 'bg-success' // aman
  else if (days >= 8) cls = 'bg-info' // Will Expire 8–15
  else if (days >= 1) cls = 'bg-warning' // Will Expire 1–7
  else if (days >= -14) cls = 'bg-danger' // Expired 1–14
  else if (days >= -30) cls = 'bg-dark' // Expired 15–30
  else cls = 'bg-dark' // Expired >30
  return <span className={`badge ${cls} w-50px d-inline-flex justify-content-center`}>{days}</span>
}

export const EmploymentContractControl: React.FC = () => {
  const [filters] = useState<Filters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })
  const [historyFor, setHistoryFor] = useState<HistoryTarget>(null)
  const [histStart, setHistStart] = useState<string>('') // YYYY-MM-DD
  const [histEnd, setHistEnd] = useState<string>('') // YYYY-MM-DD
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [histFilterKey, setHistFilterKey] = useState<number>(0)

  // filtered rows
  const rows = useMemo(() => {
    return contractRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.department === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
      .filter((r) => (filters.date ? r.createdDate === filters.date : true))
      .sort(
        (a, b) =>
          a.department.localeCompare(b.department) ||
          a.workgroup.localeCompare(b.workgroup) ||
          a.crew.localeCompare(b.crew) ||
          a.contractDate.localeCompare(b.contractDate) ||
          a.empNo.localeCompare(b.empNo)
      )
  }, [filters])

  const renderHeaderRow = (label: string, colSpan: number, tone: 'dept' | 'wg' | 'crew') => {
    const base = 'fw-semibold'
    const cls =
      tone === 'dept'
        ? `bg-light-primary text-primary ${base}`
        : tone === 'wg'
        ? `bg-light-success ${base}`
        : `bg-light-warning ${base} fst-italic`
    return (
      <tr>
        <td colSpan={colSpan} className={cls}>
          {label}
        </td>
      </tr>
    )
  }

  // Legend
  const Legend = () => (
    <div className='d-flex align-items-center flex-wrap gap-2 small'>
      <span className='me-1'>Legend :</span>
      <span className='badge bg-dark'>Will Expire &gt; 15 Days</span>
      <span className='badge bg-secondary text-dark'>Will Expire 8-15 Days</span>
      <span className='badge bg-success'>Expired 1–7 Days</span>
      <span className='badge bg-warning'>Expired 1-14 Days</span>
      <span className='badge bg-info'>Expired 15–30 Days</span>
      <span className='badge bg-danger'>Expire &gt; 30 Days</span>
    </div>
  )

  const total = rows.length
  const counterByCrew = new Map<string, number>()

  // history rows
  const historyRows = useMemo(() => {
    if (!historyFor) return []
    const list = contractHistoryMap[historyFor.empNo] ?? []
    if (!histStart && !histEnd) return list

    const start = histStart ? new Date(histStart) : null
    const end = histEnd ? new Date(histEnd) : null

    return list.filter((r) => {
      const d = new Date(r.createdDate) // filter berdasarkan tanggal dibuat
      const gteStart = start ? d >= start : true
      const lteEnd = end ? d <= end : true
      return gteStart && lteEnd
    })
  }, [historyFor, histStart, histEnd])

  // auto scroll
  const historyRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!historyFor) return
    const id = requestAnimationFrame(() =>
      historyRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    )
    return () => cancelAnimationFrame(id)
  }, [historyFor])

  return (
    <div>
      <div className='mb-4'>
        <Legend />
      </div>

      {/* ===== Tabel Utama ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px py-3'>No</th>
              <th className='min-w-180px py-3'>Employee</th>
              <th className='min-w-170px py-3'>Job Title</th>
              <th className='min-w-160px py-3'>Contract No</th>
              <th className='min-w-180px py-3'>Contract Type</th>
              <th className='min-w-140px py-3'>No of Contract</th>
              <th className='min-w-140px py-3'>Contract Date</th>
              <th className='min-w-160px py-3'>Completion Date</th>
              <th className='min-w-140px py-3'>Expire (Days)</th>
              <th className='min-w-140px py-3'>Created Date</th>
              <th className='min-w-110px text-end py-3'>Action</th>
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
                let lastCrew = ''

                rows.forEach((r) => {
                  if (r.department !== lastDept) {
                    out.push(renderHeaderRow(r.department.toUpperCase(), 11, 'dept'))
                    lastDept = r.department
                    lastWg = ''
                    lastCrew = ''
                  }
                  if (r.workgroup !== lastWg) {
                    out.push(renderHeaderRow(r.workgroup, 11, 'wg'))
                    lastWg = r.workgroup
                    lastCrew = ''
                  }
                  if (r.crew !== lastCrew) {
                    out.push(renderHeaderRow(r.crew, 11, 'crew'))
                    lastCrew = r.crew
                    counterByCrew.set(r.crew, 0)
                  }

                  const n = (counterByCrew.get(r.crew) ?? 0) + 1
                  counterByCrew.set(r.crew, n)

                  out.push(
                    <tr key={r.id}>
                      <td>{n}</td>
                      <td>
                        <div className='fw-semibold'>{r.empNo}</div>
                        <div className='text-gray-800'>{r.empName}</div>
                      </td>
                      <td>{r.jobTitle}</td>
                      <td>{r.contractNo}</td>
                      <td>{r.contractType}</td>
                      <td>{r.noOfContract}</td>
                      <td>{fmtDate(r.contractDate)}</td>
                      <td>{fmtDate(r.completionDate)}</td>
                      <td>{expireBadge(r.expireDays)}</td>
                      <td>{fmtDate(r.createdDate)}</td>
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
                        {/* History */}
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                          aria-label='History'
                          title='History'
                          onClick={() => setHistoryFor({empNo: r.empNo, empName: r.empName})}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg'
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

      {/* ===== Panel History ===== */}
      {historyFor && (
        <div className='mt-5' ref={historyRef}>
          <div className='bg-secondary px-3 py-2 d-flex justify-content-between align-items-center rounded-top'>
            <div className='fw-semibold'>
              Employment Contract History - {historyFor.empName} - {historyFor.empNo}
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
                  <th className='min-w-140px'>Contract Date</th> {/* created date */}
                  <th className='min-w-160px'>Contract No</th>
                  <th className='min-w-140px'>No of Contract</th>
                  <th className='min-w-200px'>Contract Type</th>
                  <th className='min-w-140px'>Contract Date</th> {/* start date */}
                  <th className='min-w-160px'>Completion Date</th>
                  <th className='text-end min-w-90px'>Action</th>
                </tr>
              </thead>
              <tbody>
                {historyRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className='text-center text-muted py-6'>
                      No history found.
                    </td>
                  </tr>
                ) : (
                  historyRows.map((h) => (
                    <tr key={h.id}>
                      <td>{fmtDate(h.createdDate)}</td>
                      <td>{h.contractNo}</td>
                      <td>{h.noOfContract}</td>
                      <td>{h.contractType}</td>
                      <td>{fmtDate(h.contractDate)}</td>
                      <td>{fmtDate(h.completionDate)}</td>
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
    </div>
  )
}

export default EmploymentContractControl
