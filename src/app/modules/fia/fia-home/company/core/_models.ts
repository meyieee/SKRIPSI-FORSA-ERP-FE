/**
 * Company Module - Types & Models
 */

export type CompanyType = 'Head Office' | 'Branch' | 'Supplier' | 'Customer' | 'Contractor' | 'Freight'
export type CompanyStatus = 'Active' | 'Inactive' | 'Suspended'
export type CompanyFilter = 'all' | 'our-company' | 'supplier' | 'customer' | 'freight'

export interface Company {
  id: number
  name: string
  type: CompanyType
  code?: string
  email?: string
  website?: string
  address?: string
  city?: string
  province?: string
  country?: string
  phone?: string
  contactNo?: string
  npwp?: string
  status?: CompanyStatus
  statusDate?: string
  postalCode?: string
  region?: string
  contactName?: string
  remarks?: string
  logo?: string
  registerBy?: string
  createdDate?: string
  lastUpdated?: string
  updatedBy?: string
  priority?: string
  notes?: string
}

export interface Department {
  id: number
  name: string
  code?: string
  description?: string
}

export interface BusinessUnit {
  id: number
  name: string
  type: string
  code?: string
  description?: string
}

export interface CostCenter {
  id: number
  name: string
  type: string
  code?: string
  description?: string
}

export interface Section {
  id: number
  section_code?: string
  section_description?: string
  dept_code?: string
}

export interface Location {
  id: number
  name: string
  type: string
  code?: string
  description?: string
}

export interface CompanyCounts {
  all: number
  ourCompany: number
  supplier: number
  customer: number
  freight: number
}

export interface Contact {
  id: number
  idNumber: string
  fullName: string
  contactTitle: string
  preferFullAddress: string
  phone: string
  mobile: string
  email?: string
  companyId?: number
}

export interface Document {
  id: number
  code: string
  document: string
  fileAttachment: string
  remarks: string
  companyId?: number
  uploadDate?: string
  fileSize?: string
  fileType?: string
}

export interface Contract {
  id: number
  contractName: string
  type: string
  startDate: string
  endDate: string
  status: 'Active' | 'Expired' | 'Pending'
  companyId?: number
  description?: string
  value?: number
  currency?: string
}

/**
 * Validation function for Company
 */
export function validateCompany(company: Partial<Company>): string[] {
  const errors: string[] = []
  
  if (!company.name || company.name.trim() === '') {
    errors.push('Company name is required')
  }
  
  if (!company.type) {
    errors.push('Company type is required')
  }
  
  if (company.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.email)) {
    errors.push('Invalid email format')
  }
  
  return errors
}

