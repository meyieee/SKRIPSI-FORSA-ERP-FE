import React from 'react'
import {KTSVG} from '../../../../../../../../_metronic'
import Title from '../../../../my-online-feeds/components/Title'
import {turnoverRows, TurnoverRow} from '../dummy/overviewDummy'

export const TurnoverOverviewTab: React.FC = () => {
  const totalHire = turnoverRows.reduce((acc, r) => acc + r.hire, 0)
  const totalLeft = turnoverRows.reduce((acc, r) => acc + r.left, 0)
  const avgRate = turnoverRows.reduce((acc, r) => acc + parseFloat(r.rate), 0) / turnoverRows.length

  const onView = (r: TurnoverRow) => console.log('VIEW', r)

  return (
    <div>
      <Title
        text2='EMPLOYEE TURNOVER OVERVIEW - YEAR 2025'
        style={{fontSize: '17px'}}
        className='mb-5'
      />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary'>
              <th>No</th>
              <th>Month</th>
              <th>Opening Balance</th>
              <th>Employee Hire</th>
              <th>Employee Left</th>
              <th>Closing Balance</th>
              <th>Turnover Rate</th>
              <th className='min-w-100px'>Action</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {turnoverRows.map((r) => (
              <tr key={r.no}>
                <td>{r.no}</td>
                <td className='text-start'>{r.month}</td>
                <td>{r.opening}</td>
                <td>{r.hire}</td>
                <td>{r.left}</td>
                <td>{r.closing}</td>
                <td>{r.rate}</td>
                <td>
                  <button
                    className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                    title='View'
                    onClick={() => onView(r)}
                  >
                    <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-4' />
                  </button>
                </td>
              </tr>
            ))}

            <tr className='fw-bold bg-light text-center'>
              <td colSpan={3} className='text-end pe-2'>
                Total :
              </td>
              <td>{totalHire}</td>
              <td>{totalLeft}</td>
              <td>56</td>
              <td>{avgRate.toFixed(2)}%</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
