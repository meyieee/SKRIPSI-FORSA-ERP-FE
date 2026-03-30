// Mock data for CompanyOverview

export const mockCompany = {
  com_code: '101',
  com_name: 'PT Automation Based Resource',
  com_short_name: 'ABASE',
  address: 'Jl. Walanda Maramis No 7A, Kotamadya Manado, Sulawesi Utara',
  city: 'Manado',
  province: 'North Sulawesi',
  region: 'Manado City',
  country: 'Indonesia',
  email: 'abase@gmail.com',
  web_address: 'abase.com',
  phone_no: '021-123-456-789',
  contact_no: '0811-495-299',
  npwp: '1001',
  com_type: 'HO',
} as const

export const mockBranches = [
  {branch_code: 'HO', branch_name: 'Head Office Jakarta', is_active: true, com_type: 'HO'},
  {branch_code: 'MDO', branch_name: 'Branch Manado', is_active: true, com_type: 'Branch'},
  {branch_code: 'MLK', branch_name: 'Branch Maluku', is_active: false, com_type: 'Branch'},
  {branch_code: 'BPN', branch_name: 'Branch Balikpapan', is_active: false, com_type: 'Branch'},
] as const


