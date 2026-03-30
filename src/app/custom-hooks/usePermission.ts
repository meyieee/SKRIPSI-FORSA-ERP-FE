import { useAuth } from '../modules/auth/core/Auth'
import { PermissionModel } from '../modules/auth/core/_models'

/**
 * Check if user has a specific permission for a route
 * @param routePath - Route path (e.g., '/home/overview')
 * @param privilege - Privilege code (e.g., 'Read', 'Create', 'Update', 'Delete', 'UpdateA')
 * @returns boolean - True if user has the permission
 */
export const usePermission = (routePath: string, privilege: string): boolean => {
  const { permissions } = useAuth()
  return permissions.some(
    p => p.routePath === routePath && p.privilege === privilege
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
  return privileges.some(privilege =>
    permissions.some(
      p => p.routePath === routePath && p.privilege === privilege
    )
  )
}

/**
 * Get all privileges user has for a specific route
 * @param routePath - Route path
 * @returns string[] - Array of privilege codes
 */
export const useRoutePermissions = (routePath: string): string[] => {
  const { permissions } = useAuth()
  return permissions
    .filter(p => p.routePath === routePath)
    .map(p => p.privilege)
}

