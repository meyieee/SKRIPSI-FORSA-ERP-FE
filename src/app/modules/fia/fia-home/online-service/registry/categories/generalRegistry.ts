import React from 'react'
import { OnlineRequestType } from '../types'

const JobRequestForm = React.lazy(() => import('../../ui/forms/job-request/JobRequestForm'))
const AccommodationRequestForm = React.lazy(() => import('../../ui/forms/accommodation-request/AccommodationRequestForm'))
const TransportRequestForm = React.lazy(() => import('../../ui/forms/transport-request/TransportRequestForm'))
const VisitorRequestForm = React.lazy(() => import('../../ui/forms/visitor-request/VisitorRequestForm'))

export const generalTypes: OnlineRequestType[] = [
  { key: 'accommodation-request', label: 'Accommodation Request', component: AccommodationRequestForm },
  { key: 'transport-request', label: 'Transport Request', component: TransportRequestForm },
  { key: 'visitor-request', label: 'Visitor Request', component: VisitorRequestForm },
]

