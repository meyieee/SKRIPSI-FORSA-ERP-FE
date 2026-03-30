import React from 'react'
import {planOverviewRows} from '../dummy/overviewDummy'
import Title from '../../../../my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'

export const PlanOverviewTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = planOverviewRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // Group by department
  const groupByDept = () => {
    const groups: Record<string, typeof rows> = {}
    rows.forEach((r) => {
      if (!groups[r.departmentCode]) groups[r.departmentCode] = []
      groups[r.departmentCode].push(r)
    })
    return groups
  }

  const grouped = groupByDept()

  const sumField = (
    rows: any[],
    section: 'current' | 'additional' | 'requirement',
    field: 'staff' | 'nonStaff' | 'expat' | 'total'
  ) => rows.reduce((a, b) => a + b[section][field], 0)

  return (
    <div>
      <Title
        text2='CURRENT MANPOWER PLAN/DEMAND OVERVIEW'
        style={{fontSize: '17px'}}
        className='mb-5'
      />

      {/* Table */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Workgroup - Cost Center</th>
              <th colSpan={4}>Current Manpower</th>
              <th colSpan={4}>Additional</th>
              <th colSpan={4}>Requirement</th>
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
              <th>Staff</th>
              <th>Non Staff</th>
              <th>Expat</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).map(([deptCode, rows]) => {
              const deptName = rows[0].department
              return (
                <React.Fragment key={deptCode}>
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={14}>
                      {deptCode} - {deptName}
                    </td>
                  </tr>
                  {rows.map((r, i) => (
                    <tr key={r.id} className='text-center'>
                      <td>{i + 1}</td>
                      <td className='text-start'>{r.workgroup}</td>

                      {/* Current */}
                      <td>{r.current.staff}</td>
                      <td>{r.current.nonStaff}</td>
                      <td>{r.current.expat}</td>
                      <td>{r.current.total}</td>

                      {/* Additional */}
                      <td>{r.additional.staff}</td>
                      <td>{r.additional.nonStaff}</td>
                      <td>{r.additional.expat}</td>
                      <td>{r.additional.total}</td>

                      {/* Requirement */}
                      <td>{r.requirement.staff}</td>
                      <td>{r.requirement.nonStaff}</td>
                      <td>{r.requirement.expat}</td>
                      <td>{r.requirement.total}</td>
                    </tr>
                  ))}
                  <tr className='fw-semibold bg-light text-center'>
                    <td colSpan={2} className='text-end pe-2'>
                      Total {deptName} :
                    </td>
                    <td>{sumField(rows, 'current', 'staff')}</td>
                    <td>{sumField(rows, 'current', 'nonStaff')}</td>
                    <td>{sumField(rows, 'current', 'expat')}</td>
                    <td>{sumField(rows, 'current', 'total')}</td>
                    <td>{sumField(rows, 'additional', 'staff')}</td>
                    <td>{sumField(rows, 'additional', 'nonStaff')}</td>
                    <td>{sumField(rows, 'additional', 'expat')}</td>
                    <td>{sumField(rows, 'additional', 'total')}</td>
                    <td>{sumField(rows, 'requirement', 'staff')}</td>
                    <td>{sumField(rows, 'requirement', 'nonStaff')}</td>
                    <td>{sumField(rows, 'requirement', 'expat')}</td>
                    <td>{sumField(rows, 'requirement', 'total')}</td>
                  </tr>
                </React.Fragment>
              )
            })}
            <tr className='fw-bold bg-secondary text-center'>
              <td colSpan={2} className='text-end pe-2'>
                Manpower Grand Total :
              </td>
              <td>{sumField(rows, 'current', 'staff')}</td>
              <td>{sumField(rows, 'current', 'nonStaff')}</td>
              <td>{sumField(rows, 'current', 'expat')}</td>
              <td>{sumField(rows, 'current', 'total')}</td>
              <td>{sumField(rows, 'additional', 'staff')}</td>
              <td>{sumField(rows, 'additional', 'nonStaff')}</td>
              <td>{sumField(rows, 'additional', 'expat')}</td>
              <td>{sumField(rows, 'additional', 'total')}</td>
              <td>{sumField(rows, 'requirement', 'staff')}</td>
              <td>{sumField(rows, 'requirement', 'nonStaff')}</td>
              <td>{sumField(rows, 'requirement', 'expat')}</td>
              <td>{sumField(rows, 'requirement', 'total')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlanOverviewTab
