import { CompanyType, CompanyFilter } from './core/_models'

/**
 * Company Module - Constants
 */

export const COMPANY_TYPE_BADGE_CLASSES: Record<CompanyType, string> = {
  'Head Office': 'badge badge-light-primary',
  'Branch': 'badge badge-light-info',
  'Supplier': 'badge badge-light-success',
  'Contractor': 'badge badge-light-warning',
  'Customer': 'badge badge-light-danger',
  'Freight': 'badge badge-light-dark',
}

export const COMPANY_FILTER_LABELS: Record<CompanyFilter, string> = {
  'all': 'ALL COMPANIES',
  'our-company': 'OUR COMPANY',
  'supplier': 'SUPPLIER',
  'customer': 'CUSTOMER',
  'freight': 'FREIGHT',
}

export const COMPANY_FILTER_SUBTITLES: Record<CompanyFilter, string> = {
  'all': 'Show All',
  'our-company': 'HO & Branches',
  'supplier': 'Supplier & Vendor',
  'customer': 'Customer & Contractor',
  'freight': 'Freight & Shipping',
}

export const COMPANY_FILTER_COLORS: Record<CompanyFilter, { active: string; inactive: string }> = {
  'all': { active: 'bg-secondary text-white', inactive: 'bg-light-secondary text-secondary' },
  'our-company': { active: 'bg-primary text-white', inactive: 'bg-light-primary text-primary' },
  'supplier': { active: 'bg-success text-white', inactive: 'bg-light-success text-success' },
  'customer': { active: 'bg-warning text-white', inactive: 'bg-light-warning text-warning' },
  'freight': { active: 'bg-info text-white', inactive: 'bg-light-info text-info' },
}

