import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../../../../../../../_metronic/helpers/components'
import { normalizeStatus, OnlineRequest, OnlineRequestDetailPayload } from '../types'
import { getOnlineRequestDetail } from '../../../core/onlineRequest.requests'
import RequestDetailSections from '../../../../../../fia-resource/my-online-feeds/components/request-detail/RequestDetailSections'
import '../../../../../../fia-resource/my-online-feeds/components/requests/scss/requestsstyles.scss'

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

  const resolvedRefDocNo = String(detail?.refDocNo ?? request.refDocNo ?? '-')
  const resolvedDescription = String(detail?.description ?? request.description ?? '-')
  const resolvedTransType = String(detail?.transType ?? request.transType ?? '-')
  const resolvedRequestor = String(detail?.requestor ?? request.requestor ?? '-')
  const resolvedPriority = String(detail?.priority ?? request.priority ?? '')
  const resolvedRequestDate = String(detail?.requestDate ?? request.requestDate ?? '-')
  const resolvedExpired = String(detail?.expired ?? request.expired ?? '-')
  const resolvedStatus = String(detail?.status ?? request.status ?? '')

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

  return (
    <Modal show={show} onHide={onHide} centered size='xl' className='request-view-modal'>
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
        <div className='detail-summary-grid'>
          <div className='request-detail-item'>
            <span className='label'>Ref Doc No:</span>
            <span className='value'>{resolvedRefDocNo}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Transaction Type:</span>
            <span className='value'>{resolvedTransType}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Description:</span>
            <span className='value'>{resolvedDescription}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Requestor:</span>
            <span className='value'>{resolvedRequestor}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Priority:</span>
            <span className={getPriorityClass(resolvedPriority)}>{resolvedPriority || '-'}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Request Date:</span>
            <span className='value'>{resolvedRequestDate}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Expired:</span>
            <span className='value'>{resolvedExpired}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Status:</span>
            <span className={getStatusClass(resolvedStatus)}>{normalizeStatus(resolvedStatus)}</span>
          </div>
        </div>

        {isLoadingDetail ? (
          <div className='text-center py-5 text-gray-600'>Loading request detail...</div>
        ) : detailError ? (
          <div className='alert alert-warning mt-5 mb-0'>{detailError}</div>
        ) : detail?.detail && typeof detail.detail === 'object' ? (
          <RequestDetailSections payload={detail as any} />
        ) : (
          <div className='text-muted pt-2'>No detail payload available for this request.</div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default OnlineRequestViewModal

