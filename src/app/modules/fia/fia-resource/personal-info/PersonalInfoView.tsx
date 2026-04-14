import React from 'react'
import {Outlet} from 'react-router-dom'
import {GeneralInfo} from '../personal-info/components/GeneralInfo'

/* FIA RESOURCE VIEW */
export const PersonalInfoView = () => {
  return (
    <div id='kt_toolbar'>
      {/* Header Title */}
      <div className='toolbar p-8 mb-5 d-flex align-items-center'>
        <span className='breadcrumb-item pe-3 fs-3 fw-bold'>PERSONAL INFO</span>
      </div>

      <div className='row gx-0'>
        <GeneralInfo />
      </div>
      <div className='mt-3'>
        <Outlet />
      </div>

      {/* Konten modul (tab content) */}
    </div>
  )
}
