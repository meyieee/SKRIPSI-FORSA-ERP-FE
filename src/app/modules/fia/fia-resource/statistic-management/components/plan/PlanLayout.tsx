import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import StatisticFilterBar from '../StatisticFilterBar'

export const PlanLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-0'>
        <StatisticFilterBar />
      </div>
      <SubTabNav
        tabs={[
          {path: 'plan_overview', label: 'Overview'},
          {path: 'plan_summary', label: 'Manpower Plan Summary'},
          {path: 'plan_details', label: 'Manpower Plan Details'},
          {path: 'plan_more_info', label: 'More Info...'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
