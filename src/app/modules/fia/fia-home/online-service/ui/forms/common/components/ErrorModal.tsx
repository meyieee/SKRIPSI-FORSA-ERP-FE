import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'
import { KTSVG } from '../../../../../../../../../_metronic'

type ErrorModalProps = {
  show: boolean
  onClose: () => void
  title?: string
  message: string
  errorDetails?: string // untuk error detail yang lebih panjang
}

const modalsRoot = document.getElementById('root-modals') || document.body

export default function ErrorModal({
  show,
  onClose,
  title = 'Error',
  message,
  errorDetails
}: ErrorModalProps) {
  const [showDetails, setShowDetails] = useState(false)

  const modalContent = (
    <Modal
      id='kt_modal_form_error'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-500px'
      show={show}
      onHide={onClose}
    >
      <div className='modal-header'>
        <h2 className='fw-bolder'>{title}</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={onClose}>
          <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
      </div>

      <div className='modal-body py-lg-8 px-lg-8'>
        <div className='d-flex flex-center flex-column'>
          <div className='mb-5'>
            <KTSVG 
              path='/media/icons/duotune/general/gen027.svg' 
              className='svg-icon-3x text-danger' 
            />
          </div>
          <div className='text-center mb-5'>
            <h3 className='fw-bolder text-gray-900 mb-3'>{message}</h3>
            {errorDetails && (
              <div className='mt-5'>
                <button
                  className='btn btn-sm btn-light-primary'
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide' : 'Show'} Details
                </button>
                {showDetails && (
                  <div className='mt-3 p-3 bg-light-danger rounded'>
                    <pre className='text-gray-700 fs-7 mb-0' style={{ whiteSpace: 'pre-wrap' }}>
                      {errorDetails}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='modal-footer'>
        <button className='btn btn-primary' onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  )

  return createPortal(modalContent, modalsRoot)
}

