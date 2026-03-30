import React, {useEffect, useMemo, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {assetDummy, AssetRow} from './dummy'
import AssetViewModal from './AssetViewModal'

const AssetTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: AssetRow[] = useMemo(() => {
    return selectedId ? assetDummy[selectedId] ?? [] : []
  }, [selectedId])

  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<AssetRow | null>(null)

  useEffect(() => {
    console.log('Asset count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px py-3'>No</th>
                <th className='min-w-120px py-3'>Asset No</th>
                <th className='min-w-180px py-3'>Asset Description</th>
                <th className='min-w-180px py-3'>Asset Type</th>
                <th className='min-w-140px py-3'>Model</th>
                <th className='min-w-140px py-3'>Serial No</th>
                <th className='min-w-160px py-3'>Manufacture</th>
                <th className='min-w-120px py-3'>Condition</th>
                <th className='min-w-60px text-end py-3'>View</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={`${row.no}-${row.assetNo}`}>
                    <td>{row.no}</td>
                    <td>{row.assetNo}</td>
                    <td>{row.assetDescription}</td>
                    <td>{row.assetType}</td>
                    <td>{row.model}</td>
                    <td>{row.serialNo}</td>
                    <td>{row.manufacture}</td>
                    <td>{row.condition}</td>
                    <td className='text-end'>
                      <button
                        className='btn btn-link btn-color-dark btn-active-color-primary'
                        onClick={() => {
                          setSelected(row)
                          setShowModal(true)
                        }}
                        aria-label='View'
                        title='View'
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
                  <td colSpan={9} className='text-center text-muted py-10'>
                    No asset data for this profile
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <AssetViewModal show={showModal} onHide={() => setShowModal(false)} asset={selected} />
      </KTCardBody>
    </KTCard>
  )
}

export default AssetTab
