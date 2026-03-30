import React from 'react'
import {NavTab} from '../../components/ResourceNavTab'

const tiles = [
  {
    to: '/fia-resource/statistic_management/manpower',
    title: 'MANPOWER',
    sub: 'Performance and Analysing Manpower',
  },
  {
    to: '/fia-resource/statistic_management/manpower_service',
    title: 'SERVICE',
    sub: 'Manpower Service and Benefits',
  },
  {to: '/fia-resource/statistic_management/manpower_plan', title: 'PLAN', sub: 'Manpower Planning'},
  {
    to: '/fia-resource/statistic_management/manpower_schedule',
    title: 'SCHEDULE',
    sub: 'Manpower Scheduling',
  },
]

export const NavTabStatisticManagementMain: React.FC = () => (
  <NavTab tiles={tiles} cols={{sm: 2, md: 4, lg: 4}} />
)
