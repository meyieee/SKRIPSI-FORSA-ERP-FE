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

  const initialValues = {
    ...getEmptyEmployeeRegisterValues(currentUser?.id_number),
    emp_company: currentUser?.['employees.branch_detail.com_code'] || '',
    branch_code: currentUser?.['employees.branch_detail.com_code'] || '',
  }

  return (
    <EmployeeRegisterSimpleForm
      mode="add"
      initialValues={initialValues}
      backTo='/controls/employee-management'
      onSuccess={() => {
        void queryClient.invalidateQueries({ queryKey: [cache_employeeregister] })
        const fallback = '/controls/employee-management'
        setTimeout(() => {
          navigate(location.state?.successReturn ?? fallback)
        }, 400)
      }}
    />
  )
}

export { EmployeeRegisterAdd }
