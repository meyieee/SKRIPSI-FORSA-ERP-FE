import React, {useEffect, useMemo} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {earningsDummy, EarningsRow} from './dummy'

const money = (v?: number) =>
  v === undefined || v === null
    ? ''
    : v.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})

const EarningsTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: EarningsRow[] = useMemo(() => {
    return selectedId ? earningsDummy[selectedId] ?? [] : []
  }, [selectedId])

  useEffect(() => {
    console.log('Earnings count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-140px'>Trans No</th>
                <th className='min-w-260px'>Description</th>
                <th className='min-w-140px'>Trans Date</th>
                <th className='min-w-240px'>Cost Center</th>
                <th className='min-w-160px'>Amount</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.transNo}</td>
                    <td>{row.description}</td>
                    <td>{row.transDate}</td>
                    <td>{row.costCenter}</td>
                    <td>{money(row.amount)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className='text-center text-muted py-10'>
                    No Earnings data for this profile
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

export default EarningsTab
