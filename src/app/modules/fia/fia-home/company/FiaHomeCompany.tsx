import { useState, useMemo, useCallback } from 'react'
import { KTCard, KTCardBody, KTSVG } from '../../../../../_metronic'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { Company, CompanyFilter } from './core/_models'
import { COMPANY_TYPE_BADGE_CLASSES } from './constants'
import { CompanyProfileCard } from './components/CompanyProfileCard'
import { CompanyDetailsModal } from './components/CompanyDetailsModal'
import { CompanyDetailsPanel } from './components/CompanyDetailsPanel'
import { DepartmentList } from './components/DepartmentList'
import { BusinessUnitList } from './components/BusinessUnitList'
import { CostCenterList } from './components/CostCenterList'
import { LocationList } from './components/LocationList'
import { usePermission } from '../../../../custom-hooks'

// Temporary dummy data until API is ready
const dummyCompanies: Company[] = [
  { id: 1, name: 'PT Automation Based Resource, Headquarter Office', type: 'Head Office' },
  { id: 2, name: 'PT Automation Based Resource, Branch Balikpapan', type: 'Branch' },
  { id: 3, name: 'PT Automation Based Resource, Branch Manado', type: 'Branch' },
  { id: 4, name: 'PT Automation Based Resource, Branch Maluku', type: 'Branch' },
  { id: 5, name: 'PT Supplier Equipment Machinery', type: 'Supplier' },
  { id: 6, name: 'PT Sarana Prasarana', type: 'Supplier' },
  { id: 7, name: 'PT Contractor Equipment Berat', type: 'Contractor' },
  { id: 8, name: 'PT Penjualan Spare Part', type: 'Customer' },
  { id: 9, name: 'PT Equipment Household', type: 'Customer' },
  { id: 10, name: 'Express Transit Material', type: 'Freight' },
]

const dummyDepartments = [
  { id: 1, name: 'Admin Department' },
  { id: 2, name: 'Operation Department' },
  { id: 3, name: 'Production Department' },
  { id: 4, name: 'Engineering Department' },
  { id: 5, name: 'Maintenance Department' },
  { id: 6, name: 'Human Resource Department' },
  { id: 7, name: 'Safety Department' },
]

const dummyBusinessUnits = [
  { id: 1, name: 'Drill & Blast', type: 'Operation' },
  { id: 2, name: 'Labor Supplier', type: 'Contractor' },
]

const dummyCostCenters = [
  { id: 1, name: 'Admin Service', type: 'Admin' },
  { id: 2, name: 'Executive Service', type: 'Admin' },
  { id: 3, name: 'Operation', type: 'Operation' },
  { id: 4, name: 'Production', type: 'Production' },
  { id: 5, name: 'Engineering', type: 'Engineering' },
  { id: 6, name: 'Maintenance', type: 'Maintenance' },
  { id: 7, name: 'HR Admin', type: 'HRD' },
]

const dummyLocations = [
  { id: 1, name: 'Mine Surface', type: 'Surface' },
  { id: 2, name: 'Underground Mine', type: 'UG' },
  { id: 3, name: 'Admin Building', type: 'Office' },
  { id: 4, name: 'Residence Location', type: 'Town' },
  { id: 5, name: 'Workshop Location', type: 'Maintenance' },
  { id: 6, name: 'Warehouse Location', type: 'Commercial' },
]

