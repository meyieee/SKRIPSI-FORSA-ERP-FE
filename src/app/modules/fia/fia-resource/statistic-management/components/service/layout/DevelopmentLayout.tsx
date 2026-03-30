import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../../components/ResourceSubTab'
import StatisticFilterBar from '../../StatisticFilterBar'

export const ServiceDevelopmentLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-0'>
        <StatisticFilterBar />
      </div>

      <SubTabNav
        tabs={[
          {path: 'development_overview', label: 'Overview'},
          {path: 'development_summary', label: 'Manpower Development Summary'},
          {path: 'development_details', label: 'Training Details'},
          {path: 'development_appraisal', label: 'Performance Appraisal Details'},
          {path: 'development_more_info', label: 'More Info...'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
