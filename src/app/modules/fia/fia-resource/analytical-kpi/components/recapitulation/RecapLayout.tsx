import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import AnalyticalFilterBar from '../AnalyticalFilterBar'

export const RecapAnalyticalLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        <AnalyticalFilterBar />
      </div>
      <SubTabNav
        tabs={[
          {path: 'recap_overview', label: 'Recapitulation Overview'},
          {path: 'recap_summary', label: 'Employee Recap Summary'},
          {path: 'recap_details', label: 'Employee Recap Details'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
