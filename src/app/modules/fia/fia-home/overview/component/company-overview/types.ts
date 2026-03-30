export interface CompanyOverviewData {
  com_code: string
  com_name: string
  com_short_name: string
  address: string
  city: string
  province: string
  region: string
  country: string
  email: string
  web_address: string
  phone_no: string
  contact_no: string
  npwp: string
  com_type: 'HO' | 'Branch'
}

export interface BranchActivation {
  branch_code: string
  branch_name: string
  is_active: boolean

}

