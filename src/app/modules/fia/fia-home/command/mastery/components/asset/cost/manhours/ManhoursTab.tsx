import React from 'react'
import {AssetRow} from '../../dummy'
import {manhoursDummy, ManhoursRow} from './dummy'

type Props = {asset?: AssetRow | null}

const ManhoursTab: React.FC<Props> = ({asset}) => {
  const rows: ManhoursRow[] | undefined = asset?.assetNo ? manhoursDummy[asset.assetNo] : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary '>
            <th style={{width: 90}}>Trans No</th>
            <th>Resource</th>
            <th>Man</th>
            <th>Hours</th>
            <th>Duration</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Trans Date</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.transNo}</td>
                <td>{r.resource}</td>
                <td>{r.man}</td>
                <td>{r.hours}</td>
                <td>{r.duration}</td>
                <td>{r.rate}</td>
                <td>{r.amount}</td>
                <td>{r.transDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className='text-center text-muted py-10'>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManhoursTab
