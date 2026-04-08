import {useAuth} from '../modules/auth/core/Auth'
import {useCanAccessRoute} from './usePermission'

const normalizeRoute = (routePath: string) => String(routePath || '').trim().toLowerCase()
const normalizePrivilege = (privilege: string) => String(privilege || '').trim().toLowerCase()

/**
 * Route paths that participate in Controls RBAC (Read on any = access to some part of Controls).
 * Keep in sync with adm_fia_control_feature.route_path in BE.
 */
export const CONTROLS_ACCESS_ROUTE_PATHS = [
  '/controls',
  '/controls/account-settings',
  '/controls/change-password',
  '/controls/employee-register/add',
  '/control-file/master/acc/view',
] as const

/** Users who had hardcoded access before RBAC wiring (backward compatibility). */
export const isLegacyControlsRole = (role?: string | null) =>
  role === 'administrator' || role === 'admin'

/**
 * True if JWT permissions include Read on any Controls-related route_path.
 */
export const useCanAccessAnyControlsRoute = (): boolean => {
  const {permissions} = useAuth()
  const safePermissions = Array.isArray(permissions) ? permissions : []
  const allowedPaths = new Set(CONTROLS_ACCESS_ROUTE_PATHS.map((p) => normalizeRoute(p)))

  return safePermissions.some(
    (p) =>
      allowedPaths.has(normalizeRoute(p.routePath || '')) && normalizePrivilege(p.privilege || '') === 'read'
  )
}

/**
 * Controls menu + route gates: RBAC (any path above) or legacy role fallback.
 */
export const useControlsAccess = () => {
  const {currentUser} = useAuth()
  const legacy = isLegacyControlsRole(currentUser?.role)

  const canParent = useCanAccessRoute('/controls')
  const umbrella = canParent || legacy

  const canAccountSettings = useCanAccessRoute('/controls/account-settings')
  const canChangePassword = useCanAccessRoute('/controls/change-password')
  const canEmployeeRegisterAdd = useCanAccessRoute('/controls/employee-register/add')
  const canGlAccountView = useCanAccessRoute('/control-file/master/acc/view')

  const anyControls = useCanAccessAnyControlsRoute()

  const showSection = anyControls || legacy

  return {
    /** Show Controls sidebar / header group */
    showSection,
    /** Sub-item: Account Settings (users) */
    showAccountSettings: umbrella || canAccountSettings,
    /** Sub-item: Change password */
    showChangePassword: umbrella || canChangePassword,
    /** Sub-item: Add Employee (tbl_emp_regs) */
    showAddEmployee: umbrella || canEmployeeRegisterAdd,
    /** Mount PrivateRoutes: controls/* (account-settings, change-password) */
    canAccessControlsRoutes: showSection,
    /** Mount PrivateRoutes: control-file/master/acc/* (GL account) */
    canAccessGlAccountRoutes: umbrella || canGlAccountView || legacy,
  }
}
