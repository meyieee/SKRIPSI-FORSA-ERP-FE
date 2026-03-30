import {Company} from '../core/types'
import {TYPE_BADGE_CLASS} from '../core/constants'
import {KTSVG} from '../../../../../../../../_metronic'

type Props = { idx: number; company: Company; onSelect: (c: Company)=>void }
export const CompanyRow = ({idx, company, onSelect}: Props) => {
  const s = company.stats
  return (
    <tr onClick={()=>onSelect(company)} style={{cursor:'pointer'}}>
      <td><span className='fw-bold'>{idx}</span></td>
      <td>
        <div className='d-flex flex-column'>
          <span className='fw-semibold fs-6 text-gray-800'>{company.code}</span>
          <span className='text-muted fs-7'>{company.name}</span>
        </div>
      </td>
      <td className='text-center'>{company.uom || '-'}</td>
      <td className='text-end'>{s?.soh ?? '-'}</td>
      <td className='text-end'>{s?.reserve ?? '-'}</td>
      <td className='text-end'>{s?.available ?? '-'}</td>
      <td className='text-end'>{s?.onOrder ?? '-'}</td>
      <td className='text-end'>{s?.inTransit ?? '-'}</td>
      <td className='text-end'>{s?.combineStock ?? '-'}</td>
      <td className='text-end'>{s?.targetLevel ?? '-'}</td>
      <td className='text-end'>{s?.reorder ?? '-'}</td>
      <td className='text-end'>
        <span className={TYPE_BADGE_CLASS[company.type]}>{company.type}</span>
      </td>
      <td className='text-end'>
        <button
          type='button'
          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
          onClick={(e) => {
            e.stopPropagation()
            onSelect(company)
          }}
        >
          <KTSVG
            path='/media/icons/duotune/general/gen004.svg'
            className='svg-icon-3'
          />
        </button>
      </td>
    </tr>
  )
}



