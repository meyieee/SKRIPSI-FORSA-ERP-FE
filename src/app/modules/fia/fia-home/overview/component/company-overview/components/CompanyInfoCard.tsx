import React from 'react'
import {CompanyOverviewData} from '../types'

type Props = {
  company: CompanyOverviewData
  loading?: boolean
  error?: string | null
}

const CompanyInfoCard: React.FC<Props> = ({company, loading, error}) => {
  if (loading) {
    return (
      <div className='card'>
        <div className='card-body py-10 text-center'>Loading company information...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='card'>
        <div className='card-body text-danger'>Error: {error}</div>
      </div>
    )
  }

  return (
    <div className='card'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>BACKEND APPLICATION MANAGEMENT</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>
            Every midnight time 00:00 system will be update all data in to FORSA database.
          </span>
        </h3>
      </div>
      <div className='card-body pt-5'>
        <div className='row g-2'>
          {/* Basic Info - Full Width */}
          <div className='col-md-6 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>Company Code & Name</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>
              {company.com_code} - {company.com_name}
            </div>
          </div>
          <div className='col-md-6 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>Full Address</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>{company.address}</div>
          </div>

          {/* Contact Info - 2 Columns */}
          <div className='col-md-6 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>Email</div>
            <div className='fs-6 fw-bold'>
              <a className='text-primary' href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </div>
          </div>
          <div className='col-md-6 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>Website</div>
            <div className='fs-6 fw-bold'>
              <a
                className='text-primary'
                href={`https://${company.web_address}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {company.web_address}
              </a>
            </div>
          </div>

          {/* Location Info - 4 Columns */}
          <div className='col-md-6 col-lg-3 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>City</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>{company.city}</div>
          </div>
          <div className='col-md-6 col-lg-3 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>Province</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>{company.province}</div>
          </div>
          <div className='col-md-6 col-lg-3 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>Region</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>{company.region}</div>
          </div>
          <div className='col-md-6 col-lg-3 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>Country</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>{company.country}</div>
          </div>

          {/* Additional Info - 4 Columns */}
          <div className='col-md-6 col-lg-3 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>Company Type</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>{company.com_type}</div>
          </div>
          <div className='col-md-6 col-lg-3 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>Phone</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>{company.phone_no}</div>
          </div>
          <div className='col-md-6 col-lg-3 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>WA</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>{company.contact_no}</div>
          </div>
          <div className='col-md-6 col-lg-3 mb-2'>
            <div className='fw-bold text-gray-700 mb-1'>NPWP</div>
            <div className='fs-6 fw-bold border-bottom pb-2'>{company.npwp}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyInfoCard

