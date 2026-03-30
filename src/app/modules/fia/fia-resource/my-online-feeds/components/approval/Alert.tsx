// ApprovalAlert.tsx
import React from 'react'
import {KTSVG} from '../../../../../../../_metronic'
import './scss/approvalstyles.scss'

interface ApprovalAlertProps {
  showAlert: boolean
}

const ApprovalAlert: React.FC<ApprovalAlertProps> = ({showAlert}) => {
  if (!showAlert) {
    return null // Tidak tampilkan alert jika showAlert false
  }

  return (
    <div className='alert bg-light-danger border border-danger d-flex flex-column flex-sm-row mb-7 p-5 fixed-alert-approval'>
      <span className='svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0'>
        <KTSVG
          path='/media/icons/duotune/general/gen044.svg'
          className='svg-icon-2hx svg-icon-dark'
        />
      </span>
      <div className='d-flex flex-column text-dark pe-0 pe-sm-10'>
        <h5 className='mb-1'>No item selected</h5>
        <span>Please select at least one item before proceeding with the action.</span>
      </div>
    </div>
  )
}

export default ApprovalAlert
