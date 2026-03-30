import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import AnalyticalFilterBar from '../AnalyticalFilterBar'

export const AccountabilityAnalyticalLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        <AnalyticalFilterBar />
      </div>
      <SubTabNav
        tabs={[
          {path: 'accountability_overview', label: 'Accountability Overview'},
          {path: 'accountability_summary', label: 'Employee Accountability Summary'},
          {path: 'accountability_details', label: 'Employee Accountability Details'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
