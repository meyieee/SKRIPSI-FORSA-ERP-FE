import React, {useMemo} from 'react'
import {planDetailsRows} from '../dummy/detailsDummy'
import Title from '../../../../my-online-feeds/components/Title'
import {useStatisticFilters} from '../../../StatisticFilterContext'

export const PlanDetailsTab: React.FC = () => {
  const {filters} = useStatisticFilters()

  const rows = planDetailsRows
    .filter((r) => (filters.site ? r.siteBranch === filters.site : true))
    .filter((r) => (filters.department ? r.department === filters.department : true))
    .filter((r) => (filters.section ? r.section === filters.section : true))
    .filter((r) => (filters.element ? r.element === filters.element : true))

  // ===== Group: Department -> Workgroup =====
  const grouped = useMemo(() => {
    // deptKey = "code||name"
    const byDept = new Map<string, typeof rows>()
    rows.forEach((r) => {
      const key = `${r.departmentCode}||${r.department}`
      if (!byDept.has(key)) byDept.set(key, [])
      byDept.get(key)!.push(r)
    })

    return Array.from(byDept.entries()).map(([deptKey, deptRows]) => {
      const [departmentCode, department] = deptKey.split('||')

      // pecah lagi per workgroup
      const byWG = new Map<string, typeof rows>()
      deptRows.forEach((r) => {
        if (!byWG.has(r.workgroup)) byWG.set(r.workgroup, [])
        byWG.get(r.workgroup)!.push(r)
      })

      const workgroups = Array.from(byWG.entries()).map(([workgroup, items]) => ({
        workgroup,
        items,
      }))

      return {departmentCode, department, workgroups}
    })
  }, [rows])

  return (
    <div>
      <Title text2='MANPOWER PLAN/DEMAND DETAILS' style={{fontSize: '17px'}} className='mb-5' />

      {/* Table */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead className='text-center'>
            <tr className='fw-bold bg-secondary'>
              <th>No</th>
              <th>Position No</th>
              <th>Agreement No</th>
              <th>Employment</th>
              <th>Employee Type</th>
              <th>Job Level Description</th>
              <th>Level</th>
              <th>Job Title</th>
              <th>Cost Center</th>
            </tr>
          </thead>

          <tbody>
            {grouped.length === 0 ? (
              <tr>
                <td colSpan={9} className='text-center py-8 text-muted'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              grouped.map(({departmentCode, department, workgroups}) => (
                <React.Fragment key={departmentCode}>
                  {/* Header Department */}
                  <tr className='fw-bold bg-light-primary'>
                    <td colSpan={9} className='text-start'>
                      {departmentCode} - {department}
                    </td>
                  </tr>

                  {/* Blok Workgroup */}
                  {workgroups.map(({workgroup, items}) => (
                    <React.Fragment key={workgroup}>
                      {/* Sub-header Workgroup */}
                      <tr className='fw-semibold bg-light-success'>
                        <td colSpan={9} className='text-start'>
                          {workgroup}
                        </td>
                      </tr>

                      {/* Rows (No di-reset per workgroup) */}
                      {items.map((r, i) => (
                        <tr key={r.id} className='text-center'>
                          <td>{i + 1}</td>
                          <td>{r.positionNo}</td>
                          <td>{r.agreementNo}</td>
                          <td>{r.employment}</td>
                          <td>{r.employeeType}</td>
                          <td>{r.jobLevelDescription}</td>
                          <td>{r.level}</td>
                          <td className='text-start'>{r.jobTitle}</td>
                          <td>{r.costCenter}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlanDetailsTab
