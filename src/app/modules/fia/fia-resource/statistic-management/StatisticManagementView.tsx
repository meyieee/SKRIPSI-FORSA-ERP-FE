import React from 'react'
import {Outlet} from 'react-router-dom'
import {NavTabStatisticManagementMain} from './components/MainNavTab'
import {StatisticFilterProvider} from './StatisticFilterContext'

export const StatisticManagementView: React.FC = () => {
  return (
    <StatisticFilterProvider>
      <div id='kt_toolbar'>
        <div className='toolbar p-8 mb-5 d-flex align-items-center'>
          <span className='pe-3 fs-3 fw-bold'>STATISTIC MANAGEMENT</span>
        </div>
        <NavTabStatisticManagementMain />

        <div className='pt-5'>
          <Outlet />
        </div>
      </div>
    </StatisticFilterProvider>
  )
}
