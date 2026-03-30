import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import AnalyticalFilterBar from '../AnalyticalFilterBar'

export const TurnoverAnalyticalLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        <AnalyticalFilterBar />
      </div>
      <SubTabNav
        tabs={[
          {path: 'turnover_overview', label: 'Turnover Overview'},
          {path: 'turnover_summary', label: 'Employee Turnover Summary'},
          {path: 'turnover_details', label: 'Employee Turnover Details'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
