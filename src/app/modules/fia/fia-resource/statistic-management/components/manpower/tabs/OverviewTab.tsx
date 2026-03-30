import React, {useMemo} from 'react'
import {manpowerOverviewRows} from '../dummy/overviewDummy'
import Title from '../../../../../../fia/fia-resource/my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'

export const ManpowerOverviewTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = manpowerOverviewRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // ===== Filtered data =====
  const filteredRows = useMemo(() => {
    return rows
      .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
      .filter((r) => (filters.department ? r.department === filters.department : true))
      .filter((r) => (filters.section ? r.section === filters.section : true))
      .filter((r) => (filters.element ? r.element === filters.element : true))
  }, [filters, rows])

  // ===== Totals =====
  const totalStaff = filteredRows.reduce((sum, r) => sum + r.staff, 0)
  const totalNonStaff = filteredRows.reduce((sum, r) => sum + r.nonStaff, 0)
  const totalExpatType = filteredRows.reduce((sum, r) => sum + r.expat, 0)
  const totalType = filteredRows.reduce((sum, r) => sum + r.totalType, 0)
  const totalLocal = filteredRows.reduce((sum, r) => sum + r.local, 0)
  const totalNational = filteredRows.reduce((sum, r) => sum + r.national, 0)
  const totalExpatClass = filteredRows.reduce((sum, r) => sum + r.expatClass, 0)
  const totalClass = filteredRows.reduce((sum, r) => sum + r.totalClass, 0)

  return (
    <div>
      <Title text2='CURRENT MANPOWER OVERVIEW' style={{fontSize: '17px'}} className='mb-5' />

      {/* ===== Tabel Utama ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Department Description</th>
              <th colSpan={4}>Employee Type</th>
              <th colSpan={4}>Employee Classification</th>
            </tr>
            <tr className='bg-secondary'>
              <th>Staff</th>
              <th>Non Staff</th>
              <th>Expat</th>
              <th>Total</th>
              <th>Local</th>
              <th>National</th>
              <th>Expat</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r, i) => (
              <tr key={r.id} className='text-center'>
                <td>{i + 1}</td>
                <td className='text-start'>{r.department}</td>
                <td>{r.staff}</td>
                <td>{r.nonStaff}</td>
                <td>{r.expat}</td>
                <td className='fw-bold'>{r.totalType}</td>
                <td>{r.local}</td>
                <td>{r.national}</td>
                <td>{r.expatClass}</td>
                <td className='fw-bold'>{r.totalClass}</td>
              </tr>
            ))}

            {/* Grand Total */}
            <tr className='fw-bold bg-light text-center'>
              <td colSpan={2} className='text-end'>
                Grand Total :
              </td>
              <td>{totalStaff}</td>
              <td>{totalNonStaff}</td>
              <td>{totalExpatType}</td>
              <td>{totalType}</td>
              <td>{totalLocal}</td>
              <td>{totalNational}</td>
              <td>{totalExpatClass}</td>
              <td>{totalClass}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManpowerOverviewTab
