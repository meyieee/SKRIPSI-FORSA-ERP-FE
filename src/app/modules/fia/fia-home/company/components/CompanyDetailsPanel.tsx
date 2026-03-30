import { KTCard, KTCardBody } from '../../../../../../_metronic'
import { Company } from '../core/_models'

interface CompanyDetailsPanelProps {
  company: Company
}

export const CompanyDetailsPanel = ({ company }: CompanyDetailsPanelProps) => {
  return (
    <KTCard className='h-100'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>{company.name}</span>
        </h3>
      </div>
      <KTCardBody className='py-4 d-flex flex-column'>
        <div className='flex-grow-1'>
          <div className='d-flex align-items-center mb-5'>
            <img 
              src={company.logo || '/media/logos/abase.svg'} 
              alt={company.name} 
              className='h-50px me-3'
            />
          </div>
          <div className='row g-3'>
            <div className='col-md-6'>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>Email:</span>
                <div className='fw-bold fs-6'>{company.email || '-'}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>Website:</span>
                <div className='fw-bold fs-6'>{company.website || '-'}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>Company Code & Name:</span>
                <div className='fw-bold fs-6'>{company.code || '-'} - {company.name}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>Full Address:</span>
                <div className='fw-bold fs-6'>{company.address || '-'}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>City:</span>
                <div className='fw-bold fs-6'>{company.city || '-'}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>Province:</span>
                <div className='fw-bold fs-6'>{company.province || '-'}</div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>Region:</span>
                <div className='fw-bold fs-6'>{company.region || '-'}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>Country:</span>
                <div className='fw-bold fs-6'>{company.country || '-'}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>Company Type:</span>
                <div className='fw-bold fs-6'>{company.type}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>Phone:</span>
                <div className='fw-bold fs-6'>{company.phone || '-'}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>WA:</span>
                <div className='fw-bold fs-6'>{company.contactNo || '-'}</div>
              </div>
              <div className='mb-3'>
                <span className='text-muted fw-semibold fs-7'>NPWP:</span>
                <div className='fw-bold fs-6'>{company.npwp || '-'}</div>
              </div>
            </div>
          </div>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

