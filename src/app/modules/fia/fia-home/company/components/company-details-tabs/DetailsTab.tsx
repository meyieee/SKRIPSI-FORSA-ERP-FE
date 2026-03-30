import { KTCard, KTCardBody } from '../../../../../../../_metronic'
import { Company } from '../../core/_models'

interface DetailsTabProps {
  company: Company
}

export const DetailsTab = ({ company }: DetailsTabProps) => {
  if (!company) return null

  return (
    <div className='row g-5'>
      <div className='col-12 mt-n2'>
        {/* Bill To & Ship To Details */}
        <div className='row g-5'>
          <div className='col-md-6'>
            <KTCard className='h-25 theme-light-bg-white theme-dark-bg-gray-200'>
              <div className='card-header border-0 bg-dark text-white d-flex align-items-center' style={{ 
                padding: '1rem 1rem', 
                minHeight: 'auto', 
              }}>
                <span className='fw-bold fs-6 text-white'>
                  BILL TO DETAILS
                </span>
              </div>
              <KTCardBody className='py-4'>
                <div className='mb-2'>
                  <label className='form-label fw-semibold fs-7 theme-light-text-muted theme-dark-text-gray-600'>
                    Bill To:
                  </label>
                  <input type='text' className='form-control' placeholder='Enter bill to' />
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-semibold fs-7 theme-light-text-muted theme-dark-text-gray-600'>
                    Full Address:
                  </label>
                  <textarea className='form-control' rows={2} placeholder='Enter full address'></textarea>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-semibold fs-7 theme-light-text-muted theme-dark-text-gray-600'>
                    Attention:
                  </label>
                  <input type='text' className='form-control' placeholder='Enter attention' />
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-semibold fs-7 theme-light-text-muted theme-dark-text-gray-600'>
                    Contact No:
                  </label>
                  <input type='text' className='form-control' placeholder='Enter contact number' />
                </div>
              </KTCardBody>
            </KTCard>
          </div>

          <div className='col-md-6'>
            <KTCard className='h-25 theme-light-bg-white theme-dark-bg-gray-200'>
              <div className='card-header border-0 bg-dark text-white d-flex align-items-center' style={{ 
                padding: '1rem 1rem', 
                minHeight: 'auto' 
              }}>
                <span className='fw-bold fs-6 text-white'>
                  SHIP TO DETAILS
                </span>
              </div>
              <KTCardBody className='py-4'>
                <div className='mb-2'>
                  <label className='form-label fw-semibold fs-7 theme-light-text-muted theme-dark-text-gray-600'>
                    Ship To:
                  </label>
                  <input type='text' className='form-control' placeholder='Enter ship to' />
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-semibold fs-7 theme-light-text-muted theme-dark-text-gray-600'>
                    Full Address:
                  </label>
                  <textarea className='form-control' rows={2} placeholder='Enter full address'></textarea>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-semibold fs-7 theme-light-text-muted theme-dark-text-gray-600'>
                    Attention:
                  </label>
                  <input type='text' className='form-control' placeholder='Enter attention' />
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-semibold fs-7 theme-light-text-muted theme-dark-text-gray-600'>
                    Contact No:
                  </label>
                  <input type='text' className='form-control' placeholder='Enter contact number' />
                </div>
              </KTCardBody>
            </KTCard>
          </div>
        </div>
      </div>
    </div>
  )
}

