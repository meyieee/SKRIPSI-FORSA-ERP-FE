import React from 'react'
import {NavTab} from '../../../../fia-resource/components/ResourceNavTab'

const tiles = [
  {
    to: 'violation',
    title: 'VIOLATION',
    sub: 'Violation and Discipline',
  },
  {
    to: 'development',
    title: 'DEVELOPMENT',
    sub: 'Performance and Training Control',
  },
  {to: 'leave', title: 'LEAVE', sub: 'Leave and Travel Control'},
  {
    to: 'contract',
    title: 'CONTRACT',
    sub: 'Employment Contract Control',
  },
  {to: 'time', title: 'TIME', sub: 'Time and Fingerprint Control'},
  {
    to: 'roster',
    title: 'WORKFORCE & ROSTER',
    sub: 'Working Schedule Management',
  },
  {to: 'medical', title: 'MEDICAL', sub: 'Medical Control Record'},
  {
    to: 'request',
    title: 'WORKFORCE REQUEST',
    sub: 'Employee Request',
  },
]

export const CommandCenterWorkforceNavTab: React.FC = () => (
  <NavTab tiles={tiles} cols={{sm: 1, md: 2, lg: 4}} />
)




