// AnalyticalKPIView.tsx
import React from 'react'
import {Outlet} from 'react-router-dom'
import {NavTabAnalyticalKPIsMain} from './components/MainNavTab'
import {AnalyticalFilterProvider} from './AnalyticalFilterContext'

export const AnalyticalKPIView = () => {
  return (
    <AnalyticalFilterProvider>
      <div id='kt_toolbar'>
        {/* Header Title */}
        <div className='toolbar mb-lg-7 p-8 d-flex align-items-center gap-4'>
          <span className=' pe-3 fs-3 fw-bold '>ANALYTICAL & KPI'S</span>
        </div>

        {/* TABS + FILTER to the right */}
        <div className='navtabs-row d-flex gap-2'>
          <NavTabAnalyticalKPIsMain className='flex-grow-1 h-100' />
          <div className='kpi-filter-aside'></div>
        </div>

        <div className='gx-0'>
          <Outlet />
        </div>
      </div>
    </AnalyticalFilterProvider>
  )
}
