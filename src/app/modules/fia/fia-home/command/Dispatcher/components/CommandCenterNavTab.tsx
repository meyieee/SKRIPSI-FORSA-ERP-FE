import React from 'react'
import { OperationNavTab } from '../../../../fia-operation/components/OperationNavTab'

const tiles = [
  {
    to: 'breakdown',
    title: 'BREAKDOWN',
    sub: 'Breakdown Event Control',
  },
  {
    to: 'reading',
    title: 'READING',
    sub: 'Meter Reading Monitoring',
  },
  {
    to: 'fuel',
    title: 'FUEL',
    sub: 'Fuel Consumption Control',
  },
  {
    to: 'production',
    title: 'PRODUCTION',
    sub: 'Daily Production Control',
  },
  {
    to: 'pm',
    title: 'PM',
    sub: 'PM Planning and Scheduling',
  },
  {
    to: 'workorder',
    title: 'WORKORDER',
    sub: 'Outstanding Workorder Management',
  },
  {
    to: 'component',
    title: 'COMPONENT',
    sub: 'Component, Consumable & Type',
  },
  {
    to: 'safety',
    title: 'SAFETY',
    sub: 'Safety Management',
  },
  {
    to: 'job',
    title: 'JOB',
    sub: 'Operation Job Request',
  },
  {
    to: 'fleet',
    title: 'FLEET',
    sub: 'Equipment Fleet Request',
  },
  {
    to: 'inspection',
    title: 'INSPECTION',
    sub: 'Inspection & Defect',
  },
  {
    to: 'checklist',
    title: 'CHECKLIST',
    sub: 'Equipment Pre-Checklist',
  },
]

export const CommandCenterNavTab: React.FC = () => (
  <OperationNavTab tiles={tiles} cols={{sm: 2, md: 4, lg: 4}} autoStretch={true} />
)

