import { UserModel } from '../../../../../../../../modules/auth'

function clean(value?: string | null) {
  return String(value || '').trim()
}

export function getCurrentUserDisplayName(
  currentUser?: UserModel | null,
  fallback?: string
) {
  if (!currentUser) return clean(fallback)

  const employeeFullName = [
    clean(currentUser['employees.first_name']),
    clean(currentUser['employees.middle_name']),
    clean(currentUser['employees.last_name']),
  ]
    .filter(Boolean)
    .join(' ')

  const directFullName = [
    clean(currentUser.first_name),
    clean(currentUser.last_name),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    clean(currentUser.display_name) ||
    clean(currentUser.fullname) ||
    employeeFullName ||
    directFullName ||
    clean(currentUser.name) ||
    clean(currentUser.username) ||
    clean(currentUser.id_number) ||
    clean(fallback)
  )
}
