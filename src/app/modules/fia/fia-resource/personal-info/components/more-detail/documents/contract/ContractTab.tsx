/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useEffect, useMemo, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {contractDummy, ContractRow} from './dummy'
import ContractViewModal from './ContractViewModal'

export const ContractTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: ContractRow[] = useMemo(() => {
    return selectedId ? contractDummy[selectedId] ?? [] : []
  }, [selectedId])

  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<ContractRow | null>(null)

  useEffect(() => {
    console.log('Contract count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px py-3'>No</th>
                <th className='min-w-160px py-3'>Contract No</th>
                <th className='min-w-140px py-3'>No of Contract</th>
                <th className='min-w-140px py-3'>Commance Date</th>
                <th className='min-w-160px py-3'>Completion Date</th>
                <th className='min-w-140px py-3'>Status</th>
                <th className='min-w-160px py-3'>Report To</th>
                <th className='min-w-200px py-3'>New Title Assigned</th>
                <th className='min-w-70px py-3 text-end'>View</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.contractNo}</td>
                    <td>{row.noOfContract}</td>
                    <td>{row.commanceDate}</td>
                    <td>{row.completionDate || ''}</td>
                    <td>{row.status}</td>
                    <td>{row.reportTo}</td>
                    <td>{row.newTitleAssigned}</td>
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
                    No contract data for this profile
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ContractViewModal
          show={showModal}
          onHide={() => setShowModal(false)}
          contract={selected}
        />
      </KTCardBody>
    </KTCard>
  )
}
