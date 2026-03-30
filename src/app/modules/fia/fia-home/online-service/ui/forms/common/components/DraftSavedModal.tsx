import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'
import { KTSVG } from '../../../../../../../../../_metronic'

type DraftSavedModalProps = {
  show: boolean
  onClose: () => void
  message?: string
  autoClose?: boolean
  autoCloseDelay?: number // default: 2000ms (lebih cepat dari success)
}

const modalsRoot = document.getElementById('root-modals') || document.body

export default function DraftSavedModal({
  show,
  onClose,
  message = 'Draft saved successfully',
  autoClose = true,
  autoCloseDelay = 2000
}: DraftSavedModalProps) {
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
      id='kt_modal_form_draft_saved'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-500px'
      show={show}
      onHide={onClose}
    >
      <div className='modal-header'>
        <h2 className='fw-bolder'>Draft Saved</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={onClose}>
          <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
      </div>

      <div className='modal-body py-lg-8 px-lg-8'>
        <div className='d-flex flex-center flex-column'>
          <div className='mb-5'>
            <KTSVG 
              path='/media/icons/duotune/files/fil011.svg' 
              className='svg-icon-3x text-info' 
            />
          </div>
          <div className='text-center'>
            <h3 className='fw-bolder text-gray-900 mb-3'>{message}</h3>
            <p className='text-gray-600 fs-6'>Your draft has been saved and can be retrieved later.</p>
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

