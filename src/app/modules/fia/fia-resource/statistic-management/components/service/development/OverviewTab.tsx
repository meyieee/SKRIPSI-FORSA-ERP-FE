import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {developmentOverviewRows} from '../dummy/development/developmentOverviewDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

export const ServiceDevelopmentOverviewTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = developmentOverviewRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // apply simple dept filter (cukup untuk demo)
  const filtered = useMemo(() => {
    return filters.department ? rows.filter((r) => r.department === filters.department) : rows
  }, [filters.department, rows])

  // group by departmentCode
  const grouped = useMemo(() => {
    const m = new Map<string, typeof filtered>()
    filtered.forEach((r) => {
      const key = r.departmentCode
      if (!m.has(key)) m.set(key, [])
      m.get(key)!.push(r)
    })
    return Array.from(m.entries())
  }, [filtered])

  const sum = (
    rows: typeof filtered,
    sec: 'appraisal' | 'training',
    field: 'staff' | 'nonStaff' | 'expat' | 'total'
  ) => rows.reduce((a, b) => a + b[sec][field], 0)

  return (
    <div>
      <Title text2='MANPOWER DEVELOPMENT OVERVIEW' style={{fontSize: '17px'}} className='mb-5' />

      {/* ===== Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Workgroup - Cost Center</th>
              <th colSpan={4}>Appraisal Completed</th>
              <th colSpan={4}>Training Conduct</th>
            </tr>
            <tr className='bg-secondary'>
              <th>Staff</th>
              <th>Non Staff</th>
              <th>Expat</th>
              <th>Total</th>
              <th>Staff</th>
              <th>Non Staff</th>
              <th>Expat</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {grouped.map(([deptCode, rows]) => {
              const deptName = rows[0].department
              return (
                <React.Fragment key={deptCode}>
                  {/* Header per department */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={10}>
                      {deptCode} - {deptName}
                    </td>
                  </tr>

                  {rows.map((r, i) => (
                    <tr key={r.id} className='text-center'>
                      <td>{i + 1}</td>
                      <td className='text-start'>{r.workgroup}</td>

                      {/* Appraisal */}
                      <td>{r.appraisal.staff}</td>
                      <td>{r.appraisal.nonStaff}</td>
                      <td>{r.appraisal.expat}</td>
                      <td>{r.appraisal.total}</td>

                      {/* Training */}
                      <td>{r.training.staff}</td>
                      <td>{r.training.nonStaff}</td>
                      <td>{r.training.expat}</td>
                      <td>{r.training.total}</td>
                    </tr>
                  ))}

                  {/* subtotal per department */}
                  <tr className='fw-semibold bg-light text-center'>
                    <td colSpan={2} className='text-end pe-2'>
                      Total {deptName} :
                    </td>
                    <td>{sum(rows, 'appraisal', 'staff')}</td>
                    <td>{sum(rows, 'appraisal', 'nonStaff')}</td>
                    <td>{sum(rows, 'appraisal', 'expat')}</td>
                    <td>{sum(rows, 'appraisal', 'total')}</td>
                    <td>{sum(rows, 'training', 'staff')}</td>
                    <td>{sum(rows, 'training', 'nonStaff')}</td>
                    <td>{sum(rows, 'training', 'expat')}</td>
                    <td>{sum(rows, 'training', 'total')}</td>
                  </tr>
                </React.Fragment>
              )
            })}

            {/* Grand Total */}
            <tr className='fw-bold bg-secondary text-center'>
              <td colSpan={2} className='text-end pe-2'>
                Manpower Grand Total :
              </td>
              <td>{sum(rows, 'appraisal', 'staff')}</td>
              <td>{sum(rows, 'appraisal', 'nonStaff')}</td>
              <td>{sum(rows, 'appraisal', 'expat')}</td>
              <td>{sum(rows, 'appraisal', 'total')}</td>
              <td>{sum(rows, 'training', 'staff')}</td>
              <td>{sum(rows, 'training', 'nonStaff')}</td>
              <td>{sum(rows, 'training', 'expat')}</td>
              <td>{sum(rows, 'training', 'total')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServiceDevelopmentOverviewTab
