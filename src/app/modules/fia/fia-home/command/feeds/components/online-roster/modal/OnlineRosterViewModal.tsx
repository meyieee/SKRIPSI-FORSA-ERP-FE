import React from 'react'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../../../../../../../_metronic/helpers/components'
import { OnlineRoster } from '../types'

interface OnlineRosterViewModalProps {
  show: boolean
  onHide: () => void
  roster: OnlineRoster | null
}

const OnlineRosterViewModal: React.FC<OnlineRosterViewModalProps> = ({
  show,
  onHide,
  roster,
}) => {
  if (!roster) return null

  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG
            path='/media/icons/duotune/general/gen004.svg'
            className='svg-icon-2 me-2 text-primary'
          />
          Roster Detail
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='d-flex flex-column gap-3'>
          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>ID Number:</span>
            <span className='text-gray-800'>{roster.empNo}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Full Name:</span>
            <span className='text-gray-800'>{roster.empName}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Job Title:</span>
            <span className='text-gray-800'>{roster.jobTitle}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Roster:</span>
            <span className='text-gray-800'>{roster.roster}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Department:</span>
            <span className='text-gray-800'>{roster.department}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Workgroup:</span>
            <span className='text-gray-800'>{roster.workgroup}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Crew:</span>
            <span className='text-gray-800'>{roster.crew}</span>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <span className='fw-semibold text-gray-700'>Site | Branch:</span>
            <span className='text-gray-800'>{roster.siteBranch}</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default OnlineRosterViewModal

