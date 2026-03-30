import {useEffect, useMemo, useState, useRef} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../_metronic'
import {PageTitle} from '../../../../../../../_metronic/layout/core'
import {Company} from './core/types'
import {fetchCompanies} from './services/companyMastery.service'
import {SummaryBar} from './components/SummaryBar'
import {CompanyTable} from './components/CompanyTable'
import CompanyMasteryInfo from './components/CompanyMasteryInfo'

export const CompanyMasteryPage = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [active, setActive] = useState<'all'|'our-company'|'supplier'|'customer'|'freight'>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Company|null>(null)
  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{ fetchCompanies().then(setCompanies) }, [])

  const filtered = useMemo(()=> {
    const inCategory = (c: Company) => {
      if (active==='all') return true
      if (active==='our-company') return c.type==='Head Office'||c.type==='Branch'
      if (active==='supplier') return c.type==='Supplier'
      if (active==='customer') return c.type==='Customer'||c.type==='Contractor'
      if (active==='freight') return c.type==='Freight'
      return true
    }
    const q = search.trim().toLowerCase()
    return companies.filter(c => inCategory(c) && (!q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)))
  }, [companies, active, search])

  const handleView = (company: Company) => {
    setSelected(company)
    if (!hasDetail) setHasDetail(true)
    setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
  }

  return (
    <>
      <PageTitle>Company Mastery</PageTitle>

      <KTCard className='mb-5'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>COMPANY MASTERY</span>
          </h3>
          <div className='card-toolbar'>
            <input className='form-control form-control-sm' placeholder='Filters' value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
        </div>
        <KTCardBody className='py-4'>
          <SummaryBar companies={companies} active={active} onChange={setActive}/>
        </KTCardBody>
      </KTCard>

      <div className='row g-5 mb-5'>
        <div className='col-md-12'>
          <KTCard>
            <KTCardBody className='py-4'>
              <CompanyTable companies={filtered} onSelect={handleView}/>
              
              {/* Footer actions */}
              <div className='d-flex justify-content-between align-items-center mt-4'>
                <button
                  type='button'
                  className='btn btn-dark'
                  disabled={filtered.length === 0}
                  onClick={() => {
                    // Toggle open/close
                    if (hasDetail) {
                      setHasDetail(false)
                      return
                    }
                    // Auto-select first company if no company is selected then open and scroll
                    if (!selected && filtered.length > 0) {
                      setSelected(filtered[0])
                    }
                    setHasDetail(true)
                    setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
                  }}
                >
                  {hasDetail ? 'HIDE COMPANY MASTERY INFO' : 'COMPANY MASTERY INFO'}
                </button>
                <span className='text-muted'>More Detail…</span>
              </div>
            </KTCardBody>
          </KTCard>
        </div>
      </div>

      {/* untuk auto-scroll */}
      <div ref={anchorRef} />

      {/* Company Mastery Info */}
      {hasDetail && (
        <div>
          <CompanyMasteryInfo company={selected || (filtered.length > 0 ? filtered[0] : null)} />
        </div>
      )}
    </>
  )
}

export default CompanyMasteryPage


