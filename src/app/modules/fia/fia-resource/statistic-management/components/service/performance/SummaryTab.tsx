import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {
  violationSummaryRows,
  warningSummaryRows,
} from '../dummy/performance/performanceSummaryDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

const groupByDept = <T extends {departmentCode: string}>(rows: T[]) =>
  rows.reduce<Record<string, T[]>>((acc, r) => {
    ;(acc[r.departmentCode] ||= []).push(r)
    return acc
  }, {})

// helpers angka
const sum = <T extends Record<string, any>>(rows: T[], key: keyof T) =>
  rows.reduce((a, b) => a + (b[key] as number), 0)

const avg = <T extends Record<string, any>>(rows: T[], key: keyof T) =>
  rows.length ? (rows.reduce((a, b) => a + (b[key] as number), 0) / rows.length).toFixed(1) : '0.0'

export const ServicePerformanceSummaryTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  // ===== Filtered data (memoized) =====
  const filteredViolation = useMemo(
    () =>
      violationSummaryRows
        .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
        .filter((r) => (filters.department ? r.departmentName === filters.department : true))
        .filter((r) => (filters.section ? r.section === filters.section : true))
        .filter((r) => (filters.element ? r.element === filters.element : true)),
    [filters]
  )

  const filteredWarning = useMemo(
    () =>
      warningSummaryRows
        .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
        .filter((r) => (filters.department ? r.departmentName === filters.department : true))
        .filter((r) => (filters.section ? r.section === filters.section : true))
        .filter((r) => (filters.element ? r.element === filters.element : true)),
    [filters]
  )

  // ===== Grouped (memoized) =====
  const groupedViolation = useMemo(() => groupByDept(filteredViolation), [filteredViolation])
  const groupedWarning = useMemo(() => groupByDept(filteredWarning), [filteredWarning])

  return (
    <div>
      {/* ======= VIOLATION ======= */}
      <div className='mb-3'>
        <Title text2='WORKFORCE VIOLATION SUMMARY' style={{fontSize: 17}} className='mb-5 mt-0' />
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary text-center'>
                <th className='min-w-60px'>No</th>
                <th className='min-w-340px text-start'>Department - Workgroup</th>
                <th>Present</th>
                <th>Day Off</th>
                <th>Leave</th>
                <th>Absent</th>
                <th>Sick</th>
                <th>Total</th>
                <th>Available</th>
                <th>Raw Available</th>
                <th>Effective</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedViolation).map(([deptCode, rows]) => {
                const deptName = rows[0].departmentName
                return (
                  <React.Fragment key={deptCode}>
                    <tr className='fw-bold bg-light-primary'>
                      <td colSpan={11}>
                        {deptCode} &nbsp; {deptName}
                      </td>
                    </tr>

                    {rows.map((r, i) => (
                      <tr key={r.id} className='text-center'>
                        <td>{i + 1}</td>
                        <td className='text-start'>{r.workgroup}</td>
                        <td>{r.present}</td>
                        <td>{r.dayOff}</td>
                        <td>{r.leave}</td>
                        <td>{r.absent}</td>
                        <td>{r.sick}</td>
                        <td className='fw-semibold'>{r.total}</td>
                        <td>{r.available.toFixed(1)}</td>
                        <td>{r.rawAvailable.toFixed(1)}</td>
                        <td>{r.effective.toFixed(1)}</td>
                      </tr>
                    ))}

                    {/* subtotal per department */}
                    <tr className='fw-semibold bg-light text-center'>
                      <td colSpan={2} className='text-end pe-2'>
                        Total {deptName} :
                      </td>
                      <td>{sum(rows, 'present')}</td>
                      <td>{sum(rows, 'dayOff')}</td>
                      <td>{sum(rows, 'leave')}</td>
                      <td>{sum(rows, 'absent')}</td>
                      <td>{sum(rows, 'sick')}</td>
                      <td>{sum(rows, 'total')}</td>
                      <td>{avg(rows, 'available')}</td>
                      <td>{avg(rows, 'rawAvailable')}</td>
                      <td>{avg(rows, 'effective')}</td>
                    </tr>
                  </React.Fragment>
                )
              })}

              {/* grand total (sesuai filter) */}
              <tr className='fw-bold bg-secondary text-center'>
                <td colSpan={2} className='text-end pe-2'>
                  Workforce Grand Total :
                </td>
                <td>{sum(filteredViolation, 'present')}</td>
                <td>{sum(filteredViolation, 'dayOff')}</td>
                <td>{sum(filteredViolation, 'leave')}</td>
                <td>{sum(filteredViolation, 'absent')}</td>
                <td>{sum(filteredViolation, 'sick')}</td>
                <td>{sum(filteredViolation, 'total')}</td>
                <td>{avg(filteredViolation, 'available')}</td>
                <td>{avg(filteredViolation, 'rawAvailable')}</td>
                <td>{avg(filteredViolation, 'effective')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ======= WARNING ======= */}
      <div className='mt-5'>
        <Title text2='WORKFORCE WARNING SUMMARY' style={{fontSize: 17}} className='mb-5' />
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary text-center'>
                <th className='min-w-60px'>No</th>
                <th className='min-w-340px text-start'>Department - Workgroup</th>
                <th>Verbal Warning</th>
                <th>Warning 1</th>
                <th>Warning 2</th>
                <th>Warning 3</th>
                <th>Suspension</th>
                <th>Termination</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedWarning).map(([deptCode, rows]) => {
                const deptName = rows[0].departmentName
                return (
                  <React.Fragment key={deptCode}>
                    <tr className='fw-bold bg-light-primary'>
                      <td colSpan={8}>
                        {deptCode} &nbsp; {deptName}
                      </td>
                    </tr>

                    {rows.map((r, i) => (
                      <tr key={r.id} className='text-center'>
                        <td>{i + 1}</td>
                        <td className='text-start'>{r.workgroup}</td>
                        <td>{r.verbal}</td>
                        <td>{r.warn1}</td>
                        <td>{r.warn2}</td>
                        <td>{r.warn3}</td>
                        <td>{r.suspension}</td>
                        <td>{r.termination}</td>
                      </tr>
                    ))}

                    {/* subtotal per department */}
                    <tr className='fw-semibold bg-light text-center'>
                      <td colSpan={2} className='text-end pe-2'>
                        Total {deptName} :
                      </td>
                      <td>{sum(rows, 'verbal')}</td>
                      <td>{sum(rows, 'warn1')}</td>
                      <td>{sum(rows, 'warn2')}</td>
                      <td>{sum(rows, 'warn3')}</td>
                      <td>{sum(rows, 'suspension')}</td>
                      <td>{sum(rows, 'termination')}</td>
                    </tr>
                  </React.Fragment>
                )
              })}

              {/* grand total (sesuai filter) */}
              <tr className='fw-bold bg-secondary text-center'>
                <td colSpan={2} className='text-end pe-2'>
                  Workforce Grand Total :
                </td>
                <td>{sum(filteredWarning, 'verbal')}</td>
                <td>{sum(filteredWarning, 'warn1')}</td>
                <td>{sum(filteredWarning, 'warn2')}</td>
                <td>{sum(filteredWarning, 'warn3')}</td>
                <td>{sum(filteredWarning, 'suspension')}</td>
                <td>{sum(filteredWarning, 'termination')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ServicePerformanceSummaryTab
