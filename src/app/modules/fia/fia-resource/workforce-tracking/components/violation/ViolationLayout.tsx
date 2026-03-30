import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import WorkforceFilterBar from '../../components/WorkforceFilterBar'

export const ViolationLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        <WorkforceFilterBar />
      </div>
      <SubTabNav
        tabs={[
          {path: 'control', label: 'Violation & Discipline Control'},
          {path: 'update', label: 'Update'},
        ]}
      />

      <Outlet />
    </div>
  )
}
