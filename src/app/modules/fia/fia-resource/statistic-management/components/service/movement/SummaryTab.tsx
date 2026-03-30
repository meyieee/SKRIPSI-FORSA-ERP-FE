import React, {useMemo} from 'react'
import {movementSummaryBlocks, MovementSummaryBlock} from '../dummy/movement/movementSummaryDummy'
import Title from '../../../../my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'

const sum = (ns: number[]) => ns.reduce((a, b) => a + b, 0)
const calc = (rows: any[], key: 'current' | 'hire' | 'left' | 'requirement') => ({
  staff: sum(rows.map((r) => r[key].staff)),
  non: sum(rows.map((r) => r[key].non)),
  expat: sum(rows.map((r) => r[key].expat)),
  total: sum(rows.map((r) => r[key].total)),
})

export const ServiceMovementSummaryTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const blocks = movementSummaryBlocks
    .filter((b) => (filters.site ? b.siteBranch === filters.site : true))
    .filter((b) => (filters.department ? b.department === filters.department : true))
    .filter((b) => (filters.section ? b.section === filters.section : true))
    .filter((b) => (filters.element ? b.element === filters.element : true))

  const grouped = useMemo(() => {
    const m = new Map<string, MovementSummaryBlock[]>()
    blocks.forEach((b) => {
      const k = `${b.departmentCode}|${b.department}`
      if (!m.has(k)) m.set(k, [])
      m.get(k)!.push(b)
    })
    return Array.from(m.entries()).map(([k, arr]) => {
      const [departmentCode, department] = k.split('|')
      return {departmentCode, department, arr}
    })
  }, [blocks])

  const grand = useMemo(() => {
    const all = blocks.flatMap((b) => b.rows)
    return {
      current: calc(all, 'current'),
      hire: calc(all, 'hire'),
      left: calc(all, 'left'),
      req: calc(all, 'requirement'),
    }
  }, [blocks])

  return (
    <div>
      <Title text2='MANPOWER MOVEMENT SUMMARY' style={{fontSize: '17px'}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            {/* HEADER BARIS 1 */}
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2}>No</th>
              <th rowSpan={2} className='text-start'>
                Workgroup - Cost Center
              </th>
              <th rowSpan={2}>Level</th>
              <th colSpan={4}>Current Manpower</th>
              <th colSpan={4}>Hire</th>
              <th colSpan={4}>Left</th>
              <th colSpan={4}>Requirement</th>
            </tr>
            {/* HEADER BARIS 2 */}
            <tr className='bg-secondary'>
              <th>Staff</th>
              <th>Non</th>
              <th>Expat</th>
              <th>Total</th>
              <th>Staff</th>
              <th>Non</th>
              <th>Expat</th>
              <th>Total</th>
              <th>Staff</th>
              <th>Non</th>
              <th>Expat</th>
              <th>Total</th>
              <th>Staff</th>
              <th>Non</th>
              <th>Expat</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {grouped.map(({departmentCode, department, arr}) => {
              const deptRows = arr.flatMap((b) => b.rows)
              const dsub = {
                current: calc(deptRows, 'current'),
                hire: calc(deptRows, 'hire'),
                left: calc(deptRows, 'left'),
                req: calc(deptRows, 'requirement'),
              }

              return (
                <React.Fragment key={departmentCode}>
                  {/* BARIS DEPARTMENT (19 kolom) */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={19} className='text-start'>
                      {departmentCode} – {department}
                    </td>
                  </tr>

                  {arr.map((b, idx) => {
                    const wsub = {
                      current: calc(b.rows, 'current'),
                      hire: calc(b.rows, 'hire'),
                      left: calc(b.rows, 'left'),
                      req: calc(b.rows, 'requirement'),
                    }

                    return (
                      <React.Fragment key={`${departmentCode}-${b.workgroup}`}>
                        {/* BARIS WORKGROUP (No = idx+1, bg beda) */}
                        <tr className='fw-semibold bg-light-success'>
                          <td className='text-start fw-bold'>{idx + 1}</td>
                          <td className='text-start'>{b.workgroup}</td>
                          <td></td>
                          {/* 16 kolom angka */}
                          <td colSpan={16}></td>
                        </tr>

                        {/* BARIS POSISI: title masuk kolom Workgroup */}
                        {b.rows.map((r) => (
                          <tr key={`${b.departmentCode}-${r.no}`} className='text-center'>
                            <td className='text-center'>{r.no}</td>
                            <td className='text-start'>{r.title}</td>
                            <td>{r.level}</td>

                            <td>{r.current.staff}</td>
                            <td>{r.current.non}</td>
                            <td>{r.current.expat}</td>
                            <td className='fw-semibold'>{r.current.total}</td>

                            <td>{r.hire.staff}</td>
                            <td>{r.hire.non}</td>
                            <td>{r.hire.expat}</td>
                            <td className='fw-semibold'>{r.hire.total}</td>

                            <td>{r.left.staff}</td>
                            <td>{r.left.non}</td>
                            <td>{r.left.expat}</td>
                            <td className='fw-semibold'>{r.left.total}</td>

                            <td>{r.requirement.staff}</td>
                            <td>{r.requirement.non}</td>
                            <td>{r.requirement.expat}</td>
                            <td className='fw-semibold'>{r.requirement.total}</td>
                          </tr>
                        ))}

                        {/* SUBTOTAL WORKGROUP */}
                        <tr className='fw-semibold bg-light text-center'>
                          <td colSpan={3} className='text-end pe-2'>
                            Total {b.workgroup} :
                          </td>
                          <td>{wsub.current.staff}</td>
                          <td>{wsub.current.non}</td>
                          <td>{wsub.current.expat}</td>
                          <td>{wsub.current.total}</td>
                          <td>{wsub.hire.staff}</td>
                          <td>{wsub.hire.non}</td>
                          <td>{wsub.hire.expat}</td>
                          <td>{wsub.hire.total}</td>
                          <td>{wsub.left.staff}</td>
                          <td>{wsub.left.non}</td>
                          <td>{wsub.left.expat}</td>
                          <td>{wsub.left.total}</td>
                          <td>{wsub.req.staff}</td>
                          <td>{wsub.req.non}</td>
                          <td>{wsub.req.expat}</td>
                          <td>{wsub.req.total}</td>
                        </tr>
                      </React.Fragment>
                    )
                  })}

                  {/* SUBTOTAL DEPARTMENT */}
                  <tr className='fw-semibold bg-light text-center'>
                    <td colSpan={3} className='text-end pe-2'>
                      Total {department} :
                    </td>
                    <td>{dsub.current.staff}</td>
                    <td>{dsub.current.non}</td>
                    <td>{dsub.current.expat}</td>
                    <td>{dsub.current.total}</td>
                    <td>{dsub.hire.staff}</td>
                    <td>{dsub.hire.non}</td>
                    <td>{dsub.hire.expat}</td>
                    <td>{dsub.hire.total}</td>
                    <td>{dsub.left.staff}</td>
                    <td>{dsub.left.non}</td>
                    <td>{dsub.left.expat}</td>
                    <td>{dsub.left.total}</td>
                    <td>{dsub.req.staff}</td>
                    <td>{dsub.req.non}</td>
                    <td>{dsub.req.expat}</td>
                    <td>{dsub.req.total}</td>
                  </tr>
                </React.Fragment>
              )
            })}

            {/* GRAND TOTAL */}
            <tr className='fw-bold bg-secondary text-center'>
              <td colSpan={3} className='text-end pe-2'>
                Manpower Grand Total :
              </td>
              <td>{grand.current.staff}</td>
              <td>{grand.current.non}</td>
              <td>{grand.current.expat}</td>
              <td>{grand.current.total}</td>
              <td>{grand.hire.staff}</td>
              <td>{grand.hire.non}</td>
              <td>{grand.hire.expat}</td>
              <td>{grand.hire.total}</td>
              <td>{grand.left.staff}</td>
              <td>{grand.left.non}</td>
              <td>{grand.left.expat}</td>
              <td>{grand.left.total}</td>
              <td>{grand.req.staff}</td>
              <td>{grand.req.non}</td>
              <td>{grand.req.expat}</td>
              <td>{grand.req.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServiceMovementSummaryTab
