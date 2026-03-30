import React from 'react'
import {Outlet} from 'react-router-dom'
import {NavTabMyOnlineFeeds} from './components/NavTab'

/* FIA RESOURCE VIEW */
export const MyOnlineFeedsView = () => {
  return (
    <div id='kt_toolbar'>
      {/* Header Title */}
      <div className='toolbar mb-lg-7 p-8 d-flex align-items-center gap-4'>
        <span className=' pe-3 fs-3 fw-bold '>MY ONLINE FEEDS</span>
        <span>:</span>
        <div className='d-flex  justify-content-between align-items-center'>
          <NavTabMyOnlineFeeds />
        </div>
      </div>

      <div className='gx-0'>
        <Outlet />
      </div>
    </div>
  )
}
