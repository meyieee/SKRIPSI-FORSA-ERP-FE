import React from 'react'
import {NavTab} from '../../components/ResourceNavTab'

const tiles = [
  {
    to: '/fia-resource/analitycal&KPIs/recapitulation',
    title: 'RECAPITULATION',
    sub: 'Workforce Availability & Function',
  },
  {
    to: '/fia-resource/analitycal&KPIs/turnover',
    title: 'TURNOVER',
    sub: 'Employee Turnover',
  },
  {
    to: '/fia-resource/analitycal&KPIs/development',
    title: 'DEVELOPMENT',
    sub: 'Training & Appraisal',
  },

  {
    to: '/fia-resource/analitycal&KPIs/accountability',
    title: 'ACCOUNTABILITY',
    sub: 'Accountability Time & Utilization',
  },
]

export const NavTabAnalyticalKPIsMain: React.FC<{className?: string}> = ({className}) => (
  <NavTab tiles={tiles} className={className} cols={{sm: 2, md: 4, lg: 4}} />
)
