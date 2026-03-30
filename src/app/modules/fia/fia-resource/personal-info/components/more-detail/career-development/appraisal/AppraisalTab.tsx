import React, {useEffect, useMemo, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {appraisalDummy, AppraisalRow} from './dummy'
import AppraisalViewModal from './AppraisalViewModal'

const AppraisalTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: AppraisalRow[] = useMemo(() => {
    return selectedId ? appraisalDummy[selectedId] ?? [] : []
  }, [selectedId])

  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<AppraisalRow | null>(null)

  useEffect(() => {
    console.log('Appraisal count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px py-3'>No</th>
                <th className='min-w-120px py-3'>Appraisal No</th>
                <th className='min-w-200px py-3'>Appraisal Reason</th>
                <th className='min-w-120px py-3'>Appraisal Date</th>
                <th className='min-w-140px py-3'>Date of Appraisal</th>
                <th className='min-w-160px py-3'>Date Last Appraisal</th>
                <th className='min-w-140px py-3'>Appraiser</th>
                <th className='min-w-50px text-end py-3'>View</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.appraisalNo}</td>
                    <td>{row.reason}</td>
                    <td>{row.appraisalDate}</td>
                    <td>{row.dateOfAppraisal}</td>
                    <td>{row.dateLastAppraisal || ''}</td>
                    <td>{row.appraiser}</td>
                    <td className='text-end'>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <button
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          onClick={() => {
                            setSelected(row)
                            setShowModal(true)
                          }}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen004.svg'
                            className='svg-icon-3'
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className='text-center text-muted py-10'>
                    No appraisal data for this profile
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <AppraisalViewModal
            show={showModal}
            onHide={() => setShowModal(false)}
            appraisal={selected}
          />
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default AppraisalTab
