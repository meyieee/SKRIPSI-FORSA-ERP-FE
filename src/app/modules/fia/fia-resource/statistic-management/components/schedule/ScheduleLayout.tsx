import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import StatisticFilterBar from '../StatisticFilterBar'

export const ScheduleLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-0'>
        <StatisticFilterBar />
      </div>
      <SubTabNav
        tabs={[
          {path: 'schedule_roster', label: 'Master Workforce Roster'},
          {path: 'schedule_details', label: 'Workforce Roster Details'},
          {path: 'schedule_more_info', label: 'More Info...'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
