import {SummaryStat} from './SummaryStat'
import {Company} from '../core/types'

type Props = {
  companies: Company[]
  active: 'all'|'our-company'|'supplier'|'customer'|'freight'
  onChange: (v: Props['active']) => void
}

export const SummaryBar = ({companies, active, onChange}: Props) => {
  const count = (fn: (c: Company)=>boolean) => companies.filter(fn).length
  return (
    <div className='row g-3'>
      <div className='col-md-2'><SummaryStat label='ALL COMPANIES' subLabel='Show All' value={companies.length} color='secondary' active={active==='all'} onClick={()=>onChange('all')}/></div>
      <div className='col-md-2'><SummaryStat label='OUR COMPANY' subLabel='HO & Branches' value={count(c=>c.type==='Head Office'||c.type==='Branch')} color='primary' active={active==='our-company'} onClick={()=>onChange('our-company')}/></div>
      <div className='col-md-2'><SummaryStat label='SUPPLIER' subLabel='Supplier & Vendor' value={count(c=>c.type==='Supplier')} color='success' active={active==='supplier'} onClick={()=>onChange('supplier')}/></div>
      <div className='col-md-2'><SummaryStat label='CUSTOMER' subLabel='Customer & Contractor' value={count(c=>c.type==='Customer'||c.type==='Contractor')} color='warning' active={active==='customer'} onClick={()=>onChange('customer')}/></div>
      <div className='col-md-2'><SummaryStat label='FREIGHT' subLabel='Freight & Shipping' value={count(c=>c.type==='Freight')} color='info' active={active==='freight'} onClick={()=>onChange('freight')}/></div>
    </div>
  )
}


