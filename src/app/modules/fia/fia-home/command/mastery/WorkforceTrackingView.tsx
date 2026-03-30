import React from 'react'
import {Outlet} from 'react-router-dom'
import {NavTabWorkforceTracking} from './components/NavTab'

/* FIA RESOURCE VIEW */
export const WorkforceTrackingView = () => {
  return (
    <div>
      
      <div className='d-flex justify-content-between align-items-center'>
          <NavTabWorkforceTracking />
        </div>
      {/* Isi tab */}
      <Outlet />
    </div>
  )
}
