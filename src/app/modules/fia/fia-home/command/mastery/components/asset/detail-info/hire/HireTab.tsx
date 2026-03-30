import React from 'react'
import {AssetRow} from '../../dummy'
import {hireDummy, HireRateRow} from './dummy'

type Props = {asset?: AssetRow | null}

const HireTab: React.FC<Props> = ({asset}) => {
  const rows: HireRateRow[] | undefined = asset?.assetNo ? hireDummy[asset.assetNo] : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th>Assigned Date</th>
            <th>Description</th>
            <th>Rate Type</th>
            <th>Percentage</th>
            <th>Internal Rate</th>
            <th>External Rate</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.assignedDate}</td>
                <td>{r.description}</td>
                <td>{r.rateType}</td>
                <td>{r.percentage ?? '-'}</td>
                <td>{r.internalRate ?? '-'}</td>
                <td>{r.externalRate ?? '-'}</td>
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

export default HireTab
