import React, {useEffect, useMemo} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {ppeDummy, PPERow} from './dummy'

const PPETab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: PPERow[] = useMemo(() => {
    return selectedId ? ppeDummy[selectedId] ?? [] : []
  }, [selectedId])

  useEffect(() => {
    console.log('PPE count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-180px'>PPE</th>
                <th className='min-w-140px'>Date Replace</th>
                <th className='min-w-220px'>Reason to Replace</th>
                <th className='min-w-160px'>Checked By</th>
                <th className='min-w-160px'>Approved By</th>
                <th className='min-w-120px '>Stockcode</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.ppe}</td>
                    <td>{row.dateReplace}</td>
                    <td>{row.reasonToReplace}</td>
                    <td>{row.checkedBy}</td>
                    <td>{row.approvedBy}</td>
                    <td>{row.stockcode}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className='text-center text-muted py-10'>
                    No PPE data for this profile
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

export default PPETab
