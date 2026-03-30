import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../../components/ResourceSubTab'
import StatisticFilterBar from '../../StatisticFilterBar'

export const MovementLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-0'>
        <StatisticFilterBar />
      </div>

      <SubTabNav
        tabs={[
          {
            path: 'movement_overview',
            label: 'Overview',
          },
          {
            path: 'movement_summary',
            label: 'Manpower Movement Summary',
          },
          {
            path: 'movement_details',
            label: 'Manpower Movement Details',
          },
          {
            path: 'movement_more_info',
            label: 'More Info...',
          },
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
