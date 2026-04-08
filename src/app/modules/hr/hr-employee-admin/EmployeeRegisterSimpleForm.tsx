import { FC, useContext, useState } from 'react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { EmployeeRegisterData, employeeRegisterSimpleSchema } from './core/models'
import { employeeEdit, employeeRegister } from './core/request'
import { AlertMessengerContext } from '../../../components'
import { useAuth } from '../../auth'

type Props = {
  mode: 'add' | 'edit'
  initialValues: EmployeeRegisterData
  onSuccess: () => void
}

type FieldDef = {
  name: keyof EmployeeRegisterData
  label: string
  input?: 'text' | 'date' | 'textarea'
  readOnly?: boolean
  requiredMark?: boolean
}

const DATE_FIELDS = new Set<string>([
  'date_of_birth',
  'status_date',
  'reg_date',
  'hire_date',
  'service_date',
  'probation_date',
  'contract_date',
  'contract_expire',
  'termination_date',
  'last_promotion',
])

const TEXTAREA_FIELDS = new Set<string>(['address', 'chronic_medical_history', 'allergies', 'medication', 'remarks'])

const REQUIRED_KEYS = new Set<string>([
  'id_number',
  'first_name',
  'last_name',
  'job_title',
  'employee_type',
  'employee_class',
  'employment_type',
  'branch_code',
  'emp_company',
  'dept_code',
  'cost_center',
  'account_code',
  'office_code',
  'status',
  'status_date',
  'reg_date',
])

const FIELD_GROUPS: { title: string; fields: FieldDef[] }[] = [
  {
    title: 'Identity',
    fields: [
      { name: 'id_number', label: 'ID Number', requiredMark: true },
      { name: 'first_name', label: 'First name', requiredMark: true },
      { name: 'middle_name', label: 'Middle name' },
      { name: 'last_name', label: 'Last name', requiredMark: true },
      { name: 'nick_name', label: 'Nick name' },
      { name: 'gender', label: 'Gender' },
      { name: 'date_of_birth', label: 'Date of birth', input: 'date' },
      { name: 'point_of_birth', label: 'Place of birth' },
      { name: 'marital_status', label: 'Marital status' },
      { name: 'religion', label: 'Religion' },
      { name: 'nationality', label: 'Nationality' },
      { name: 'ethnic', label: 'Ethnic' },
      { name: 'status', label: 'Status', requiredMark: true },
      { name: 'status_date', label: 'Status date', input: 'date', requiredMark: true },
      { name: 'reg_by', label: 'Registered by', readOnly: true },
      { name: 'reg_date', label: 'Register date', input: 'date', requiredMark: true },
    ],
  },
  {
    title: 'Address',
    fields: [
      { name: 'address', label: 'Address', input: 'textarea' },
      { name: 'city', label: 'City' },
      { name: 'sub_district', label: 'Sub district' },
      { name: 'district', label: 'District' },
      { name: 'region', label: 'Region' },
      { name: 'province', label: 'Province' },
      { name: 'country', label: 'Country' },
      { name: 'post_code', label: 'Post code' },
    ],
  },
  {
    title: 'Personal / contact',
    fields: [
      { name: 'blood_type', label: 'Blood type' },
      { name: 'height', label: 'Height' },
      { name: 'weight', label: 'Weight' },
      { name: 'medication', label: 'Medication', input: 'textarea' },
      { name: 'allergies', label: 'Allergies', input: 'textarea' },
      { name: 'chronic_medical_history', label: 'Chronic medical history', input: 'textarea' },
      { name: 'identity_ktp', label: 'Identity KTP' },
      { name: 'home_phone', label: 'Home phone' },
      { name: 'personal_email', label: 'Personal email' },
    ],
  },
  {
    title: 'Job (organization codes — enter valid master codes)',
    fields: [
      { name: 'applicant_id', label: 'Applicant ID' },
      { name: 'position_no', label: 'Position no' },
      { name: 'approval_no', label: 'Approval no' },
      { name: 'id_number_ref', label: 'ID number ref' },
      { name: 'hire_date', label: 'Hire date', input: 'date' },
      { name: 'service_date', label: 'Service date', input: 'date' },
      { name: 'probation_date', label: 'Probation date', input: 'date' },
      { name: 'point_of_hire', label: 'Point of hire' },
      { name: 'point_of_leave', label: 'Point of leave' },
      { name: 'point_of_travel', label: 'Point of travel' },
      { name: 'contract_no', label: 'Contract no' },
      { name: 'contract_date', label: 'Contract date', input: 'date' },
      { name: 'contract_expire', label: 'Contract expire', input: 'date' },
      { name: 'job_title', label: 'Job title', requiredMark: true },
      { name: 'position_title', label: 'Position title' },
      { name: 'work_function', label: 'Work function' },
      { name: 'job_level', label: 'Job level' },
      { name: 'individual_grade', label: 'Individual grade' },
      { name: 'individual_level', label: 'Individual level' },
      { name: 'employee_type', label: 'Employee type', requiredMark: true },
      { name: 'employee_class', label: 'Employee class', requiredMark: true },
      { name: 'employment_type', label: 'Employment type', requiredMark: true },
      { name: 'supervisor', label: 'Supervisor (id_number)' },
      { name: 'branch_code', label: 'Branch code', requiredMark: true },
      { name: 'emp_company', label: 'Company code', requiredMark: true },
      { name: 'dept_code', label: 'Department code', requiredMark: true },
      { name: 'section_code', label: 'Section code' },
      { name: 'cost_center', label: 'Cost center', requiredMark: true },
      { name: 'account_code', label: 'Account code', requiredMark: true },
      { name: 'union_code', label: 'Union code' },
      { name: 'onsite_location', label: 'Onsite location' },
      { name: 'onsite_address', label: 'Onsite address' },
      { name: 'work_location', label: 'Work location' },
      { name: 'office_code', label: 'Office code', requiredMark: true },
      { name: 'onsite_marital', label: 'Onsite marital' },
      { name: 'marital_benefit', label: 'Marital benefit' },
      { name: 'work_phone', label: 'Work phone' },
      { name: 'mobile', label: 'Mobile' },
      { name: 'wa', label: 'WhatsApp' },
      { name: 'email_company', label: 'Company email' },
      { name: 'website', label: 'Website' },
      { name: 'termination_date', label: 'Termination date', input: 'date' },
      { name: 'termination_by', label: 'Termination by' },
      { name: 'termination_reason', label: 'Termination reason' },
    ],
  },
  {
    title: 'Compensation',
    fields: [
      { name: 'paygroup', label: 'Paygroup' },
      { name: 'bank_account', label: 'Bank account' },
      { name: 'leave_type', label: 'Leave type' },
      { name: 'work_insurance', label: 'Work insurance' },
      { name: 'medical_insurance', label: 'Medical insurance' },
      { name: 'tax_code', label: 'Tax code' },
      { name: 'work_day', label: 'Work day' },
      { name: 'crew', label: 'Crew' },
      { name: 'last_promotion', label: 'Last promotion', input: 'date' },
      { name: 'remarks', label: 'Remarks', input: 'textarea' },
    ],
  },
]

const resolveInput = (name: string, def: FieldDef): 'text' | 'date' | 'textarea' => {
  if (def.input) return def.input
  if (TEXTAREA_FIELDS.has(name)) return 'textarea'
  if (DATE_FIELDS.has(name)) return 'date'
  return 'text'
}

const EmployeeRegisterSimpleForm: FC<Props> = ({ mode, initialValues, onSuccess }) => {
  const { currentUser } = useAuth()
  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (
    values: EmployeeRegisterData,
    actions: FormikHelpers<EmployeeRegisterData>
  ) => {
    setSubmitting(true)
    try {
      if (mode === 'add') {
        await employeeRegister(values)
      } else {
        await employeeEdit(values, currentUser?.id_number)
      }
      addSuccessMessage({
        title: 'Success',
        message: mode === 'add' ? 'Employee registered.' : 'Employee updated.',
      })
      actions.resetForm()
      onSuccess()
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } }
      addErrorMessage({
        title: 'Error',
        message: err.response?.data?.message || 'Request failed',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={employeeRegisterSimpleSchema}
          onSubmit={handleSubmit}
          enableReinitialize={mode === 'edit'}
        >
          {({ values, setFieldValue }) => (
            <Form className="form">
              {mode === 'edit' && values.id ? <Field type="hidden" name="id" /> : null}
              {FIELD_GROUPS.map((group) => (
                <div key={group.title} className="mb-10">
                  <h3 className="fw-bolder text-dark mb-5">{group.title}</h3>
                  <div className="row">
                    {group.fields.map((def) => {
                      const name = def.name as string
                      const input = resolveInput(name, def)
                      const req = def.requiredMark || REQUIRED_KEYS.has(name)
                      return (
                        <div key={name} className="col-md-6 mb-5">
                          <label className="form-label">
                            {def.label}
                            {req ? <span className="text-danger"> *</span> : null}
                          </label>
                          {name === 'photo' ? null : input === 'textarea' ? (
                            <Field
                              as="textarea"
                              name={name}
                              className="form-control form-control-solid"
                              rows={3}
                              disabled={def.readOnly}
                            />
                          ) : (
                            <Field
                              name={name}
                              type={input}
                              className="form-control form-control-solid"
                              disabled={def.readOnly}
                            />
                          )}
                          <div className="text-danger mt-1">
                            <ErrorMessage name={name} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              <div className="mb-10">
                <h3 className="fw-bolder text-dark mb-5">Photo</h3>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => setFieldValue('photo', e.target.files?.[0] ?? null)}
                />
                {mode === 'edit' && typeof values.photo === 'string' && values.photo ? (
                  <div className="text-muted mt-2 small">Current file: {values.photo}</div>
                ) : null}
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Saving…' : mode === 'add' ? 'Register employee' : 'Save changes'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export { EmployeeRegisterSimpleForm }
