import React, {useMemo} from 'react'
import {KTSVG} from '../../../../../../../../_metronic'
import Title from '../../../../my-online-feeds/components/Title'
import {developmentBlocks, DevRow} from '../dummy/summaryDummy'

const toNumber = (str: string) => parseFloat(str.replace('%', '')) || 0

const sum3 = (rows: DevRow[], key: 'training' | 'appraisalNonStaff' | 'appraisalStaff') => {
  let schedule = 0
  let actual = 0
  let realizationSum = 0
  let count = 0

  rows.forEach((r) => {
    const data = r[key]
    if (data.schedule !== undefined) schedule += data.schedule
    if (data.actual !== undefined) actual += data.actual
    if (data.realization) {
      realizationSum += toNumber(data.realization)
      count++
    }
  })

  const realization = count > 0 ? `${Math.round(realizationSum / count)}%` : '0%'
  return {schedule, actual, realization}
}

export const DevelopmentSummaryTab: React.FC = () => {
  const grand = useMemo(() => {
    const all = developmentBlocks.flatMap((b) => b.rows)
    return {
      training: sum3(all, 'training'),
      appraisalNonStaff: sum3(all, 'appraisalNonStaff'),
      appraisalStaff: sum3(all, 'appraisalStaff'),
    }
  }, [])

  const onView = (r: DevRow) => console.log('VIEW', r)

  // setelah kolom Department dihapus, total kolom = 13
  const COLS = 13

  return (
    <div>
      <Title
        text2='EMPLOYEE DEVELOPMENT SUMMARY - Month November 2025'
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
              <th colSpan={3}>Training</th>
              <th colSpan={3}>Appraisal Non Staff</th>
              <th colSpan={3}>Appraisal Staff</th>
              <th rowSpan={2}>Appraisal Realization</th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr className='fw-semibold bg-secondary'>
              <th>Schedule</th>
              <th>Actual</th>
              <th>Realization</th>

              <th>Schedule</th>
              <th>Actual</th>
              <th>Realization</th>

              <th>Schedule</th>
              <th>Actual</th>
              <th>Realization</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {developmentBlocks.map((b) => {
              const subtotal = {
                training: sum3(b.rows, 'training'),
                appraisalNonStaff: sum3(b.rows, 'appraisalNonStaff'),
                appraisalStaff: sum3(b.rows, 'appraisalStaff'),
              }

              // rata-rata appraisal realization per department
              const deptAppraisalAvg =
                b.rows.reduce((a, r) => a + toNumber(r.appraisalRealization), 0) /
                (b.rows.length || 1)

              return (
                <React.Fragment key={b.departmentCode}>
                  {/* Header department – sekarang span 13 kolom */}
                  <tr className='fw-bold bg-light-primary text-start'>
                    <td colSpan={COLS}>{b.department.toUpperCase()}</td>
                  </tr>

                  {/* Row data */}
                  {b.rows.map((r) => (
                    <tr key={`${b.departmentCode}-${r.no}`}>
                      {/* kolom Department dihilangkan → langsung No & Workgroup */}
                      <td className='text-center'>{r.no}</td>
                      <td className='text-start'>{r.workgroup}</td>

                      <td>{r.training.schedule}</td>
                      <td>{r.training.actual}</td>
                      <td>{r.training.realization}</td>

                      <td>{r.appraisalNonStaff.schedule}</td>
                      <td>{r.appraisalNonStaff.actual}</td>
                      <td>{r.appraisalNonStaff.realization}</td>

                      <td>{r.appraisalStaff.schedule}</td>
                      <td>{r.appraisalStaff.actual}</td>
                      <td>{r.appraisalStaff.realization}</td>

                      <td>{r.appraisalRealization}</td>

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
                    {/* dulu colSpan={3} (Dept+No+WG), sekarang tinggal No+WG → 2 */}
                    <td colSpan={2} className='text-end pe-2'>
                      Total {b.department} :
                    </td>

                    <td>{subtotal.training.schedule}</td>
                    <td>{subtotal.training.actual}</td>
                    <td>{subtotal.training.realization}</td>

                    <td>{subtotal.appraisalNonStaff.schedule}</td>
                    <td>{subtotal.appraisalNonStaff.actual}</td>
                    <td>{subtotal.appraisalNonStaff.realization}</td>

                    <td>{subtotal.appraisalStaff.schedule}</td>
                    <td>{subtotal.appraisalStaff.actual}</td>
                    <td>{subtotal.appraisalStaff.realization}</td>

                    <td>{Math.round(deptAppraisalAvg)}%</td>
                    <td></td>
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

              <td>{grand.training.schedule}</td>
              <td>{grand.training.actual}</td>
              <td>{grand.training.realization}</td>

              <td>{grand.appraisalNonStaff.schedule}</td>
              <td>{grand.appraisalNonStaff.actual}</td>
              <td>{grand.appraisalNonStaff.realization}</td>

              <td>{grand.appraisalStaff.schedule}</td>
              <td>{grand.appraisalStaff.actual}</td>
              <td>{grand.appraisalStaff.realization}</td>

              <td>49%</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DevelopmentSummaryTab
