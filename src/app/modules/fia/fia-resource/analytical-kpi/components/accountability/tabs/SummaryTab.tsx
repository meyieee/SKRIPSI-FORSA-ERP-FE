import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {accountabilitySummaryBlocks, AccSummaryBlock, AccSummaryRow} from '../dummy/summaryDummy'

const rateToNumber = (r: string) => parseFloat(r.replace('%', '')) || 0

const sumEmp = (rows: AccSummaryRow[]) => {
  return rows.reduce(
    (acc, r) => {
      acc.nonStaff += r.numberEmployee.nonStaff ?? 0
      acc.staff += r.numberEmployee.staff ?? 0
      acc.total += r.numberEmployee.total ?? 0
      return acc
    },
    {nonStaff: 0, staff: 0, total: 0}
  )
}

const sumWorking = (rows: AccSummaryRow[]) => {
  return rows.reduce(
    (acc, r) => {
      acc.total += r.workingDays.total ?? 0
      acc.average += r.workingDays.average ?? 0
      return acc
    },
    {total: 0, average: 0}
  )
}

const sumLostDays = (rows: AccSummaryRow[]) => rows.reduce((acc, r) => acc + r.totalLostDays, 0)

export const AccountabilitySummaryTab: React.FC = () => {
  const grand = useMemo(() => {
    const allRows = accountabilitySummaryBlocks.flatMap((b) => b.rows)
    const emp = sumEmp(allRows)
    const work = sumWorking(allRows)
    const lost = sumLostDays(allRows)

    const avgRateNum =
      allRows.reduce((acc, r) => acc + rateToNumber(r.monthlyAbsenceRate), 0) /
      (allRows.length || 1)

    return {
      emp,
      work,
      lost,
      avgRate: `${Math.round(avgRateNum)}%`,
    }
  }, [])

  const onView = (row: AccSummaryRow) => {
    console.log('VIEW accountability summary row', row)
  }

  // Setelah kolom Department dihapus, total kolom = 10
  const COLS = 10

  return (
    <div>
      <Title
        text2='EMPLOYEE ACCOUNTABILITY SUMMARY - Month November 2025'
        style={{fontSize: '17px'}}
        className='mb-5'
      />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle '>
              {/* Department dihapus → No & Workgroup pakai rowSpan=2 */}
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Workgroup - Cost Center</th>

              <th colSpan={3}>Number of Employee</th>
              <th colSpan={2}>Working Days</th>

              <th rowSpan={2}>Total Lost Days</th>
              <th rowSpan={2}>Monthly Absence Rate</th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr className='fw-semibold bg-secondary '>
              <th>Non Staff</th>
              <th>Staff</th>
              <th>Total</th>

              <th>Total</th>
              <th>Average</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {accountabilitySummaryBlocks.map((b: AccSummaryBlock) => {
              const empSub = sumEmp(b.rows)
              const workSub = sumWorking(b.rows)
              const lostSub = sumLostDays(b.rows)
              const avgRateSub =
                b.rows.reduce((acc, r) => acc + rateToNumber(r.monthlyAbsenceRate), 0) /
                (b.rows.length || 1)

              return (
                <React.Fragment key={b.departmentCode}>
                  {/* Header department (bar biru muda) – sekarang span 10 kolom */}
                  <tr className='fw-bold bg-light-primary text-start'>
                    <td colSpan={COLS}>{b.department.toUpperCase()}</td>
                  </tr>

                  {/* Workgroup rows */}
                  {b.rows.map((r) => (
                    <tr key={`${b.departmentCode}-${r.no}`}>
                      {/* Kolom Department dihapus → langsung No & WG */}
                      <td className='text-center'>{r.no}</td>
                      <td className='text-start'>{r.workgroup}</td>

                      <td>{r.numberEmployee.nonStaff}</td>
                      <td>{r.numberEmployee.staff}</td>
                      <td>{r.numberEmployee.total}</td>

                      <td>{r.workingDays.total}</td>
                      <td>{r.workingDays.average}</td>

                      <td>{r.totalLostDays}</td>
                      <td>{r.monthlyAbsenceRate}</td>

                      <td>
                        <button
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                          title='View'
                          onClick={() => onView(r)}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen004.svg'
                            className='svg-icon-4'
                          />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Subtotal per department */}
                  <tr className='fw-semibold bg-light text-center'>
                    {/* Dulu colSpan={3} (Dept+No+WG), sekarang tinggal No+WG → 2 */}
                    <td colSpan={2} className='text-end pe-2'>
                      Total {b.department} :
                    </td>

                    <td>{empSub.nonStaff}</td>
                    <td>{empSub.staff}</td>
                    <td>{empSub.total}</td>

                    <td>{workSub.total}</td>
                    <td>{Math.round(workSub.average / (b.rows.length || 1))}</td>

                    <td>{lostSub}</td>
                    <td>{Math.round(avgRateSub)}%</td>
                    <td></td>
                  </tr>
                </React.Fragment>
              )
            })}

            {/* Grand total / Total Workforce */}
            <tr className='fw-bold bg-secondary text-center '>
              {/* Sekarang No+WG → colSpan={2} */}
              <td colSpan={2} className='text-end pe-2'>
                Total Workforce :
              </td>

              <td>{grand.emp.nonStaff}</td>
              <td>{grand.emp.staff}</td>
              <td>{grand.emp.total}</td>

              <td>{grand.work.total}</td>
              <td>
                {Math.round(
                  grand.work.average / accountabilitySummaryBlocks.flatMap((b) => b.rows).length
                )}
              </td>

              <td>{grand.lost}</td>
              <td>{grand.avgRate}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccountabilitySummaryTab
