import {FC, useState} from 'react'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
}

const ListsWidget3: FC<Props> = ({className}) => {
  const [rows] = useState([
    { id: 1, tag: 'danger', due_date: '22 Jan 20', description: 'LATEST NEWS ON ABASE UPGRADE', created_date: '27 Jan' },
    { id: 2, tag: 'warning', due_date: '22 Jan 20', description: 'LATEST NEWS ON THREES APPLICATION', created_date: '22 Sep' },
    { id: 3, tag: 'success', due_date: '22 Jan 20', description: 'LATEST NEWS ON ABASE UPGRADE', created_date: '01 Nov' },
    { id: 4, tag: 'success', due_date: '22 Jan 20', description: 'LATEST NEWS ON THREES APPLICATION', created_date: '10 Dec' },
    { id: 5, tag: 'danger', due_date: '22 Jan 20', description: 'LATEST NEWS ON ABASE UPGRADE', created_date: '27 Jan' },
    { id: 6, tag: 'danger', due_date: '22 Jan 20', description: 'LATEST NEWS ON THREES APPLICATION', created_date: '27 Jan' },
  ]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bold text-dark'>Todo</h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <Dropdown1 />
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-2 card-scroll h-400px'>
        {/* begin::Item */}
        {rows.map((row) => (
          <div key={row.id} className='d-flex align-items-center mb-5'>
            {/* begin::Bullet */}
            <span className={`bullet bullet-vertical h-40px bg-${row.tag}`}></span>
            {/* end::Bullet */}
            {/* begin::Checkbox */}
            <div className='form-check form-check-custom form-check-solid mx-5'>
              <input className='form-check-input' type='checkbox' value='' />
            </div>
            {/* end::Checkbox */}
            {/* begin::Description */}
            <div className='flex-grow-1'>
              <span className='text-muted fw-semibold d-block'>{row.due_date}</span>
              <span className='text-gray-800 text-hover-primary fw-bold fs-6'>
                {row.description}
              </span>
            </div>
            {/* end::Description */}
            <span className='badge badge-light-success fs-8 fw-bold'>{row.created_date}</span>
          </div>
        ))}
        {/* end:Item */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget3}
