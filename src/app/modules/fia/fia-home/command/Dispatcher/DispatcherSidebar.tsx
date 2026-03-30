import { FC, useState } from 'react'
import { KTCard, KTCardBody } from '../../../../../../_metronic'  

const DispatcherSidebar: FC = () => {
  const [expandedSections, setExpandedSections] = useState({
    fleetOperation: true,
    productionControl: false,
    plannersClerical: false
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className='dispatcher-sidebar'>
      {/* Filter Section */}
      <KTCard className='mb-6'>
        <KTCardBody>
          <h6 className='fw-bold mb-4'>Filters</h6>
          
          {/* Site Branch */}
          <div className='mb-3'>
            <label className='form-label fw-semibold'>Site Branch</label>
            <select className='form-select form-select-sm'>
              <option value=''>All</option>
              <option value='site1'>Site 1</option>
              <option value='site2'>Site 2</option>
              <option value='site3'>Site 3</option>
            </select>
          </div>

          {/* Department */}
          <div className='mb-3'>
            <label className='form-label fw-semibold'>Department</label>
            <select className='form-select form-select-sm'>
              <option value=''>All</option>
              <option value='dept1'>Department 1</option>
              <option value='dept2'>Department 2</option>
              <option value='dept3'>Department 3</option>
            </select>
          </div>

          {/* Section CC */}
          <div className='mb-3'>
            <label className='form-label fw-semibold'>Section CC</label>
            <select className='form-select form-select-sm'>
              <option value=''>All</option>
              <option value='cc1'>Section CC 1</option>
              <option value='cc2'>Section CC 2</option>
              <option value='cc3'>Section CC 3</option>
            </select>
          </div>

          {/* Select Period */}
          <div className='mb-3'>
            <label className='form-label fw-semibold'>Select Period</label>
            <div className='d-flex flex-column gap-2'>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='period' id='daily' defaultChecked />
                <label className='form-check-label' htmlFor='daily'>
                  Daily <input type='date' className='form-control form-control-sm ms-2' />
                </label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='period' id='monthly' />
                <label className='form-check-label' htmlFor='monthly'>
                  Monthly <input type='month' className='form-control form-control-sm ms-2' />
                </label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='period' id='quarterly' />
                <label className='form-check-label' htmlFor='quarterly'>
                  Quarterly <input type='text' className='form-control form-control-sm ms-2' placeholder='[quarter]' />
                </label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='period' id='yearly' />
                <label className='form-check-label' htmlFor='yearly'>
                  Yearly <input type='text' className='form-control form-control-sm ms-2' placeholder='[year]' />
                </label>
              </div>
            </div>
          </div>
        </KTCardBody>
      </KTCard>

      {/* Navigation Section */}
      <KTCard>
        <KTCardBody>
          <h6 className='fw-bold mb-4'>Navigation</h6>
          
          {/* Fleet Operation */}
          <div className='navigation-section mb-3'>
            <button 
              className='btn btn-link text-start p-0 mb-2 d-flex align-items-center w-100'
              onClick={() => toggleSection('fleetOperation')}
            >
              <i className={`ki-duotone ki-arrow-right fs-5 me-2 transition-all ${
                expandedSections.fleetOperation ? 'rotate-90' : ''
              }`}></i>
              <span className='fw-semibold'>Fleet Operation</span>
            </button>
            {expandedSections.fleetOperation && (
              <div className='ms-4'>
                <div className='nav-item active mb-1'>
                  <a href='#' className='text-decoration-none text-primary fw-semibold'>Event</a>
                </div>
                <div className='nav-item mb-1'>
                  <a href='#' className='text-decoration-none text-muted'>Event History</a>
                </div>
              </div>
            )}
          </div>

          {/* Production Control */}
          <div className='navigation-section mb-3'>
            <button 
              className='btn btn-link text-start p-0 mb-2 d-flex align-items-center w-100'
              onClick={() => toggleSection('productionControl')}
            >
              <i className={`ki-duotone ki-arrow-right fs-5 me-2 transition-all ${
                expandedSections.productionControl ? 'rotate-90' : ''
              }`}></i>
              <span className='fw-semibold'>Production Control</span>
            </button>
            {expandedSections.productionControl && (
              <div className='ms-4'>
                <div className='nav-item mb-1'>
                  <a href='#' className='text-decoration-none text-muted'>Daily Production</a>
                </div>
                <div className='nav-item mb-1'>
                  <a href='#' className='text-decoration-none text-muted'>Daily Production History</a>
                </div>
                <div className='nav-item mb-1'>
                  <a href='#' className='text-decoration-none text-muted'>Ore Carted to Port</a>
                </div>
                <div className='nav-item mb-1'>
                  <a href='#' className='text-decoration-none text-muted'>Ore Carted to Port History</a>
                </div>
              </div>
            )}
          </div>

          {/* Planners & Clerical */}
          <div className='navigation-section mb-3'>
            <button 
              className='btn btn-link text-start p-0 mb-2 d-flex align-items-center w-100'
              onClick={() => toggleSection('plannersClerical')}
            >
              <i className={`ki-duotone ki-arrow-right fs-5 me-2 transition-all ${
                expandedSections.plannersClerical ? 'rotate-90' : ''
              }`}></i>
              <span className='fw-semibold'>Planners & Clerical</span>
            </button>
            {expandedSections.plannersClerical && (
              <div className='ms-4'>
                <div className='nav-item mb-1'>
                  <a href='#' className='text-decoration-none text-muted'>Workorder Control</a>
                </div>
                <div className='nav-item mb-1'>
                  <a href='#' className='text-decoration-none text-muted'>Workforce Tracking</a>
                </div>
                <div className='nav-item mb-1'>
                  <a href='#' className='text-decoration-none text-muted'>Reading & Fuel</a>
                </div>
                <div className='nav-item mb-1'>
                  <a href='#' className='text-decoration-none text-muted'>Inventory Availability</a>
                </div>
              </div>
            )}
          </div>
        </KTCardBody>
      </KTCard>
    </div>
  )
}

export default DispatcherSidebar