import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Button} from 'react-bootstrap'
import {KTSVG} from '../../../../../../../../_metronic'
import {
  medicalRows,
  medicalHistoryMap,
  type MedicalRow,
  type MedicalHistoryRow,
} from '../dummy/dummyMedical'

const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : ''

type Filters = {
  site: string
  department: string
  section: string
  element: string
  date: string // optional filter by Date Diagnosis (YYYY-MM-DD)
}

type HistoryTarget = {empNo: string; empName: string} | null

export const MedicalRecordTab: React.FC = () => {
  const [filters] = useState<Filters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })

  // table rows (filtered & sorted)
  const rows = useMemo<MedicalRow[]>(() => {
    return medicalRows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.department === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
      .filter((r) => (filters.date ? r.dateDiagnosis === filters.date : true))
      .sort(
        (a, b) =>
          a.department.localeCompare(b.department) ||
          a.workgroup.localeCompare(b.workgroup) ||
          a.crew.localeCompare(b.crew) ||
          a.empNo.localeCompare(b.empNo)
      )
  }, [filters])

  const total = rows.length
  const counterByCrew = new Map<string, number>()

  // header group rows
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

  // ===== bottom history state
  const [historyFor, setHistoryFor] = useState<HistoryTarget>(null)
  const [histStart, setHistStart] = useState<string>('') // YYYY-MM-DD
  const [histEnd, setHistEnd] = useState<string>('') // YYYY-MM-DD
  const [, setHistKey] = useState<number>(0)

  const historyRows = useMemo<MedicalHistoryRow[]>(() => {
    if (!historyFor) return []
    const list = medicalHistoryMap[historyFor.empNo] ?? []
    if (!histStart && !histEnd) return list
    const s = histStart ? new Date(histStart) : null
    const e = histEnd ? new Date(histEnd) : null
    return list.filter((r) => {
      const d = new Date(r.requestDate)
      return (s ? d >= s : true) && (e ? d <= e : true)
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

  return (
    <div>
      {/* ===== Main Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px py-3'>No</th>
              <th className='min-w-220px py-3'>Employee</th>
              <th className='min-w-180px py-3'>Job Title</th>
              <th className='min-w-150px py-3'>Date Diagnosis</th>
              <th className='min-w-180px py-3'>Medical Provider</th>
              <th className='min-w-140px py-3'>Date From</th>
              <th className='min-w-140px py-3'>Date To</th>
              <th className='min-w-260px py-3'>Medical Diagnoses</th>
              <th className='min-w-140px py-3'>Medical Type</th>
              <th className='min-w-90px text-end py-3'>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={10} className='text-center text-muted py-10'>
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
                    out.push(renderHeaderRow(r.department.toUpperCase(), 10, 'dept'))
                    lastDept = r.department
                    lastWg = ''
                    lastCrew = ''
                  }
                  if (r.workgroup !== lastWg) {
                    out.push(renderHeaderRow(r.workgroup, 10, 'wg'))
                    lastWg = r.workgroup
                    lastCrew = ''
                  }
                  if (r.crew !== lastCrew) {
                    out.push(renderHeaderRow(r.crew, 10, 'crew'))
                    lastCrew = r.crew
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
                      <td>{fmtDate(r.dateDiagnosis)}</td>
                      <td>{r.medicalProvider}</td>
                      <td>{fmtDate(r.dateFrom)}</td>
                      <td>{fmtDate(r.dateTo)}</td>
                      <td>{r.medicalDiagnoses}</td>
                      <td>{r.medicalType}</td>
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
                        {/* Calendar icon → OPEN HISTORY */}
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                          aria-label='History'
                          title='History'
                          onClick={() => setHistoryFor({empNo: r.empNo, empName: r.empName})}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen014.svg' // calendar
                            className='svg-icon-3'
                          />
                        </button>
                        {/* Optional: edit/view icons if needed */}
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

      {/* ===== Bottom Panel: Leave and Travel History (Medical) ===== */}
      {historyFor && (
        <div className='mt-5' ref={historyRef}>
          <div className='bg-secondary px-3 py-2 d-flex justify-content-between align-items-center rounded-top'>
            <div className='fw-semibold'>
              Medical Record History - {historyFor.empName} - {historyFor.empNo}
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
              <button className='btn btn-sm btn-info ms-2' onClick={() => setHistKey((k) => k + 1)}>
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
                  setHistKey((k) => k + 1)
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
                  <th className='min-w-150px'>Request Date</th>
                  <th className='min-w-180px'>Medical Provider</th>
                  <th className='min-w-140px'>Date From</th>
                  <th className='min-w-140px'>Date To</th>
                  <th className='min-w-260px'>Medical Diagnoses</th>
                  <th className='min-w-140px'>Medical Type</th>
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
                      <td>{fmtDate(h.requestDate)}</td>
                      <td>{h.medicalProvider}</td>
                      <td>{fmtDate(h.dateFrom)}</td>
                      <td>{fmtDate(h.dateTo)}</td>
                      <td>{h.medicalDiagnoses}</td>
                      <td>{h.medicalType}</td>
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

export default MedicalRecordTab
