import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../../../../../../../_metronic/helpers/components'
import { getOnlineTaskDetail } from '../../../core/onlineTask.requests'
import { normalizeStatus, OnlineTask, OnlineTaskDetailPayload } from '../types'

interface OnlineTaskViewModalProps {
  show: boolean
  onHide: () => void
  task: OnlineTask | null
}

const OnlineTaskViewModal: React.FC<OnlineTaskViewModalProps> = ({ show, onHide, task }) => {
  const [detail, setDetail] = useState<OnlineTaskDetailPayload | null>(null)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [detailError, setDetailError] = useState('')

  useEffect(() => {
    if (!show || !task?.id) return

    let isMounted = true
    const loadDetail = async () => {
      try {
        setIsLoadingDetail(true)
        setDetailError('')
        const payload = await getOnlineTaskDetail(task.id)
        if (!isMounted) return
        setDetail(payload)
      } catch (err: any) {
        if (!isMounted) return
        setDetail(null)
        setDetailError(err?.response?.data?.message ?? err?.message ?? 'Failed to load task detail')
      } finally {
        if (isMounted) setIsLoadingDetail(false)
      }
    }

    loadDetail()
    return () => {
      isMounted = false
    }
  }, [show, task?.id])

  if (!task) return null

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
    if (status === 'Completed') return 'badge badge-success fs-7 fw-semibold'
    if (status === 'Outstanding') return 'badge badge-warning fs-7 fw-semibold'
    return 'badge badge-light fs-7 fw-semibold'
  }

  const messages = Array.isArray(detail?.messages) ? detail.messages : []

  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG
            path='/media/icons/duotune/general/gen004.svg'
            className='svg-icon-2 me-2 text-primary'
          />
          Task Detail
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='d-flex flex-column gap-3'>
          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Tasks No:</span>
            <span className='text-gray-800'>{task.tasksNo}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Tasks Title:</span>
            <span className='text-gray-800'>{task.tasksTitle}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Assigned By:</span>
            <span className='text-gray-800'>{task.assignedBy}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Assigned To:</span>
            <span className='text-gray-800'>{task.assignedTo}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Priority:</span>
            <span className={getPriorityClass(task.priority)}>{task.priority}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Tasks Date:</span>
            <span className='text-gray-800'>{task.tasksDate}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Expired:</span>
            <span className='text-gray-800'>{task.expired}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Status:</span>
            <span className={getStatusClass(task.status)}>{normalizeStatus(task.status)}</span>
          </div>

          {detail?.shortDescription && (
            <div className='d-flex justify-content-between align-items-center'>
              <span className='fw-semibold text-gray-700'>Instruction:</span>
              <span className='text-gray-800'>{String(detail.shortDescription)}</span>
            </div>
          )}

          {isLoadingDetail ? (
            <div className='text-center text-muted py-4'>Loading task detail...</div>
          ) : detailError ? (
            <div className='alert alert-warning py-3 mb-0 mt-2'>{detailError}</div>
          ) : messages.length > 0 ? (
            <div className='border-top pt-3 mt-2'>
              <div className='fw-bold text-gray-800 mb-2'>Task Messages</div>
              <div className='d-flex flex-column gap-3'>
                {messages.map((message) => (
                  <div key={String(message.id)} className='border rounded p-3'>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                      <span className='fw-semibold text-gray-800'>
                        {message.senderName || message.senderId || '-'}
                      </span>
                      <span className='text-muted fs-8'>{message.createdAt || ''}</span>
                    </div>
                    <div className='text-gray-700'>{message.messageText || '-'}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='text-muted pt-2'>No instruction messages available.</div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default OnlineTaskViewModal

