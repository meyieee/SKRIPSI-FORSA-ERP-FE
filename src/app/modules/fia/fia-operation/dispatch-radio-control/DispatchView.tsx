import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavTabDispatchMain } from './components/MainNavTab'

export const DispatchView: React.FC = () => {
  return (
    <div id='kt_toolbar'>
      <div className='toolbar p-8 mb-5 d-flex align-items-center'>
        <span className='pe-3 fs-3 fw-bold'>DISPATCH | RADIO CONTROL</span>
      </div>

      <NavTabDispatchMain />
      <Outlet />
    </div>
  )
}
