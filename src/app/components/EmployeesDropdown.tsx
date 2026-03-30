import { Fragment } from 'react'
type EmployeeRow = {
  id_number: string
  first_name: string
  last_name: string
  branch_code: string
}

const EmployeesDropdown = (lable:string, employees: EmployeeRow[], selectedBranch: string ) => {
  return (
  <Fragment>
     <option value=''>{lable}</option>
        {
            employees?.map((item: EmployeeRow, index: number) => (
            item.branch_code === selectedBranch &&
            <option key={index} value={item?.id_number}>{item?.first_name} {item?.last_name}</option>
        ))
        }
  </Fragment>
  )
}

export default EmployeesDropdown