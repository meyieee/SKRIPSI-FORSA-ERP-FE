// ApprovalViewModal.tsx
import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {ApprovalRow} from '../types'
import {KTSVG} from '../../../../../../../../_metronic'
import {getMyRequestDetail} from '../../../core/requests'
import {RequestDetailPayload} from '../../requests/types'
import RequestDetailSections from '../../request-detail/RequestDetailSections'
import {default as socket} from '../../../../../../../functions/socket'
import '../../requests/scss/requestsstyles.scss'

interface ApprovalViewModalProps {
  show: boolean
  onHide: () => void
  approval: ApprovalRow | null
}

const ApprovalViewModal: React.FC<ApprovalViewModalProps> = ({show, onHide, approval}) => {
  const [detailPayload, setDetailPayload] = useState<RequestDetailPayload | null>(null)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [detailError, setDetailError] = useState('')

  const loadDetail = async (documentNo: string) => {
    try {
      setIsLoadingDetail(true)
      setDetailError('')
      const payload = await getMyRequestDetail(documentNo)
      setDetailPayload(payload)
    } catch (err: any) {
      setDetailPayload(null)
      setDetailError(err?.response?.data?.message ?? err?.message ?? 'Failed to load request detail')
    } finally {
      setIsLoadingDetail(false)
    }
  }

  useEffect(() => {
    if (!show || !approval?.document_no) return

    let isMounted = true

    const loadInitialDetail = async () => {
      try {
        setIsLoadingDetail(true)
        setDetailError('')
        const payload = await getMyRequestDetail(approval.document_no)
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
  }, [show, approval?.document_no])

  useEffect(() => {
    if (!show || !approval?.document_no) return

    const handleApprovalsUpdated = async (payload: any) => {
      const docNos = Array.isArray(payload?.doc_nos) ? payload.doc_nos.map(String) : []
      if (!docNos.includes(String(approval.document_no))) return
      await loadDetail(approval.document_no)
    }

    socket.on('approvals-updated', handleApprovalsUpdated)
    return () => {
      socket.off('approvals-updated', handleApprovalsUpdated)
    }
  }, [show, approval?.document_no])

  if (!approval) return null

  const normalizeStatus = (status: string) => (status || '').trim()

  const getStatusClass = (row: ApprovalRow) => {
    const s = normalizeStatus(row.status)

    // Pending with aging like table
    if (s === 'Pending') {
      const days = getPendingAgeDays(row)
      if (days >= 61) return 'badge badge-danger fs-7 fw-semibold'
      if (days >= 31) return 'badge badge-warning fs-7 fw-semibold'
      if (days >= 1) return 'badge badge-success fs-7 fw-semibold'
      return 'badge badge-dark fs-7 fw-semibold'
    }

    // match backend computeStatusLabel()
    if (s === 'Waiting for Verification') return 'badge badge-info fs-7 fw-semibold'
    if (s === 'Waiting for Review') return 'badge badge-primary fs-7 fw-semibold'
    if (s.startsWith('Approval -')) return 'badge badge-warning fs-7 fw-semibold'
    if (s.startsWith('Approver -')) return 'badge badge-warning fs-7 fw-semibold'

    if (s === 'Approved') return 'badge badge-success fs-7 fw-semibold'
    if (s === 'Rejected') return 'badge badge-danger fs-7 fw-semibold'

    return 'badge badge-light fs-7 fw-semibold'
  }

  const getStatusLabel = (status: string) => normalizeStatus(status)

  const diffDays = (a: Date, b: Date) => {
    const MS = 1000 * 60 * 60 * 24
    const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
    return Math.floor((utcA - utcB) / MS)
  }

  const parseDate = (dateString: string): Date => {
    const dateParts = (dateString || '').replace(/[()]/g, '').trim().split('-')
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0])
      const monthMap: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      }
      const month = monthMap[dateParts[1]]
      const year = 2000 + parseInt(dateParts[2])
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day)
      }
    }
    return new Date(dateString)
  }

  const getPendingAgeDays = (row: ApprovalRow) => {
    const baseStr = row.pending_since || row.created
    try {
      const base = parseDate(baseStr)
      const today = new Date()
      return diffDays(today, base)
    } catch {
      return 0
    }
  }

  const renderSuggestionRow = (row: ApprovalRow) => {
    if (!row.precheck) return null
    const isApprove = row.precheck === 'approve'
    const badgeCls = isApprove
      ? 'badge badge-precheck-approve fs-7 fw-semibold'
      : 'badge badge-precheck-reject fs-7 fw-semibold'
    const text = isApprove ? 'Approve' : 'Reject'

    return (
      <>
        <div className='request-detail-item'>
          <span className='label'>Suggestion:</span>
          <span className={badgeCls}>{text}</span>
        </div>
        {row.precheck_by && (
          <div className='request-detail-item'>
            <span className='label'>Suggested By:</span>
            <span className='value'>{row.precheck_by}</span>
          </div>
        )}
        {row.precheck_notes && (
          <div className='request-detail-item'>
            <span className='label'>Suggestion Notes:</span>
            <span className='value'>{row.precheck_notes}</span>
          </div>
        )}
      </>
    )
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
          Approval Detail
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='detail-summary-grid'>
          <div className='request-detail-item'>
            <span className='label'>Document No:</span>
            <span className='value'>{approval.document_no}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Request Type:</span>
            <span className='value'>{approval.request_type}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Created:</span>
            <span className='value'>{approval.created}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Raised By:</span>
            <span className='value'>{approval.raised_by}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Project Description:</span>
            <span className='value'>{approval.project_desc}</span>
          </div>

          <div className='request-detail-item'>
            <span className='label'>Status:</span>
            <span className={getStatusClass(approval)}>{getStatusLabel(approval.status)}</span>
          </div>
        </div>

        {renderSuggestionRow(approval)}

        {approval.notes && (
          <div className='request-detail-item'>
            <span className='label'>Notes:</span>
            <span className='value'>{approval.notes}</span>
          </div>
        )}

        {approval.processed_date && (
          <div className='request-detail-item'>
            <span className='label'>Processed Date:</span>
            <span className='value'>{approval.processed_date}</span>
          </div>
        )}

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

export default ApprovalViewModal
