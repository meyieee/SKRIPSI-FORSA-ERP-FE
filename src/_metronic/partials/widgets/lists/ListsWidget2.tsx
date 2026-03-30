import {FC, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
}

const ListsWidget2: FC<Props> = ({className}) => {
  const [rows] = useState([
    {
      id: 1,
      profile: '6',
      full_name: 'Eduard Salindeho',
      role: 'Marketing Officer',
      birthday: '27 Jan',
    },
    {
      id: 2,
      profile: '5',
      full_name: 'James Maslow',
      role: 'Human Resource Manager',
      birthday: '22 Sep',
    },
    {id: 3, profile: '11', full_name: 'Gabriel Lewis', role: 'IT Engineer', birthday: '01 Nov'},
    {
      id: 4,
      profile: '9',
      full_name: 'Amy Schumer',
      role: 'Operation Superintendent',
      birthday: '10 Dec',
    },
    {
      id: 5,
      profile: '23',
      full_name: 'April ONeil',
      role: 'Marketing Supervisor',
      birthday: '27 Jan',
    },
    {
      id: 6,
      profile: '7',
      full_name: 'Michael Scott',
      role: 'Security Bodyguard',
      birthday: '27 Jan',
    },
    {
      id: 7,
      profile: '8',
      full_name: 'Pamela Beesly',
      role: 'Secretary | Frontdesk',
      birthday: '5 Mar',
    },
  ])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bold text-dark'>Birthdays</h3>
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
          <div key={row.id} className='d-flex align-items-center mb-7'>
            {/* begin::Avatar */}
            <div className='symbol symbol-50px me-5'>
              <img
                src={toAbsoluteUrl(`/media/avatars/300-${row.profile}.jpg`)}
                className=''
                alt=''
              />
            </div>
            {/* end::Avatar */}
            {/* begin::Text */}
            <div className='flex-grow-1'>
              <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                {row.full_name}
              </a>
              <span className='text-muted d-block fw-semibold'>{row.role}</span>
            </div>
            {/* end::Text */}
            <span className='badge badge-light-info fs-8 fw-bold'>{row.birthday}</span>
          </div>
        ))}
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget2}
