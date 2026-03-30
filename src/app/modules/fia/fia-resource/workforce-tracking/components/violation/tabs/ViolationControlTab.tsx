// workforce-tracking/components/violation/tabs/ViolationControlTab.tsx
import React, {useMemo, useState} from 'react'
import {KTSVG} from '../../../../../../../../_metronic'
import {violationRows} from '../dummy/violationDummy'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {day: '2-digit', month: 'short', year: 'numeric'})

type Filters = {
  site: string
  department: string
  section: string
  element: string
  date: string // '' or YYYY-MM-DD
}

export const ViolationControlTab: React.FC = () => {
  const [filters] = useState<Filters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })

  // filtered rows
  const rows = useMemo(() => {
    return violationRows
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

  // LEGEND (ditaruh di bawah baris filter)
  const Legend = () => (
    <div className='d-flex align-items-center flex-wrap gap-2 small'>
      <span className='me-1'>Legend :</span>
      <span className='badge bg-dark'>Current Present</span>
      <span className='badge bg-success'>Behind Within 1 - 3 Days</span>
      <span className='badge bg-warning'>Behind Within 4 - 7 Days</span>
      <span className='badge bg-danger'>Behind Above 7 Days</span>
    </div>
  )

  const total = rows.length
  const counterByCrew = new Map<string, number>()

  return (
    <div>
      <div className='mb-4'>
        <Legend />
      </div>
      {/* ===== Tabel ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px py-3'>No</th>
              <th className='min-w-150px py-3'>Employee</th>
              <th className='min-w-110px py-3'>Date</th>
              <th className='min-w-90px py-3'>Shift</th>
              <th className='min-w-110px py-3'>Status</th>
              <th className='min-w-200px py-3'>Reason for Absent</th>
              <th className='min-w-220px py-3'>Comments for Absent</th>
              <th className='min-w-140px py-3'>Violation Category</th>
              <th className='min-w-140px py-3'>Action Taken</th>
              <th className='min-w-80px text-end py-3'>Action</th>
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
                let lastDept = '',
                  lastWg = '',
                  lastCrew = ''
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
                      <td className={r.status === 'Present' ? 'text-success' : ''}>
                        {formatDate(r.date)}
                      </td>
                      <td>{r.shift}</td>
                      <td>
                        {r.status === 'Absent' && <span className='badge bg-danger'>Absent</span>}
                        {r.status === 'Late' && <span className='badge bg-warning'>Late</span>}
                        {r.status === 'Present' && <span className='badge bg-dark'>Present</span>}
                        {r.status === 'Leave' && (
                          <span className='badge bg-info text-secondary'>Leave</span>
                        )}
                      </td>
                      <td>{r.reason || '-'}</td>
                      <td className='text-gray-800'>{r.comments || '-'}</td>
                      <td>{r.category}</td>
                      <td>{r.actionTaken || '-'}</td>
                      <td className='text-end'>
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
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
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
      </div>

      <div className='small text-gray-600 mt-2'>
        Showing <span className='fw-semibold'>{total}</span> record{total !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default ViolationControlTab
