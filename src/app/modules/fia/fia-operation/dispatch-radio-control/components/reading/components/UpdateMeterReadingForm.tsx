import { FC, useState, useEffect } from 'react'

interface UpdateMeterReadingProps {
  isOpen: boolean
  onClose: () => void
  assetData: {
    assetCode: string
    assetName: string
    latestReading: number | string
    readingType: string        // e.g. "Hour"
    lastUpdate: string         // e.g. "01 Sep 24 - 9:25:30"
  } | null
  onSubmit: (formData: UpdateMeterReadingFormData) => void
}

interface UpdateMeterReadingFormData {
  reading: string
  dateTime: string
  readingType: string
  remarks: string
}

const UpdateMeterReadingForm: FC<UpdateMeterReadingProps> = ({ isOpen, onClose, assetData, onSubmit }) => {
  const [formData, setFormData] = useState<UpdateMeterReadingFormData>({
    reading: '',
    dateTime: '',
    readingType: '',
    remarks: '',
  })

  // Prefill date/time + reading type when modal opens
  useEffect(() => {
    if (isOpen && assetData) {
      const now = new Date()
      const currentDate = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      }).replace(/\s/g, '-')
      const currentTime = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })

      setFormData({
        reading: '',
        dateTime: `${currentDate} - ${currentTime}`,
        readingType: assetData.readingType,
        remarks: '',
      })
    }
  }, [isOpen, assetData])

  const handleInputChange = (field: keyof UpdateMeterReadingFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    if (!assetData) return
    onSubmit(formData)
    onClose()
  }

  // Don't render if modal is not open
  if (!isOpen || !assetData) return null

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className='modal-backdrop fade show'
        style={{
          zIndex: 1040,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      {/* Modal */}
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
          justifyContent: 'center',
        }}
      >
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content'>

            {/* Header Section (white / light) */}
            <div className='modal-header justify-content-center position-relative'>
              <h4 className='modal-title fw-bold'>Update Meter Reading</h4>
              {/* Close button on the right */}
              <button
                type='button'
                className='btn btn-icon btn-sm position-absolute end-0 me-3'
                aria-label='Close'
                onClick={onClose}
              >
                <i className='ki-duotone ki-cross fs-3'></i>
              </button>
            </div>

            {/* Asset info section (like screenshot top text) */}
            <div className='bg-light text-center py-3'>
              <div className='fw-semibold'>
                {assetData.assetCode}-{assetData.assetName}
              </div>
              <div>
                <span>Latest Reading: </span>
                <span className='text-success fw-bold'>{assetData.latestReading}</span>
              </div>
              <div>
                <span>Reading Type: </span>
                <span>{assetData.readingType}</span>
              </div>
              <div>{assetData.lastUpdate}</div>
            </div>

            {/* Main Input Section (black background) */}
            <div className='modal-body'>
              <div className='row g-3'>

                {/* Reading */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label min-w-100px mb-0'>Reading:</label>
                    <input
                      type='text'
                      className='form-control'
                      value={formData.reading}
                      onChange={(e) => handleInputChange('reading', e.target.value)}
                    />
                  </div>
                </div>

                {/* Date Time */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label min-w-100px mb-0'>Date Time:</label>
                    <input
                      type='text'
                      className='form-control'
                      value={formData.dateTime}
                      onChange={(e) => handleInputChange('dateTime', e.target.value)}
                    />
                  </div>
                </div>

                {/* Reading Type (readonly / default) */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label min-w-100px mb-0'>Reading Type:</label>
                    <input
                      type='text'
                      className='form-control'
                      value={formData.readingType}
                      readOnly
                    />
                  </div>
                </div>

                {/* Remarks (textarea) */}
                <div className='col-12'>
                  <div className='d-flex align-items-start gap-3'>
                    <label className='form-label min-w-100px mb-0 mt-1'>Remarks:</label>
                    <textarea
                      className='form-control'
                      rows={4}
                      value={formData.remarks}
                      onChange={(e) => handleInputChange('remarks', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section (Update By / Update Date + buttons) */}
            <div className='modal-footer bg-light'>
              <div className='row w-100 g-3'>
                <div className='col-6'>
                  <div className='d-flex align-items-center gap-2'>
                    <label className='form-label mb-0'>Update By:</label>
                    <input
                      type='text'
                      className='form-control'
                      value='Current User'
                      readOnly
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='d-flex align-items-center gap-2'>
                    <label className='form-label mb-0'>Update Date:</label>
                    <input
                      type='text'
                      className='form-control'
                      value={new Date().toLocaleDateString('en-GB')}
                      readOnly
                    />
                  </div>
                </div>

                <div className='d-flex justify-content-end gap-2'>
                  <button type='button' className='btn btn-secondary' onClick={onClose}>
                    CANCEL
                  </button>
                  <button type='button' className='btn btn-primary' onClick={handleSubmit}>
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateMeterReadingForm
