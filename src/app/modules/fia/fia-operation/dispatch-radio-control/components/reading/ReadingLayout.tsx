import React from 'react'
import { Outlet } from 'react-router-dom'
import { SubTabNav } from '../../../components/OperationSubTab'

export const ReadingLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <SubTabNav
        tabs={[
          { path: 'reading', label: 'Meter Reading' },
          { path: 'update', label: 'Update All' },
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
