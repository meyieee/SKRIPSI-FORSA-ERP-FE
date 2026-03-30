// RequestViewModal.tsx (adapt biar sama dengan backend status baru juga)
import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {RequestDetailPayload, RequestsRow} from '../types'
import {KTSVG} from '../../../../../../../../_metronic'
import {getMyRequestDetail} from '../../../core/requests'
import RequestDetailSections from '../../request-detail/RequestDetailSections'
import {default as socket} from '../../../../../../../functions/socket'
import '../scss/requestsstyles.scss'

interface RequestViewModalProps {
  show: boolean
  onHide: () => void
  request: RequestsRow | null
}

const RequestViewModal: React.FC<RequestViewModalProps> = ({show, onHide, request}) => {
  const [detailPayload, setDetailPayload] = useState<RequestDetailPayload | null>(null)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [detailError, setDetailError] = useState('')

  const loadDetail = async (refDocNo: string) => {
    try {
      setIsLoadingDetail(true)
      setDetailError('')
      const payload = await getMyRequestDetail(refDocNo)
      setDetailPayload(payload)
    } catch (err: any) {
      setDetailPayload(null)
      setDetailError(err?.response?.data?.message ?? err?.message ?? 'Failed to load request detail')
    } finally {
      setIsLoadingDetail(false)
    }
  }

  useEffect(() => {
    if (!show || !request?.ref_doc_no) return

    let isMounted = true

    const loadInitialDetail = async () => {
      try {
        setIsLoadingDetail(true)
        setDetailError('')
        const payload = await getMyRequestDetail(request.ref_doc_no)
        if (isMounted) setDetailPayload(payload)
      } catch (err: any) {
        if (isMounted) {
          setDetailPayload(null)
          setDetailError(err?.response?.data?.message ?? err?.message ?? 'Failed to load request detail')
        }
      } finally {
        if (isMounted) setIsLoadingDetail(false)
      }
    }

    loadInitialDetail()

    return () => {
      isMounted = false
    }
  }, [show, request?.ref_doc_no])

  useEffect(() => {
    if (!show || !request?.ref_doc_no) return

    const handleApprovalsUpdated = async (payload: any) => {
      const docNos = Array.isArray(payload?.doc_nos) ? payload.doc_nos.map(String) : []
      if (!docNos.includes(String(request.ref_doc_no))) return
      await loadDetail(request.ref_doc_no)
    }

    socket.on('approvals-updated', handleApprovalsUpdated)
    return () => {
      socket.off('approvals-updated', handleApprovalsUpdated)
    }
  }, [show, request?.ref_doc_no])

  if (!request) return null

  const normalizeStatus = (status: string) => (status || '').trim()

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
    if (s === 'Pending') return 'badge badge-dark fs-7 fw-semibold'

    // match backend computeStatusLabel() (kalau Requests sudah pakai status baru)
    if (s === 'Waiting for Verification') return 'badge badge-info fs-7 fw-semibold'
    if (s === 'Waiting for Review') return 'badge badge-primary fs-7 fw-semibold'
    if (s.startsWith('Approval -')) return 'badge badge-warning fs-7 fw-semibold'
    if (s.startsWith('Approver -')) return 'badge badge-warning fs-7 fw-semibold'

    if (s === 'Approved' || s.startsWith('Approved By ')) return 'badge badge-success fs-7 fw-semibold'
    if (s === 'Rejected' || s.startsWith('Rejected By ')) return 'badge badge-danger fs-7 fw-semibold'

    // fallback lama (kalau masih ada)
    if (s === 'Waiting for Approval') return 'badge badge-warning fs-7 fw-semibold'

    return 'badge badge-light fs-7 fw-semibold'
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size='xl'
      className='request-view-modal'
    >
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
            <span className='value'>{request.ref_doc_no}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Transaction Type:</span>
            <span className='value'>{request.trans_type}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Description:</span>
            <span className='value'>{request.description}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Priority:</span>
            <span className={getPriorityClass(request.priority)}>{request.priority}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Request Date:</span>
            <span className='value'>{request.request_date}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Status:</span>
            <span className={getStatusClass(request.status)}>{normalizeStatus(request.status)}</span>
          </div>
        </div>

        {isLoadingDetail ? (
          <div className='text-center py-5 text-gray-600'>Loading request detail...</div>
        ) : detailError ? (
          <div className='alert alert-danger mt-5 mb-0'>{detailError}</div>
        ) : (
          <RequestDetailSections payload={detailPayload} />
        )}
      </Modal.Body>
    </Modal>
  )
}

export default RequestViewModal
