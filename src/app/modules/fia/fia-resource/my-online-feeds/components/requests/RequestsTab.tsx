import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../../../../../_metronic'
import {useRequestsContext} from './RequestsContext'
import Title from '../Title'
import RequestViewModal from './modal/RequestsViewModal'
import RequestsHistoryModal from './modal/RequestsHistoryModal'
import {RequestsRow} from './types'
import {useCanAccessRoute} from '../../../../../../custom-hooks'

const RequestsTab = () => {
  const canAccess = useCanAccessRoute('/fia-resource/my_online_feeds/requests')
  const {requestsRows, getRequestsCount, isLoading, error} = useRequestsContext()

  // ALL hooks MUST be called before any early return
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<RequestsRow | null>(null)

  useEffect(() => {
    console.log('Requests Count:', getRequestsCount())
  }, [requestsRows, getRequestsCount])

  useEffect(() => {
    if (!selectedRequest?.ref_doc_no) return
    const latest = requestsRows.find((row) => row.ref_doc_no === selectedRequest.ref_doc_no)
    if (latest) {
      setSelectedRequest(latest)
    }
  }, [requestsRows, selectedRequest?.ref_doc_no])

  const normalizeStatus = (status: string) => (status || '').trim()

  // Early return AFTER all hooks
  if (!canAccess) {
    return (
      <div className='alert alert-warning'>
        <h4>Access Denied</h4>
        <p>You don't have permission to access this page.</p>
      </div>
    )
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'P#1':
        return 'badge badge-danger fs-7 fw-semibold'
      case 'P#2':
        return 'badge badge-warning fs-7 fw-semibold'
      case 'P#3':
        return 'badge badge-success fs-7 fw-semibold'
      default:
        return 'badge badge-light fs-7 fw-semibold'
    }
  }

  // samakan dengan logic backend computeStatusLabel()
  const getStatusBadgeClass = (status: string) => {
    const s = normalizeStatus(status)

    if (s === 'Cancelled') return 'badge badge-danger fs-7 fw-semibold'
    if (s === 'Rejected' || s.startsWith('Rejected By ')) return 'badge badge-danger fs-7 fw-semibold'
    if (s === 'Approved' || s.startsWith('Approved By ')) return 'badge badge-success fs-7 fw-semibold'
    if (s === 'Pending') return 'badge badge-dark fs-7 fw-semibold'

    // status flow baru dari backend
    if (s === 'Waiting for Verification') return 'badge badge-info fs-7 fw-semibold'
    if (s === 'Waiting for Review') return 'badge badge-primary fs-7 fw-semibold'
    if (s.startsWith('Approval -')) return 'badge badge-warning fs-7 fw-semibold'
    if (s.startsWith('Approver -')) return 'badge badge-warning fs-7 fw-semibold'

    // fallback (kalau ada sisa flow lama)
    if (s === 'Waiting for Approval') return 'badge badge-warning fs-7 fw-semibold'

    return 'badge badge-light fs-7 fw-semibold'
  }

  if (isLoading) return <div>Loading requests...</div>

  if (error) {
    const msg = error?.response?.data?.message ?? error?.message ?? 'Failed to load requests'
    return <div style={{color: 'red'}}>{msg}</div>
  }

  return (
    <div>
      <Title text2='My Online Request' style={{fontSize: '20px'}} className='custom-title mb-5' />

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary py-3'>
              <th className='min-w-30px py-3'>No</th>
              <th className='min-w-100px py-3'>Ref Doc No</th>
              <th className='min-w-140px py-3'>Description</th>
              <th className='min-w-120px py-3'>Trans Type</th>
              <th className='min-w-120px py-3'>Priority</th>
              <th className='min-w-120px py-3'>Request Date</th>
              <th className='min-w-100px py-3'>Status</th>
              <th className='min-w-50px text-end py-3'>View</th>
            </tr>
          </thead>

          <tbody className='text-gray-700'>
            {requestsRows.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className='text-center py-5 text-gray-500'>No requests found</div>
                </td>
              </tr>
            ) : (
              requestsRows.map((row, index) => {
                const statusText = normalizeStatus(row.status)

                return (
                  <tr key={row.id}>
                    <td>
                      <span className='min-w-125px'>{index + 1}</span>
                    </td>
                    <td>
                      <span className='min-w-125px'>{row.ref_doc_no}</span>
                    </td>
                    <td>
                      <span className='min-w-125px'>{row.description}</span>
                    </td>
                    <td>
                      <span className='min-w-125px'>{row.trans_type}</span>
                    </td>
                    <td>
                      <span className={getPriorityClass(row.priority)}>{row.priority}</span>
                    </td>
                    <td>
                      <span className='min-w-125px'>{row.request_date}</span>
                    </td>
                    <td>
                      <div className='d-inline-flex align-items-center gap-2'>
                        <span className={getStatusBadgeClass(statusText)}>{statusText}</span>
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary p-0'
                          onClick={() => {
                            setSelectedRequest(row)
                            setShowHistoryModal(true)
                          }}
                          title='View comment history'
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen004.svg'
                            className='svg-icon-4'
                          />
                        </button>
                      </div>
                    </td>
                    <td className='text-end'>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <button
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          onClick={() => {
                            setSelectedRequest(row)
                            setShowRequestModal(true)
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
                )
              })
            )}
          </tbody>
        </table>

        <RequestViewModal
          show={showRequestModal}
          onHide={() => setShowRequestModal(false)}
          request={selectedRequest}
        />
        <RequestsHistoryModal
          show={showHistoryModal}
          onHide={() => setShowHistoryModal(false)}
          request={selectedRequest}
        />
      </div>
    </div>
  )
}

export default RequestsTab
