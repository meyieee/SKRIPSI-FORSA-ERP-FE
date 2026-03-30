// ManpowerSummaryTab.tsx
import React, {useMemo} from 'react'
import Title from '../../../../my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'
import {manpowerSummaryRows, ManpowerSummaryRow} from '../dummy/summaryDummy'

export const ManpowerSummaryTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = manpowerSummaryRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // ===== Group by Department, then by Workgroup =====
  const grouped = useMemo(() => {
    const depMap = new Map<string, ManpowerSummaryRow[]>()
    rows.forEach((r) => {
      const key = r.departmentCode
      if (!depMap.has(key)) depMap.set(key, [])
      depMap.get(key)!.push(r)
    })

    return Array.from(depMap.entries()).map(([deptCode, deptRows]) => {
      const wgMap = new Map<string, ManpowerSummaryRow[]>()
      deptRows.forEach((r) => {
        const wg = r.workgroup ?? '(No Workgroup)'
        if (!wgMap.has(wg)) wgMap.set(wg, [])
        wgMap.get(wg)!.push(r)
      })
      return {deptCode, deptName: deptRows[0].department, workgroups: Array.from(wgMap.entries())}
    })
  }, [rows])

  // ===== Grand total =====
  const totals = useMemo(
    () => ({
      staff: rows.reduce((a, b) => a + b.staff, 0),
      nonStaff: rows.reduce((a, b) => a + b.nonStaff, 0),
      expatType: rows.reduce((a, b) => a + b.expatType, 0),
      totalType: rows.reduce((a, b) => a + b.totalType, 0),
      local: rows.reduce((a, b) => a + b.local, 0),
      national: rows.reduce((a, b) => a + b.national, 0),
      expatClass: rows.reduce((a, b) => a + b.expatClass, 0),
      totalClass: rows.reduce((a, b) => a + b.totalClass, 0),
    }),
    [rows]
  )

  const sumDept = (rs: ManpowerSummaryRow[]) => ({
    staff: rs.reduce((a, b) => a + b.staff, 0),
    nonStaff: rs.reduce((a, b) => a + b.nonStaff, 0),
    expatType: rs.reduce((a, b) => a + b.expatType, 0),
    totalType: rs.reduce((a, b) => a + b.totalType, 0),
    local: rs.reduce((a, b) => a + b.local, 0),
    national: rs.reduce((a, b) => a + b.national, 0),
    expatClass: rs.reduce((a, b) => a + b.expatClass, 0),
    totalClass: rs.reduce((a, b) => a + b.totalClass, 0),
  })

  return (
    <div>
      <Title text2='CURRENT MANPOWER SUMMARY' style={{fontSize: '17px'}} className='mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            {/* BARIS 1 */}
            <tr className='fw-bold bg-secondary align-middle'>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Level Description</th>
              <th rowSpan={2}>Level</th>
              <th rowSpan={2}>Cost Center</th>
              <th colSpan={4}>Employee Type</th>
              <th colSpan={4}>Employee Classification</th>
            </tr>

            {/* BARIS 2 – hanya sub-header Employee Type & Classification */}
            <tr className='fw-bold bg-secondary'>
              <th>Staff</th>
              <th>Non Staff</th>
              <th>Expat</th>
              <th>Total</th>
              <th>Local</th>
              <th>National</th>
              <th>Expat</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {grouped.map(({deptCode, deptName, workgroups}) => (
              <React.Fragment key={deptCode}>
                {/* Department header */}
                <tr className='fw-bold bg-light-primary text-primary'>
                  <td colSpan={12}>
                    {deptCode} — {deptName}
                  </td>
                </tr>

                {/* Workgroups */}
                {workgroups.map(([wgName, wgRows], wgIdx) => {
                  const subtotal = sumDept(wgRows)
                  return (
                    <React.Fragment key={wgName}>
                      {/* Workgroup sub-header */}
                      <tr className='fw-semibold bg-light-success'>
                        <td className='text-center'>{wgIdx + 1}</td>
                        <td className='text-start' colSpan={11}>
                          {wgName}
                        </td>
                      </tr>

                      {wgRows.map((r) => (
                        <tr key={r.id} className='text-center'>
                          <td></td>
                          <td className='text-start'>{r.levelDesc}</td>
                          <td>{r.level}</td>
                          <td>{r.costCenter}</td>
                          <td>{r.staff}</td>
                          <td>{r.nonStaff}</td>
                          <td>{r.expatType}</td>
                          <td className='fw-bold'>{r.totalType}</td>
                          <td>{r.local}</td>
                          <td>{r.national}</td>
                          <td>{r.expatClass}</td>
                          <td className='fw-bold'>{r.totalClass}</td>
                        </tr>
                      ))}

                      {/* subtotal per workgroup */}
                      <tr className='fw-semibold bg-light text-center'>
                        <td colSpan={4} className='text-end pe-2'>
                          Total {wgName} :
                        </td>
                        <td>{subtotal.staff}</td>
                        <td>{subtotal.nonStaff}</td>
                        <td>{subtotal.expatType}</td>
                        <td>{subtotal.totalType}</td>
                        <td>{subtotal.local}</td>
                        <td>{subtotal.national}</td>
                        <td>{subtotal.expatClass}</td>
                        <td>{subtotal.totalClass}</td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </React.Fragment>
            ))}

            {/* Grand Total */}
            <tr className='fw-bold bg-secondary text-white text-center'>
              <td colSpan={4} className='text-end pe-2'>
                TOTAL EMPLOYEES :
              </td>
              <td>{totals.staff}</td>
              <td>{totals.nonStaff}</td>
              <td>{totals.expatType}</td>
              <td>{totals.totalType}</td>
              <td>{totals.local}</td>
              <td>{totals.national}</td>
              <td>{totals.expatClass}</td>
              <td>{totals.totalClass}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManpowerSummaryTab
