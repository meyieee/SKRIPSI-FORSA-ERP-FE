import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../../components/ResourceSubTab'
import StatisticFilterBar from '../../StatisticFilterBar'

export const BenefitsLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-0'>
        <StatisticFilterBar />
      </div>

      <SubTabNav
        tabs={[
          {path: 'benefits_overview', label: 'Overview'},
          {path: 'benefits_summary', label: 'Leave & Medical Summary'},
          {path: 'benefits_leave_details', label: 'Leave Details'},
          {path: 'benefits_medical_details', label: 'Medical Details'},
          {path: 'benefits_more_info', label: 'More Info...'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
