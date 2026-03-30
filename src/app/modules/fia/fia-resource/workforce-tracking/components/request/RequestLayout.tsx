import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import WorkforceFilterBar from '../WorkforceFilterBar'

export const RequestLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        <WorkforceFilterBar />
      </div>
      <SubTabNav
        tabs={[{path: 'employee_request_control', label: 'Workforce - Employee Request Control'}]}
      />
      <div className='pt-0'>
        <Outlet />
      </div>
    </div>
  )
}
