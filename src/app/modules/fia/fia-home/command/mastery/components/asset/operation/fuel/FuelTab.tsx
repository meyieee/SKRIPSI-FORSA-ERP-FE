import React, {useState} from 'react'
import {AssetRow} from '../../dummy'
import {fuelDummy, FuelRow} from './dummy'
import {KTSVG} from '../../../../../../../../../../_metronic'
import FuelViewModal from './FuelViewModal'

type Props = {asset?: AssetRow | null}

const FuelTab: React.FC<Props> = ({asset}) => {
  const rows: FuelRow[] | undefined = asset?.assetNo ? fuelDummy[asset.assetNo] : undefined

  const [showFuel, setShowFuel] = useState(false)
  const [selectedRow, setSelectedRow] = useState<FuelRow | null>(null)

  const handleOpen = (row: FuelRow) => {
    setSelectedRow(row)
    setShowFuel(true)
  }

  return (
    <>
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-0 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='py-3'>No</th>
              <th className='py-3'>Request No</th>
              <th className='py-3'>DateTime</th>
              <th className='py-3'>Requestor</th>
              <th className='py-3'>Reading</th>
              <th className='py-3'>Stockcode</th>
              <th className='py-3'>Amount</th>
              <th className='py-3'>UOM</th>
              <th className='py-3'>Fuel Bay</th>
              <th className='py-3'>Fuel Card</th>
              <th className='text-end py-3'>Action</th>
            </tr>
          </thead>

          <tbody className='text-gray-800'>
            {rows && rows.length > 0 ? (
              rows.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.no}</td>
                  <td>{r.requestNo}</td>
                  <td>{r.dateTime}</td>
                  <td>{r.requestor}</td>
                  <td>{r.reading}</td>
                  <td>{r.stockcode}</td>
                  <td>{r.amount}</td>
                  <td>{r.uom}</td>
                  <td>{r.fuelBay}</td>
                  <td>{r.fuelCard}</td>
                  <td className='text-end'>
                    <button
                      type='button'
                      className='btn btn-link btn-color-dark btn-active-color-primary me-1'
                      title='View fuel detail'
                      onClick={() => handleOpen(r)}
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen004.svg'
                        className='svg-icon-3'
                      />
                    </button>
                  </td>
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

      {/* Modal */}
      <FuelViewModal show={showFuel} onHide={() => setShowFuel(false)} row={selectedRow} />
    </>
  )
}

export default FuelTab
