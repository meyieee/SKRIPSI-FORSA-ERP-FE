export type OnlineServiceEmployeeSearchItem = {
  id_number: string
  full_name: string
  email?: string
  photo?: string
}

/** GET /online-service/employees/:idNumber/org */
export type OnlineServiceEmployeeOrg = {
  branch_code: string
  branch_name: string
  dept_code: string
  dept_name: string
  cost_center: string
  cost_center_name: string
}
