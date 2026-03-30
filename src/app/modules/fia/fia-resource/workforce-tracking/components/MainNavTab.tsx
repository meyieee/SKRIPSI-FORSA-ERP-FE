import React from 'react'
import {NavTab} from '../../components/ResourceNavTab'

const tiles = [
  {
    to: '/fia-resource/workforce_tracking/violation',
    title: 'VIOLATION',
    sub: 'Violation and Discipline',
  },
  {
    to: '/fia-resource/workforce_tracking/development',
    title: 'DEVELOPMENT',
    sub: 'Performance and Training Control',
  },
  {to: '/fia-resource/workforce_tracking/leave', title: 'LEAVE', sub: 'Leave and Travel Control'},
  {
    to: '/fia-resource/workforce_tracking/contract',
    title: 'CONTRACT',
    sub: 'Employment Contract Control',
  },
  {to: '/fia-resource/workforce_tracking/time', title: 'TIME', sub: 'Time and Fingerprint Control'},
  {
    to: '/fia-resource/workforce_tracking/roster',
    title: 'WORKFORCE & ROSTER',
    sub: 'Working Schedule Management',
  },
  {to: '/fia-resource/workforce_tracking/medical', title: 'MEDICAL', sub: 'Medical Control Record'},
  {
    to: '/fia-resource/workforce_tracking/request',
    title: 'WORKFORCE REQUEST',
    sub: 'Employee Request',
  },
]

export const NavTabWorkforceTrackingMain: React.FC = () => (
  <NavTab tiles={tiles} cols={{sm: 1, md: 2, lg: 4}} />
)
