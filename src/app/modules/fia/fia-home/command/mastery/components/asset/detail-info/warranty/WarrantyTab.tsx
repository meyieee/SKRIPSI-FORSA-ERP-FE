import React from 'react'
import {AssetRow} from '../../dummy'
import {warrantyDummy, WarrantyRow} from './dummy'

type Props = {asset?: AssetRow | null}

const WarrantyTab: React.FC<Props> = ({asset}) => {
  const rows: WarrantyRow[] | undefined = asset?.assetNo ? warrantyDummy[asset.assetNo] : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th>Warranty No</th>
            <th>Warranty Period</th>
            <th>Failure Description</th>
            <th>Failure Date</th>
            <th>Warranty Status</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.warrantyNo}</td>
                <td>{r.warrantyPeriod}</td>
                <td>{r.failureDescription}</td>
                <td>{r.failureDate}</td>
                <td>{r.warrantyStatus}</td>
                <td>{r.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className='text-center text-muted py-10'>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default WarrantyTab
