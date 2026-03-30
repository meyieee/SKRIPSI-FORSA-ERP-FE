import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../../../../../../_metronic'
import {getMyRequestHistory} from '../../../core/requests'
import {RequestHistoryRow, RequestsRow} from '../types'
import {default as socket} from '../../../../../../../functions/socket'
import '../scss/requestsstyles.scss'

interface RequestsHistoryModalProps {
  show: boolean
  onHide: () => void
  request: RequestsRow | null
}

const RequestsHistoryModal: React.FC<RequestsHistoryModalProps> = ({show, onHide, request}) => {
  const [historyRows, setHistoryRows] = useState<RequestHistoryRow[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const loadHistory = async (refDocNo: string) => {
    try {
      setIsLoading(true)
      setError('')
      const rows = await getMyRequestHistory(refDocNo)
      setHistoryRows(rows)
    } catch (err: any) {
      setHistoryRows([])
      setError(err?.response?.data?.message ?? err?.message ?? 'Failed to load request history')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!show || !request?.ref_doc_no) return

    let isMounted = true

    const loadInitialHistory = async () => {
      try {
        setIsLoading(true)
        setError('')
        const rows = await getMyRequestHistory(request.ref_doc_no)
        if (isMounted) setHistoryRows(rows)
      } catch (err: any) {
        if (isMounted) {
          setHistoryRows([])
          setError(err?.response?.data?.message ?? err?.message ?? 'Failed to load request history')
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadInitialHistory()

    return () => {
      isMounted = false
    }
  }, [show, request?.ref_doc_no])

  useEffect(() => {
    if (!show || !request?.ref_doc_no) return

    const handleApprovalsUpdated = async (payload: any) => {
      const docNos = Array.isArray(payload?.doc_nos) ? payload.doc_nos.map(String) : []
      if (!docNos.includes(String(request.ref_doc_no))) return
      await loadHistory(request.ref_doc_no)
    }

    socket.on('approvals-updated', handleApprovalsUpdated)
    return () => {
      socket.off('approvals-updated', handleApprovalsUpdated)
    }
  }, [show, request?.ref_doc_no])

  if (!request) return null

  const getStatusClass = (status: string) => {
    const s = (status || '').trim().toUpperCase()
    if (s === 'APPROVED') return 'badge badge-success fs-7 fw-semibold'
    if (s === 'REJECTED') return 'badge badge-danger fs-7 fw-semibold'
    if (s === 'PENDING') return 'badge badge-dark fs-7 fw-semibold'
    return 'badge badge-warning fs-7 fw-semibold'
  }

  return (
    <Modal show={show} onHide={onHide} centered size='lg' className='request-view-modal'>
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG
            path='/media/icons/duotune/general/gen004.svg'
            className='svg-icon-2 me-2 text-primary'
          />
          Request Comment History
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='request-detail-item'>
          <span className='label'>Ref Doc No:</span>
          <span className='value'>{request.ref_doc_no}</span>
        </div>

        <div className='request-detail-item'>
          <span className='label'>Description:</span>
          <span className='value'>{request.description}</span>
        </div>

        {isLoading ? (
          <div className='text-center py-5 text-gray-600'>Loading comment history...</div>
        ) : error ? (
          <div className='alert alert-danger mb-0'>{error}</div>
        ) : historyRows.length === 0 ? (
          <div className='text-center py-5 text-gray-500'>No approval comments yet</div>
        ) : (
          <div className='table-responsive mt-5'>
            <table className='table table-row-bordered table-rounded align-middle gs-3 gy-2'>
              <thead>
                <tr className='fw-bold text-gray-700'>
                  <th>Routine</th>
                  <th>Status</th>
                  <th>Approver</th>
                  <th>Date</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {historyRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.routine_label}</td>
                    <td>
                      <span className={getStatusClass(row.status)}>{row.status}</span>
                    </td>
                    <td>{row.approver_name || '-'}</td>
                    <td>{row.action_date || '-'}</td>
                    <td>{row.comment || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default RequestsHistoryModal
