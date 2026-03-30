import React from 'react'
import {AssetRow} from '../../dummy'
import {breakdownDummy, BreakdownRow} from './dummy'

type Props = {asset?: AssetRow | null}

const BreakdownTab: React.FC<Props> = ({asset}) => {
  const rows: BreakdownRow[] | undefined = asset?.assetNo
    ? breakdownDummy[asset.assetNo]
    : undefined

  const statusBadge = (status: string) => {
    const s = status.toLowerCase()
    const cls =
      s === 'ready'
        ? 'badge bg-success'
        : s === 'down'
        ? 'badge bg-danger'
        : s === 'standby'
        ? 'badge bg-secondary'
        : 'badge bg-dark'
    return <span className={`${cls}`}>{status}</span>
  }

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th>No</th>
            <th>Asset No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Reading</th>
            <th>Resp</th>
            <th>Status</th>
            <th>Type</th>
            <th>Description</th>
            <th>Category</th>
            <th>Comment</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.no}</td>
                <td>{r.assetNo}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.duration}</td>
                <td>{r.reading}</td>
                <td>{r.resp}</td>
                <td>{statusBadge(r.status)}</td>
                <td>{r.type}</td>
                <td>{r.description}</td>
                <td>{r.category}</td>
                <td>{r.comment ?? '-'}</td>
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

export default BreakdownTab
