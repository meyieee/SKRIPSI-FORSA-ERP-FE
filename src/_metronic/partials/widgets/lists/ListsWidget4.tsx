import {FC, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className?: string
  items?: number
}

const ListsWidget4: FC<Props> = () => {
  const [rows] = useState([
    { id: 1, tag: 'danger', description: 'PM Light Vehicle Cruise 01-001', due_days: 2, is_overdue: true, weeks: true },
    { id: 2, tag: 'warning', description: 'PM Shovel Model AAA - Ex-001', due_days: 1, is_overdue: true, weeks: true },
    { id: 3, tag: 'success', description: 'Light Vehicle Cruise 01-001', due_days: 2, is_overdue: false, weeks: false },
    { id: 4, tag: 'success', description: 'Michael Scott Annual Leave', due_days: 2, is_overdue: false, weeks: true },
    { id: 5, tag: 'danger', description: 'James Halpert Annual Leave', due_days: 2, is_overdue: false, weeks: true },
    { id: 6, tag: 'danger', description: 'Pamela Beesly Annual Leave', due_days: 2, is_overdue: false, weeks: true },
  ]);

  return (
    <div className='card card-xl-stretch mb-xl-8'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-dark'>Reminders</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>License, vacation, training, etc.</span>
        </h3>
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
      <div className='card-body pt-5 card-scroll h-400px'>
        {/* begin::Item */}
        {rows.map(row => (
          <div key={row.id} className='d-flex align-items-sm-center mb-7'>
            {/* begin::Bullet */}
            <span className={`bullet bullet-vertical h-40px bg-${row.tag}`}></span>
            {/* end::Bullet */}
            {/* begin::Checkbox */}
            <div className='form-check form-check-custom form-check-solid mx-5'>
              <input className='form-check-input' type='checkbox' value='' />
            </div>
            {/* end::Checkbox */}
            {/* begin::Section */}
            <div className='d-flex align-items-center flex-row-fluid flex-wrap'>
              <div className='flex-grow-1 me-2'>
                <span className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                  {row.description}
                </span>
                <span className='text-muted fw-semibold d-block fs-7'>{row.is_overdue ? 'Overdue' : 'Due'} in {row.due_days} {row.weeks ? 'week' : 'day'}{row.due_days > 1 && 's'}</span>
              </div>
              <button className='btn btn-link btn-color-primary btn-active-color-primary fs-7 fw-bold my-2'>View</button>
            </div>
            {/* end::Section */}
          </div>
        ))}
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget4}