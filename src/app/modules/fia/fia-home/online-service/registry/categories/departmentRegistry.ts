import React from 'react'
import { OnlineRequestType } from '../types'

const AssetRequestForm = React.lazy(() => import('../../ui/forms/asset-request/AssetRequestForm'))
const CashRequestForm = React.lazy(() => import('../../ui/forms/cash-request/CashRequestForm'))
const PurchaseRequisitionForm = React.lazy(() => import('../../ui/forms/purchase-requisition/PurchaseRequisitionForm'))

export const departmentTypes: OnlineRequestType[] = [
  { key: 'asset-request', label: 'Asset Request', component: AssetRequestForm },
  { key: 'cash-request', label: 'Cash Request', component: CashRequestForm },
  { key: 'purchase-requisition', label: 'Purchase Requisition', component: PurchaseRequisitionForm },
]

