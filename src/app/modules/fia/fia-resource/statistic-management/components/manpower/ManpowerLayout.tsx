import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import StatisticFilterBar from '../StatisticFilterBar'

export const ManpowerLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-0'>
        <StatisticFilterBar />
      </div>
      <SubTabNav
        tabs={[
          {path: 'manpower_overview', label: 'Overview'},
          {path: 'manpower_summary', label: 'Manpower Summary'},
          {path: 'manpower_details', label: 'Manpower Details'},
          {path: 'manpower_more_info', label: 'More Info...'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
