import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import AnalyticalFilterBar from '../AnalyticalFilterBar'

export const DevelopmentAnalyticalLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        <AnalyticalFilterBar />
      </div>
      <SubTabNav
        tabs={[
          {path: 'development_overview', label: 'Development Overview'},
          {path: 'development_summary', label: 'Employee Development Summary'},
          {path: 'development_details', label: 'Employee Development Details'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
