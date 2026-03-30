import React from 'react'
import {Outlet} from 'react-router-dom'
import { SubTabNav } from '../../../components/OperationSubTab'

export const InspectionLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <SubTabNav tabs={[{path: 'inspection', label: 'Inspection | Defect Control'}]} />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
