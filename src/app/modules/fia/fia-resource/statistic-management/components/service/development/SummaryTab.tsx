import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {developmentSummaryRows} from '../dummy/development/developmentSummaryDummy'
import {useStatisticFilters} from '../../../StatisticFilterContext'

export const ServiceDevelopmentSummaryTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  // Filter dasar
  const rows = developmentSummaryRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // Group: Department -> Workgroup
  const grouped = useMemo(() => {
    const byDept = new Map<string, typeof rows>()
    rows.forEach((r) => {
      const key = `${r.departmentCode}||${r.department}`
      if (!byDept.has(key)) byDept.set(key, [])
      byDept.get(key)!.push(r)
    })

    const sortRows = (arr: typeof rows) =>
      arr.slice().sort((a: any, b: any) => {
        const ao = a.order ?? a.id
        const bo = b.order ?? b.id
        return ao - bo
      })

    return Array.from(byDept.entries()).map(([deptKey, deptRows]) => {
      const [departmentCode, department] = deptKey.split('||')
      const wgMap = new Map<string, typeof deptRows>()
      deptRows.forEach((r) => {
        if (!wgMap.has(r.workgroup)) wgMap.set(r.workgroup, [])
        wgMap.get(r.workgroup)!.push(r)
      })
      const workgroups = Array.from(wgMap.entries()).map(([wg, items]) => ({
        workgroup: wg,
        items: sortRows(items),
      }))
      return {departmentCode, department, workgroups}
    })
  }, [rows])

  const sum = (
    rs: typeof rows,
    sec: 'appraisal' | 'training',
    f: 'staff' | 'nonStaff' | 'expat' | 'total'
  ) => rs.reduce((a, b) => a + b[sec][f], 0)

  return (
    <div>
      <Title text2='MANPOWER DEVELOPMENT SUMMARY' style={{fontSize: '17px'}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            {/* Header baris 1 */}
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Workgroup - Cost Center</th>
              <th rowSpan={2}>Level</th>
              <th colSpan={4}>Appraisal Completed</th>
              <th colSpan={4}>Training Conduct</th>
            </tr>

            {/* Header baris 2 */}
            <tr className='bg-secondary'>
              <th>Staff</th>
              <th>Non Staff</th>
              <th>Expat</th>
              <th>Total</th>
              <th>Staff</th>
              <th>Non Staff</th>
              <th>Expat</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {grouped.map(({departmentCode, department, workgroups}) => {
              const deptAllRows = workgroups.flatMap((w) => w.items)

              return (
                <React.Fragment key={departmentCode}>
                  {/* Header Department */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={11} className='text-start'>
                      {departmentCode} {department}
                    </td>
                  </tr>

                  {/* Workgroups & role list */}
                  {workgroups.map(({workgroup, items}, wgIndex) => (
                    <React.Fragment key={workgroup}>
                      {/* Baris Workgroup */}
                      <tr className='fw-semibold bg-light-success'>
                        <td className='text-start'>{wgIndex + 1}</td>
                        <td className='text-start'>{workgroup}</td>
                        <td></td>
                        <td colSpan={8}></td>
                      </tr>

                      {/* Baris Role (Director, Manager, dst) */}
                      {items.map((r, idx) => (
                        <tr key={r.id} className='text-center'>
                          {/* nomor role DI kolom No */}
                          <td className='text-center'>{idx + 1}</td>
                          {/* nama role di kolom Workgroup */}
                          <td className='text-start'>{r.role}</td>
                          <td>{r.level}</td>

                          {/* Appraisal */}
                          <td>{r.appraisal.staff}</td>
                          <td>{r.appraisal.nonStaff}</td>
                          <td>{r.appraisal.expat}</td>
                          <td className='fw-semibold'>{r.appraisal.total}</td>

                          {/* Training */}
                          <td>{r.training.staff}</td>
                          <td>{r.training.nonStaff}</td>
                          <td>{r.training.expat}</td>
                          <td className='fw-semibold'>{r.training.total}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}

                  {/* Subtotal per Department */}
                  <tr className='fw-semibold bg-light text-center'>
                    <td colSpan={3} className='text-end pe-2'>
                      Total {department} :
                    </td>
                    <td>{sum(deptAllRows, 'appraisal', 'staff')}</td>
                    <td>{sum(deptAllRows, 'appraisal', 'nonStaff')}</td>
                    <td>{sum(deptAllRows, 'appraisal', 'expat')}</td>
                    <td>{sum(deptAllRows, 'appraisal', 'total')}</td>
                    <td>{sum(deptAllRows, 'training', 'staff')}</td>
                    <td>{sum(deptAllRows, 'training', 'nonStaff')}</td>
                    <td>{sum(deptAllRows, 'training', 'expat')}</td>
                    <td>{sum(deptAllRows, 'training', 'total')}</td>
                  </tr>
                </React.Fragment>
              )
            })}

            {/* Grand Total */}
            <tr className='fw-bold bg-secondary text-center'>
              <td colSpan={3} className='text-end pe-2'>
                Manpower Grand Total :
              </td>
              <td>{sum(rows, 'appraisal', 'staff')}</td>
              <td>{sum(rows, 'appraisal', 'nonStaff')}</td>
              <td>{sum(rows, 'appraisal', 'expat')}</td>
              <td>{sum(rows, 'appraisal', 'total')}</td>
              <td>{sum(rows, 'training', 'staff')}</td>
              <td>{sum(rows, 'training', 'nonStaff')}</td>
              <td>{sum(rows, 'training', 'expat')}</td>
              <td>{sum(rows, 'training', 'total')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServiceDevelopmentSummaryTab
