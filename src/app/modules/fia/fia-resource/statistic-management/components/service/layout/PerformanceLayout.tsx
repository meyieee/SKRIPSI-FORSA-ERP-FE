import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../../components/ResourceSubTab'
import StatisticFilterBar from '../../StatisticFilterBar'

export const PerformanceLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-0'>
        <StatisticFilterBar />
      </div>

      <SubTabNav
        tabs={[
          {path: 'performance_overview', label: 'Overview'},
          {path: 'performance_summary', label: 'Violation & Warning Summary'},
          {path: 'performance_vio_details', label: 'Violation Details'},
          {path: 'performance_warn_details', label: 'Warning Details'},
          {path: 'performance_more_info', label: 'More Info...'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
