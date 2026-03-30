import { FC, useEffect, useMemo, useState } from 'react'

interface UpdateStatusFormProps {
  isOpen: boolean
  onClose: () => void
  assetData: {
    assetCode: string
    assetName: string
    currentStatus: string
    statusCode: string | number
    lastUpdate: string
    // optional if you have it later
    latestLocation?: string
  } | null
  onSubmit: (formData: UpdateStatusFormData) => void
}

interface UpdateStatusFormData {
  date: string
  time: string
  status: string | number // used as bd_type (may arrive as number from backend)
  reason: string
  comment: string
  smu: string
  currentLocation: string
  correctiveAction: string
}

const UpdateStatusForm: FC<UpdateStatusFormProps> = ({ isOpen, onClose, assetData, onSubmit }) => {
  const [formData, setFormData] = useState<UpdateStatusFormData>({
    date: '',
    time: '',
    status: '',
    reason: '',
    comment: '',
    smu: '',
    currentLocation: '',
    correctiveAction: '',
  })

  // Status/Breakdown codes mapping
  const statusCodes: Record<string, string> = {
    '100': 'Operating|Work',
    '203': 'Refueling',
    '401': 'PM',
    '303': 'No Manned/No Oprt',
    '202': 'Weather (Wet|Cloud',
    '507': 'Accident Damage',
    '514': 'Stranded|Natura Di:',
  }

  // Safe lookup even if status is number
  const breakdownDesc = useMemo(() => {
    const code = String(formData.status ?? '').trim()
    return code && statusCodes[code] ? statusCodes[code] : ''
  }, [formData.status])

  useEffect(() => {
    if (isOpen && assetData) {
      const now = new Date()
      const currentDate = now
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: '2-digit',
        })
        .replace(/\s/g, '-')

      const currentTime = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })

      setFormData({
        date: currentDate,
        time: currentTime,
        status: String(assetData.statusCode ?? ''), // ensure string
        reason: '',
        comment: '',
        smu: '',
        currentLocation: '',
        correctiveAction: '',
      })
    }
  }, [isOpen, assetData])

  const handleInputChange = (field: keyof UpdateStatusFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateToCurrentTime = () => {
    const now = new Date()
    const currentTime = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    handleInputChange('time', currentTime)
  }

  const handleSubmit = () => {
    // Submit with status coerced to string (so downstream is consistent)
    onSubmit({
      ...formData,
      status: String(formData.status ?? ''),
    })
    onClose()
  }

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
      ></div>

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
            {/* Header Section (same colors, content updated) */}
            <div className='modal-header'>
              <div className='w-100 text-center'>
                <h4 className='modal-title fw-bold'>Update Current Status</h4>

                <div className='mt-2'>
                  <span className='text-dark'>
                    {assetData.assetCode}-{assetData.assetName}
                  </span>
                </div>

                <div className='mt-1'>
                  <span className='text-dark'>Latest Status : </span>
                  <span className='text-success fw-bold'>
                    {assetData.currentStatus}-{String(assetData.statusCode)}
                  </span>
                </div>

                <div className='mt-1'>
                  <span className='text-dark'>Last Datetime Status : </span>
                  <span className='text-dark'>{assetData.lastUpdate}</span>
                </div>

                <div className='mt-1'>
                  <span className='text-dark'>Latest Location : </span>
                  <span className='text-dark'>{assetData.latestLocation ?? '-'}</span>
                </div>
              </div>

              <button type='button' className='btn btn-icon btn-sm' aria-label='Close' onClick={onClose}>
                <i className='ki-duotone ki-cross fs-3'></i>
              </button>
            </div>

            {/* Main Input Section */}
            <div className='modal-body'>
              <div className='row g-3'>
                {/* Date | Time */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label min-w-120px mb-0'>Date | Time :</label>

                    <div className='d-flex gap-2 flex-grow-1'>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        placeholder='start_date'
                      />

                      <div className='d-flex gap-1'>
                        <input
                          type='text'
                          className='form-control'
                          value={formData.time}
                          onChange={(e) => handleInputChange('time', e.target.value)}
                          placeholder='start_time'
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

                {/* Breakdown Type (bd_type + description) */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label min-w-120px mb-0'>Breakdown Type :</label>

                    <div className='d-flex align-items-center gap-3 flex-grow-1'>
                      <input
                        type='text'
                        className='form-control'
                        value={String(formData.status ?? '')}
                        onChange={(e) => handleInputChange('status', String(e.target.value))}
                        placeholder='bd_type'
                        style={{ maxWidth: 140 }}
                      />

                      <div className='text-muted fw-semibold'>{breakdownDesc || '-'}</div>
                    </div>
                  </div>
                </div>

                {/* Current Location */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label min-w-120px mb-0'>Current Location :</label>

                    <div className='d-flex gap-2 flex-grow-1 align-items-center'>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.currentLocation}
                        onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                        placeholder='location'
                      />
                      <span className='text-muted align-self-center'>(KM)</span>
                    </div>
                  </div>
                </div>

                {/* Meter Reading (uses smu) */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label min-w-120px mb-0'>Meter Reading :</label>

                    <div className='d-flex gap-2 flex-grow-1 align-items-center'>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.smu}
                        onChange={(e) => handleInputChange('smu', e.target.value)}
                        placeholder='reading'
                      />
                      <span className='text-muted align-self-center'>(KM)</span>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className='col-12'>
                  <div className='d-flex gap-3'>
                    <label className='form-label min-w-120px mb-0'>Reason :</label>
                    <textarea
                      className='form-control'
                      rows={2}
                      value={formData.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      placeholder='reason'
                    />
                  </div>
                </div>

                {/* Comment */}
                <div className='col-12'>
                  <div className='d-flex gap-3'>
                    <label className='form-label min-w-120px mb-0'>Comment :</label>
                    <textarea
                      className='form-control'
                      rows={2}
                      value={formData.comment}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      placeholder='comment'
                    />
                  </div>
                </div>

                {/* Corrective Action */}
                <div className='col-12'>
                  <div className='d-flex align-items-center gap-3'>
                    <label className='form-label min-w-120px mb-0'>Corrective Action :</label>
                    <input
                      type='text'
                      className='form-control'
                      value={formData.correctiveAction}
                      onChange={(e) => handleInputChange('correctiveAction', e.target.value)}
                      placeholder='corrective'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className='modal-footer'>
              <div className='row w-100 g-3'>
                <div className='col-6'>
                  <div className='d-flex align-items-center gap-2'>
                    <label className='form-label mb-0'>Update By :</label>
                    <input type='text' className='form-control' value='update_by (by login)' readOnly />
                  </div>
                </div>

                <div className='col-6'>
                  <div className='d-flex align-items-center gap-2'>
                    <label className='form-label mb-0'>Update Date :</label>
                    <input type='text' className='form-control' value='update_date (current date)' readOnly />
                  </div>
                </div>

                <div className='col-12 d-flex justify-content-end gap-2'>
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

export default UpdateStatusForm
