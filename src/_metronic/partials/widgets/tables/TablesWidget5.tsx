import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'

type Props = {
  className: string
}

const TablesWidget5: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>FORSA PROFESSIONAL WAYS</span>
          {/* <span className='text-muted mt-1 fw-semibold fs-7'>More than 400 new products</span> */}
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Row */}
        <div className='row gy-5 g-xl-8'>
          <div className='col-xxl-3'>
            <div className="fs-7 fw-semibold mx-auto my-auto px-0 pb-5">
              FORSA Application is powered by ABase (Automation-Based Resource) technology that provides integrated and immediate information regarding the business, and give management an important tool for monitoring activities and provide actual servicing, reporting, and realtime information. Our core values: Cost Efficiency, Workforce Optimization, Streamline Timely Reporting, Driven Decision Making, and Process Management.
            </div>
          </div>
          <div className='col-xxl-9'>
            {/* begin::Row */}
            <div className='row g-0 px-5'>
              {/* begin::Col */}
              <div className='col bg-secondary px-6 py-8 w-100px h-170px rounded-2 me-7 mb-7'>
                <span className='text-light-light fw-semibold'>
                  SYSTEM
                </span>
                <div className='d-flex align-items-center justify-content-center bg-dark px-6 py-5 rounded-2 my-3'>
                  <span className='text-light-dark fw-semibold'>
                    FORSA
                  </span>
                </div>
                <div className='d-flex align-items-center justify-content-center bg-light px-6 py-5 rounded-2'>
                  <span className='text-light-light fw-semibold fs-9'>
                    APPLICATION
                  </span>
                </div>
              </div>
              {/* end::Col */}
              {/* begin::Col */}
              <div className='col bg-secondary px-6 py-8 w-100px h-170px rounded-2 me-7 mb-7'>
                <span className='text-light-light fw-semibold'>
                  PLANNING
                </span>
                <div className='d-flex align-items-center justify-content-center bg-dark px-6 py-5 rounded-2 my-3'>
                  <span className='text-light-dark fw-semibold'>
                    PLAN
                  </span>
                </div>
                <div className='d-flex align-items-center justify-content-center bg-light px-6 py-5 rounded-2'>
                  <span className='text-light-light fw-semibold fs-9'>
                    Data Collection & Analysis
                  </span>
                </div>
              </div>
              {/* end::Col */}
              {/* begin::Col */}
              <div className='col bg-secondary px-6 py-8 w-100px h-170px rounded-2 mb-7'>
                <span className='text-light-light fw-semibold'>
                  ORGANIZING
                </span>
                <div className='d-flex align-items-center justify-content-center bg-dark px-6 py-5 rounded-2 my-3'>
                  <span className='text-light-dark fw-semibold'>
                    SCHEDULE
                  </span>
                </div>
                <div className='d-flex align-items-center justify-content-center bg-light px-6 py-5 rounded-2'>
                  <span className='text-light-light fw-semibold fs-9'>
                    Plan Implementation
                  </span>
                </div>
              </div>
              {/* end::Col */}
            </div>
            {/* end::Row */}
            
            {/* begin::Row */}
            <div className='row g-0 px-5'>
              {/* begin::Col */}
              <div className='col bg-secondary px-6 py-8 w-100px h-170px rounded-2 me-7 mb-7'>
                <span className='text-light-light fw-semibold'>
                  ACTUATING
                </span>
                <div className='d-flex align-items-center justify-content-center bg-dark px-6 py-5 rounded-2 my-3'>
                  <span className='text-light-dark fw-semibold'>
                    EXECUTION
                  </span>
                </div>
                <div className='d-flex align-items-center justify-content-center bg-light px-6 py-5 rounded-2'>
                  <span className='text-light-light fw-semibold fs-9'>
                    Data Recording
                  </span>
                </div>
              </div>
              {/* end::Col */}
              {/* begin::Col */}
              <div className='col bg-secondary px-6 py-8 w-100px h-170px rounded-2 me-7 mb-7'>
                <span className='text-light-light fw-semibold'>
                  CONTROLLING
                </span>
                <div className='d-flex align-items-center justify-content-center bg-dark px-6 py-5 rounded-2 my-3'>
                  <span className='text-light-dark fw-semibold'>
                    STATISTICS
                  </span>
                </div>
                <div className='d-flex align-items-center justify-content-center bg-light px-6 py-5 rounded-2'>
                  <span className='text-light-light fw-semibold fs-9'>
                    KPI | Statistics
                  </span>
                </div>
              </div>
              {/* end::Col */}
              {/* begin::Col */}
              <div className='col bg-secondary px-6 py-8 w-100px h-170px rounded-2 mb-7'>
                <span className='text-light-light fw-semibold'>
                  PERFORMANCE
                </span>
                <div className='d-flex align-items-center justify-content-center bg-dark px-6 py-5 rounded-2 my-3'>
                  <span className='text-light-dark fw-semibold'>
                    DECISION
                  </span>
                </div>
                <div className='d-flex align-items-center justify-content-center bg-light px-6 py-5 rounded-2'>
                  <span className='text-light-light fw-semibold fs-9'>
                    MAKING
                  </span>
                </div>
              </div>
              {/* end::Col */}
            </div>
            {/* end::Row */}
          </div>
        </div>
        {/* end::Row */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {TablesWidget5}
