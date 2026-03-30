import React from 'react'
import {AssetRow} from '../../dummy'
import {leasingDummy, LeasingRow} from './dummy'

type Props = {asset?: AssetRow | null}

const LeasingTab: React.FC<Props> = ({asset}) => {
  const rows: LeasingRow[] | undefined = asset?.assetNo ? leasingDummy[asset.assetNo] : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th>Lease No</th>
            <th>Lease Start Date</th>
            <th>Lease End Date</th>
            <th>Lease Term</th>
            <th>Monthly Payment</th>
            <th>Total Payment</th>
            <th>Lessee</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.leaseNo}</td>
                <td>{r.leaseStartDate}</td>
                <td>{r.leaseEndDate}</td>
                <td>{r.leaseTerm}</td>
                <td>{r.monthlyPayment}</td>
                <td>{r.totalPayment}</td>
                <td>{r.lessee}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className='text-center text-muted py-10'>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default LeasingTab
