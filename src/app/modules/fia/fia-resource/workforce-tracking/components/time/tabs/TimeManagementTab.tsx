import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Button} from 'react-bootstrap'
import {KTSVG} from '../../../../../../../../_metronic'
import {timeRows, timeHistoryMap, type TimeRow, type TimeHistoryRow} from '../dummy/dummyTime'

const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : ''

const fmt = (v: number | string | null | undefined) =>
  v === null || v === undefined || v === '' ? '' : String(v)

type Filters = {
  site: string
  department: string
  section: string
  element: string
  date: string // YYYY-MM-DD
}

type HistoryTarget = {empNo: string; empName: string} | null

export const TimeManagementTab: React.FC = () => {
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
  const rows = useMemo<TimeRow[]>(() => {
    return timeRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.department === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
      .filter((r) => (filters.date ? r.date === filters.date : true))
      .sort(
        (a, b) =>
          a.department.localeCompare(b.department) ||
          a.workgroup.localeCompare(b.workgroup) ||
          a.crew.localeCompare(b.crew) ||
          a.date.localeCompare(b.date) ||
          a.empNo.localeCompare(b.empNo)
      )
  }, [filters])

  const total = rows.length
  const counterByCrew = new Map<string, number>()

  // history rows (bottom panel)
  const historyRows = useMemo<TimeHistoryRow[]>(() => {
    if (!historyFor) return []
    const list = timeHistoryMap[historyFor.empNo] ?? []
    if (!histStart && !histEnd) return list

    const start = histStart ? new Date(histStart) : null
    const end = histEnd ? new Date(histEnd) : null

    return list.filter((r) => {
      const d = new Date(r.date)
      const gteStart = start ? d >= start : true
      const lteEnd = end ? d <= end : true
      return gteStart && lteEnd
    })
  }, [historyFor, histStart, histEnd])

  const historyRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!historyFor) return
    const id = requestAnimationFrame(() =>
      historyRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    )
    return () => cancelAnimationFrame(id)
  }, [historyFor])

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

  return (
    <div>
      {/* ===== Main Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px py-3'>No</th>
              <th className='min-w-180px py-3'>Employee</th>
              <th className='min-w-140px py-3'>Date</th>
              <th className='min-w-90px py-3'>Time In</th>
              <th className='min-w-90px py-3'>Time Out</th>
              <th className='min-w-110px py-3'>Scan In</th>
              <th className='min-w-110px py-3'>Scan Out</th>
              <th className='min-w-90px py-3'>Late</th>
              <th className='min-w-90px py-3'>Early</th>
              <th className='min-w-110px py-3'>Overtime</th>
              <th className='min-w-110px py-3'>Workhours</th>
              <th className='min-w-110px py-3'>Total Hours</th>
              <th className='min-w-120px py-3'>Payment Hrs</th>
              <th className='min-w-90px text-end py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={14} className='text-center text-muted py-10'>
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
                    out.push(renderHeaderRow(r.department.toUpperCase(), 14, 'dept'))
                    lastDept = r.department
                    lastWg = ''
                    lastCrew = ''
                  }
                  if (r.workgroup !== lastWg) {
                    out.push(renderHeaderRow(r.workgroup, 14, 'wg'))
                    lastWg = r.workgroup
                    lastCrew = ''
                  }
                  if (r.crew !== lastCrew) {
                    out.push(renderHeaderRow(r.crew, 14, 'crew'))
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
                      <td>{fmtDate(r.date)}</td>
                      <td>{fmt(r.timeIn)}</td>
                      <td>{fmt(r.timeOut)}</td>
                      <td>{fmt(r.scanIn)}</td>
                      <td>{fmt(r.scanOut)}</td>
                      <td>{fmt(r.late)}</td>
                      <td>{fmt(r.early)}</td>
                      <td>{fmt(r.overtime)}</td>
                      <td>{fmt(r.workhours)}</td>
                      <td>{fmt(r.totalHours)}</td>
                      <td>{fmt(r.paymentHours)}</td>
                      <td className='text-end'>
                        {/* View (tidak membuka history) */}
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

                        {/* Calendar → buka Time & Fingerprint History */}
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                          aria-label='History'
                          title='History'
                          onClick={() => setHistoryFor({empNo: r.empNo, empName: r.empName})}
                        >
                          {/* gunakan ikon kalender */}
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg'
                            className='svg-icon-3'
                          />
                          {/* jika di paketmu ikon kalender berbeda, bisa pakai gen014/gen020/gen018 sesuai aset */}
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

      {/* ===== Time & Fingerprint History ===== */}
      {historyFor && (
        <div className='mt-5' ref={historyRef}>
          <div className='bg-secondary px-3 py-2 d-flex justify-content-between align-items-center rounded-top'>
            <div className='fw-semibold'>
              Time and Fingerprint History - {historyFor.empName} - {historyFor.empNo}
            </div>
            <div className='d-flex align-items-center'>
              <div className='text-nowrap small me-2'>Start Date</div>
              <input
                type='date'
                className='form-control form-control-sm border-secondary'
                value={histStart}
                onChange={(e) => setHistStart(e.target.value)}
                style={{width: 155}}
              />
              <div className='text-nowrap small ms-3 me-2'>End Date</div>
              <input
                type='date'
                className='form-control form-control-sm border-secondary'
                value={histEnd}
                onChange={(e) => setHistEnd(e.target.value)}
                style={{width: 155}}
              />
              <button
                className='btn btn-sm btn-info ms-2'
                onClick={() => setHistFilterKey((k) => k + 1)}
                title='View'
              >
                View
              </button>
              <Button
                size='sm'
                variant='light-dark'
                className='ms-2'
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
                  <th className='min-w-140px'>Date</th>
                  <th className='min-w-90px'>Time In</th>
                  <th className='min-w-90px'>Time Out</th>
                  <th className='min-w-110px'>Scan In</th>
                  <th className='min-w-110px'>Scan Out</th>
                  <th className='min-w-90px'>Late</th>
                  <th className='min-w-90px'>Early</th>
                  <th className='min-w-110px'>Overtime</th>
                  <th className='min-w-110px'>Workhours</th>
                  <th className='min-w-110px'>Total Hours</th>
                  <th className='min-w-120px'>Payment Hrs</th>
                  <th className='text-end min-w-90px'>Action</th>
                </tr>
              </thead>
              <tbody>
                {historyRows.length === 0 ? (
                  <tr>
                    <td colSpan={12} className='text-center text-muted py-6'>
                      No history found.
                    </td>
                  </tr>
                ) : (
                  historyRows.map((h) => (
                    <tr key={h.id}>
                      <td>{fmtDate(h.date)}</td>
                      <td>{fmt(h.timeIn)}</td>
                      <td>{fmt(h.timeOut)}</td>
                      <td>{fmt(h.scanIn)}</td>
                      <td>{fmt(h.scanOut)}</td>
                      <td>{fmt(h.late)}</td>
                      <td>{fmt(h.early)}</td>
                      <td>{fmt(h.overtime)}</td>
                      <td>{fmt(h.workhours)}</td>
                      <td>{fmt(h.totalHours)}</td>
                      <td>{fmt(h.paymentHours)}</td>
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

export default TimeManagementTab
