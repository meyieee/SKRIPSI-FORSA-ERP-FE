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

  const formatDetailLabel = (key: string) =>
    key
      .replace(/\.(\d+)\b/g, ' [$1]')
      .replace(/\./g, ' ')
      .replace(/[_-]+/g, ' ')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .trim()
      .replace(/^./, (s) => s.toUpperCase())

  const flattenDetailEntries = (payload: unknown, parentKey = ''): Array<[string, unknown]> => {
    if (payload === null || payload === undefined) {
      return parentKey ? [[parentKey, '-']] : []
    }

    if (Array.isArray(payload)) {
      if (payload.length === 0) return parentKey ? [[parentKey, '-']] : []
      return payload.flatMap((item, index) =>
        flattenDetailEntries(item, parentKey ? `${parentKey}.${index}` : String(index))
      )
    }

    if (typeof payload === 'object') {
      const entries = Object.entries(payload as Record<string, unknown>)
      if (entries.length === 0) return parentKey ? [[parentKey, '-']] : []
      return entries.flatMap(([key, value]) =>
        flattenDetailEntries(value, parentKey ? `${parentKey}.${key}` : key)
      )
    }

    return [[parentKey, payload]]
  }

  const formatDetailValue = (value: unknown): string => {
    if (value === null || value === undefined || value === '') return '-'
    return String(value)
  }

  const detailEntries = flattenDetailEntries(detail || {})

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
            <span className='text-gray-800'>{resolvedRefDocNo}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Description:</span>
            <span className='text-gray-800'>{resolvedDescription}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Transaction Type:</span>
            <span className='text-gray-800'>{resolvedTransType}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Requestor:</span>
            <span className='text-gray-800'>{resolvedRequestor}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Priority:</span>
            <span className={getPriorityClass(resolvedPriority)}>{resolvedPriority || '-'}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Request Date:</span>
            <span className='text-gray-800'>{resolvedRequestDate}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Expired:</span>
            <span className='text-gray-800'>{resolvedExpired}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Status:</span>
            <span className={getStatusClass(resolvedStatus)}>{normalizeStatus(resolvedStatus)}</span>
          </div>

          {isLoadingDetail ? (
            <div className='text-center text-muted py-4'>Loading request detail...</div>
          ) : detailError ? (
            <div className='alert alert-warning py-3 mb-0 mt-2'>{detailError}</div>
          ) : detailEntries.length > 0 ? (
            <div className='border-top pt-3 mt-2'>
              <div className='fw-bold text-gray-800 mb-2'>All Detail Fields</div>
              {detailEntries.map(([key, value]) => (
                <div
                  className='d-flex justify-content-between align-items-center py-1'
                  key={`${key}-${String(value)}`}
                >
                  <span className='fw-semibold text-gray-700'>{formatDetailLabel(key)}:</span>
                  <span className='text-gray-800 text-end'>{formatDetailValue(value)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-muted pt-2'>No detail payload available for this request.</div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default OnlineRequestViewModal

