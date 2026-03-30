import React from 'react'
import {Outlet} from 'react-router-dom'
import { SubTabNav } from '../../../components/OperationSubTab'

export const ComponentLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <SubTabNav tabs={[{path: 'component', label: 'Current Component Tracking & Monitor'}]} />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
