import React, {useMemo} from 'react'
import {recapBlocks, RecapRow, C4, T} from '../dummy/overviewDummy'
import {KTSVG} from '../../../../../../../../_metronic'
import Title from '../../../../my-online-feeds/components/Title'
import {useAnalyticalFilters} from '../../../AnalyticalFilterContext'

const sum4 = (rows: RecapRow[], key: 'current' | 'additional' | 'requirement'): Required<C4> => {
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

export const RecapitulationOverviewTab: React.FC = () => {
  const {filters} = useAnalyticalFilters()

  const blocks = recapBlocks
    .filter((b) => (filters.site ? b.siteBranch === filters.site : true))
    .filter((b) => (filters.department ? b.department === filters.department : true))
    .filter((b) => (filters.section ? b.section === filters.section : true))
    .filter((b) => (filters.element ? b.element === filters.element : true))

  const grand = useMemo(() => {
    const all = blocks.flatMap((b) => b.rows)
    return {
      current: sum4(all, 'current'),
      add: sum4(all, 'additional'),
      req: sum4(all, 'requirement'),
    }
  }, [blocks])

  const onView = (r: RecapRow) => console.log('VIEW', r)
  const onEdit = (r: RecapRow) => console.log('EDIT', r)
  const onDelete = (r: RecapRow) => console.log('DELETE', r)

  // total kolom: No (1) + Workgroup (1) + 12 angka + Action (1) = 15
  const COLS = 15

  return (
    <div>
      <Title text2='EMPLOYEE RECAPITULATION OVERVIEW' style={{fontSize: '17px'}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            {/* Header baris 1 */}
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2} className='min-w-50px text-center'>
                No
              </th>
              <th rowSpan={2} className='text-start min-w-220px'>
                Workgroup - Cost Center
              </th>
              <th colSpan={4}>CURRENT MANPOWER</th>
              <th colSpan={4}>ADDITIONAL</th>
              <th colSpan={4}>REQUIREMENT</th>
              <th rowSpan={2} className='min-w-120px'>
                Action
              </th>
            </tr>

            {/* Header baris 2 */}
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
            {blocks.map((b) => {
              const sub = {
                current: sum4(b.rows, 'current'),
                add: sum4(b.rows, 'additional'),
                req: sum4(b.rows, 'requirement'),
              }

              return (
                <React.Fragment key={b.departmentCode}>
                  {/* Baris header department (bar warna) */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={COLS} className='text-start'>
                      {b.department.toUpperCase()}
                    </td>
                  </tr>

                  {/* Rows per workgroup */}
                  {b.rows.map((r) => (
                    <tr key={`${b.departmentCode}-${r.no}`} className='text-center'>
                      {/* TIDAK ada lagi kolom department di sini */}
                      <td>{r.no}</td>
                      <td className='text-start'>{r.workgroup}</td>

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

                      {/* Action V|E|D dengan ikon */}
                      <td className='text-center'>
                        <button
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          title='View'
                          aria-label='View'
                          onClick={() => onView(r)}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen004.svg'
                            className='svg-icon-4'
                          />
                        </button>
                        <button
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          title='Edit'
                          aria-label='Edit'
                          onClick={() => onEdit(r)}
                        >
                          <KTSVG
                            path='/media/icons/duotune/art/art005.svg'
                            className='svg-icon-4'
                          />
                        </button>
                        <button
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary'
                          title='Delete'
                          aria-label='Delete'
                          onClick={() => onDelete(r)}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-4'
                          />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Subtotal per department */}
                  <tr className='fw-semibold bg-light text-center'>
                    <td colSpan={2} className='text-end pe-2'>
                      Total {b.department} :
                    </td>
                    {/* Current */}
                    <td>{sub.current.craft}</td>
                    <td>{sub.current.staff}</td>
                    <td>{sub.current.expat}</td>
                    <td>{sub.current.total}</td>
                    {/* Additional */}
                    <td>{sub.add.craft}</td>
                    <td>{sub.add.staff}</td>
                    <td>{sub.add.expat}</td>
                    <td>{sub.add.total}</td>
                    {/* Requirement */}
                    <td>{sub.req.craft}</td>
                    <td>{sub.req.staff}</td>
                    <td>{sub.req.expat}</td>
                    <td>{sub.req.total}</td>
                    <td></td>
                  </tr>
                </React.Fragment>
              )
            })}

            {/* Grand total */}
            <tr className='fw-bold bg-secondary text-center'>
              <td colSpan={2} className='text-end pe-2'>
                Total Workforce :
              </td>
              {/* Current */}
              <td>{grand.current.craft}</td>
              <td>{grand.current.staff}</td>
              <td>{grand.current.expat}</td>
              <td>{grand.current.total}</td>
              {/* Additional */}
              <td>{grand.add.craft}</td>
              <td>{grand.add.staff}</td>
              <td>{grand.add.expat}</td>
              <td>{grand.add.total}</td>
              {/* Requirement */}
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

export default RecapitulationOverviewTab
