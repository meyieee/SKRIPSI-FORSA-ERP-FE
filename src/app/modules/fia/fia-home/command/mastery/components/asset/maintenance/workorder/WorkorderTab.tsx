import React from 'react'
import {AssetRow} from '../../dummy'
import {workorderDummy, WorkorderRow} from './dummy'

type Props = {asset?: AssetRow | null}

const WorkorderTab: React.FC<Props> = ({asset}) => {
  const rows: WorkorderRow[] | undefined = asset?.assetNo
    ? workorderDummy[asset.assetNo]
    : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th className='text-end' style={{width: 56}}>
              No
            </th>
            <th>WO No</th>
            <th>WO Description</th>
            <th>Priority</th>
            <th>Asset No</th>
            <th>Asset Description</th>
            <th>Due Start</th>
            <th>Due Finish</th>
            <th>Date Started</th>
            <th>Date Finish</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td className='text-end'>{r.no}</td>
                <td>{r.woNo}</td>
                <td>{r.woDescription}</td>
                <td>{r.priority}</td>
                <td>{r.assetNo}</td>
                <td>{r.assetDescription}</td>
                <td>{r.dueStart}</td>
                <td>{r.dueFinish}</td>
                <td>{r.dateStarted}</td>
                <td>{r.dateFinish}</td>
                <td>{r.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11} className='text-center text-muted py-10'>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default WorkorderTab
