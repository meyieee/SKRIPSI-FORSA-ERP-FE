import React, {useEffect, useMemo, useState} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {eFilingDummy, EFilingRow} from './dummy'
import EFilingViewModal from './EFilingViewModal'

export const EFilingTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: EFilingRow[] = useMemo(() => {
    return selectedId ? eFilingDummy[selectedId] ?? [] : []
  }, [selectedId])

  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<EFilingRow | null>(null)

  useEffect(() => {
    console.log('E-Filing count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-200px'>File Type</th>
                <th className='min-w-140px'>Registered Date</th>
                <th className='min-w-220px'>Institution</th>
                <th className='min-w-140px'>Issued Date</th>
                <th className='min-w-240px'>Short Description</th>
                <th className='min-w-140px text-end'>Scan File</th>
              </tr>
            </thead>

            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.fileType}</td>
                    <td>{row.registeredDate}</td>
                    <td>{row.institution}</td>
                    <td>{row.issuedDate}</td>
                    <td>{row.shortDescription}</td>
                    <td className='text-end'>
                      {row.attached ? (
                        <button
                          type='button'
                          className='btn btn-link p-0 text-success text-decoration-underline align-baseline'
                          onClick={() => {
                            setSelected(row)
                            setShowModal(true)
                          }}
                          aria-label='View scanned file'
                        >
                          Attached
                        </button>
                      ) : (
                        <span className='text-danger'>Not Attached</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className='text-center text-muted py-10'>
                    No e-filing data for this profile
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <EFilingViewModal show={showModal} onHide={() => setShowModal(false)} row={selected} />
      </KTCardBody>
    </KTCard>
  )
}
