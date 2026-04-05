import { AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'

const normalizePermissions = (permissions: any): any[] => {
  if (!Array.isArray(permissions)) return []
  return permissions.filter((item) => {
    if (!item || typeof item !== 'object') return false
    return Boolean(item.routePath && item.privilege)
  })
}

const normalizeUser = (user: any) => {
  if (!user || typeof user !== 'object') return null
  return {
    ...user,
    'employees.branch_detail.com_type':
      user['employees.branch_detail.com_type'] ??
      user?.employees?.branch_detail?.com_type ??
      null,
    'employees.branch_detail.com_code':
      user['employees.branch_detail.com_code'] ??
      user?.employees?.branch_detail?.com_code ??
      user?.branch_code ??
      null,
    'employees.branch_detail.com_name':
      user['employees.branch_detail.com_name'] ??
      user?.employees?.branch_detail?.com_name ??
      null,
    'employees.photo': user['employees.photo'] ?? user?.employees?.photo ?? null,
  }
}

const normalizeAuth = (auth: any): AuthModel | undefined => {
  if (!auth || typeof auth !== 'object') return undefined
  const normalizedUser = normalizeUser(auth.user)
  if (!normalizedUser) return undefined

  return {
    token: auth.token ?? null,
    id: auth.id ?? null,
    user: normalizedUser,
    permissions: normalizePermissions(auth.permissions),
  }
}

const getAuth = (): AuthModel | undefined => {
  if (typeof localStorage === "undefined" || localStorage === null) {
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) return;

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    const normalized = normalizeAuth(auth)
    if (normalized) {
      return normalized
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (typeof localStorage === "undefined" || localStorage === null) {
    return;
  }

  try {
    const normalized = normalizeAuth(auth)
    if (!normalized) {
      localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
      return
    }

    const lsValue = JSON.stringify(normalized)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (typeof localStorage === "undefined" || localStorage === null) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export {getAuth, setAuth, removeAuth, normalizeAuth, normalizePermissions, AUTH_LOCAL_STORAGE_KEY}