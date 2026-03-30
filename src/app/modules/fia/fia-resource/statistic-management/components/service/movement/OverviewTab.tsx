import React from 'react'
import {movementOverviewRows} from '../dummy/movement/movementOverviewDummy'
import Title from '../../../../my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'

export const ServiceMovementOverviewTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = movementOverviewRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // Group by Department
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
    section: 'opening' | 'hire' | 'left' | 'closing',
    field: 'staff' | 'nonStaff' | 'expat' | 'total'
  ) => rows.reduce((a, b) => a + b[section][field], 0)

  return (
    <div>
      <Title
        text2='CURRENT MANPOWER MOVEMENT OVERVIEW'
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
              <th colSpan={4}>Opening Balance</th>
              <th colSpan={4}>Hire</th>
              <th colSpan={4}>Left</th>
              <th colSpan={4}>Closing Balance</th>
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
                    <td colSpan={18}>
                      {deptCode} - {deptName}
                    </td>
                  </tr>
                  {rows.map((r, i) => (
                    <tr key={r.id} className='text-center'>
                      <td>{i + 1}</td>
                      <td className='text-start'>{r.workgroup}</td>

                      {/* Opening */}
                      <td>{r.opening.staff}</td>
                      <td>{r.opening.nonStaff}</td>
                      <td>{r.opening.expat}</td>
                      <td>{r.opening.total}</td>

                      {/* Hire */}
                      <td>{r.hire.staff}</td>
                      <td>{r.hire.nonStaff}</td>
                      <td>{r.hire.expat}</td>
                      <td>{r.hire.total}</td>

                      {/* Left */}
                      <td>{r.left.staff}</td>
                      <td>{r.left.nonStaff}</td>
                      <td>{r.left.expat}</td>
                      <td>{r.left.total}</td>

                      {/* Closing */}
                      <td>{r.closing.staff}</td>
                      <td>{r.closing.nonStaff}</td>
                      <td>{r.closing.expat}</td>
                      <td>{r.closing.total}</td>
                    </tr>
                  ))}
                  <tr className='fw-semibold bg-light text-center'>
                    <td colSpan={2} className='text-end pe-2'>
                      Total {deptName} :
                    </td>
                    <td>{sumField(rows, 'opening', 'staff')}</td>
                    <td>{sumField(rows, 'opening', 'nonStaff')}</td>
                    <td>{sumField(rows, 'opening', 'expat')}</td>
                    <td>{sumField(rows, 'opening', 'total')}</td>
                    <td>{sumField(rows, 'hire', 'staff')}</td>
                    <td>{sumField(rows, 'hire', 'nonStaff')}</td>
                    <td>{sumField(rows, 'hire', 'expat')}</td>
                    <td>{sumField(rows, 'hire', 'total')}</td>
                    <td>{sumField(rows, 'left', 'staff')}</td>
                    <td>{sumField(rows, 'left', 'nonStaff')}</td>
                    <td>{sumField(rows, 'left', 'expat')}</td>
                    <td>{sumField(rows, 'left', 'total')}</td>
                    <td>{sumField(rows, 'closing', 'staff')}</td>
                    <td>{sumField(rows, 'closing', 'nonStaff')}</td>
                    <td>{sumField(rows, 'closing', 'expat')}</td>
                    <td>{sumField(rows, 'closing', 'total')}</td>
                  </tr>
                </React.Fragment>
              )
            })}
            {/* Grand Total */}
            <tr className='fw-bold bg-secondary text-center'>
              <td colSpan={2} className='text-end pe-2'>
                Workforce Grand Total :
              </td>
              <td>{sumField(rows, 'opening', 'staff')}</td>
              <td>{sumField(rows, 'opening', 'nonStaff')}</td>
              <td>{sumField(rows, 'opening', 'expat')}</td>
              <td>{sumField(rows, 'opening', 'total')}</td>
              <td>{sumField(rows, 'hire', 'staff')}</td>
              <td>{sumField(rows, 'hire', 'nonStaff')}</td>
              <td>{sumField(rows, 'hire', 'expat')}</td>
              <td>{sumField(rows, 'hire', 'total')}</td>
              <td>{sumField(rows, 'left', 'staff')}</td>
              <td>{sumField(rows, 'left', 'nonStaff')}</td>
              <td>{sumField(rows, 'left', 'expat')}</td>
              <td>{sumField(rows, 'left', 'total')}</td>
              <td>{sumField(rows, 'closing', 'staff')}</td>
              <td>{sumField(rows, 'closing', 'nonStaff')}</td>
              <td>{sumField(rows, 'closing', 'expat')}</td>
              <td>{sumField(rows, 'closing', 'total')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServiceMovementOverviewTab
