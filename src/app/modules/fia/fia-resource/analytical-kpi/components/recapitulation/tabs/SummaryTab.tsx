import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {KTSVG} from '../../../../../../../../_metronic'
import {recapSummaryBlocks, RecapSummaryRow, T} from '../dummy/summaryDummy'
import {useAnalyticalFilters} from '../../../AnalyticalFilterContext'

const sum4 = (rows: RecapSummaryRow[], key: 'current' | 'additional' | 'requirement') =>
  rows.reduce(
    (a, r) => {
      const v = T(r[key])
      a.craft += v.craft
      a.staff += v.staff
      a.expat += v.expat
      a.total += v.total
      return a
    },
    {craft: 0, staff: 0, expat: 0, total: 0}
  )

export const RecapitulationSummaryTab: React.FC = () => {
  const {filters} = useAnalyticalFilters()

  const blocks = recapSummaryBlocks
    .filter((b) => (filters.site ? b.siteBranch === filters.site : true))
    .filter((b) => (filters.department ? b.department === filters.department : true))
    .filter((b) => (filters.section ? b.section === filters.section : true))
    .filter((b) => (filters.element ? b.element === filters.element : true))

  const grand = useMemo(() => {
    const all = blocks.flatMap((b) => b.workgroups.flatMap((wg) => wg.rows))
    return {
      current: sum4(all, 'current'),
      add: sum4(all, 'additional'),
      req: sum4(all, 'requirement'),
    }
  }, [blocks])

  const onView = (payload: any) => console.log('VIEW', payload)

  // No + Workgroup/Role + Level + 12 angka + Action
  const COLS = 16

  return (
    <div>
      <Title text2='EMPLOYEE RECAPITULATION SUMMARY' style={{fontSize: '17px'}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2} className='min-w-40px text-center'>
                No
              </th>
              <th rowSpan={2} className='text-start min-w-220px'>
                Workgroup - Cost Center / Role
              </th>
              <th rowSpan={2} className='min-w-80px'>
                Level
              </th>
              <th colSpan={4}>CURRENT MANPOWER</th>
              <th colSpan={4}>ADDITIONAL</th>
              <th colSpan={4}>REQUIREMENT</th>
              <th rowSpan={2} className='min-w-90px'>
                Action
              </th>
            </tr>
            <tr className='bg-secondary'>
              {/* Current */}
              <th>Craft</th>
              <th>Staff</th>
              <th>Expat</th>
              <th>Total</th>
              {/* Additional */}
              <th>Craft</th>
              <th>Staff</th>
              <th>Expat</th>
              <th>Total</th>
              {/* Requirement */}
              <th>Craft</th>
              <th>Staff</th>
              <th>Expat</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {blocks.map((dept) => (
              <React.Fragment key={dept.departmentCode}>
                {/* Header department */}
                <tr className='fw-bold bg-light-primary'>
                  <td colSpan={COLS} className='text-start'>
                    {dept.departmentCode} {dept.department}
                  </td>
                </tr>

                {dept.workgroups.map((wg, idx) => {
                  const wsub = {
                    current: sum4(wg.rows, 'current'),
                    add: sum4(wg.rows, 'additional'),
                    req: sum4(wg.rows, 'requirement'),
                  }

                  return (
                    <React.Fragment key={`${dept.departmentCode}-${wg.code}`}>
                      {/* Workgroup header */}
                      <tr className='fw-semibold bg-light-success'>
                        <td>{idx + 1}</td>
                        <td className='text-start'>
                          {wg.code}-{wg.name}
                        </td>
                        <td></td>
                        <td colSpan={12}></td>
                        <td></td>
                      </tr>

                      {/* Detail role (Director, A1, A2, ...) */}
                      {wg.rows.map((r) => (
                        <tr key={`${wg.code}-${r.no}`} className='text-center'>
                          {/* >>> No untuk Director / A1 / A2 masuk di kolom No <<< */}
                          <td className='text-center'>{r.no}</td>
                          {/* Kolom Workgroup sekarang menampilkan role */}
                          <td className='text-start'>{r.role}</td>
                          <td>{r.level}</td>

                          {/* Current */}
                          <td>{T(r.current).craft}</td>
                          <td>{T(r.current).staff}</td>
                          <td>{T(r.current).expat}</td>
                          <td className='fw-semibold'>{T(r.current).total}</td>

                          {/* Additional */}
                          <td>{T(r.additional).craft}</td>
                          <td>{T(r.additional).staff}</td>
                          <td>{T(r.additional).expat}</td>
                          <td className='fw-semibold'>{T(r.additional).total}</td>

                          {/* Requirement */}
                          <td>{T(r.requirement).craft}</td>
                          <td>{T(r.requirement).staff}</td>
                          <td>{T(r.requirement).expat}</td>
                          <td className='fw-semibold'>{T(r.requirement).total}</td>

                          <td className='text-center'>
                            <button
                              className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                              title='View'
                              aria-label='View'
                              onClick={() => onView({dept, wg, row: r})}
                            >
                              <KTSVG
                                path='/media/icons/duotune/general/gen004.svg'
                                className='svg-icon-4'
                              />
                            </button>
                          </td>
                        </tr>
                      ))}

                      {/* subtotal per workgroup */}
                      <tr className='fw-bold bg-light text-center'>
                        <td colSpan={3} className='text-end pe-2'>
                          Total {wg.code}-{wg.name} :
                        </td>
                        {/* current */}
                        <td>{wsub.current.craft}</td>
                        <td>{wsub.current.staff}</td>
                        <td>{wsub.current.expat}</td>
                        <td>{wsub.current.total}</td>
                        {/* add */}
                        <td>{wsub.add.craft}</td>
                        <td>{wsub.add.staff}</td>
                        <td>{wsub.add.expat}</td>
                        <td>{wsub.add.total}</td>
                        {/* req */}
                        <td>{wsub.req.craft}</td>
                        <td>{wsub.req.staff}</td>
                        <td>{wsub.req.expat}</td>
                        <td>{wsub.req.total}</td>
                        <td></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </React.Fragment>
            ))}

            {/* grand total */}
            <tr className='fw-bold bg-secondary text-center text-white'>
              <td colSpan={3} className='text-end pe-2'>
                Manpower Grand Total :
              </td>
              <td>{grand.current.craft}</td>
              <td>{grand.current.staff}</td>
              <td>{grand.current.expat}</td>
              <td>{grand.current.total}</td>
              <td>{grand.add.craft}</td>
              <td>{grand.add.staff}</td>
              <td>{grand.add.expat}</td>
              <td>{grand.add.total}</td>
              <td>{grand.req.craft}</td>
              <td>{grand.req.staff}</td>
              <td>{grand.req.expat}</td>
              <td>{grand.req.total}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecapitulationSummaryTab
