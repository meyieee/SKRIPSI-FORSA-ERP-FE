import {Company, CompanyGroup} from './types'

export const GROUP_BY_TYPE: Record<Company['type'], CompanyGroup> = {
  'Head Office': 'HO - BRANCH/SITE',
  Branch: 'HO - BRANCH/SITE',
  Supplier: 'SUPPLIER - VENDOR',
  Customer: 'CONTRACTOR - CUSTOMER',
  Contractor: 'CONTRACTOR - CUSTOMER',
  Freight: 'HO - BRANCH/SITE'
}

export const TYPE_BADGE_CLASS: Record<Company['type'], string> = {
  'Head Office': 'badge badge-light-primary',
  Branch: 'badge badge-light-info',
  Supplier: 'badge badge-light-success',
  Contractor: 'badge badge-light-warning',
  Customer: 'badge badge-light-danger',
  Freight: 'badge badge-light-dark'
}



