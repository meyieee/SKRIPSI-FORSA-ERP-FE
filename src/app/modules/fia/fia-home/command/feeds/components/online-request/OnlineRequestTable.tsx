import React from 'react'
import { KTSVG } from '../../../../../../../../_metronic'
import { normalizeStatus, OnlineRequest } from './types'

type Props = {
  requests: OnlineRequest[]
  onView?: (request: OnlineRequest) => void
  isLoading?: boolean
  error?: string | null
}

const OnlineRequestTable: React.FC<Props> = ({ requests, onView, isLoading = false, error = null }) => {
  const handleView = (request: OnlineRequest) => {
    if (onView) {
      onView(request)
    }
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

  const getStatusClass = (status: string) => {
    const s = normalizeStatus(status)

    if (s === 'Cancelled') return 'badge badge-danger fs-7 fw-semibold'
    if (s === 'Rejected' || s.startsWith('Rejected By ')) {
      return 'badge badge-danger fs-7 fw-semibold'
    }
    if (s === 'Approved' || s.startsWith('Approved By ')) {
      return 'badge badge-success fs-7 fw-semibold'
    }
    if (s === 'Pending') return 'badge badge-dark fs-7 fw-semibold'
    if (s === 'Waiting for Verification') return 'badge badge-info fs-7 fw-semibold'
    if (s === 'Waiting for Review') return 'badge badge-primary fs-7 fw-semibold'
    if (s.startsWith('Approval -')) return 'badge badge-warning fs-7 fw-semibold'
    if (s.startsWith('Approver -')) return 'badge badge-warning fs-7 fw-semibold'
    if (s === 'Waiting Approval' || s === 'Waiting for Approval') {
      return 'badge badge-warning fs-7 fw-semibold'
    }

    return 'badge badge-light fs-7 fw-semibold'
  }

  const total = requests.length

  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        {/* Title */}
        <div className='mb-3'>
          <h3 className='fw-bold fs-3 mb-0'>ONLINE REQUEST CONTROL</h3>
        </div>

        {/* ===== Table ===== */}
        <div className='table-responsive'>
          {error && <div className='alert alert-warning py-3 mb-3'>{error}</div>}
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold align-middle bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-120px'>Ref Request No</th>
                <th className='min-w-250px'>Description</th>
                <th className='min-w-120px'>Request Type</th>
                <th className='min-w-120px'>Requestor</th>
                <th className='min-w-80px text-center'>Priority</th>
                <th className='min-w-100px'>Request Date</th>
                <th className='min-w-100px'>Expired</th>
                <th className='min-w-120px'>Status</th>
                <th className='min-w-100px text-end py-3'>Action</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className='text-center text-muted py-10'>
                    Loading online request history...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={10} className='text-center text-muted py-10'>
                    No data found for current filters.
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.no}</td>
                    <td>{request.refDocNo}</td>
                    <td>{request.description}</td>
                    <td>{request.transType}</td>
                    <td>{request.requestor}</td>
                    <td className='text-center'>
                      <span className={getPriorityClass(request.priority)}>{request.priority}</span>
                    </td>
                    <td>{request.requestDate}</td>
                    <td>{request.expired}</td>
                    <td>
                      <span className={getStatusClass(request.status)}>
                        {normalizeStatus(request.status)}
                      </span>
                    </td>
                    <td className='text-end'>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        {onView && (
                          <button
                            type='button'
                            className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                            onClick={() => handleView(request)}
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen004.svg'
                              className='svg-icon-3'
                            />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='small text-muted mt-2'>
          Showing <span className='fw-semibold'>{total}</span> record{total !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}

export default OnlineRequestTable

