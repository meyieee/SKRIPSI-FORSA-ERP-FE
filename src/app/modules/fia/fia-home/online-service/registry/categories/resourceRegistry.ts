import React from 'react'
import { OnlineRequestType } from '../types'

const TravelRequestForm = React.lazy(() => import('../../ui/forms/travel-request/TravelRequestForm'))
const TrainingRequestForm = React.lazy(() => import('../../ui/forms/training-request/TrainingRequestForm'))
const WorkforceRequestForm = React.lazy(() => import('../../ui/forms/workforce-request/WorkforceRequestForm'))
const CashRequestForm = React.lazy(() => import('../../ui/forms/cash-request/CashRequestForm'))

export const resourceTypes: OnlineRequestType[] = [
  { key: 'travel-request', label: 'Travel Request', component: TravelRequestForm },
  { key: 'training-request', label: 'Training Request', component: TrainingRequestForm },
  { key: 'workforce-request', label: 'Workforce Request', component: WorkforceRequestForm },
]

