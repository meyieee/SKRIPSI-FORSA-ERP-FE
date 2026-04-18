import * as Yup from 'yup'
import {ID} from '../../../../../_metronic'

export type UserData = {
  id?: ID & string
  id_number: string
  name: string
  password?: string
  role?: string
  role_id?: number
  employee_id?: string
  user_name?: string
  branch_code?: string
  status?: boolean
  department?: string

  full_name?: string
  com_name?: string
  department_des?: string
  'employees.branch_detail.com_code'?: string
  'employees.branch_detail.com_name'?: string
  'employees.branch_detail.com_type'?: string
  'employees.department_detail.dept_des'?: string
  'employees.department_detail.dept_code'?: string
  'roleDetail.role_name'?: string
  'roleDetail.role_category'?: string
  'employees.photo'?: string
  remarks?: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export const createUserSchemas = Yup.object().shape({
  name: Yup.string()
    .max(25, 'Maximum characters reached')
    .min(4, 'Minimum characters reached')
    .matches(/^\S*$/, 'Spaces are not allowed')
    .required('This field is required'),
  role: Yup.string()
    .max(100, 'Maximum characters reached')
    .required('This field is required'),
})

export const createV1UserSchemas = Yup.object().shape({
  user_name: Yup.string()
    .max(25, 'Maximum characters reached')
    .min(4, 'Minimum characters reached')
    .matches(/^\S*$/, 'Spaces are not allowed')
    .required('This field is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  role_id: Yup.number()
    .required('Role is required'),
  employee_id: Yup.string()
    .required('Employee must be correctly selected')
})

export const PasswordUpdateSchema = Yup.object().shape({
  current_password: Yup.string()
    .required('Current Password is required'),
  new_password: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});


export const latestValues = (data: UserData )=>{
  const values = {
    id_number: data?.id_number || '',
    name: data?.name || '',
    role: data?.role || '',
    status: data?.status || true, 
    branch_code:  data?.['employees.branch_detail.com_code'] || '',
    com_name:  data?.['employees.branch_detail.com_name'] || '',
    department: data?.['employees.department_detail.dept_code'] || '',
    department_des: data?.['employees.department_detail.dept_des'] || '',
  }
  
  return values
}
