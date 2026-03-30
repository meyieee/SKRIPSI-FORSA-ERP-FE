import React, {useEffect} from 'react'
import {KTSVG} from '../../../../../../_metronic'
import './scss/personalinfostyles.scss' // import scss untuk alert

type Props = {
  show: boolean
  title?: string
  message: string
  onClose: () => void
  autoHideMs?: number
  fixed?: boolean
  className?: string
}

const NotFoundAlert: React.FC<Props> = ({
  show,
  title = 'No match',
  message,
  onClose,
  autoHideMs = 0,
  fixed = false,
  className = '',
}) => {
  useEffect(() => {
    if (!show || !autoHideMs) return
    const t = setTimeout(onClose, autoHideMs)
    return () => clearTimeout(t)
  }, [show, autoHideMs, onClose])

  if (!show) return null

  return (
    <div
      className={`alert bg-light-warning border border-warning d-flex align-items-start gap-3 ${
        fixed ? 'fixed-alert-not-found' : 'm-5'
      } ${className}`}
    >
      <span className='svg-icon svg-icon-2hx svg-icon-warning'>
        <KTSVG path='/media/icons/duotune/general/gen044.svg' className='svg-icon-2hx' />
      </span>

      <div className='flex-grow-1'>
        <h5 className='mb-1'>{title}</h5>
        <span>{message}</span>
      </div>

      <button
        type='button'
        className='btn btn-sm btn-icon btn-light'
        onClick={onClose}
        aria-label='Close'
        title='Close'
      >
        <i className='bi bi-x-lg' />
      </button>
    </div>
  )
}

export default NotFoundAlert
