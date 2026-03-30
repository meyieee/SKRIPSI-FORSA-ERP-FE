import React from 'react'
import {AssetRow} from '../../dummy'
import {pcrAplsDummy, PCRAplsRow} from './dummy'

type Props = {asset?: AssetRow | null}

const PCRAPLsTab: React.FC<Props> = ({asset}) => {
  const rows: PCRAplsRow[] | undefined = asset?.assetNo ? pcrAplsDummy[asset.assetNo] : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th>Replace No</th>
            <th>Component Name</th>
            <th>Position</th>
            <th>Replaced Date</th>
            <th>Serial No</th>
            <th>Installed</th>
            <th>Removed</th>
            <th>Actual Life</th>
            <th>Target Life</th>
            <th>Reason To be Replace</th>
            <th>Workorder</th>
            <th>Qty</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.replaceNo}</td>
                <td>{r.componentName}</td>
                <td>{r.position}</td>
                <td>{r.replacedDate}</td>
                <td>{r.serialNo}</td>
                <td>{r.installed}</td>
                <td>{r.removed}</td>
                <td>{r.actualLife}</td>
                <td>{r.targetLife}</td>
                <td>{r.reason}</td>
                <td>{r.workorder}</td>
                <td>{r.qty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className='text-center text-muted py-10'>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PCRAPLsTab
