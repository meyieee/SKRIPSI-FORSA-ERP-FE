import React from 'react'
import { Outlet } from 'react-router-dom'
import { SubTabNav } from '../../../components/OperationSubTab'

export const FuelLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <SubTabNav
        tabs={[
          { path: 'fuel', label: 'Fuel Consumption' },
          { path: 'update', label: 'Update All' },
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
