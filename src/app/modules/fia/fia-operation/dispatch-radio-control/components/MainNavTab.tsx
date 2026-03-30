import React from 'react'
import { OperationNavTab } from '../../components/OperationNavTab'

const tiles = [
  {
    to: '/fia-operation/dispatch_radio_control/breakdown',
    title: 'BREAKDOWN',
    sub: 'Breakdown Event Control',
  },
  {
    to: '/fia-operation/dispatch_radio_control/reading',
    title: 'READING',
    sub: 'Meter Reading Monitoring',
  },
  {
    to: '/fia-operation/dispatch_radio_control/fuel',
    title: 'FUEL',
    sub: 'Fuel Consumption Control',
  },
  {
    to: '/fia-operation/dispatch_radio_control/production',
    title: 'PRODUCTION',
    sub: 'Daily Production Control',
  },
  {
    to: '/fia-operation/dispatch_radio_control/pm',
    title: 'PM',
    sub: 'PM Planning and Scheduling',
  },
  {
    to: '/fia-operation/dispatch_radio_control/workorder',
    title: 'WORKORDER',
    sub: 'Outstanding Workorder Management',
  },
  {
    to: '/fia-operation/dispatch_radio_control/component',
    title: 'COMPONENT',
    sub: 'Component, Consumable & Type',
  },
  {
    to: '/fia-operation/dispatch_radio_control/safety',
    title: 'SAFETY',
    sub: 'Safety Management',
  },
  {
    to: '/fia-operation/dispatch_radio_control/job',
    title: 'JOB',
    sub: 'Operation Job Request',
  },
  {
    to: '/fia-operation/dispatch_radio_control/fleet',
    title: 'FLEET',
    sub: 'Equipment Fleet Request',
  },
  {
    to: '/fia-operation/dispatch_radio_control/inspection',
    title: 'INSPECTION',
    sub: 'Inspection & Defect',
  },
  {
    to: '/fia-operation/dispatch_radio_control/checklist',
    title: 'CHECKLIST',
    sub: 'Equipment Pre-Checklist',
  },
]

export const NavTabDispatchMain: React.FC = () => (
  <OperationNavTab tiles={tiles} cols={{sm: 2, md: 4, lg: 4}} autoStretch={true} />
)
