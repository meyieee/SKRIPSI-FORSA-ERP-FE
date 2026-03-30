import React from 'react'
import { Outlet } from 'react-router-dom'
import { CommandCenterWorkforceNavTab } from './components/CommandCenterWorkforceNavTab'
import { WorkforceFilterProvider } from '../../../fia-resource/workforce-tracking/WorkforceFilterContext'

export const WorkforceTrackingViewWrapper: React.FC = () => {
  return (
    <WorkforceFilterProvider>
      <div id='kt_toolbar'>
        <div className='toolbar p-8 mb-5 d-flex align-items-center'>
          <span className='pe-3 fs-3 fw-bold'>WORKFORCE TRACKING</span>
        </div>

        <CommandCenterWorkforceNavTab />
        <Outlet />
      </div>
    </WorkforceFilterProvider>
  )
}

