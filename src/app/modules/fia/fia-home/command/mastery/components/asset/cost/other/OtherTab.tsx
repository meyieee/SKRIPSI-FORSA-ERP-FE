import React from 'react'
import {AssetRow} from '../../dummy'
import {otherDummy, OtherRow} from './dummy'

type Props = {asset?: AssetRow | null}

const OtherTab: React.FC<Props> = ({asset}) => {
  const rows: OtherRow[] | undefined = asset?.assetNo ? otherDummy[asset.assetNo] : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th style={{width: 56}}>No</th>
            <th>Overhead Code</th>
            <th>Overhead Description</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => {
              const qty = Number(r.quantity)
              const cost = Number(r.cost)
              const total = r.total ?? (!isNaN(qty) && !isNaN(cost) ? qty * cost : r.total)
              return (
                <tr key={idx}>
                  <td>{r.no}</td>
                  <td>{r.overheadCode}</td>
                  <td>{r.overheadDescription}</td>
                  <td>{r.quantity}</td>
                  <td>{r.cost}</td>
                  <td>{total as any}</td>
                </tr>
              )
            })
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

export default OtherTab
