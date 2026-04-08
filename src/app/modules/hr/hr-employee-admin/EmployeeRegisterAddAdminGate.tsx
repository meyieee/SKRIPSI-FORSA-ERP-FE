import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useControlsAccess } from '../../../custom-hooks'
import { EmployeeRegisterAdd } from './EmployeeRegisterAdd'

/** Add Employee — same visibility as sidebar (RBAC Read on route or Controls legacy role). */
const EmployeeRegisterAddAdminGate: FC = () => {
  const { showAddEmployee } = useControlsAccess()
  if (!showAddEmployee) {
    return <Navigate to='/error/404' replace />
  }
  return <EmployeeRegisterAdd />
}

export { EmployeeRegisterAddAdminGate }
