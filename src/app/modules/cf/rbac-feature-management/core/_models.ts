export type RbacFeatureRow = {
  id: number
  parent_feature_id: number | null
  feature_name: string
  code: string
  description: string | null
  route_path: string | null
  icon: string | null
  display_order: number | null
  is_active: boolean | null
  created_at?: string
  updated_at?: string
}

export type RbacPrivilegeRow = {
  id: number
  privilege_r: string
  description: string
}

export type RoleRow = {
  id: number
  role_name: string
  description: string
}

export type FeatureRolePrivilegeRow = {
  rolePrivilegeId: number
  roleId: number
  roleName: string | null
  privilegeId: number
  privilegeCode: string | null
  isActive: boolean
}

export type RolePrivilegeMatrixRow = {
  roleId: number
  privilegeIds: number[]
}
