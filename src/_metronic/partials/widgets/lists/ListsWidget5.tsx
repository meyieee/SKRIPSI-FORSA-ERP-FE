import {FC, useState} from 'react'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
}

const ListsWidget5: FC<Props> = ({className}) => {
  const [rows] = useState([
    { id: 1, profile: '6', status: 'Sick', abbreviation: 'S', date: '27 Jan' },
    { id: 2, profile: '5', status: 'Absent', abbreviation: 'X', date: '22 Sep' },
    { id: 3, profile: '11', status: 'Sick', abbreviation: 'S', date: '01 Nov' },
    { id: 4, profile: '9', status: 'Excused Absent', abbreviation: 'C', date: '10 Dec' },
    { id: 5, profile: '23', status: 'Emergency Leave Without', abbreviation: 'E', date: '27 Jan' },
    { id: 6, profile: '7', status: 'Sick', abbreviation: 'S', date: '27 Jan' },
    { id: 7, profile: '8', status: 'Sick', abbreviation: 'S', date: '5 Mar' },
  ]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 py-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-dark'>Attendance</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>My Violation & Discipline</span>
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
      <div className='card-body pt-2 card-scroll h-400px'>
        {/* begin::Item */}
        {rows.map(row => (
          <div key={row.id} className='d-flex align-items-center mb-7'>
            <span className='badge badge-light-info fs-8 fw-bold me-5'>{row.date}</span>
            {/* begin::Text */}
            <div className='flex-grow-1'>
              <span className='text-dark fw-bold text-hover-primary fs-6'>
                {row.status}
              </span>
            </div>
            {/* end::Text */}
            {/* begin::Avatar */}
            <div className='symbol symbol-50px'>
              <span className='fs-1 fw-semibold'>{row.abbreviation}</span>
            </div>
            {/* end::Avatar */}
          </div>
        ))}
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget5}
