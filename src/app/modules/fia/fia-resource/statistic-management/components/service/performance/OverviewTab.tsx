import React from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {violationRows, warningRows} from '../dummy/performance/performanceOverviewDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

export const ServicePerformanceOverviewTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = {violationRows, warningRows}.violationRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // grand totals (violation)
  const vSum = (key: keyof typeof rows[number]) => rows.reduce((a, b) => a + (b[key] as number), 0)

  // warning grand totals
  const wSum = (key: keyof typeof warningRows[number]) =>
    warningRows.reduce((a, b) => a + (b[key] as number), 0)

  return (
    <div>
      {/* ===== VIOLATION ===== */}
      <Title text2='VIOLATION OVERVIEW' style={{fontSize: '17px'}} className='mb-4 mt-0' />
      <div className='table-responsive mb-6'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-60px text-center'>No</th>
              <th className='min-w-300px'>Department Description</th>
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
            {rows.map((r, idx) => (
              <tr key={r.id} className='text-center'>
                <td className='text-center'>{idx + 1}</td>
                <td className='text-start'>{r.department}</td>
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
            <tr className='fw-bold bg-light text-center'>
              <td colSpan={2} className='text-end pe-2'>
                Grand Total :
              </td>
              <td>{vSum('present')}</td>
              <td>{vSum('dayOff')}</td>
              <td>{vSum('leave')}</td>
              <td>{vSum('absent')}</td>
              <td>{vSum('sick')}</td>
              <td>{vSum('total')}</td>
              <td>{(rows.reduce((a, b) => a + b.available, 0) / rows.length).toFixed(1)}</td>
              <td>{(rows.reduce((a, b) => a + b.rawAvailable, 0) / rows.length).toFixed(1)}</td>
              <td>{(rows.reduce((a, b) => a + b.effective, 0) / rows.length).toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== WARNING ===== */}
      <Title text2='WARNING OVERVIEW' style={{fontSize: '17px'}} className='mb-3' />
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-60px text-center'>No</th>
              <th className='min-w-300px'>Department Description</th>
              <th>Verbal Warning</th>
              <th>Warning 1</th>
              <th>Warning 2</th>
              <th>Warning 3</th>
              <th>Suspension</th>
              <th>Termination</th>
            </tr>
          </thead>
          <tbody>
            {warningRows.map((r, idx) => (
              <tr key={r.id} className='text-center'>
                <td className='text-center'>{idx + 1}</td>
                <td className='text-start'>{r.department}</td>
                <td>{r.verbal}</td>
                <td>{r.warn1}</td>
                <td>{r.warn2}</td>
                <td>{r.warn3}</td>
                <td>{r.suspension}</td>
                <td>{r.termination}</td>
              </tr>
            ))}
            <tr className='fw-bold bg-light text-center'>
              <td colSpan={2} className='text-end pe-2'>
                Grand Total :
              </td>
              <td>{wSum('verbal')}</td>
              <td>{wSum('warn1')}</td>
              <td>{wSum('warn2')}</td>
              <td>{wSum('warn3')}</td>
              <td>{wSum('suspension')}</td>
              <td>{wSum('termination')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServicePerformanceOverviewTab
