import React from 'react'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../../../../../../../_metronic/helpers/components'
import { OnlineTask } from '../types'

interface OnlineTaskViewModalProps {
  show: boolean
  onHide: () => void
  task: OnlineTask | null
}

const OnlineTaskViewModal: React.FC<OnlineTaskViewModalProps> = ({ show, onHide, task }) => {
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
            <span className='badge badge-warning fs-7 fw-semibold'>{task.status}</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default OnlineTaskViewModal

