import { useMemo } from 'react'
import { KTCard, KTCardBody } from '../../../../../../_metronic'
import { useThemeMode } from '../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { Company, CompanyFilter, CompanyCounts } from '../core/_models'
import { COMPANY_FILTER_LABELS, COMPANY_FILTER_SUBTITLES, COMPANY_FILTER_COLORS } from '../constants'

interface CompanyProfileCardProps {
  company: Company
  companies: Company[]
  activeFilter: CompanyFilter
  onFilterChange: (filter: CompanyFilter) => void
}

export const CompanyProfileCard = ({ company, companies, activeFilter, onFilterChange }: CompanyProfileCardProps) => {
  const { mode } = useThemeMode()
  const isDarkMode = mode === 'dark'

  const counts: CompanyCounts = useMemo(() => {
    return {
      all: companies.length,
      ourCompany: companies.filter(c => c.type === 'Head Office' || c.type === 'Branch').length,
      supplier: companies.filter(c => c.type === 'Supplier').length,
      customer: companies.filter(c => c.type === 'Customer' || c.type === 'Contractor').length,
      freight: companies.filter(c => c.type === 'Freight').length,
    }
  }, [companies])

  const getCount = (filter: CompanyFilter): number => {
    switch (filter) {
      case 'all': return counts.all
      case 'our-company': return counts.ourCompany
      case 'supplier': return counts.supplier
      case 'customer': return counts.customer
      case 'freight': return counts.freight
      default: return 0
    }
  }

  const filters: CompanyFilter[] = ['all', 'our-company', 'supplier', 'customer', 'freight']

  return (
    <KTCard className='mb-5'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>COMPANY PROFILE</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>{company.name}</span>
        </h3>
      </div>
      <KTCardBody className='py-4'>
        <div className='row g-5'>
          {/* Left Column - Logo and Contact */}
          <div className='col-md-4'>
            <div className='d-flex align-items-center mb-5'>
              <img 
                src={company.logo || '/media/logos/abase.svg'} 
                alt={company.name} 
                className='h-50px me-3'
              />
            </div>
            <div className='mb-3'>
              <span className='text-muted fw-semibold fs-7'>Email:</span>
              <div className='fw-bold fs-6'>{company.email || '-'}</div>
            </div>
            <div className='mb-3'>
              <span className='text-muted fw-semibold fs-7'>Website:</span>
              <div className='fw-bold fs-6'>{company.website || '-'}</div>
            </div>
          </div>

          {/* Middle Column - Company Details */}
          <div className='col-md-4'>
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
            <div className='mb-3'>
              <span className='text-muted fw-semibold fs-7'>Region:</span>
              <div className='fw-bold fs-6'>{company.region || '-'}</div>
            </div>
            <div className='mb-3'>
              <span className='text-muted fw-semibold fs-7'>Country:</span>
              <div className='fw-bold fs-6'>{company.country || '-'}</div>
            </div>
          </div>

          {/* Right Column - Additional Details */}
          <div className='col-md-4'>
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
            <div className='mb-3'>
              <span className='text-muted fw-semibold fs-7'>Status:</span>
              <div className='fw-bold fs-6'>{company.status || '-'}</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons - Inside Company Profile Card */}
        <div className='row g-3 mt-5'>
          {filters.map((filter) => {
            const colors = COMPANY_FILTER_COLORS[filter]
            const isActive = activeFilter === filter
            const buttonClass = isActive 
              ? `shadow-lg ${colors.active}` 
              : colors.inactive

            return (
              <div key={filter} className='col-md-2'>
                <button 
                  className={`w-100 px-4 py-6 rounded-2 text-center border-0 ${buttonClass} ${isDarkMode ? 'dark-mode-hover-white' : ''}`}
                  onClick={() => onFilterChange(filter)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                >
                  <div className={`fw-bold fs-2x mb-2 ${isActive ? 'text-white' : ''}`}>
                    {getCount(filter)}
                  </div>
                  <div className={`fw-semibold fs-7 ${isActive ? 'text-white' : ''}`}>
                    {COMPANY_FILTER_LABELS[filter]}
                  </div>
                  <div className={`fs-8 ${isActive ? 'text-white' : 'text-muted'}`}>
                    {COMPANY_FILTER_SUBTITLES[filter]}
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </KTCardBody>
    </KTCard>
  )
}

