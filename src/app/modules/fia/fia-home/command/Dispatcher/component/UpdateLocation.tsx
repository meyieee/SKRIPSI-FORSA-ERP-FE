import { FC, useEffect, useState } from 'react'

type UpdateLocationProps = {
  isOpen: boolean
  onClose: () => void
  assetData: {
    assetCode: string
    assetName: string
    latestLocation: string
    lastUpdate: string
  } | null
  onSubmit: (payload: UpdateLocationFormData) => void
}

type UpdateLocationFormData = {
  date: string
  time: string
  newLocation: string
  reason: string
}

const UpdateLocation: FC<UpdateLocationProps> = ({ isOpen, onClose, assetData, onSubmit }) => {
  const [formData, setFormData] = useState<UpdateLocationFormData>({
    date: '',
    time: '',
    newLocation: '',
    reason: ''
  })

  useEffect(() => {
    if (isOpen) {
      const now = new Date()
      const currentDate = now
        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
        .replace(/\s/g, '-')
      const currentTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      setFormData(prev => ({ ...prev, date: currentDate, time: currentTime }))
    }
  }, [isOpen])

  const handleChange = (field: keyof UpdateLocationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateToCurrentTime = () => {
    const now = new Date()
    const currentTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    handleChange('time', currentTime)
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  if (!isOpen || !assetData) return null

  return (
    <>
      <div
        className='modal-backdrop fade show'
        style={{
          zIndex: 1040,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      ></div>

      <div
        className='modal fade show d-block'
        role='dialog'
        aria-modal='true'
        style={{
          zIndex: 1050,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content'>
            {/* Header */}
            <div className='modal-header bg-light'>
              <div className='w-100 text-center'>
                <h4 className='modal-title fw-bold'>Update Current Location</h4>
                <div className='mt-2'>
                  <span className='text-dark'>{assetData.assetCode}-{assetData.assetName}</span>
                </div>
                <div className='mt-1'>
                  <span className='text-dark'>Latest Location : </span>
                  <span className='text-dark fw-bold'>{assetData.latestLocation}</span>
                </div>
                <div className='mt-1'>
                  <span className='text-dark'>{assetData.lastUpdate}</span>
                </div>
              </div>
              <button type='button' className='btn btn-icon btn-sm' aria-label='Close' onClick={onClose}>
                <i className='ki-duotone ki-cross fs-3'></i>
              </button>
            </div>

            {/* Body */}
            <div className='modal-body bg-dark'>
              <div className='row g-3'>
                {/* Date | Time */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label text-white min-w-100px'>Date | Time :</label>
                    <div className='d-flex gap-2 flex-grow-1'>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        placeholder='DD-MMM-YY'
                      />
                      <div className='d-flex gap-1'>
                        <input
                          type='text'
                          className='form-control'
                          value={formData.time}
                          onChange={(e) => handleChange('time', e.target.value)}
                          placeholder='HH:MM:SS'
                        />
                        <button
                          type='button'
                          className='btn btn-secondary btn-sm px-2'
                          onClick={updateToCurrentTime}
                          title='Update to current time'
                        >
                          U
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Location */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label text-white min-w-100px'>New Location :</label>
                    <input
                      type='text'
                      className='form-control'
                      value={formData.newLocation}
                      onChange={(e) => handleChange('newLocation', e.target.value)}
                      placeholder='Enter new location'
                    />
                  </div>
                </div>

                {/* Reason */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label text-white min-w-100px'>Reason :</label>
                    <input
                      type='text'
                      className='form-control'
                      value={formData.reason}
                      onChange={(e) => handleChange('reason', e.target.value)}
                      placeholder='Enter reason'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className='modal-footer bg-light'>
              <div className='row w-100 g-3'>
                <div className='col-6'>
                  <div className='d-flex align-items-center gap-2'>
                    <label className='form-label mb-0'>Update By :</label>
                    <input type='text' className='form-control' value='Current User' readOnly />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='d-flex align-items-center gap-2'>
                    <label className='form-label mb-0'>Update Date :</label>
                    <input
                      type='text'
                      className='form-control'
                      value={new Date().toLocaleDateString('en-GB')}
                      readOnly
                    />
                  </div>
                </div>
                <div className='col-12 d-flex justify-content-end gap-2'>
                  <button type='button' className='btn btn-secondary' onClick={onClose}>CANCEL</button>
                  <button type='button' className='btn btn-primary' onClick={handleSubmit}>SUBMIT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateLocation