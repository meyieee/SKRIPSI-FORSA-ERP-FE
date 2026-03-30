import React from 'react'
import {Outlet} from 'react-router-dom'
import { SubTabNav } from '../../../components/OperationSubTab'

export const WorkorderLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <SubTabNav tabs={[{path: 'workorder', label: 'Outstanding Workorder Lists'}]} />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
