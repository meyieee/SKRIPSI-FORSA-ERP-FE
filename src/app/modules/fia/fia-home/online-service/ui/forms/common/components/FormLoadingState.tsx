import React from 'react'

type FormLoadingStateProps = {
  message?: string
  fullScreen?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function FormLoadingState({ 
  message = 'Loading...', 
  fullScreen = false,
  size = 'md'
}: FormLoadingStateProps) {
  const spinnerSizeClass = size === 'sm' ? 'spinner-border-sm' : size === 'lg' ? '' : 'spinner-border-sm'
  
  if (fullScreen) {
    return (
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-center flex-column"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          zIndex: 9999
        }}
      >
        <div className="card card-flush shadow-sm">
          <div className="card-body p-10">
            <div className="d-flex flex-center flex-column">
              <div className={`spinner-border ${spinnerSizeClass} text-primary mb-5`} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="fw-semibold fs-6 text-gray-600">{message}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="d-flex flex-center flex-column py-10">
      <div className={`spinner-border ${spinnerSizeClass} text-primary mb-5`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="fw-semibold fs-6 text-gray-600">{message}</span>
    </div>
  )
}

