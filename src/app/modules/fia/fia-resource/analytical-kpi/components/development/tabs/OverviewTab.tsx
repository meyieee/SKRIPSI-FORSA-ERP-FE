import React, {useMemo} from 'react'
import {KTSVG} from '../../../../../../../../_metronic'
import Title from '../../../../my-online-feeds/components/Title'
import {developmentRows, DevelopmentRow} from '../dummy/overviewDummy'

const percent = (actual: number, schedule: number): string => {
  if (!schedule || schedule === 0) return '0%'
  return `${Math.round((actual / schedule) * 100)}%`
}

export const DevelopmentOverviewTab: React.FC = () => {
  const totals = useMemo(() => {
    const totalTrainingSchedule = developmentRows.reduce((a, r) => a + r.trainingSchedule, 0)
    const totalTrainingActual = developmentRows.reduce((a, r) => a + r.trainingActual, 0)
    const totalPerfSchedule = developmentRows.reduce((a, r) => a + r.performanceSchedule, 0)
    const totalPerfActual = developmentRows.reduce((a, r) => a + r.performanceActual, 0)

    const count = developmentRows.length || 1

    // rata-rata per bulan (seperti di tabel: 11, 1, 56, 1)
    const avgTrainingSchedule = Math.round(totalTrainingSchedule / count)
    const avgTrainingActual = Math.round(totalTrainingActual / count)
    const avgPerfSchedule = Math.round(totalPerfSchedule / count)
    const avgPerfActual = Math.round(totalPerfActual / count)

    const totalTrainingRealization = percent(totalTrainingActual, totalTrainingSchedule)
    const totalPerfRealization = percent(totalPerfActual, totalPerfSchedule)

    return {
      avgTrainingSchedule,
      avgTrainingActual,
      avgPerfSchedule,
      avgPerfActual,
      totalTrainingRealization,
      totalPerfRealization,
    }
  }, [])

  const onView = (row: DevelopmentRow) => {
    console.log('VIEW development row', row)
  }

  return (
    <div>
      <Title
        text2='EMPLOYEE DEVELOPMENT OVERVIEW - YEAR 2025'
        style={{fontSize: '17px'}}
        className='mb-5'
      />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            {/* Header baris 1 */}
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2} className='min-w-40px'>
                No
              </th>
              <th rowSpan={2} className='min-w-120px'>
                Month
              </th>
              <th colSpan={3}>Training Development</th>
              <th colSpan={3}>Performance Appraisal</th>
              <th rowSpan={2} className='min-w-90px'>
                Action
              </th>
            </tr>
            {/* Header baris 2 */}
            <tr className='fw-semibold bg-secondary'>
              <th>Schedule</th>
              <th>Actual</th>
              <th>Realization %</th>
              <th>Schedule</th>
              <th>Actual</th>
              <th>Realization %</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {developmentRows.map((r) => (
              <tr key={r.no}>
                <td>{r.no}</td>
                <td className='text-start'>{r.month}</td>

                {/* Training Development */}
                <td>{r.trainingSchedule}</td>
                <td>{r.trainingActual}</td>
                <td>{percent(r.trainingActual, r.trainingSchedule)}</td>

                {/* Performance Appraisal */}
                <td>{r.performanceSchedule}</td>
                <td>{r.performanceActual}</td>
                <td>{percent(r.performanceActual, r.performanceSchedule)}</td>

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

            {/* Baris total di bawah */}
            <tr className='fw-bold bg-light text-center'>
              <td colSpan={2} className='text-end pe-2'>
                Total Amount :
              </td>

              <td>{totals.avgTrainingSchedule}</td>
              <td>{totals.avgTrainingActual}</td>
              <td>{totals.totalTrainingRealization}</td>

              <td>{totals.avgPerfSchedule}</td>
              <td>{totals.avgPerfActual}</td>
              <td>{totals.totalPerfRealization}</td>

              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
