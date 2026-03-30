import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../components/ResourceSubTab'
import WorkforceFilterBar from '../../components/WorkforceFilterBar'

export const MedicalLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        <WorkforceFilterBar />
      </div>
      <SubTabNav tabs={[{path: 'medical_record', label: 'Medical Record'}]} />
      <div className='pt-0'>
        <Outlet />
      </div>
    </div>
  )
}
