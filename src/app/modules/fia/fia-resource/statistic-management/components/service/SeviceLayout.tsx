import React from 'react'
import {Outlet} from 'react-router-dom'
import {MiddleTab} from '../../../components/ResourceMiddleTab'

const tiles = [
  {
    to: '/fia-resource/statistic_management/manpower_service/service_movement',
    title: 'MOVEMENT',
    sub: 'Plan-Hire and Left Employee',
  },
  {
    to: '/fia-resource/statistic_management/manpower_service/service_development',
    title: 'DEVELOPMENT',
    sub: 'Appraisal and Training',
  },
  {
    to: '/fia-resource/statistic_management/manpower_service/service_performance',
    title: 'PERFORMANCE',
    sub: 'Violation and Warning',
  },
  {
    to: '/fia-resource/statistic_management/manpower_service/service_benefits',
    title: 'BENEFITS',
    sub: 'Leave and Medical',
  },
  {
    to: '/fia-resource/statistic_management/manpower_service/service_facilities',
    title: 'FACILITIES',
    sub: 'Asset Uniform & PPE',
  },
]

// export const ServiceLayout: React.FC = () => <MiddleTab tiles={tiles} />

export const ServiceLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      {/* Middle tabs for Service */}
      <MiddleTab tiles={tiles} cols={{sm: 1, md: 1, lg: 5}} />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
