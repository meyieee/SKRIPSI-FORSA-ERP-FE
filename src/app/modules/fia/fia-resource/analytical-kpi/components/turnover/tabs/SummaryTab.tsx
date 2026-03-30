import React, {useMemo} from 'react'
import {KTSVG} from '../../../../../../../../_metronic'
import Title from '../../../../my-online-feeds/components/Title'
import {turnoverBlocks, T, TurnoverRow} from '../dummy/summaryDummy'

const sum = (rows: TurnoverRow[], key: 'opening' | 'hire' | 'left' | 'closing') => {
  return rows.reduce(
    (acc, r) => {
      const v = T(r[key])
      acc.craft += v.craft
      acc.staff += v.staff
      acc.expat += v.expat
      acc.total += v.total
      return acc
    },
    {craft: 0, staff: 0, expat: 0, total: 0}
  )
}

export const TurnoverSummaryTab: React.FC = () => {
  const grand = useMemo(() => {
    const all = turnoverBlocks.flatMap((b) => b.rows)
    return {
      opening: sum(all, 'opening'),
      hire: sum(all, 'hire'),
      left: sum(all, 'left'),
      closing: sum(all, 'closing'),
    }
  }, [])

  const onView = (r: TurnoverRow) => console.log('VIEW', r)

  // Total kolom setelah Department dihapus = 20
  const COLS = 20

  return (
    <div>
      <Title
        text2='EMPLOYEE TURNOVER SUMMARY - Month November 2025'
        style={{fontSize: '17px'}}
        className='mb-5'
      />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle'>
              {/* Department dihapus → No jadi kolom pertama */}
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Workgroup - Cost Center</th>
              <th colSpan={4}>Opening Balance</th>
              <th colSpan={4}>Employee Hire</th>
              <th colSpan={4}>Employee Left</th>
              <th colSpan={4}>Closing Balance</th>
              <th rowSpan={2}>Turnover Rate</th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr className='fw-semibold bg-secondary'>
              <th>Craft</th>
              <th>Staff</th>
              <th>Expat</th>
              <th>Total</th>

              <th>Craft</th>
              <th>Staff</th>
              <th>Expat</th>
              <th>Total</th>

              <th>Craft</th>
              <th>Staff</th>
              <th>Expat</th>
              <th>Total</th>

              <th>Craft</th>
              <th>Staff</th>
              <th>Expat</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {turnoverBlocks.map((b) => {
              const subtotal = {
                opening: sum(b.rows, 'opening'),
                hire: sum(b.rows, 'hire'),
                left: sum(b.rows, 'left'),
                closing: sum(b.rows, 'closing'),
              }

              return (
                <React.Fragment key={b.departmentCode}>
                  {/* Header department – span semua kolom yg ada sekarang (20) */}
                  <tr className='fw-bold bg-light-primary text-start'>
                    <td colSpan={COLS}>{b.department.toUpperCase()}</td>
                  </tr>

                  {/* Baris workgroup */}
                  {b.rows.map((r) => (
                    <tr key={`${b.departmentCode}-${r.no}`}>
                      {/* kolom Department dihapus → langsung No & Workgroup */}
                      <td className='text-center'>{r.no}</td>
                      <td className='text-start'>{r.workgroup}</td>

                      {(['opening', 'hire', 'left', 'closing'] as const).map((key) => {
                        const v = T(r[key])
                        return (
                          <React.Fragment key={key}>
                            <td>{v.craft}</td>
                            <td>{v.staff}</td>
                            <td>{v.expat}</td>
                            <td>{v.total}</td>
                          </React.Fragment>
                        )
                      })}

                      <td>{r.rate}</td>
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
                    {/* tadi colSpan={3} (Dept+No+WG), sekarang cuma No+WG → 2 */}
                    <td colSpan={2} className='text-end pe-2'>
                      Total {b.department} :
                    </td>
                    {(['opening', 'hire', 'left', 'closing'] as const).map((key) => {
                      const v = subtotal[key]
                      return (
                        <React.Fragment key={key}>
                          <td>{v.craft}</td>
                          <td>{v.staff}</td>
                          <td>{v.expat}</td>
                          <td>{v.total}</td>
                        </React.Fragment>
                      )
                    })}
                    {/* Rate + Action tetap kosong di subtotal */}
                    <td colSpan={2}></td>
                  </tr>
                </React.Fragment>
              )
            })}

            {/* Grand total */}
            <tr className='fw-bold bg-secondary text-center'>
              {/* sama: sekarang No+WG → colSpan={2} */}
              <td colSpan={2} className='text-end pe-2'>
                Total Workforce :
              </td>
              {(['opening', 'hire', 'left', 'closing'] as const).map((key) => {
                const v = grand[key]
                return (
                  <React.Fragment key={key}>
                    <td>{v.craft}</td>
                    <td>{v.staff}</td>
                    <td>{v.expat}</td>
                    <td>{v.total}</td>
                  </React.Fragment>
                )
              })}
              <td>3%</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TurnoverSummaryTab
