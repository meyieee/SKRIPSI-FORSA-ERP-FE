import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import WorkforceFilterBar from '../../components/WorkforceFilterBar'

export const DevelopmentLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        <WorkforceFilterBar />
      </div>
      <SubTabNav
        tabs={[
          {path: 'performance', label: 'Performance Appraisal Control'},
          {path: 'training', label: 'Training Development Control'},
        ]}
      />
      <div className='pt-0'>
        <Outlet />
      </div>
    </div>
  )
}
