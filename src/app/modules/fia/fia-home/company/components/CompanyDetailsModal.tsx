import { useState } from 'react'
import { KTSVG } from '../../../../../../_metronic'
import { Company } from '../core/_models'
import { CompanyDetailsTab } from './CompanyDetailsTab'
import ViewModal from '../../../../../components/ViewModal'

interface CompanyDetailsModalProps {    
  show: boolean
  onHide: () => void
  company: Company | null
}

export const CompanyDetailsModal = ({ show, onHide, company }: CompanyDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState('details')

  if (!show || !company) return null

  const tabs = [
    { id: 'details', label: 'Details', icon: 'element-11' },
    { id: 'contacts', label: 'Contacts Info', icon: 'profile-user' },
    { id: 'documents', label: 'Documents', icon: 'document' },
    { id: 'contract', label: 'Contract Agreement', icon: 'shield-tick' },
  ]

  return (
    <>
     <style>
  {`
    #kt_modal_create_app .modal-header {
      padding-top: 0.75rem !important; /* Mengurangi padding top */
      padding-bottom: 0.75rem !important; /* Mengurangi padding bottom */
      padding-left: 1.5rem !important;
      padding-right: 1.5rem !important;
      min-height: auto !important; /* Menghilangkan min-height jika ada */
    }
    #kt_modal_create_app .modal-header h2 {
      font-size: 1.25rem !important; /* fs-5 */
      font-weight: 600;
      line-height: 1.5;
      margin-bottom: 0 !important; /* Menghilangkan margin bottom */
    }
  `}
</style>
      <ViewModal
        title={`Company Details - ${company.name}`}
        show={show}
        modalSize="75"
        handleClose={onHide}
      >
      {/* Company Details Content - Moved to be next to title */}
      <div className='card-body py-4 pt-0 mt-n4'>
        <div className='row g-4 mb-2'>
          {/* Row 1 */}
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Code:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.code || 'MDO'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Type:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.type || 'Branch'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Company:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.name}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Status:</label>
            <select className='form-select bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded' defaultValue={company.status || 'Active'}>
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
              <option value='Suspended'>Suspended</option>
            </select>
          </div>

          {/* Row 2 */}
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Email:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.email || '-'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Phone:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.phone || '12345'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Contact No:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.contactNo || '811-000000'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Web Address:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.website || '-'}</div>
          </div>

          {/* Row 3 */}
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Address:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.address || 'Crystak Park 5 No 12'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>City:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.city || 'Manado'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Province:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.province || 'Sulawesi Utara'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Country:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.country || 'Indonesia'}</div>
          </div>

          {/* Row 4 */}
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Postal Code:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.postalCode || '-'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Region:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.region || 'SEA'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>NPWP:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.npwp || '-'}</div>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-bold fs-5 text-dark mb-1'>Contact Name:</label>
            <div className='form-control bg-light-secondary border border-secondary border-1 fw-bold fs-6 px-3 py-3 rounded'>{company.contactName || '-'}</div>
          </div>
        </div>
      </div>

      {/* 4 Main Tabs - Bottom of Modal */}
      <div className='card-header border-0 pt-0'>
        <ul className='nav nav-tabs nav-line-tabs nav-tabs-line nav-tabs-line-2x mb-5 fs-6 text-dark'>
          {tabs.map((tab) => (
            <li key={tab.id} className='nav-item'>
              <button
                className={`nav-link ${activeTab === tab.id ? 'active text-primary' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <KTSVG 
                  path={`/media/icons/duotune/${tab.icon}.svg`} 
                  className='svg-icon-2 me-2' 
                />
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content Area */}
      <div className='card-body py-4'>
        <CompanyDetailsTab company={company} activeTab={activeTab} />
      </div>
    </ViewModal>
    </>
  )
}