export const FiaHomeCompany = () => {
  // Permission checks
  const canRead = usePermission('/home/company_list', 'Read')
  const canCreate = usePermission('/home/company_list', 'Create')
  const canUpdate = usePermission('/home/company_list', 'Update')
  const canDelete = usePermission('/home/company_list', 'Delete')
  
  // ALL hooks MUST be called before any early return
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState<CompanyFilter>('all')
  
  // Temporary: Use dummy data - ALL useMemo MUST be before early return
  const companies = useMemo(() => dummyCompanies, [])
  const departments = useMemo(() => dummyDepartments, [])
  const businessUnits = useMemo(() => dummyBusinessUnits, [])
  const costCenters = useMemo(() => dummyCostCenters, [])
  const locations = useMemo(() => dummyLocations, [])
  
  // Get default company (first company or selected)
  const defaultCompany = useMemo(() => {
    return selectedCompany || companies[0] || null
  }, [selectedCompany, companies])

  // Filter companies based on active filter
  const filteredCompanies = useMemo(() => {
    if (activeFilter === 'all') return companies
    if (activeFilter === 'our-company') {
      return companies.filter(c => c.type === 'Head Office' || c.type === 'Branch')
    }
    if (activeFilter === 'supplier') {
      return companies.filter(c => c.type === 'Supplier')
    }
    if (activeFilter === 'customer') {
      return companies.filter(c => c.type === 'Customer' || c.type === 'Contractor')
    }
    if (activeFilter === 'freight') {
      return companies.filter(c => c.type === 'Freight')
    }
    return companies
  }, [companies, activeFilter])

  // ALL useCallback MUST be before early return
  const handleCompanyClick = useCallback((company: Company) => {
    setSelectedCompany(company)
    setShowCompanyModal(true)
  }, [])

  const handleFilterChange = useCallback((filter: CompanyFilter) => {
    setActiveFilter(filter)
  }, [])

  const getFilterLabel = () => {
    switch (activeFilter) {
      case 'all': return 'All Companies'
      case 'our-company': return 'HO & Branches'
      case 'supplier': return 'Suppliers & Vendors'
      case 'customer': return 'Customers & Contractors'
      case 'freight': return 'Freight & Shipping'
      default: return 'All Companies'
    }
  }

  // Early return AFTER all hooks
  if (!canRead) {
    return (
      <div className='alert alert-warning'>
        <h4>Access Denied</h4>
        <p>You don't have permission to access this page.</p>
      </div>
    )
  }

  return (
    <>
      <PageTitle>COMPANY PROFILE</PageTitle>
      
      {/* Company Profile Section with Filter Buttons */}
      {defaultCompany && (
        <CompanyProfileCard
          company={defaultCompany}
          companies={companies}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Company List and Details Section */}
      <div className='row g-5 mb-5'>
        <div className='col-md-6'>
          <KTCard className='h-100'>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>COMPANY LIST</span>
                <span className='text-muted mt-1 fw-semibold fs-7'>{getFilterLabel()}</span>
              </h3>
            </div>
            <KTCardBody className='py-4 d-flex flex-column'>
              <div className='table-responsive flex-grow-1'>
                <table className='table align-middle table-hover table-row-dashed fs-6 gy-0 dataTable no-footer'>
                  <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                      <th className='min-w-30px'>No</th>
                      <th className='min-w-150px'>Company</th>
                      <th className='min-w-50px text-end'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='text-gray-600'>
                    {filteredCompanies.map((company, index) => (
                      <tr key={company.id}>
                        <td>
                          <span className='fw-bold'>{index + 1}</span>
                        </td>
                        <td>
                          <div className='d-flex flex-column'>
                            <span 
                              className='fw-semibold fs-6 text-gray-800'
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleCompanyClick(company)}
                            >
                              {company.name}
                            </span>
                            <span className={COMPANY_TYPE_BADGE_CLASSES[company.type]}>
                              {company.type}
                            </span>
                          </div>
                        </td>
                        <td className='text-end'>
                          {canRead && (
                            <button
                              type='button'
                              className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                              onClick={() => handleCompanyClick(company)}
                              title='View Details'
                            >
                              <KTSVG
                                path='/media/icons/duotune/general/gen004.svg'
                                className='svg-icon-3'
                              />
                            </button>
                          )}
                          {/* TODO: Add Edit button when canUpdate is true */}
                          {/* TODO: Add Delete button when canDelete is true */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </KTCardBody>
          </KTCard>
        </div>

        <div className='col-md-6'>
          {defaultCompany && (
            <CompanyDetailsPanel company={defaultCompany} />
          )}
        </div>
      </div>

      {/* Categorized Lists Section */}
      <div className='row g-5'>
        <div className='col-md-6'>
          <DepartmentList departments={departments} />
        </div>
        <div className='col-md-6'>
          <BusinessUnitList businessUnits={businessUnits} />
        </div>
        <div className='col-md-6'>
          <CostCenterList costCenters={costCenters} />
        </div>
        <div className='col-md-6'>
          <LocationList locations={locations} />
        </div>
      </div>

      {/* Company Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal
          show={showCompanyModal}
          onHide={() => setShowCompanyModal(false)}
          company={selectedCompany}
        />
      )}
    </>
  )
}
