import {FC, useState} from 'react'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className?: string
}

const ListsWidget6: FC<Props> = () => {
  const [rows] = useState([
    { id: 1, title: 'LATEST NEWS ON ABASE UPGRADE', description: 'Please be informed that the new ABase...', created: '31-Jul-22' },
    { id: 2, title: 'New Fosa Application Designed', description: 'ABase prime team.', created: '31-Jul-22' },
    { id: 3, title: 'Preparation Project Modules for', description: 'Operation production', created: '31-Jul-22' },
    { id: 4, title: 'Review Meeting Project Modules', description: 'Operation production', created: '31-Jul-22' },
    { id: 5, title: 'New Forsa Application Designed', description: 'ABase prime team.', created: '31-Jul-22' },
    { id: 6, title: 'Preparation Project Modules for', description: 'Maintenance system', created: '31-Jul-22' },
  ]);

  return (
    <div className='card card-xl-stretch mb-5 mb-xl-8'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>News</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Announcements</span>
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
      <div className='card-body pt-3 card-scroll h-350px'>
        {/* begin::Item */}
        {rows.map(row => (
          <div key={row.id} className='d-flex align-items-center bg-light-primary rounded p-5 mb-7'>
            {/* begin::Icon */}
            <span className='svg-icon svg-icon-warning me-5'>
              <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
            </span>
            {/* end::Icon */}
            {/* begin::Title */}
            <div className='flex-grow-1 me-2'>
              <span className='fw-bold text-gray-800 text-hover-primary fs-6'>
                {row.title}
              </span>
              <span className='text-muted fw-semibold d-block'>
                <strong className='text-gray-700'>{row.created}</strong> | {row.description}
              </span>
            </div>
            {/* end::Title */}
          </div>
        ))}
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget6}
