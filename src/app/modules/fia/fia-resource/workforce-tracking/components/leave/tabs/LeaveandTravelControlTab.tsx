import React, {useMemo, useState, useRef, useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {KTSVG} from '../../../../../../../../_metronic'
import {leaveRows, leaveHistoryMap} from '../dummy/leaveTravelDummy'

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

type HistoryTarget = {empNo: string; empName: string} | null

export const LeaveTravelControl: React.FC = () => {
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
  const [, setHistFilterKey] = useState<number>(0)

  // filtered rows
  const rows = useMemo(() => {
    return leaveRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.department === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
      .filter((r) => (filters.date ? r.requestDate === filters.date : true))
      .sort(
        (a, b) =>
          a.department.localeCompare(b.department) ||
          a.workgroup.localeCompare(b.workgroup) ||
          a.crew.localeCompare(b.crew) ||
          a.requestDate.localeCompare(b.requestDate) ||
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

  const total = rows.length
  const counterByCrew = new Map<string, number>()

  // history rows (filtered by Start/End after "View" is clicked)
  const historyRows = useMemo(() => {
    if (!historyFor) return []
    const list = leaveHistoryMap[historyFor.empNo] ?? []
    if (!histStart && !histEnd) return list

    const start = histStart ? new Date(histStart) : null
    const end = histEnd ? new Date(histEnd) : null

    return list.filter((r) => {
      const d = new Date(r.requestDate)
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
      {/* ===== Tabel Utama ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px py-3'>No</th>
              <th className='min-w-180px py-3'>Employee</th>
              <th className='min-w-170px py-3'>Job Title</th>
              <th className='min-w-180px py-3'>Request Purpose</th>
              <th className='min-w-120px py-3'>No of Person</th>
              <th className='min-w-140px py-3'>Departure</th>
              <th className='min-w-140px py-3'>Return</th>
              <th className='min-w-120px py-3'>No of Days</th>
              <th className='min-w-180px py-3'>Return to Work</th>
              <th className='min-w-140px py-3'>Request Date</th>
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
                      <td>{r.requestPurpose}</td>
                      <td>{r.noOfPerson}</td>
                      <td>{fmtDate(r.departure)}</td>
                      <td>{fmtDate(r.returnDate)}</td>
                      <td>{r.noOfDays}</td>
                      <td>{fmtDate(r.returnToWork)}</td>
                      <td>{fmtDate(r.requestDate)}</td>
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
              Leave and Travel History - {historyFor.empName} - {historyFor.empNo}
            </div>
            <div className='d-flex align-items-center'>
              <div className='text-nowrap small '>Start Date</div>
              <input
                type='date'
                className='form-control form-control-sm border-secondary'
                value={histStart}
                onChange={(e) => setHistStart(e.target.value)}
                style={{width: 155}}
              />
              <div className='text-nowrap small  '>End Date</div>
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
            <table className='table table-sm align-middle gs-3'>
              <thead className='table-dark'>
                <tr>
                  <th className='min-w-140px'>Request Date</th>
                  <th className='min-w-180px'>Request Purpose</th>
                  <th className='min-w-140px'>Departure</th>
                  <th className='min-w-140px'>Return</th>
                  <th className='min-w-120px'>No of Days</th>
                  <th className='min-w-140px'>No of Person</th>
                  <th className='min-w-220px'>First Day Return to Work</th>
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
                      <td>{fmtDate(h.requestDate)}</td>
                      <td>{h.requestPurpose}</td>
                      <td>{fmtDate(h.departure)}</td>
                      <td>{fmtDate(h.returnDate)}</td>
                      <td>{h.noOfDays}</td>
                      <td>{h.noOfPerson}</td>
                      <td>{fmtDate(h.firstDayReturnToWork)}</td>
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

export default LeaveTravelControl
