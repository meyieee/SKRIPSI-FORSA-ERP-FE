/** Minimal company/branch row untuk dropdown & widget (tanpa dependency modul CF). */
export type ComData = {
  com_code: string
  branch_code?: string
  com_name: string
  com_type: string
  address?: string
  email?: string
  web_address?: string
  city?: string
  province?: string
  region?: string
  country?: string
  logo?: string
  status?: boolean
}
