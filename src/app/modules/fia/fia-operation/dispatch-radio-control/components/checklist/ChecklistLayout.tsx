import React from 'react'
import {Outlet} from 'react-router-dom'
import { SubTabNav } from '../../../components/OperationSubTab'

export const ChecklistLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <SubTabNav tabs={[{path: 'checklist', label: 'Pre Checklist Control'}]} />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
