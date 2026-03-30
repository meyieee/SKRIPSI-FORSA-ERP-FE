import React from 'react'

type Props = {
  show: boolean
  handleClose: () => void
}

export const OnlineRequestModal: React.FC<Props> = ({show, handleClose}) => {
  if (!show) return null

  return (
    <div className='modal d-block' tabIndex={-1} role='dialog'>
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Online Request</h5>
            <button type='button' className='btn-close' onClick={handleClose} aria-label='Close' />
          </div>
          <div className='modal-body'>
            <p className='mb-0'>Online request summary is not configured yet.</p>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-light' onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
