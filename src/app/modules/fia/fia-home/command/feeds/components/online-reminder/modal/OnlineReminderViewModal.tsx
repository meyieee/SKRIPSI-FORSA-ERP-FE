import React from 'react'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../../../../../../../_metronic/helpers/components'
import { OnlineReminder } from '../types'

interface OnlineReminderViewModalProps {
  show: boolean
  onHide: () => void
  reminder: OnlineReminder | null
}

const OnlineReminderViewModal: React.FC<OnlineReminderViewModalProps> = ({
  show,
  onHide,
  reminder,
}) => {
  if (!reminder) return null

  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG
            path='/media/icons/duotune/general/gen004.svg'
            className='svg-icon-2 me-2 text-primary'
          />
          Reminder Detail
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='d-flex flex-column gap-3'>
          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Doc No:</span>
            <span className='text-gray-800'>{reminder.docNo}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Title:</span>
            <span className='text-gray-800'>{reminder.title}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Person Incharge:</span>
            <span className='text-gray-800'>{reminder.personIncharge}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Actual Due:</span>
            <span className='text-gray-800'>{reminder.actualDue}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Will Due:</span>
            <span className='text-gray-800'>{reminder.willDue || '-'}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Notification:</span>
            {reminder.notification ? (
              <span className='text-danger fw-semibold'>{reminder.notification}</span>
            ) : (
              <span className='text-gray-800'>-</span>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default OnlineReminderViewModal

