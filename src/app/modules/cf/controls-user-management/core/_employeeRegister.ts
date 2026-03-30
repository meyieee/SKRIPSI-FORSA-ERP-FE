import { client } from '../../../../functions'

/** Baris employee minimal untuk dropdown user form (cukup untuk tampilan). */
export type EmployeeRegisterRow = {
  id_number: string
  first_name: string
  last_name: string
  'branch_detail.branch_code'?: string
  'branch_detail.com_name'?: string
  'department_detail.dept_code'?: string
  'department_detail.dept_des'?: string
}

export const getEmployee = async (branch_code: string): Promise<EmployeeRegisterRow[]> => {
  const urlAPI = branch_code === 'HO' ? '/employeeregister' : `/employeeregister/${branch_code}`
  const response = await client().get(urlAPI)
  return response.data.data
}
