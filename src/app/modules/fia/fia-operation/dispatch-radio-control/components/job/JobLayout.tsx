import React from 'react'
import {Outlet} from 'react-router-dom'
import { SubTabNav } from '../../../components/OperationSubTab'

export const JobLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <SubTabNav tabs={[{path: 'job', label: 'Job Request Control'}]} />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
