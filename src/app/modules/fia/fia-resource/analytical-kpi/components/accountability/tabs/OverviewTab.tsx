import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {accountabilityRows, AccountabilityRow} from '../dummy/overviewDummy'

const rateToNumber = (rate: string): number => {
  if (!rate) return 0
  return parseFloat(rate.replace('%', '')) || 0
}

export const AccountabilityOverviewTab: React.FC = () => {
  const totals = useMemo(() => {
    const count = accountabilityRows.length || 1

    const totalEmployeeAvg = Math.round(
      accountabilityRows.reduce((acc, r) => acc + r.totalEmployee, 0) / count
    )

    const totalWorkingDays = accountabilityRows.reduce((acc, r) => acc + r.workingDays, 0)

    const totalAverageWorking = accountabilityRows.reduce((acc, r) => acc + r.averageWorking, 0)

    const totalLostDays = accountabilityRows.reduce((acc, r) => acc + r.totalLostDays, 0)

    const avgAbsentRateNumber =
      accountabilityRows.reduce((acc, r) => acc + rateToNumber(r.monthlyAbsentRate), 0) / count

    const avgAbsentRate = `${avgAbsentRateNumber.toFixed(2)}%`

    return {
      totalEmployeeAvg,
      totalWorkingDays,
      totalAverageWorking,
      totalLostDays,
      avgAbsentRate,
    }
  }, [])

  const onView = (row: AccountabilityRow) => {
    console.log('VIEW accountability row', row)
  }

  return (
    <div>
      <Title
        text2='EMPLOYEE ACCOUNTABILITY OVERVIEW - YEAR 2025'
        style={{fontSize: '17px'}}
        className='mb-5'
      />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='bg-secondary text-center'>
            <tr className='fw-bold'>
              <th className='min-w-40px'>No</th>
              <th className='min-w-120px'>Month</th>
              <th className='min-w-120px'>Total Employee</th>
              <th className='min-w-140px'>Working Days</th>
              <th className='min-w-150px'>Average Working</th>
              <th className='min-w-150px'>Total Lost Days</th>
              <th className='min-w-170px'>Monthly Absent Rate</th>
              <th className='min-w-90px'>Action</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {accountabilityRows.map((r) => (
              <tr key={r.no}>
                <td>{r.no}</td>
                <td className='text-start'>{r.month}</td>
                <td>{r.totalEmployee}</td>
                <td>{r.workingDays}</td>
                <td>{r.averageWorking}</td>
                <td>{r.totalLostDays}</td>
                <td>{r.monthlyAbsentRate}</td>
                <td>
                  <button
                    className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                    title='View'
                    aria-label='View'
                    onClick={() => onView(r)}
                  >
                    <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-4' />
                  </button>
                </td>
              </tr>
            ))}

            {/* Baris total (Total Amount) */}
            <tr className='fw-bold bg-light text-center'>
              <td colSpan={2} className='text-end pe-2'>
                Total Amount :
              </td>
              <td>{totals.totalEmployeeAvg}</td>
              <td>{totals.totalWorkingDays.toLocaleString()}</td>
              <td>{totals.totalAverageWorking}</td>
              <td>{totals.totalLostDays.toLocaleString()}</td>
              <td>{totals.avgAbsentRate}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
