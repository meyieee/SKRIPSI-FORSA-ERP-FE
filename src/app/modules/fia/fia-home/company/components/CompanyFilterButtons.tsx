import { useMemo } from 'react'
import { useThemeMode } from '../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { Company, CompanyFilter, CompanyCounts } from '../core/_models'
import { COMPANY_FILTER_LABELS, COMPANY_FILTER_SUBTITLES, COMPANY_FILTER_COLORS } from '../constants'

interface CompanyFilterButtonsProps {
  companies: Company[]
  activeFilter: CompanyFilter
  onFilterChange: (filter: CompanyFilter) => void
}

export const CompanyFilterButtons = ({ 
  companies, 
  activeFilter, 
  onFilterChange 
}: CompanyFilterButtonsProps) => {
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
  )
}

