import React from 'react'
import {AssetRow} from '../../dummy'
import {materialDummy, MaterialRow} from './dummy'

type Props = {asset?: AssetRow | null}

const MaterialTab: React.FC<Props> = ({asset}) => {
  const rows: MaterialRow[] | undefined = asset?.assetNo ? materialDummy[asset.assetNo] : undefined

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th>Request No</th>
            <th>Item</th>
            <th>Stockcode</th>
            <th>Description</th>
            <th>UOM</th>
            <th>BIN</th>
            <th>Qty Issued</th>
            <th>CostCenter</th>
            <th>Workorder</th>
            <th>AccountCode</th>
            <th>Issued Date</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.requestNo}</td>
                <td>{r.item}</td>
                <td>{r.stockcode}</td>
                <td>{r.description}</td>
                <td>{r.uom}</td>
                <td>{r.bin}</td>
                <td>{r.qtyIssued}</td>
                <td>{r.costCenter}</td>
                <td>{r.workorder}</td>
                <td>{r.accountCode}</td>
                <td>{r.issuedDate}</td>
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

export default MaterialTab
