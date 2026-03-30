import React from 'react'
import {AssetRow} from '../../dummy'
import {readingDummy, ReadingRow} from './dummy'

type Props = {asset?: AssetRow | null}

const ReadingTab: React.FC<Props> = ({asset}) => {
  const rows: ReadingRow[] | undefined = asset?.assetNo ? readingDummy[asset.assetNo] : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th>DateTime</th>
            <th>Entered</th>
            <th>Accumulative</th>
            <th>Increment</th>
            <th>Average Using</th>
            <th>Status</th>
            <th>Type</th>
            <th>Update Date</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.dateTime}</td>
                <td>{r.entered}</td>
                <td>{r.accumulative}</td>
                <td>{r.increment}</td>
                <td>{r.averageUsing}</td>
                <td>{r.status}</td>
                <td>{r.type}</td>
                <td>{r.updateDate}</td>
                <td>{r.remarks ?? '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className='text-center text-muted py-10'>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ReadingTab
