import React from 'react'
import { Outlet } from 'react-router-dom'
import { SubTabNav } from '../../../components/OperationSubTab'

export const PMLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <SubTabNav
        tabs={[
          { path: 'pm', label: 'PM Planning & Scheduling' },
          { path: 'update', label: 'Update Group' },
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
