import React from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {medicalOverviewRows} from '../dummy/benefit/benefitsOverviewDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

const sum = <K extends keyof typeof medicalOverviewRows[number]>(
  rows: typeof medicalOverviewRows,
  key: K
) => rows.reduce((a, b) => a + (b[key] as unknown as number), 0)

export const ServiceBenefitsOverviewTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = medicalOverviewRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.departmentName === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  return (
    <div>
      <Title text2='MEDICAL RECORD OVERVIEW' style={{fontSize: 17}} className='mb-5' />

      {/* ===== Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2} className='text-start'>
                Department Description
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
            {rows.map((r) => (
              <tr key={r.id} className='text-center'>
                <td className='text-start'>
                  {r.departmentCode}-{r.departmentName}
                </td>
                <td>{r.superintendent}</td>
                <td>{r.manager}</td>
                <td>{r.director}</td>
                <td>{r.supervisor}</td>
                <td>{r.foreman}</td>
                <td>{r.nonStaff}</td>
                <td>{r.leadhand}</td>
              </tr>
            ))}

            {/* Grand Total sesuai foto */}
            <tr className='fw-bold bg-secondary text-center'>
              <td className='text-start'>Grand Total :</td>
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

export default ServiceBenefitsOverviewTab
