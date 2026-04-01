import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../../../../../../../_metronic/helpers/components'
import { normalizeStatus, OnlineRequest, OnlineRequestDetailPayload } from '../types'
import { getOnlineRequestDetail } from '../../../core/onlineRequest.requests'

interface OnlineRequestViewModalProps {
  show: boolean
  onHide: () => void
  request: OnlineRequest | null
}

const OnlineRequestViewModal: React.FC<OnlineRequestViewModalProps> = ({
  show,
  onHide,
  request,
}) => {
  const [detail, setDetail] = useState<OnlineRequestDetailPayload | null>(null)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [detailError, setDetailError] = useState('')

  useEffect(() => {
    if (!show || !request?.refDocNo) return

    let isMounted = true
    const loadDetail = async () => {
      try {
        setIsLoadingDetail(true)
        setDetailError('')
        const payload = await getOnlineRequestDetail(request.refDocNo)
        if (!isMounted) return
        setDetail(payload)
      } catch (err: any) {
        if (!isMounted) return
        setDetail(null)
        setDetailError(err?.response?.data?.message ?? err?.message ?? 'Failed to load request detail')
      } finally {
        if (isMounted) setIsLoadingDetail(false)
      }
    }

    loadDetail()
    return () => {
      isMounted = false
    }
  }, [show, request?.refDocNo])

  if (!request) return null

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
    if (status === 'Waiting Approval' || status === 'Waiting for Approval') {
      return 'badge badge-warning fs-7 fw-semibold'
    }
    if (status === 'Waiting for Verification') {
      return 'badge badge-info fs-7 fw-semibold'
    }
    if (status === 'Waiting for Review') {
      return 'badge badge-primary fs-7 fw-semibold'
    }
    if (status.startsWith('Approval -') || status.startsWith('Approver -')) {
      return 'badge badge-warning fs-7 fw-semibold'
    }
    if (status === 'Cancelled') {
      return 'badge badge-danger fs-7 fw-semibold'
    }
    if (status === 'Approved') {
      return 'badge badge-success fs-7 fw-semibold'
    }
    return 'badge badge-light fs-7 fw-semibold'
  }

  const detailEntries = Object.entries(detail || {}).filter(
    ([key]) =>
      ![
        'id',
        'refDocNo',
        'description',
        'transType',
        'requestor',
        'priority',
        'requestDate',
        'expired',
        'status',
      ].includes(key)
  )

  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG
            path='/media/icons/duotune/general/gen004.svg'
            className='svg-icon-2 me-2 text-primary'
          />
          Request Detail
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='d-flex flex-column gap-3'>
          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Ref Doc No:</span>
            <span className='text-gray-800'>{request.refDocNo}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Description:</span>
            <span className='text-gray-800'>{request.description}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Transaction Type:</span>
            <span className='text-gray-800'>{request.transType}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Requestor:</span>
            <span className='text-gray-800'>{request.requestor}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Priority:</span>
            <span className={getPriorityClass(request.priority)}>{request.priority}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Request Date:</span>
            <span className='text-gray-800'>{request.requestDate}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Expired:</span>
            <span className='text-gray-800'>{request.expired}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Status:</span>
            <span className={getStatusClass(request.status)}>{normalizeStatus(request.status)}</span>
          </div>

          {isLoadingDetail ? (
            <div className='text-center text-muted py-4'>Loading request detail...</div>
          ) : detailError ? (
            <div className='alert alert-warning py-3 mb-0 mt-2'>{detailError}</div>
          ) : detailEntries.length > 0 ? (
            <div className='border-top pt-3 mt-2'>
              {detailEntries.map(([key, value]) => (
                <div className='d-flex justify-content-between align-items-center py-1' key={key}>
                  <span className='fw-semibold text-gray-700 text-capitalize'>{key}:</span>
                  <span className='text-gray-800'>{String(value ?? '-')}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default OnlineRequestViewModal

