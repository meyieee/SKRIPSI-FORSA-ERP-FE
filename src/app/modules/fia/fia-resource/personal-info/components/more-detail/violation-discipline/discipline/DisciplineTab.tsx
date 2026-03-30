import React, {useEffect, useMemo} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {disciplineDummy, DisciplineRow} from './dummy'

const DisciplineTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: DisciplineRow[] = useMemo(() => {
    return selectedId ? disciplineDummy[selectedId] ?? [] : []
  }, [selectedId])

  useEffect(() => {
    console.log('Discipline count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-140px'>Violation No</th>
                <th className='min-w-160px'>Absenteeism Type</th>
                <th className='min-w-140px'>Date From</th>
                <th className='min-w-140px'>Date To</th>
                <th className='min-w-100px'>Total Days</th>
                <th className='min-w-220px'>Comments</th>
                <th className='min-w-160px'>Action Category</th>
                <th className='min-w-160px'>Action Take</th>
                <th className='min-w-140px '>Action Date</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.violationNo}</td>
                    <td>{row.absenteeismType}</td>
                    <td>{row.dateFrom}</td>
                    <td>{row.dateTo}</td>
                    <td>{row.totalDays}</td>
                    <td>{row.comments}</td>
                    <td>{row.actionCategory}</td>
                    <td>{row.actionTake}</td>
                    <td>{row.actionDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className='text-center text-muted py-10'>
                    No discipline data for this profile
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default DisciplineTab
