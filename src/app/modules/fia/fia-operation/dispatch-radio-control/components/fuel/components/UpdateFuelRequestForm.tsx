import React, {FC, useEffect, useState} from 'react'

export interface UpdateFuelRequestFormData {
  assetNo: string
  requestBy: string
  requestDate: string
  requestTime: string
  storage: string
  readingMeter: string
  stockcode: string
  fuelDescription: string
  qtyRequest: string
  uom: string
  workOrder: string
  costCenter: string
  fuelCardNo: string
  notes: string
}

export interface UpdateFuelRequestAssetData {
  assetCode: string
  assetName: string
  requestNo: string
  fuelType: string
  readingType: string
  lastReading: string | number
  lastUpdate: string
}

interface UpdateFuelRequestFormProps {
  isOpen: boolean
  onClose: () => void
  assetData: UpdateFuelRequestAssetData | null
  onSubmit: (data: UpdateFuelRequestFormData) => void
}

const UpdateFuelRequestForm: FC<UpdateFuelRequestFormProps> = ({
  isOpen,
  onClose,
  assetData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<UpdateFuelRequestFormData>({
    assetNo: '',
    requestBy: '',
    requestDate: '',
    requestTime: '',
    storage: '',
    readingMeter: '',
    stockcode: '',
    fuelDescription: '',
    qtyRequest: '',
    uom: '',
    workOrder: '',
    costCenter: '',
    fuelCardNo: '',
    notes: '',
  })

  // Prefill when opened
  useEffect(() => {
    if (!isOpen || !assetData) return

    const now = new Date()
    const currentDate = now
      .toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: '2-digit'})
      .replace(/\s/g, '-')
    const currentTime = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    setFormData({
      assetNo: assetData.assetCode,
      requestBy: '',
      requestDate: currentDate,
      requestTime: currentTime,
      storage: '',
      readingMeter: '',
      stockcode: '',
      fuelDescription: '',
      qtyRequest: '',
      uom: '',
      workOrder: '',
      costCenter: '',
      fuelCardNo: '',
      notes: '',
    })
  }, [isOpen, assetData])

  const handleChange =
    (field: keyof UpdateFuelRequestFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {value} = e.target
      setFormData((prev) => ({...prev, [field]: value}))
    }

  const handleSubmit = () => {
    if (!assetData) return
    onSubmit(formData)
    onClose()
  }

  if (!isOpen || !assetData) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className='modal-backdrop fade show'
        style={{
          zIndex: 1040,
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
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
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content'>
            {/* Top black header */}
            <div className='modal-header justify-content-center position-relative py-2'>
              <h4 className='modal-title fw-bold'>Fuel Request</h4>
              <button
                type='button'
                className='btn btn-icon btn-sm position-absolute end-0 me-3'
                aria-label='Close'
                onClick={onClose}
              >
                <i className='ki-duotone ki-cross fs-3'></i>
              </button>
            </div>

            {/* Black bar with Request No + Asset No row */}
            <div className='px-4 pt-3 pb-2'>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <span className='fw-semibold'>Request No - </span>
                  <span>{assetData.requestNo}</span>
                </div>
                <div className='d-flex align-items-center gap-2'>
                  <span className='fw-semibold'>Asset No :</span>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    style={{maxWidth: 140}}
                    value={formData.assetNo}
                    onChange={handleChange('assetNo')}
                  />
                </div>
              </div>
            </div>

            {/* Asset info block */}
            <div className='bg-light text-center py-3'>
              <div className='fw-semibold'>
                {assetData.assetCode}-{assetData.assetName}
              </div>
              <div>
                Fuel Type : <span className='text-success fw-semibold'>{assetData.fuelType}</span>
              </div>
              <div>
                Reading Type :{' '}
                <span className='text-success fw-semibold'>{assetData.readingType}</span>
              </div>
              <div>
                Last Reading :{' '}
                <span className='text-success fw-semibold'>{assetData.lastReading}</span>
              </div>
              <div>{assetData.lastUpdate}</div>
            </div>

            {/* Main form (white background like screenshot) */}
            <div className='modal-body'>
              <div className='row g-3' style={{fontSize: '0.9rem'}}>
                {/* Request By | Request Date | Time */}
                <div className='col-12'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-4 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-90px'>Request By</label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.requestBy}
                        onChange={handleChange('requestBy')}
                      />
                    </div>
                    <div className='col-4 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-90px'>Request Date</label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.requestDate}
                        onChange={handleChange('requestDate')}
                      />
                    </div>
                    <div className='col-4 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-60px'>Time</label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.requestTime}
                        onChange={handleChange('requestTime')}
                      />
                    </div>
                  </div>
                </div>

                {/* Storage | Reading Meter */}
                <div className='col-12'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-6 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-90px'>Storage</label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.storage}
                        onChange={handleChange('storage')}
                      />
                    </div>
                    <div className='col-6 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-110px'>Reading Meter</label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.readingMeter}
                        onChange={handleChange('readingMeter')}
                      />
                    </div>
                  </div>
                </div>

                {/* Stockcode - Fuel Description */}
                <div className='col-12'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-4 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-90px'>
                        Stockcode
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.stockcode}
                        onChange={handleChange('stockcode')}
                      />
                    </div>
                    <div className='col-8 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-110px'>
                        Fuel Description
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.fuelDescription}
                        onChange={handleChange('fuelDescription')}
                      />
                    </div>
                  </div>
                </div>

                {/* Qty Request | UOM */}
                <div className='col-12'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-6 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-90px'>Qty Request</label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.qtyRequest}
                        onChange={handleChange('qtyRequest')}
                      />
                    </div>
                    <div className='col-6 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-60px'>UOM</label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.uom}
                        onChange={handleChange('uom')}
                      />
                    </div>
                  </div>
                </div>

                {/* Work Order | Cost Center | Fuel Card No */}
                <div className='col-12'>
                  <div className='row g-3 align-items-center'>
                    <div className='col-6 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-60px'>Work Order | Cost Center</label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.workOrder}
                        onChange={handleChange('workOrder')}
                      />
                    </div>
                    <div className='col-4 d-flex align-items-center'>
                      <label className='form-label mb-0 me-2 min-w-90px'>Fuel Card No</label>
                      <input
                        type='text'
                        className='form-control'
                        value={formData.fuelCardNo}
                        onChange={handleChange('fuelCardNo')}
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className='col-12'>
                  <div className='d-flex align-items-start'>
                    <label className='form-label mb-0 me-2 min-w-90px mt-1'>Notes</label>
                    <textarea
                      className='form-control'
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange('notes')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer: Update By / Update Date + buttons */}
            <div className='modal-footer '>
              <div className='w-100'>
                <div className='row g-2 mb-3'>
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

export default UpdateFuelRequestForm
