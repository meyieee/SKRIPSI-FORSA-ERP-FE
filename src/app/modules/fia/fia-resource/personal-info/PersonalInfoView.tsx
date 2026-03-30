import React, {useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {GeneralInfo} from '../personal-info/components/GeneralInfo'
import {MoreDetailNavigation} from './components/more-detail/MoreDetailNavigation'

/* FIA RESOURCE VIEW */
export const PersonalInfoView = () => {
  const [showMainNav, setShowMainNav] = useState(false)
  const navigate = useNavigate()

  const toggleMainNav = () => {
    if (showMainNav) {
      // Kalau sedang di More Detail dan klik "Back"
      setShowMainNav(false)
      navigate('/fia-resource/personal_info/personal_data') // arahkan ke awal
    } else {
      // Kalau masih di default, baru tampilkan MainNavigation
      setShowMainNav(true)
    }
  }

  return (
    <div id='kt_toolbar'>
      {/* Header Title */}
      <div className='toolbar p-8 mb-5 d-flex align-items-center'>
        <span className='breadcrumb-item pe-3 fs-3 fw-bold'>PERSONAL INFO</span>

        {showMainNav && <MoreDetailNavigation />}
        <button className='btn btn-primary ms-auto' onClick={toggleMainNav}>
          {showMainNav ? 'Back' : 'More Detail'}
        </button>
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
