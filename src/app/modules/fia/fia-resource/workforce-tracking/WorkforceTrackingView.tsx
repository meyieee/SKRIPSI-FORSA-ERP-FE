import React from 'react'
import {Outlet} from 'react-router-dom'
import {NavTabWorkforceTrackingMain} from './components/MainNavTab'
import {WorkforceFilterProvider} from './WorkforceFilterContext'

export const WorkforceTrackingView: React.FC = () => {
  return (
    <WorkforceFilterProvider>
      <div id='kt_toolbar'>
        <div className='toolbar p-8 mb-5 d-flex align-items-center'>
          <span className='pe-3 fs-3 fw-bold'>WORKFORCE TRACKING</span>
        </div>

        <NavTabWorkforceTrackingMain />
        <Outlet />
      </div>
    </WorkforceFilterProvider>
  )
}
