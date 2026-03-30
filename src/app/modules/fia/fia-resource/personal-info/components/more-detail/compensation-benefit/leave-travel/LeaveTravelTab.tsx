import React, {useEffect, useMemo} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {leaveTravelDummy, LeaveTravelRow} from './dummy'

const LeaveTravelTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: LeaveTravelRow[] = useMemo(() => {
    return selectedId ? leaveTravelDummy[selectedId] ?? [] : []
  }, [selectedId])

  useEffect(() => {
    console.log('Leave & Travel count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-140px'>Leave No</th>
                <th className='min-w-160px'>Trip Purpose</th>
                <th className='min-w-140px'>Request Out</th>
                <th className='min-w-140px'>Request In</th>
                <th className='min-w-140px'>Actual Out</th>
                <th className='min-w-140px'>Actual In</th>
                <th className='min-w-100px'>Taken Days</th>
                <th className='min-w-140px'>From</th>
                <th className='min-w-140px'>To</th>
                <th className='min-w-140px '>Flight Status</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.leaveNo}</td>
                    <td>{row.tripPurpose}</td>
                    <td>{row.requestOut}</td>
                    <td>{row.requestIn}</td>
                    <td>{row.actualOut}</td>
                    <td>{row.actualIn}</td>
                    <td>{row.takenDays?.toFixed(2)}</td>
                    <td>{row.from}</td>
                    <td>{row.to}</td>
                    <td>
                      <span
                        className={
                          'badge ' +
                          (row.flightStatus?.toUpperCase() === 'OK'
                            ? 'badge-success'
                            : 'badge-light')
                        }
                      >
                        {row.flightStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className='text-center text-muted py-10'>
                    No leave or travel data for this profile
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

export default LeaveTravelTab
