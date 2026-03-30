import React from 'react'
import {AssetRow} from '../../dummy'
import {pmServiceDummy, PMServiceRow} from './dummy'

type Props = {asset?: AssetRow | null}

const PMServiceTab: React.FC<Props> = ({asset}) => {
  const rows: PMServiceRow[] | undefined = asset?.assetNo
    ? pmServiceDummy[asset.assetNo]
    : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th>PM No</th>
            <th>Description</th>
            <th>Last Done</th>
            <th>Start DateTime</th>
            <th>Finish DateTime</th>
            <th>Duration</th>
            <th>Reading</th>
            <th>Work Order</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.pmNo}</td>
                <td>{r.description}</td>
                <td>{r.lastDone}</td>
                <td>{r.startDateTime}</td>
                <td>{r.finishDateTime}</td>
                <td>{r.duration}</td>
                <td>{r.reading}</td>
                <td>{r.workOrder}</td>
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

export default PMServiceTab
