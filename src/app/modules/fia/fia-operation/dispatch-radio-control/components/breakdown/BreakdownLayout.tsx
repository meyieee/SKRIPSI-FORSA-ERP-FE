import React from 'react'
import {Outlet} from 'react-router-dom'

export const BreakdownLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
