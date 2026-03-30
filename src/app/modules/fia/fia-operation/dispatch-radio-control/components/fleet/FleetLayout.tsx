import React from 'react'
import {Outlet} from 'react-router-dom'
import { SubTabNav } from '../../../components/OperationSubTab'

export const FleetLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <SubTabNav tabs={[{path: 'fleet', label: 'Fleet Request Control'}]} />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
