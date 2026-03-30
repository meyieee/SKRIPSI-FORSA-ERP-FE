import React from 'react'
import {KTSVG} from '../../../../../../../../_metronic'
import '../scss/tasksstyles.scss' // pakai .fixed-alert yang sudah kamu punya

type Props = {
  show: boolean
  title?: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
}

const DeleteConfirmAlert: React.FC<Props> = ({
  show,
  title = 'Delete message?',
  message = 'This action will remove the message for everyone.',
  onConfirm,
  onCancel,
}) => {
  if (!show) return null

  return (
    <div className='alert bg-light-danger border border-danger d-flex flex-column flex-sm-row mb-7 p-5 fixed-alert shadow'>
      <span className='svg-icon svg-icon-2hx svg-icon-danger me-4 mb-5 mb-sm-0'>
        <KTSVG path='/media/icons/duotune/general/gen044.svg' className='svg-icon-2hx' />
      </span>

      <div className='d-flex flex-column text-dark pe-0 pe-sm-10 flex-grow-1'>
        <h5 className='mb-1'>{title}</h5>
        <span>{message}</span>
      </div>

      <div className='d-flex align-items-start mt-4 mt-sm-0 gap-2'>
        <button className='btn btn-light-dark' onClick={onCancel}>
          Cancel
        </button>
        <button className='btn btn-danger' onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteConfirmAlert
