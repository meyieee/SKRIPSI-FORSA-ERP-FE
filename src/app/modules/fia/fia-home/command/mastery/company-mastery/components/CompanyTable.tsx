import {Company, CompanyRowVM} from '../core/types'
import {GROUP_BY_TYPE} from '../core/constants'
import {GroupHeaderRow} from './GroupHeaderRow'
import {CompanyRow} from './CompanyRow'

type Props = {
  companies: Company[]
  onSelect: (c: Company)=>void
}

export const CompanyTable = ({companies, onSelect}: Props) => {
  const rows: CompanyRowVM[] = companies
    .map(c => ({group: GROUP_BY_TYPE[c.type], company: c}))
    .sort((a,b)=> a.group.localeCompare(b.group) || a.company.code.localeCompare(b.company.code))

  let index = 1
  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th className='min-w-30px py-3'>No</th>
            <th className='min-w-250px py-3'>Company | Company Name</th>
            <th className='min-w-50px text-center py-3'>UOM</th>
            <th className='min-w-80px text-end py-3'>SOH</th>
            <th className='min-w-100px text-end py-3'>Reserve</th>
            <th className='min-w-140px text-end py-3'>Stock Available</th>
            <th className='min-w-110px text-end py-3'>On Order</th>
            <th className='min-w-110px text-end py-3'>In Transit</th>
            <th className='min-w-140px text-end py-3'>Combine Stock</th>
            <th className='min-w-120px text-end py-3'>Target Level</th>
            <th className='min-w-110px text-end py-3'>Re-Order</th>
            <th className='min-w-120px text-end py-3'>Type</th>
            <th className='min-w-100px text-end py-3'>Action</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          {rows.map((r, i, arr) => {
            const isFirstOfGroup = i===0 || arr[i-1].group!==r.group
            return (
              <>
                {isFirstOfGroup && <GroupHeaderRow title={r.group}/>} 
                <CompanyRow key={r.company.id} idx={index++} company={r.company} onSelect={onSelect}/>
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}



