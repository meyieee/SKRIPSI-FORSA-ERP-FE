import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {leaveTravelSummaryRows} from '../dummy/benefit/benefitsSummaryDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

const sum = (
  rows: typeof leaveTravelSummaryRows,
  key: keyof typeof leaveTravelSummaryRows[number]
) => rows.reduce((a, b) => a + (b[key] as unknown as number), 0)

export const ServiceBenefitsSummaryTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = leaveTravelSummaryRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.departmentName === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // kelompok per department
  const grouped = useMemo(() => {
    const m: Record<string, typeof rows> = {}
    rows.forEach((r) => {
      if (!m[r.departmentCode]) m[r.departmentCode] = []
      m[r.departmentCode].push(r)
    })
    return m
  }, [rows])

  const subtotal = (rows: typeof leaveTravelSummaryRows, k: keyof typeof rows[number]) =>
    rows.reduce((a, b) => a + (b[k] as unknown as number), 0)

  return (
    <div>
      <Title text2='WORKFORCE LEAVE & TRAVEL SUMMARY' style={{fontSize: 17}} className='mb-5' />

      {/* ===== Tabel ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2} className='text-center'>
                No
              </th>
              <th rowSpan={2} className='text-start'>
                Department - Workgroup
              </th>
              <th colSpan={3}>Management</th>
              <th colSpan={2}>Supervisor</th>
              <th colSpan={2}>Craft</th>
            </tr>
            <tr className='bg-secondary'>
              <th>Superintendent</th>
              <th>Manager</th>
              <th>Director</th>
              <th>Supervisor</th>
              <th>Foreman</th>
              <th>Non Staff</th>
              <th>Leadhand</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(grouped).map(([deptCode, rows]) => {
              const deptName = rows[0].departmentName
              return (
                <React.Fragment key={deptCode}>
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={9}>
                      {deptCode} {deptName}
                    </td>
                  </tr>

                  {rows.map((r, idx) => (
                    <tr key={r.id} className='text-center'>
                      <td>{idx + 1}</td>
                      <td className='text-start'>{r.workgroup}</td>
                      <td>{r.superintendent}</td>
                      <td>{r.manager}</td>
                      <td>{r.director}</td>
                      <td>{r.supervisor}</td>
                      <td>{r.foreman}</td>
                      <td>{r.nonStaff}</td>
                      <td>{r.leadhand}</td>
                    </tr>
                  ))}

                  {/* subtotal per department */}
                  <tr className='fw-semibold bg-light text-center'>
                    <td colSpan={2} className='text-end pe-2'>
                      Total {deptName} :
                    </td>
                    <td>{subtotal(rows, 'superintendent')}</td>
                    <td>{subtotal(rows, 'manager')}</td>
                    <td>{subtotal(rows, 'director')}</td>
                    <td>{subtotal(rows, 'supervisor')}</td>
                    <td>{subtotal(rows, 'foreman')}</td>
                    <td>{subtotal(rows, 'nonStaff')}</td>
                    <td>{subtotal(rows, 'leadhand')}</td>
                  </tr>
                </React.Fragment>
              )
            })}

            {/* Grand Total */}
            <tr className='fw-bold bg-secondary text-center'>
              <td colSpan={2} className='text-start'>
                Workforce Grand Total :
              </td>
              <td>{sum(rows, 'superintendent')}</td>
              <td>{sum(rows, 'manager')}</td>
              <td>{sum(rows, 'director')}</td>
              <td>{sum(rows, 'supervisor')}</td>
              <td>{sum(rows, 'foreman')}</td>
              <td>{sum(rows, 'nonStaff')}</td>
              <td>{sum(rows, 'leadhand')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServiceBenefitsSummaryTab
