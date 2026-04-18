import { client } from '../../../../functions'
import type {
  FeatureRolePrivilegeRow,
  RbacFeatureRow,
  RbacPrivilegeRow,
  RolePrivilegeMatrixRow,
  RoleRow,
} from './_models'

export const RBAC_MANAGEMENT_ROUTE_PATH = '/controls/rbac-features'

export const getRbacAdminFeatures = async (includeInactive = true): Promise<RbacFeatureRow[]> => {
  const res = await client().get('/v1/rbac-admin/features', {
    params: { includeInactive: includeInactive ? 'true' : 'false' },
  })
  return res.data.data as RbacFeatureRow[]
}

export const getRbacAdminFeature = async (id: number): Promise<RbacFeatureRow> => {
  const res = await client().get(`/v1/rbac-admin/features/${id}`)
  return res.data.data as RbacFeatureRow
}

export const getRbacAdminPrivileges = async (): Promise<RbacPrivilegeRow[]> => {
  const res = await client().get('/v1/rbac-admin/privileges')
  return res.data.data as RbacPrivilegeRow[]
}

export const getRbacAdminFeatureRolePrivileges = async (
  featureId: number
): Promise<FeatureRolePrivilegeRow[]> => {
  const res = await client().get(`/v1/rbac-admin/features/${featureId}/role-privileges`)
  return res.data.data as FeatureRolePrivilegeRow[]
}

export const postRbacAdminFeature = async (body: Partial<RbacFeatureRow>): Promise<RbacFeatureRow> => {
  const res = await client().post('/v1/rbac-admin/features', body)
  return res.data.data as RbacFeatureRow
}

export const putRbacAdminFeature = async (
  id: number,
  body: Partial<RbacFeatureRow>
): Promise<RbacFeatureRow> => {
  const res = await client().put(`/v1/rbac-admin/features/${id}`, body)
  return res.data.data as RbacFeatureRow
}

export const putRbacAdminFeatureRolePrivileges = async (
  featureId: number,
  matrix: RolePrivilegeMatrixRow[]
): Promise<FeatureRolePrivilegeRow[]> => {
  const res = await client().put(`/v1/rbac-admin/features/${featureId}/role-privileges`, { matrix })
  return res.data.data as FeatureRolePrivilegeRow[]
}

export const getRolesV1 = async (): Promise<RoleRow[]> => {
  const res = await client().get('/v1/roles')
  return res.data.data as RoleRow[]
}
