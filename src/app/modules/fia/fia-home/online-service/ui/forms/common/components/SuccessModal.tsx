import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'
import { KTSVG } from '../../../../../../../../../_metronic'

type SuccessModalProps = {
  show: boolean
  onClose: () => void
  title?: string
  message: string
  autoClose?: boolean
  autoCloseDelay?: number // default: 3000ms
  requestId?: string
  refRequestNo?: string
}

const modalsRoot = document.getElementById('root-modals') || document.body

export default function SuccessModal({
  show,
  onClose,
  title = 'Success',
  message,
  autoClose = true,
  autoCloseDelay = 3000,
  requestId,
  refRequestNo
}: SuccessModalProps) {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [show, autoClose, autoCloseDelay, onClose])

  const modalContent = (
    <Modal
      id='kt_modal_form_success'
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
              path='/media/icons/duotune/general/gen048.svg' 
              className='svg-icon-3x text-success' 
            />
          </div>
          <div className='text-center mb-5'>
            <h3 className='fw-bolder text-gray-900 mb-3'>{message}</h3>
            {(requestId || refRequestNo) && (
              <div className='text-gray-600 fs-6'>
                {requestId && (
                  <div className='mb-2'>
                    <span className='fw-semibold'>Request ID: </span>
                    <span>{requestId}</span>
                  </div>
                )}
                {refRequestNo && (
                  <div>
                    <span className='fw-semibold'>Ref Request No: </span>
                    <span>{refRequestNo}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='modal-footer'>
        <button className='btn btn-primary' onClick={onClose}>
          OK
        </button>
      </div>
    </Modal>
  )

  return createPortal(modalContent, modalsRoot)
}

