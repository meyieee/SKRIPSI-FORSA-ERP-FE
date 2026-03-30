import React, {useMemo, useState} from 'react'
import {violationRows} from '../dummy/violationDummy'
import '../styles/violation-update.scss'
import {KTSVG} from '../../../../../../../../_metronic'

type Filters = {site: string; department: string; section: string; element: string; date: string}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {day: '2-digit', month: 'short', year: 'numeric'})

export const ViolationUpdateTab: React.FC = () => {
  const [filters] = useState<Filters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })

  // filter + urut untuk grouping
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

  // LEGEND (ditaruh di bawah baris filter)
  const Legend = () => (
    <div className='d-flex align-items-center flex-wrap gap-2 small'>
      <span className='me-1'>Legend :</span>
      <span className='badge bg-primary'>PRESENT</span>
      <span className='badge bg-dark'>DAY OFF</span>
      <span className='badge bg-danger'>ABSENT</span>
      <span className='badge bg-warning'>SICK</span>
      <span className='badge bg-success '>LATE</span>
      <span className='badge bg-info '>LEAVE</span>
    </div>
  )

  type AttKey = 'present' | 'day_off' | 'absent' | 'sick' | 'late' | 'leave'
  // helper header baris grouping
  const HeaderRow = (text: string, tone: 'dept' | 'wg' | 'crew') => {
    const cls =
      tone === 'dept'
        ? 'bg-light-primary text-primary fw-semibold'
        : tone === 'wg'
        ? 'bg-light-success fw-semibold'
        : 'bg-light-warning fw-semibold fst-italic'
    return (
      <tr>
        <td colSpan={11} className={cls}>
          {text}
        </td>
      </tr>
    )
  }

  // penomoran per-crew
  const counterByCrew = new Map<string, number>()

  // render 4 kotak Attendance seperti foto
  const AttendanceBoxes: React.FC<{
    status: 'Present' | 'Day Off' | 'Absent' | 'Sick' | 'Late' | 'Leave'
  }> = ({status}) => {
    const isSel = (k: AttKey) =>
      (status === 'Present' && k === 'present') ||
      (status === 'Day Off' && k === 'day_off') ||
      (status === 'Absent' && k === 'absent') ||
      (status === 'Sick' && k === 'sick') ||
      (status === 'Late' && k === 'late') ||
      (status === 'Leave' && k === 'leave')

    return (
      <div className='att-grid'>
        <span className={`att-box bg-primary ${isSel('present') ? 'att-x' : ''}`} />
        <span className={`att-box bg-secondary ${isSel('day_off') ? 'att-x' : ''}`} />
        <span className={`att-box bg-danger ${isSel('absent') ? 'att-x' : ''}`} />
        <span className={`att-box bg-warning ${isSel('sick') ? 'att-x' : ''}`} />
        <span className={`att-box bg-success ${isSel('late') ? 'att-x' : ''}`} />
        <span className={`att-box bg-info ${isSel('leave') ? 'att-x' : ''}`} />
      </div>
    )
  }

  return (
    <div>
      <div className='mb-4'>
        <Legend />
      </div>

      {/* Tabel sesuai foto */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='py-3'>No</th>
              <th className=' py-3'>Attendance</th>
              <th className='py-3'>Employee</th>
              <th className=' py-3'>Date</th>
              <th className='py-3'>Shift</th>
              <th className=' py-3'>Status</th>
              <th className=' py-3'>Reason for Absent</th>
              <th className=' py-3'>Comments for Absent</th>
              <th className=' py-3'>Violation Category</th>
              <th className=' py-3'>Action Taken</th>
              <th className='text-end py-3'>Action</th>
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
                    out.push(HeaderRow(r.department.toUpperCase(), 'dept'))
                    lastDept = r.department
                    lastWg = ''
                    lastCrew = ''
                  }
                  if (r.workgroup !== lastWg) {
                    out.push(HeaderRow(r.workgroup, 'wg'))
                    lastWg = r.workgroup
                    lastCrew = ''
                  }
                  if (r.crew !== lastCrew) {
                    out.push(HeaderRow(r.crew, 'crew'))
                    lastCrew = r.crew
                    counterByCrew.set(r.crew, 0)
                  }

                  const n = (counterByCrew.get(r.crew) ?? 0) + 1
                  counterByCrew.set(r.crew, n)

                  const status =
                    r.status === 'Absent'
                      ? 'Absent'
                      : r.status === 'Late'
                      ? 'Late'
                      : r.status === 'Leave'
                      ? 'Leave'
                      : 'Present'

                  out.push(
                    <tr key={r.id}>
                      <td>{n}</td>
                      <td>
                        <AttendanceBoxes status={status as any} />
                      </td>
                      <td>
                        <div className='fw-semibold'>{r.empNo}</div>
                        <div className='text-gray-800'>{r.empName}</div>
                      </td>
                      <td>{formatDate(r.date)}</td>
                      <td>{r.shift}</td>
                      <td>{status}</td>
                      <td>{r.reason || '-'}</td>
                      <td className='text-gray-800'>{r.comments || '-'}</td>
                      <td>{r.category}</td>
                      <td>{r.actionTaken || '-'}</td>
                      <td className='text-end text-nowrap'>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
      </div>
    </div>
  )
}

export default ViolationUpdateTab
