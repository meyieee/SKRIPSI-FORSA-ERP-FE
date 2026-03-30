export type CompanyCategory = 'our-company' | 'supplier' | 'customer' | 'freight' | 'all'
export type CompanyGroup = 'HO - BRANCH/SITE' | 'SUPPLIER - VENDOR' | 'CONTRACTOR - CUSTOMER'

export interface Company {
  id: string
  code: string
  name: string
  type: 'Head Office' | 'Branch' | 'Supplier' | 'Customer' | 'Contractor' | 'Freight'
  uom?: string
  stats?: InventoryStats
  addresses?: {
    billTo?: Address
    shipTo?: Address
  }
}

export interface InventoryStats {
  soh: number
  reserve?: number
  available: number
  onOrder?: number
  inTransit?: number
  combineStock?: number
  targetLevel?: number
  reorder?: number
}

export interface Address {
  to?: string
  fullAddress?: string
  attention?: string
  phone?: string
}

export interface CompanyRowVM {
  group: CompanyGroup
  company: Company
}



