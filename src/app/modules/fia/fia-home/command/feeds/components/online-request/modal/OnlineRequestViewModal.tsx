import React from 'react'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../../../../../../../_metronic/helpers/components'
import { OnlineRequest } from '../types'

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
    if (status === 'Waiting Approval') {
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
            <span className={getStatusClass(request.status)}>{request.status}</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default OnlineRequestViewModal

