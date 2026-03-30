import {FC, useEffect, useRef} from 'react'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
  chartColor?: string
  chartHeight?: string
}

const MixedWidget8: FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Beader */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Our Values & Goals</span>

          {/* <span className='text-muted fw-semibold fs-7'>Latest trends</span> */}
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
      <div className='card-body d-flex flex-column'>
        <div className="fs-1 fw-semibold mx-auto my-auto px-10 pb-5">
          We are committed to be trustworthy, to build and deliver efficiency, effectiveness, and automation that accelerate business processes to achieve corporate targets, goals, and programs.
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {MixedWidget8}
