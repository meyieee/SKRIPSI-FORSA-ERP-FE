import { useAuth } from '../modules/auth/core/Auth'
import { PermissionModel } from '../modules/auth/core/_models'

const normalizeRoute = (routePath: string) => String(routePath || '').trim().toLowerCase()
const normalizePrivilege = (privilege: string) => String(privilege || '').trim().toLowerCase()

/**
 * Check if user has a specific permission for a route
 * @param routePath - Route path (e.g., '/home/overview')
 * @param privilege - Privilege code (e.g., 'Read', 'Create', 'Update', 'Delete', 'UpdateA')
 * @returns boolean - True if user has the permission
 */
export const usePermission = (routePath: string, privilege: string): boolean => {
  const { permissions } = useAuth()
  const safePermissions = Array.isArray(permissions) ? permissions : []
  const normalizedRoute = normalizeRoute(routePath)
  const normalizedPrivilege = normalizePrivilege(privilege)

  return safePermissions.some(
    p =>
      normalizeRoute(p.routePath || '') === normalizedRoute &&
      normalizePrivilege(p.privilege || '') === normalizedPrivilege
  )
}

/**
 * Check if user can access a route (has Read permission)
 * @param routePath - Route path (e.g., '/home/overview')
 * @returns boolean - True if user can access the route
 */
export const useCanAccessRoute = (routePath: string): boolean => {
  return usePermission(routePath, 'Read')
}

/**
 * Check if user has any of the specified privileges for a route (OR logic)
 * @param routePath - Route path
 * @param privileges - Array of privilege codes to check
 * @returns boolean - True if user has at least one of the privileges
 */
export const useAnyPermission = (routePath: string, privileges: string[]): boolean => {
  const { permissions } = useAuth()
  const safePermissions = Array.isArray(permissions) ? permissions : []
  const normalizedRoute = normalizeRoute(routePath)
  const normalizedPrivileges = privileges.map((x) => normalizePrivilege(x))

  return safePermissions.some(
    (p) =>
      normalizeRoute(p.routePath || '') === normalizedRoute &&
      normalizedPrivileges.includes(normalizePrivilege(p.privilege || ''))
  )
}

/**
 * Get all privileges user has for a specific route
 * @param routePath - Route path
 * @returns string[] - Array of privilege codes
 */
export const useRoutePermissions = (routePath: string): string[] => {
  const { permissions } = useAuth()
  const safePermissions = Array.isArray(permissions) ? permissions : []
  const normalizedRoute = normalizeRoute(routePath)
  return safePermissions
    .filter((p) => normalizeRoute(p.routePath || '') === normalizedRoute)
    .map((p) => p.privilege)
    .filter((x): x is string => Boolean(x))
}

