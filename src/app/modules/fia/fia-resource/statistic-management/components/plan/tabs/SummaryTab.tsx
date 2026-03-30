import React, {useMemo} from 'react'
import {planSummaryRows} from '../dummy/summaryDummy'
import Title from '../../../../my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'

export const PlanSummaryTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = planSummaryRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // ===== Group: Department -> Workgroup =====
  const grouped = useMemo(() => {
    type Row = typeof rows[number]

    const deptMap = new Map<
      string,
      {departmentCode: string; department: string; workgroups: {name: string; items: Row[]}[]}
    >()

    rows.forEach((r) => {
      const deptKey = `${r.departmentCode}||${r.department}`
      if (!deptMap.has(deptKey)) {
        deptMap.set(deptKey, {
          departmentCode: r.departmentCode,
          department: r.department,
          workgroups: [],
        })
      }
      const dept = deptMap.get(deptKey)!
      let wg = dept.workgroups.find((w) => w.name === r.workgroup)
      if (!wg) {
        wg = {name: r.workgroup, items: []}
        dept.workgroups.push(wg)
      }
      wg.items.push(r)
    })

    return Array.from(deptMap.values())
  }, [rows])

  const sumField = (
    rs: typeof rows,
    section: 'current' | 'additional' | 'requirement',
    field: 'staff' | 'nonStaff' | 'expat' | 'total'
  ) => rs.reduce((a, b) => a + b[section][field], 0)

  return (
    <div>
      <Title text2='MANPOWER PLAN/DEMAND SUMMARY' style={{fontSize: '17px'}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            {/* HEADER BARIS 1 */}
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2} className='min-w-60px'>
                No
              </th>
              <th rowSpan={2} className='min-w-260px text-start'>
                Workgroup - Cost Center
              </th>
              <th rowSpan={2}>Level</th>
              <th colSpan={4}>Current Manpower</th>
              <th colSpan={4}>Additional</th>
              <th colSpan={4}>Requirement</th>
            </tr>
            {/* HEADER BARIS 2 */}
            <tr className='bg-secondary'>
              <th>Staff</th>
              <th>Non Staff</th>
              <th>Expat</th>
              <th>Total</th>
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
                  {/* BARIS DEPARTMENT */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={15} className='text-start'>
                      {departmentCode} - {department}
                    </td>
                  </tr>

                  {/* WORKGROUP + DETAIL ROLE */}
                  {workgroups.map(({name, items}, wgIdx) => (
                    <React.Fragment key={`${departmentCode}-${name}`}>
                      {/* BARIS WORKGROUP (nomor di kolom No, background beda) */}
                      <tr className='fw-semibold bg-light-success'>
                        <td className='text-start'>{wgIdx + 1}</td>
                        <td className='text-start'>{name}</td>
                        <td></td>
                        <td colSpan={12}></td>
                      </tr>

                      {/* BARIS ROLE — nomor untuk Director, Manager, dst di kolom No */}
                      {items.map((r, idx) => (
                        <tr key={r.id} className='text-center'>
                          <td className='text-center'>{idx + 1}</td>
                          <td className='text-start'>{r.jobTitle}</td>
                          <td>{r.level}</td>

                          {/* Current */}
                          <td>{r.current.staff}</td>
                          <td>{r.current.nonStaff}</td>
                          <td>{r.current.expat}</td>
                          <td className='fw-semibold'>{r.current.total}</td>

                          {/* Additional */}
                          <td>{r.additional.staff}</td>
                          <td>{r.additional.nonStaff}</td>
                          <td>{r.additional.expat}</td>
                          <td className='fw-semibold'>{r.additional.total}</td>

                          {/* Requirement */}
                          <td>{r.requirement.staff}</td>
                          <td>{r.requirement.nonStaff}</td>
                          <td>{r.requirement.expat}</td>
                          <td className='fw-semibold'>{r.requirement.total}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}

                  {/* SUBTOTAL PER DEPARTMENT */}
                  <tr className='fw-semibold bg-light text-center'>
                    <td colSpan={3} className='text-end pe-2'>
                      Total {department} :
                    </td>
                    <td>{sumField(deptAllRows, 'current', 'staff')}</td>
                    <td>{sumField(deptAllRows, 'current', 'nonStaff')}</td>
                    <td>{sumField(deptAllRows, 'current', 'expat')}</td>
                    <td>{sumField(deptAllRows, 'current', 'total')}</td>
                    <td>{sumField(deptAllRows, 'additional', 'staff')}</td>
                    <td>{sumField(deptAllRows, 'additional', 'nonStaff')}</td>
                    <td>{sumField(deptAllRows, 'additional', 'expat')}</td>
                    <td>{sumField(deptAllRows, 'additional', 'total')}</td>
                    <td>{sumField(deptAllRows, 'requirement', 'staff')}</td>
                    <td>{sumField(deptAllRows, 'requirement', 'nonStaff')}</td>
                    <td>{sumField(deptAllRows, 'requirement', 'expat')}</td>
                    <td>{sumField(deptAllRows, 'requirement', 'total')}</td>
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlanSummaryTab
