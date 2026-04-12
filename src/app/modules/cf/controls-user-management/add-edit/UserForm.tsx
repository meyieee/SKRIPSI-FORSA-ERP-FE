import { ErrorMessage, Field } from 'formik'
import { ChangeEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth'
import { type EmployeeRegisterRow, getEmployee } from '../core/_employeeRegister'
import { functionCheckComTypeRoutesAPI, UseReactQuery } from '../../../../functions'
import { cache_employeeregister } from '../../../../constans'
import { CodeNameDisplay } from '../../../../components'

type Props = {
  formProps: any
  isUpdate: boolean
}

const roleOptions = [
  {value: 'administrator', label: 'Administrator'},
  {value: 'fin_manager', label: 'Manager, Finance'},
  {value: 'ops_manager', label: 'Manager, Operations'},
  {value: 'hr_manager', label: 'Manager, Resource'},
  {value: 'scm_manager', label: 'Manager, Supply'},
  {value: 'fin_supervisor', label: 'Supervisor, Finance'},
  {value: 'ops_supervisor', label: 'Supervisor, Operations'},
  {value: 'hr_supervisor', label: 'Supervisor, Resource'},
  {value: 'scm_supervisor', label: 'Supervisor, Supply'},
  {value: 'fin_invoice_admin_clerk', label: 'Finance Clerk, Invoice Admin'},
  {value: 'fin_transaction_clerk', label: 'Finance Clerk, Transaction'},
  {value: 'ops_work_job_order_clerk', label: 'Operations Supervisor, Work | Job Order'},
  {value: 'ops_asset_mgt_clerk', label: 'Operations Supervisor, Asset Management'},
  {value: 'ops_reading_fuel_clerk', label: 'Operations Supervisor, Reading | Fuel'},
  {value: 'ops_pm_system_clerk', label: 'Operations Supervisor, PM System'},
  {value: 'hr_employee_admin_clerk', label: 'Resource Supervisor, Employee Admin'},
  {value: 'scm_replenish_pr_clerk', label: 'Supply Supervisor, Replenish | PR'},
  {value: 'scm_purchasing_clerk', label: 'Supply Supervisor, Purchasing'},
  {value: 'scm_issue_request_clerk', label: 'Supply Supervisor, Issue | Request'},
  {value: 'scm_inventory_clerk', label: 'Supply Supervisor, Inventory'},
  {value: 'portal', label: 'Portal'},
]

const getEmployeeFullName = (employee: EmployeeRegisterRow) =>
  `${employee.first_name || ''} ${employee.last_name || ''}`.trim()

const buildUsernameSuggestions = (employee?: EmployeeRegisterRow) => {
  if (!employee) return []

  const firstName = String(employee.first_name || '').trim().toLowerCase()
  const lastName = String(employee.last_name || '').trim().toLowerCase()
  const firstInitial = firstName.charAt(0)
  const firstNameCompact = firstName.replace(/[^a-z0-9]/g, '')
  const lastNameParts = lastName
    .split(/\s+/)
    .map((item) => item.replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)

  const lastSingle = lastNameParts.length > 0 ? lastNameParts[lastNameParts.length - 1] : ''
  const lastTwoCombined = lastNameParts.slice(-2).join('')
  const fullLastName = lastNameParts.join('')
  const secondInitial = firstNameCompact.charAt(1)
  const thirdInitial = firstNameCompact.charAt(2)

  const normalized = [
    `${firstInitial}${lastSingle}`,
    `${firstInitial}${lastTwoCombined}`,
    `${firstInitial}${fullLastName}`,
    `${firstNameCompact}${lastSingle}`,
    `${firstNameCompact}${lastTwoCombined}`,
    `${firstNameCompact}${fullLastName}`,
    `${firstInitial}${secondInitial}${lastSingle}`,
    `${firstInitial}${thirdInitial}${lastSingle}`,
    `${firstInitial}${lastSingle}${lastSingle.charAt(0)}`,
  ]
    .map((item) => item.replace(/[^a-z0-9._]/g, ''))
    .filter((item, index, arr) => item && arr.indexOf(item) === index)

  return normalized.slice(0, Math.max(4, normalized.length >= 6 ? 6 : normalized.length))
}

export const UserForm = ({formProps, isUpdate}: Props) => {
  const {currentUser} = useAuth()
  const {values, setFieldValue} = formProps

  const funcGetEmployee = () => functionCheckComTypeRoutesAPI(getEmployee, currentUser)
  const {data: employees} = UseReactQuery({func: funcGetEmployee, cacheName: cache_employeeregister})

  const [employeeQuery, setEmployeeQuery] = useState('')
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false)
  const [showUsernameDropdown, setShowUsernameDropdown] = useState(false)
  const [filterUsernameSuggestions, setFilterUsernameSuggestions] = useState(false)
  const employeeBlurTimerRef = useRef<number | null>(null)
  const usernameBlurTimerRef = useRef<number | null>(null)

  const selectedEmployee = useMemo(
    () => employees?.find((item: EmployeeRegisterRow) => item.id_number === values.id_number),
    [employees, values.id_number]
  )

  const filteredEmployees = useMemo(() => {
    const source = employees || []
    const query = employeeQuery.trim().toLowerCase()

    if (!query) return source.slice(0, 8)

    return source
      .filter((item: EmployeeRegisterRow) => {
        const fullName = getEmployeeFullName(item).toLowerCase()
        const idNumber = String(item.id_number || '').toLowerCase()
        const department = String(item['department_detail.dept_des'] || '').toLowerCase()
        return (
          fullName.includes(query) || idNumber.includes(query) || department.includes(query)
        )
      })
      .slice(0, 8)
  }, [employeeQuery, employees])

  const usernameSuggestions = useMemo(
    () => buildUsernameSuggestions(selectedEmployee),
    [selectedEmployee]
  )

  const visibleUsernameSuggestions = useMemo(() => {
    if (!filterUsernameSuggestions) return usernameSuggestions
    const currentValue = String(values.name || '').trim().toLowerCase()
    if (!currentValue) return usernameSuggestions
    return usernameSuggestions.filter((item) => item.toLowerCase().includes(currentValue))
  }, [filterUsernameSuggestions, usernameSuggestions, values.name])

  const availableRoleOptions = useMemo(() => {
    const currentRole = String(values.role || '').trim()
    if (!currentRole) return roleOptions
    const exists = roleOptions.some((item) => item.value === currentRole)
    if (exists) return roleOptions
    return [{value: currentRole, label: currentRole}, ...roleOptions]
  }, [values.role])

  useEffect(() => {
    if (!values.id_number) {
      if (!isUpdate) setEmployeeQuery('')
      return
    }

    if (selectedEmployee) {
      setEmployeeQuery(getEmployeeFullName(selectedEmployee))
    }
  }, [isUpdate, selectedEmployee, values.id_number])

  const pickEmployee = (employee: EmployeeRegisterRow) => {
    const fullName = getEmployeeFullName(employee)

    setEmployeeQuery(fullName)
    setShowEmployeeDropdown(false)
    setFieldValue('id_number', employee.id_number)
    setFieldValue('full_name', fullName)
    setFieldValue('department', employee['department_detail.dept_code'] || '')
    setFieldValue('department_des', employee['department_detail.dept_des'] || '')
    setFieldValue('branch_code', employee['branch_detail.branch_code'] || '')
    setFieldValue('com_name', employee['branch_detail.com_name'] || '')
  }

  return (
    <Fragment>
      <div className='row mb-5'>
        <section className='col-md-6'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Employee</span>
          </label>

          {isUpdate === false && currentUser?.role === 'administrator' && (
            <div className='mb-3'>
              <Link
                className='btn btn-sm btn-light-primary'
                to='/controls/employee-register/add'
                state={{successReturn: '/controls/account-settings/add'}}
              >
                Register new employee first
              </Link>
            </div>
          )}

          {isUpdate ? (
            <Field
              as='select'
              className='form-select form-select-solid'
              name='id_number'
              aria-label='Select employee'
              disabled={isUpdate}
            >
              <option value=''>Select employee</option>
              {employees?.map((item: EmployeeRegisterRow, index: number) => (
                <option key={index} value={item.id_number}>
                  {getEmployeeFullName(item)}
                </option>
              ))}
            </Field>
          ) : (
            <div className='position-relative'>
              <input
                type='text'
                className='form-control form-control-solid'
                autoComplete='off'
                placeholder='Type employee name or ID number'
                value={employeeQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const inputValue = e.target.value
                  setEmployeeQuery(inputValue)
                  setShowEmployeeDropdown(true)

                  if (!inputValue.trim()) {
                    setFieldValue('id_number', '')
                    setFieldValue('full_name', '')
                    setFieldValue('department', '')
                    setFieldValue('department_des', '')
                    setFieldValue('branch_code', '')
                    setFieldValue('com_name', '')
                  }
                }}
                onFocus={() => setShowEmployeeDropdown(true)}
                onBlur={() => {
                  employeeBlurTimerRef.current = window.setTimeout(
                    () => setShowEmployeeDropdown(false),
                    150
                  )
                }}
              />

              {showEmployeeDropdown && (
                <div
                  className='position-absolute w-100 mt-1 rounded border shadow-sm'
                  style={{
                    zIndex: 9999,
                    background: 'var(--bs-body-bg)',
                    borderColor: 'var(--bs-border-color)',
                    maxHeight: 240,
                    overflowY: 'auto',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    if (employeeBlurTimerRef.current) {
                      window.clearTimeout(employeeBlurTimerRef.current)
                    }
                  }}
                >
                  {filteredEmployees.length === 0 && (
                    <div className='p-2 small text-muted'>No employees found</div>
                  )}

                  {filteredEmployees.map((item: EmployeeRegisterRow) => (
                    <div
                      key={item.id_number}
                      className='px-3 py-2'
                      style={{cursor: 'pointer'}}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        pickEmployee(item)
                      }}
                    >
                      <div className='fw-semibold'>{getEmployeeFullName(item)}</div>
                      <div className='small text-muted'>
                        {item.id_number}
                        {item['department_detail.dept_des']
                          ? ` | ${item['department_detail.dept_des']}`
                          : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <section className='col-md-6'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>User Name</span>
          </label>

          <div className='position-relative'>
            <Field
              name='name'
              className='form-control form-control-sm form-control-solid'
              autoComplete='off'
              onFocus={() => {
                setFilterUsernameSuggestions(false)
                if (usernameSuggestions.length > 0) {
                  setShowUsernameDropdown(true)
                }
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFieldValue('name', e.target.value)
                setFilterUsernameSuggestions(true)
                if (usernameSuggestions.length > 0) {
                  setShowUsernameDropdown(true)
                }
              }}
              onBlur={() => {
                usernameBlurTimerRef.current = window.setTimeout(
                  () => setShowUsernameDropdown(false),
                  150
                )
              }}
            />

            {showUsernameDropdown && visibleUsernameSuggestions.length > 0 && (
              <div
                className='position-absolute w-100 mt-1 rounded border shadow-sm'
                style={{
                  zIndex: 9999,
                  background: 'var(--bs-body-bg)',
                  borderColor: 'var(--bs-border-color)',
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  if (usernameBlurTimerRef.current) {
                    window.clearTimeout(usernameBlurTimerRef.current)
                  }
                }}
              >
                {visibleUsernameSuggestions.map((item) => (
                  <div
                    key={item}
                    className='px-3 py-2'
                    style={{cursor: 'pointer'}}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      setFieldValue('name', item)
                      setFilterUsernameSuggestions(false)
                      setShowUsernameDropdown(false)
                    }}
                  >
                    <div className='fw-semibold'>{item}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {usernameSuggestions.length > 0 && (
            <div className='form-text'>Recommendations are based on the selected employee.</div>
          )}

          <div className='text-danger mt-2'>
            <ErrorMessage name='name' />
          </div>
        </section>
      </div>

      <div className='row mb-5'>
        <section className='col-md-6'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Role</span>
          </label>

          <Field
            className='form-select form-select-lg form-select-solid'
            as='select'
            name='role'
            autoComplete='off'
          >
            <option value=''>Select Role</option>
            {availableRoleOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Field>
          <div className='text-danger mt-2'>
            <ErrorMessage name='role' />
          </div>
        </section>

        <section className='col-md-6'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>ID Number</span>
          </label>
          <span className='form-control form-control-sm form-control-solid'>{values.id_number}</span>
        </section>
      </div>

      <div className='row mb-5'>
        <section className='col-md-6'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Branch</span>
          </label>
          <CodeNameDisplay name={values.com_name} code={values.branch_code} />
        </section>

        <section className='col-md-6'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Department</span>
          </label>
          <CodeNameDisplay name={values.department_des} code={values.department} />
        </section>
      </div>
    </Fragment>
  )
}
