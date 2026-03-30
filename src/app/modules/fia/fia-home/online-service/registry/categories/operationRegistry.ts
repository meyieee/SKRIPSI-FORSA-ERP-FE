import React from 'react'
import { OnlineRequestType } from '../types'

const JobRequestForm = React.lazy(() => import('../../ui/forms/job-request/JobRequestForm'))
const FleetRequestForm = React.lazy(() => import('../../ui/forms/fleet-request/FleetRequestForm'))
const InspectionDefectForm = React.lazy(() => import('../../ui/forms/inspection-defect/InspectionDefectForm'))

export const operationTypes: OnlineRequestType[] = [
  { key: 'job-request', label: 'Job Request', component: JobRequestForm },
  { key: 'fleet-request', label: 'Fleet Request', component: FleetRequestForm },
  { key: 'inspection-defect', label: 'Inspection | Defect', component: InspectionDefectForm },
]

