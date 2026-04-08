import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { getEmptyEmployeeRegisterValues } from './core/models'
import { EmployeeRegisterSimpleForm } from './EmployeeRegisterSimpleForm'
import { useAuth } from '../../auth'
import { cache_employeeregister } from '../../../constans'

const EmployeeRegisterAdd: FC = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as { state?: { successReturn?: string } }
  const queryClient = useQueryClient()

  const initialValues = getEmptyEmployeeRegisterValues(currentUser?.id_number)

  return (
    <EmployeeRegisterSimpleForm
      mode="add"
      initialValues={initialValues}
      onSuccess={() => {
        void queryClient.invalidateQueries({ queryKey: [cache_employeeregister] })
        const fallback = '/controls/account-settings'
        setTimeout(() => {
          navigate(location.state?.successReturn ?? fallback)
        }, 400)
      }}
    />
  )
}

export { EmployeeRegisterAdd }
