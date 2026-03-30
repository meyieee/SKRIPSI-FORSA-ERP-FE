import React, {useEffect, useMemo} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {warningDummy, WarningRow} from './dummy'

const WarningTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: WarningRow[] = useMemo(() => {
    return selectedId ? warningDummy[selectedId] ?? [] : []
  }, [selectedId])

  useEffect(() => {
    console.log('Warning count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-140px'>Warning No</th>
                <th className='min-w-160px'>Warning Category</th>
                <th className='min-w-200px'>Violation DateTime</th>
                <th className='min-w-220px'>Validity</th>
                <th className='min-w-200px'>Violation Type</th>
                <th className='min-w-220px '>Violation Location</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.warningNo}</td>
                    <td>{row.warningCategory}</td>
                    <td>{row.violationDateTime}</td>
                    <td>{row.validity}</td>
                    <td>{row.violationType}</td>
                    <td>{row.violationLocation}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className='text-center text-muted py-10'>
                    No warning data for this profile
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

export default WarningTab
