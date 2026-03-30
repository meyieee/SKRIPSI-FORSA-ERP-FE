import React from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {assetUniformOverviewRows} from '../dummy/facilities/facilitiesOverviewDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

const sum = (arr: any[], pick: (r: any) => number) => arr.reduce((a, b) => a + pick(b), 0)

export const ServiceFacilitiesOverviewTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = assetUniformOverviewRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.departmentName === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  return (
    <div>
      <Title text2='LEAVE & TRAVEL OVERVIEW' style={{fontSize: 17}} className='mb-5' />

      {/* Table */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2}>Department Description</th>
              <th colSpan={4}>Personal Protective Equipment</th>
              <th colSpan={2}>Uniform</th>
              <th colSpan={4}>Company Asset</th>
            </tr>
            <tr className='bg-secondary'>
              <th>Shoes</th>
              <th>Helmet</th>
              <th>Glasses</th>
              <th>Vest</th>
              <th>T-Shirt</th>
              <th>Pants</th>
              <th>Building</th>
              <th>Machinery</th>
              <th>Equipment</th>
              <th>Supplies</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className='text-center'>
                <td className='text-start'>{`${r.departmentCode}-${r.departmentName}`}</td>
                <td>{r.ppe.shoes}</td>
                <td>{r.ppe.helmet}</td>
                <td>{r.ppe.glasses}</td>
                <td>{r.ppe.vest}</td>
                <td>{r.uniform.tshirt}</td>
                <td>{r.uniform.pants}</td>
                <td>{r.asset.building}</td>
                <td>{r.asset.machinery}</td>
                <td>{r.asset.equipment}</td>
                <td>{r.asset.supplies}</td>
              </tr>
            ))}

            {/* Grand Total */}
            <tr className='fw-bold bg-secondary text-center'>
              <td className='text-end pe-2'>Grand Total :</td>
              <td>{sum(rows, (r) => r.ppe.shoes)}</td>
              <td>{sum(rows, (r) => r.ppe.helmet)}</td>
              <td>{sum(rows, (r) => r.ppe.glasses)}</td>
              <td>{sum(rows, (r) => r.ppe.vest)}</td>
              <td>{sum(rows, (r) => r.uniform.tshirt)}</td>
              <td>{sum(rows, (r) => r.uniform.pants)}</td>
              <td>{sum(rows, (r) => r.asset.building)}</td>
              <td>{sum(rows, (r) => r.asset.machinery)}</td>
              <td>{sum(rows, (r) => r.asset.equipment)}</td>
              <td>{sum(rows, (r) => r.asset.supplies)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServiceFacilitiesOverviewTab
