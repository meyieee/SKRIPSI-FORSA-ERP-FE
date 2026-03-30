import { ErrorMessage, Field } from 'formik'
import { ChangeEvent, Fragment } from 'react'
import { useAuth } from '../../../auth'
import { type EmployeeRegisterRow, getEmployee } from '../core/_employeeRegister'
import { functionCheckComTypeRoutesAPI, UseReactQuery } from '../../../../functions'
import { cache_employeeregister } from '../../../../constans'
import { CodeNameDisplay } from '../../../../components'

type Props = {
    formProps: any
    isUpdate: boolean
}

export const UserForm = ({formProps, isUpdate}:Props) => {
    const { currentUser } = useAuth()
    const { values, setFieldValue } = formProps;

    const funcGetEmployee = () => functionCheckComTypeRoutesAPI(getEmployee, currentUser)
    const { data:employees } = UseReactQuery({ func: funcGetEmployee, cacheName:cache_employeeregister });

    return (
    <Fragment>
        <div className='row mb-5'>
            <section className="col-md-6">
            <label className='d-flex align-items-center form-label'>
                <span className='required'>Employee</span>
            </label>

            {
                isUpdate === true?
                <Field
                    as="select"
                    className="form-select form-select-solid"
                    name="id_number"
                    aria-label="Select example"
                    disabled={isUpdate}
                >
                    <option value=''>Select employee</option>
                    {
                        employees?.map((items: EmployeeRegisterRow, index: number) => (
                        <option key={index} value={items.id_number}>{items.first_name} {items.last_name}</option>
                        ))
                    }
                </Field>
                :
                <Field
                    as="select"
                    className="form-select form-select-solid"
                    name="id_number"
                    aria-label="Select example"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        let input = JSON.parse(e.target.value);
                        setFieldValue('id_number', input.id_number)
                        setFieldValue('full_name', input.name)
                        setFieldValue('department', input.dept_code)
                        setFieldValue('department_des', input.dept_desc)
                        setFieldValue('branch_code', input.branch_code)
                        setFieldValue('com_name', input.com_name)
                    }}
                >
                    <option value=''>{values.fulls_name || 'Select employee'}</option>
                    {
                        employees?.map((items: EmployeeRegisterRow, index: number) => (
                        <option 
                            key={index} 
                            value={
                                JSON.stringify({
                                    id_number: items.id_number, 
                                    name: `${items.first_name} ${items.last_name}`,
                                    branch_code: items['branch_detail.branch_code'],
                                    com_name: items['branch_detail.com_name'],
                                    dept_code: items['department_detail.dept_code'],
                                    dept_desc: items['department_detail.dept_des'],
                                    })
                                 }
                            >
                            {`${items.first_name} ${items.last_name}`}
                            </option>
                        ))
                    }
                </Field>
            }

            </section>
            <section className="col-md-6">
            <label className='d-flex align-items-center form-label'>
                <span className='required'>User Name</span>
            </label>

            <Field
                name='name'
                className='form-control form-control-sm form-control-solid'
            />
            <div className='text-danger mt-2'>
                <ErrorMessage name='name' />
            </div>
            </section>
        </div>
        
        <div className='row mb-5'>
            <section className="col-md-6">
            <label className='d-flex align-items-center form-label'>
                <span className='required'>Role</span>
            </label>

            <Field
                className="form-select form-select-lg form-select-solid"
                as='select'
                name="role"
                autoComplete="off"
            >
                {/* for now, Supervisor privileges === Manager privileges */}
                <option value=''>Select Role</option>
                <option value='administrator'>Administrator</option>
                <option value='fin_manager'>Manager, Finance</option>
                <option value='ops_manager'>Manager, Operations</option>
                <option value='hr_manager'>Manager, Resource</option>
                <option value='scm_manager'>Manager, Supply</option>
                <option value='fin_manager'>Supervisor, Finance</option>
                <option value='ops_manager'>Supervisor, Operations</option>
                <option value='hr_manager'>Supervisor, Resource</option>
                <option value='scm_manager'>Supervisor, Supply</option>
                <option value='fin_invoice_admin_clerk'>Finance Clerk, Invoice Admin</option>
                <option value='fin_transaction_clerk'>Finance Clerk, Transaction</option>
                <option value='ops_work_job_order_clerk'>Operations Supervisor, Work | Job Order</option>
                <option value='ops_asset_mgt_clerk'>Operations Supervisor, Asset Management</option>
                <option value='ops_reading_fuel_clerk'>Operations Supervisor, Reading | Fuel</option>
                <option value='ops_pm_system_clerk'>Operations Supervisor, PM System</option>
                <option value='hr_employee_admin_clerk'>Resource Supervisor, Employee Admin</option>
                <option value='scm_replenish_pr_clerk'>Supply Supervisor, Replenish | PR</option>
                <option value='scm_purchasing_clerk'>Supply Supervisor, Purchasing</option>
                <option value='scm_issue_request_clerk'>Supply Supervisor, Issue | Request</option>
                <option value='scm_inventory_clerk'>Supply Supervisor, Inventory</option>
                <option value='portal'>Portal</option>
            </Field>
            <div className='text-danger mt-2'>
                <ErrorMessage name='role' />
            </div>
            </section>
            <section className="col-md-6">
                <label className='d-flex align-items-center form-label'>
                    <span className='required'>ID Number</span>
                </label>
                <span className='form-control form-control-sm form-control-solid'>{values.id_number}</span>
            </section>
        </div>

        <div className='row mb-5'>
            <section className="col-md-6">
                <label className='d-flex align-items-center form-label'>
                    <span className='required'>Branch</span>
                </label>
                <CodeNameDisplay name={values.com_name} code={values.branch_code}/>
            </section>
            <section className="col-md-6">
                <label className='d-flex align-items-center form-label'>
                    <span className='required'>Department</span>
                </label>
                <CodeNameDisplay name={values.department_des} code={values.department}/>
            </section>
        </div>
    </Fragment>
    )
}