import { ChangeEvent, FC, RefObject, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { Link } from 'react-router-dom'
import { EmployeeRegisterData, employeeRegisterSimpleSchema } from './core/models'
import { employeeEdit, employeeRegister, getAllActiveComs, getHOemployee } from './core/request'
import { AlertMessengerContext } from '../../../components'
import { useAuth } from '../../auth'
import { UseReactQuery } from '../../../functions'
import { cache_departments } from '../../../constans'
import { getDepartments, getSections } from '../../fia/fia-home/company/core/_requests'
import {fullUrlServer, KTSVG, toAbsoluteUrl} from '../../../../_metronic'

type Props = {
  mode: 'add' | 'edit'
  initialValues: EmployeeRegisterData
  onSuccess: () => void
  backTo?: string
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
  'job_level',
  'individual_level',
  'emp_company',
  'dept_code',
  'cost_center',
])

const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]

const MARITAL_OPTIONS = [
  { value: 'Married', label: 'Married' },
  { value: 'Single', label: 'Single' },
]

const RELIGION_OPTIONS = [
  { value: 'Islam', label: 'Islam' },
  { value: 'Christian', label: 'Christian' },
  { value: 'Catholic', label: 'Catholic' },
  { value: 'Hindu', label: 'Hindu' },
  { value: 'Buddhist', label: 'Buddhist' },
  { value: 'Confucian', label: 'Confucian' },
  { value: 'Believer of Faith', label: 'Believer of Faith' },
  { value: 'Other', label: 'Other' },
]

const FIELD_GROUPS: { title: string; fields: FieldDef[] }[] = [
  {
    title: 'Identity',
    fields: [
      { name: 'id_number', label: 'ID Number' },
      { name: 'first_name', label: 'First name' },
      { name: 'middle_name', label: 'Middle name' },
      { name: 'last_name', label: 'Last name' },
      { name: 'nick_name', label: 'Nick name' },
      { name: 'gender', label: 'Gender' },
      { name: 'date_of_birth', label: 'Date of birth', input: 'date' },
      { name: 'point_of_birth', label: 'Place of birth' },
      { name: 'marital_status', label: 'Marital status' },
      { name: 'religion', label: 'Religion' },
      { name: 'nationality', label: 'Nationality' },
      { name: 'ethnic', label: 'Ethnic' },
      { name: 'status', label: 'Status' },
      { name: 'status_date', label: 'Status date', input: 'date' },
      { name: 'reg_by', label: 'Registered by', readOnly: true },
      { name: 'reg_date', label: 'Register date', input: 'date' },
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
    title: 'Job',
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
      { name: 'job_title', label: 'Job title' },
      { name: 'position_title', label: 'Position title' },
      { name: 'work_function', label: 'Work function' },
      { name: 'job_level', label: 'Job level' },
      { name: 'individual_grade', label: 'Individual grade' },
      { name: 'individual_level', label: 'Individual level' },
      { name: 'employee_type', label: 'Employee type' },
      { name: 'employee_class', label: 'Employee class' },
      { name: 'employment_type', label: 'Employment type' },
      { name: 'supervisor', label: 'Supervisor (id_number)' },
      { name: 'emp_company', label: 'Company code', requiredMark: true },
      { name: 'dept_code', label: 'Department code', requiredMark: true },
      { name: 'section_code', label: 'Section', requiredMark: true },
      { name: 'cost_center', label: 'Cost center' },
      { name: 'account_code', label: 'Account code' },
      { name: 'union_code', label: 'Union code' },
      { name: 'onsite_location', label: 'Onsite location' },
      { name: 'onsite_address', label: 'Onsite address' },
      { name: 'work_location', label: 'Work location' },
      { name: 'office_code', label: 'Office code' },
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

const FIELD_LABELS = FIELD_GROUPS.reduce<Record<string, string>>((acc, group) => {
  group.fields.forEach((field) => {
    acc[field.name] = field.label
  })
  return acc
}, { photo: 'Photo' })

const FRIENDLY_SERVER_ERROR_LABELS: Record<string, string> = {
  kin_fullname: 'Kin full name',
  kin_relationship: 'Kin relationship',
  kin_address: 'Kin address',
  kin_phone: 'Kin phone',
  kin_wa: 'Kin WhatsApp',
  kin_email: 'Kin email',
  hire_date: 'Hire date',
  service_date: 'Service date',
  probation_date: 'Probation date',
  contract_date: 'Contract date',
  contract_expire: 'Contract expire',
  termination_date: 'Termination date',
  last_promotion: 'Last promotion',
}

const resolveInput = (name: string, def: FieldDef): 'text' | 'date' | 'textarea' => {
  if (def.input) return def.input
  if (TEXTAREA_FIELDS.has(name)) return 'textarea'
  if (DATE_FIELDS.has(name)) return 'date'
  return 'text'
}

const normalizeText = (value?: string) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getIdPrefixFromDate = (value?: string) => {
  const parsedDate = value ? new Date(value) : new Date()
  const safeDate = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate
  const year = String(safeDate.getFullYear()).slice(-2)
  const month = String(safeDate.getMonth() + 1).padStart(2, '0')
  return `${year}${month}`
}

const buildIdSuggestions = (
  regDate: string,
  employees: EmployeeRegisterData[] | undefined,
  currentIdNumber?: string
) => {
  const prefix = getIdPrefixFromDate(regDate)
  const rows = Array.isArray(employees) ? employees : []
  const usedNumbers = new Set(
    rows
    .map((item) => String(item.id_number || '').trim())
    .filter((item) => new RegExp(`^${prefix}-\\d{3}$`).test(item))
    .filter((item) => item !== String(currentIdNumber || '').trim())
  )

  const suggestions: string[] = []
  let runningNumber = 1

  while (suggestions.length < 6 && runningNumber <= 999) {
    const candidate = `${prefix}-${String(runningNumber).padStart(3, '0')}`
    if (!usedNumbers.has(candidate)) {
      suggestions.push(candidate)
    }
    runningNumber += 1
  }

  return suggestions
}

const parseServerErrorMessage = (message?: string) => {
  const rawMessage = String(message || '').trim()
  if (!rawMessage) return { friendly: 'Request failed', raw: '' }

  const cannotBeNullMatch = rawMessage.match(/Column '([^']+)' cannot be null/i)
  if (cannotBeNullMatch?.[1]) {
    const fieldKey = cannotBeNullMatch[1]
    const label = FRIENDLY_SERVER_ERROR_LABELS[fieldKey] || FIELD_LABELS[fieldKey] || fieldKey
    return {
      friendly: `${label} is still set as NOT NULL in the database.`,
      raw: rawMessage,
    }
  }

  const invalidDateMatch = rawMessage.match(/column '([^']+)'/i)
  if (invalidDateMatch?.[1]) {
    const fieldKey = invalidDateMatch[1]
    const label = FRIENDLY_SERVER_ERROR_LABELS[fieldKey] || FIELD_LABELS[fieldKey] || fieldKey
    return {
      friendly: `${label} is invalid or empty.`,
      raw: rawMessage,
    }
  }

  const missingDefaultMatch = rawMessage.match(/Field '([^']+)' doesn't have a default value/i)
  if (missingDefaultMatch?.[1]) {
    const fieldKey = missingDefaultMatch[1]
    const label = FRIENDLY_SERVER_ERROR_LABELS[fieldKey] || FIELD_LABELS[fieldKey] || fieldKey
    return {
      friendly: `${label} must be filled in.`,
      raw: rawMessage,
    }
  }

  return { friendly: rawMessage, raw: rawMessage }
}

const ScrollToAlertEffect: FC<{ active: boolean; targetRef: RefObject<HTMLDivElement> }> = ({
  active,
  targetRef,
}) => {
  useEffect(() => {
    if (!active) return
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [active, targetRef])

  return null
}

const defaultAvatarUrl = toAbsoluteUrl('/media/svg/avatars/blank.svg')

const PhotoFieldSection: FC<{
  mode: 'add' | 'edit'
  photo: string | File | null
  hasError: boolean
  submitCount: number
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikHelpers<EmployeeRegisterData>> | void
}> = ({mode, photo, hasError, submitCount, setFieldValue}) => {
  const [previewUrl, setPreviewUrl] = useState(defaultAvatarUrl)

  useEffect(() => {
    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo)
      setPreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }

    if (typeof photo === 'string' && photo.trim()) {
      setPreviewUrl(`${fullUrlServer}/${photo.replace(/^\/+/, '')}`)
      return
    }

    setPreviewUrl(defaultAvatarUrl)
  }, [photo])

  return (
    <div className="mb-10">
      <h3 className="fw-bolder text-dark mb-5">
        Photo {mode === 'add' ? <span className="text-danger">*</span> : null}
      </h3>

      <div className="d-flex align-items-start gap-5 flex-wrap">
        <img
          src={previewUrl}
          alt="Employee profile"
          className="rounded border"
          style={{width: '120px', height: '140px', objectFit: 'cover'}}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = defaultAvatarUrl
          }}
        />

        <div className="flex-grow-1" style={{minWidth: 280}}>
          <input
            type="file"
            accept="image/*"
            className={`form-control${hasError && submitCount > 0 ? ' is-invalid' : ''}`}
            onChange={(e) => setFieldValue('photo', e.target.files?.[0] ?? null)}
          />

          {mode === 'edit' && typeof photo === 'string' && photo ? (
            <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
              <div className="text-muted small">Current file: {photo}</div>
              <button
                type="button"
                className="btn btn-sm btn-light-danger"
                onClick={() => setFieldValue('photo', null)}
              >
                Remove photo
              </button>
            </div>
          ) : null}

          {mode === 'edit' && photo instanceof File ? (
            <div className="text-muted mt-2 small">
              New photo selected. Save changes to replace the previous photo.
            </div>
          ) : null}

          {mode === 'edit' && photo === null ? (
            <div className="text-muted mt-2 small">
              Photo will be removed after you save this employee.
            </div>
          ) : null}

          <div className="text-danger mt-1">
            <ErrorMessage name="photo" />
          </div>
        </div>
      </div>
    </div>
  )
}

const EmployeeRegisterSimpleForm: FC<Props> = ({ mode, initialValues, onSuccess, backTo }) => {
  const { currentUser } = useAuth()
  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [serverErrorRaw, setServerErrorRaw] = useState('')
  const [showIdDropdown, setShowIdDropdown] = useState(false)
  const [filterIdSuggestions, setFilterIdSuggestions] = useState(false)
  const idBlurTimerRef = useRef<number | null>(null)
  const alertTopRef = useRef<HTMLDivElement>(null)

  const { data: companies } = UseReactQuery({ func: getAllActiveComs, cacheName: 'allactivecoms-employee-form' })
  const { data: departments } = UseReactQuery({ func: getDepartments, cacheName: cache_departments })
  const { data: sections } = UseReactQuery({ func: getSections, cacheName: 'sections-employee-form' })
  const { data: employees } = UseReactQuery({ func: getHOemployee, cacheName: 'employee-id-suggestions' })

  const companyOptions = useMemo(() => {
    const rows = Array.isArray(companies) ? companies : []
    return rows
      .filter((item: any) => item.status !== false)
      .map((item: any) => ({
        value: String(item.com_code || '').trim(),
        label: `${item.com_code || ''} - ${item.com_name || item.com_des || ''}`.trim(),
      }))
      .filter((item, index, arr) => item.value && arr.findIndex((row) => row.value === item.value) === index)
  }, [companies])

  const currentUserCompanyOption = useMemo(() => {
    const code = String(currentUser?.['employees.branch_detail.com_code'] || '').trim()
    const name = String(currentUser?.['employees.branch_detail.com_name'] || '').trim()
    if (!code) return null

    return {
      value: code,
      label: `${code} - ${name || code}`.trim(),
    }
  }, [currentUser])

  const departmentOptions = useMemo(() => {
    const rows = Array.isArray(departments) ? departments : []
    return rows
      .filter((item: any) => item.status !== false)
      .map((item: any) => ({
        value: String(item.dept_code || '').trim(),
        label: `${item.dept_code || ''} - ${item.dept_des || ''}`.trim(),
      }))
      .filter((item, index, arr) => item.value && arr.findIndex((row) => row.value === item.value) === index)
  }, [departments])

  const sectionOptions = useMemo(() => {
    const rows = Array.isArray(sections) ? sections : []
    return rows
      .filter((item: any) => item.status !== false)
      .map((item: any) => ({
        value: String(item.section_code || '').trim(),
        label: `${item.section_code || ''} - ${item.section_description || ''}`.trim(),
        deptCode: String(item.dept_code || '').trim(),
      }))
      .filter((item, index, arr) => item.value && arr.findIndex((row) => row.value === item.value) === index)
  }, [sections])

  const validateForm = (values: EmployeeRegisterData) => {
    const errors: Record<string, string> = {}
    const currentId = values.id ? String(values.id) : ''
    const normalizedIdNumber = String(values.id_number || '').trim()
    const employeeRows = Array.isArray(employees) ? employees : []
    const isDuplicateIdNumber = normalizedIdNumber
      ? employeeRows.some((item: EmployeeRegisterData) => {
          const sameIdNumber = String(item.id_number || '').trim() === normalizedIdNumber
          const sameRecord = currentId && String(item.id || '') === currentId
          return sameIdNumber && !sameRecord
        })
      : false

    if (isDuplicateIdNumber) errors.id_number = 'ID number is already used by another employee'
    if (!values.emp_company) errors.emp_company = 'Required'
    if (!values.dept_code) errors.dept_code = 'Required'
    if (!values.section_code) errors.section_code = 'Required'
    if (!values.cost_center) errors.cost_center = 'Required'
    if (mode === 'add' && !values.photo) errors.photo = 'Required'
    return errors
  }

  const handleSubmit = async (
    values: EmployeeRegisterData,
    actions: FormikHelpers<EmployeeRegisterData>
  ) => {
    setServerError('')
    setServerErrorRaw('')
    setSubmitting(true)
    try {
      const payload = {
        ...values,
        branch_code: values.emp_company || '',
        section_code: values.section_code || values.cost_center || '',
        cost_center: values.cost_center || values.section_code || '',
      }

      if (mode === 'add') {
        await employeeRegister(payload)
      } else {
        await employeeEdit(payload, currentUser?.id_number)
      }
      addSuccessMessage({
        title: 'Success',
        message: mode === 'add' ? 'Employee registered.' : 'Employee updated.',
      })
      actions.resetForm()
      onSuccess()
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } }
      const parsedMessage = parseServerErrorMessage(err.response?.data?.message)
      setServerError(parsedMessage.friendly)
      setServerErrorRaw(parsedMessage.raw)
      addErrorMessage({
        title: 'Error',
        message: parsedMessage.friendly,
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
          validate={validateForm}
          onSubmit={handleSubmit}
          enableReinitialize={mode === 'edit'}
        >
          {({ values, setFieldValue, errors, submitCount }) => {
            const hasValidationAlert = submitCount > 0 && Object.keys(errors).length > 0
            const selectedCompanyOption =
              companyOptions.find((item) => item.value === String(values.emp_company || '').trim()) ||
              (String(values.emp_company || '').trim()
                ? {
                    value: String(values.emp_company || '').trim(),
                    label:
                      currentUserCompanyOption?.value === String(values.emp_company || '').trim()
                        ? currentUserCompanyOption.label
                        : String(values.emp_company || '').trim(),
                  }
                : null)

            const renderedCompanyOptions = selectedCompanyOption
              ? [
                  selectedCompanyOption,
                  ...companyOptions.filter((item) => item.value !== selectedCompanyOption.value),
                ]
              : companyOptions

            const baseIdSuggestions = buildIdSuggestions(values.reg_date, employees, values.id_number)
            const idSuggestions = filterIdSuggestions
              ? baseIdSuggestions.filter((item) =>
                  item.includes(String(values.id_number || '').trim())
                )
              : baseIdSuggestions
            const filteredSectionOptions = sectionOptions.filter(
              (item) => !values.dept_code || item.deptCode === String(values.dept_code || '').trim()
            )

            return (
              <Form className="form">
                <div ref={alertTopRef} />
                <ScrollToAlertEffect active={Boolean(serverError) || hasValidationAlert} targetRef={alertTopRef} />

                {serverError ? (
                  <div className="alert alert-danger mb-8">
                    <div className="fw-bold mb-2">Unable to submit employee</div>
                    <div>{serverError}</div>
                    {serverErrorRaw && serverErrorRaw !== serverError ? (
                      <div className="mt-2 small text-muted">Server: {serverErrorRaw}</div>
                    ) : null}
                  </div>
                ) : null}

                {hasValidationAlert ? (
                  <div className="alert alert-danger mb-8">
                    <div className="fw-bold mb-2">Please complete these fields first:</div>
                    <div>
                      {Object.keys(errors)
                        .map((key) => FIELD_LABELS[key] || key)
                        .join(', ')}
                    </div>
                  </div>
                ) : null}

                {mode === 'edit' && values.id ? <Field type="hidden" name="id" /> : null}

                {FIELD_GROUPS.map((group) => (
                  <div key={group.title} className="mb-10">
                    <h3 className="fw-bolder text-dark mb-5">{group.title}</h3>
                    <div className="row">
                      {group.fields.map((def) => {
                        const name = def.name as string
                        const fieldName = def.name
                        const input = resolveInput(name, def)
                        const req = def.requiredMark || REQUIRED_KEYS.has(name)
                        const hasFieldError = Boolean(errors[fieldName] && submitCount > 0)

                        if (name === 'branch_code' || name === 'cost_center') return null

                        return (
                          <div key={name} className="col-md-6 mb-5">
                            <label className="form-label">
                              {def.label}
                              {req ? <span className="text-danger"> *</span> : null}
                            </label>

                            {name === 'id_number' ? (
                              <div className="position-relative">
                                <input
                                  name={name}
                                  className={`form-control form-control-solid${hasFieldError ? ' is-invalid' : ''}`}
                                  autoComplete="off"
                                  value={values.id_number}
                                  placeholder="Type or pick recommended ID number"
                                  onFocus={() => {
                                    setFilterIdSuggestions(false)
                                    setShowIdDropdown(true)
                                  }}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue('id_number', e.target.value)
                                    setFilterIdSuggestions(true)
                                    setShowIdDropdown(true)
                                  }}
                                  onBlur={() => {
                                    idBlurTimerRef.current = window.setTimeout(() => setShowIdDropdown(false), 150)
                                  }}
                                />
                                {showIdDropdown && idSuggestions.length > 0 && (
                                  <div
                                    className="position-absolute w-100 mt-1 rounded border shadow-sm"
                                    style={{
                                      zIndex: 9999,
                                      background: 'var(--bs-body-bg)',
                                      borderColor: 'var(--bs-border-color)',
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault()
                                      if (idBlurTimerRef.current) window.clearTimeout(idBlurTimerRef.current)
                                    }}
                                  >
                                    {idSuggestions.map((item) => (
                                      <div
                                        key={item}
                                        className="px-3 py-2"
                                        style={{ cursor: 'pointer' }}
                                        onMouseDown={(e) => {
                                          e.preventDefault()
                                          setFieldValue('id_number', item)
                                          setFilterIdSuggestions(false)
                                          setShowIdDropdown(false)
                                        }}
                                      >
                                        <div className="fw-semibold">{item}</div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div className="form-text">
                                  Recommended from register date pattern `YYMM-XXX`.
                                </div>
                              </div>
                            ) : name === 'gender' ? (
                              <Field as="select" name={name} className={`form-select form-select-solid${hasFieldError ? ' is-invalid' : ''}`}>
                                <option value="">Select gender</option>
                                {GENDER_OPTIONS.map((item) => (
                                  <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                              </Field>
                            ) : name === 'marital_status' ? (
                              <Field as="select" name={name} className={`form-select form-select-solid${hasFieldError ? ' is-invalid' : ''}`}>
                                <option value="">Select marital status</option>
                                {MARITAL_OPTIONS.map((item) => (
                                  <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                              </Field>
                            ) : name === 'religion' ? (
                              <Field as="select" name={name} className={`form-select form-select-solid${hasFieldError ? ' is-invalid' : ''}`}>
                                <option value="">Select religion</option>
                                {RELIGION_OPTIONS.map((item) => (
                                  <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                              </Field>
                            ) : name === 'emp_company' ? (
                              <Field
                                as="select"
                                name={name}
                                className={`form-select form-select-solid${hasFieldError ? ' is-invalid' : ''}`}
                              >
                                <option value="">Select company code</option>
                                {renderedCompanyOptions.map((item) => (
                                  <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                              </Field>
                            ) : name === 'dept_code' ? (
                              <Field
                                as="select"
                                name={name}
                                className={`form-select form-select-solid${hasFieldError ? ' is-invalid' : ''}`}
                                value={values.dept_code}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                  const nextValue = e.target.value
                                  setFieldValue('dept_code', nextValue)
                                  setFieldValue('section_code', '')
                                  setFieldValue('cost_center', '')
                                }}
                              >
                                <option value="">Select department code</option>
                                {departmentOptions.map((item) => (
                                  <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                              </Field>
                            ) : name === 'section_code' ? (
                              <Field
                                as="select"
                                name={name}
                                className={`form-select form-select-solid${hasFieldError ? ' is-invalid' : ''}`}
                                value={values.section_code || values.cost_center}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                  const nextValue = e.target.value
                                  setFieldValue('section_code', nextValue)
                                  setFieldValue('cost_center', nextValue)
                                }}
                              >
                                <option value="">Select section</option>
                                {filteredSectionOptions.map((item) => (
                                  <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                              </Field>
                            ) : input === 'textarea' ? (
                              <Field
                                as="textarea"
                                name={name}
                                className={`form-control form-control-solid${hasFieldError ? ' is-invalid' : ''}`}
                                rows={3}
                                disabled={def.readOnly}
                              />
                            ) : (
                              <Field
                                name={name}
                                type={input}
                                className={`form-control form-control-solid${hasFieldError ? ' is-invalid' : ''}`}
                                disabled={def.readOnly}
                              />
                            )}

                            <div className="text-danger mt-1">
                              <ErrorMessage name={name} />
                            </div>
                            {name === 'emp_company' && mode === 'add' ? (
                              <div className="form-text">Auto-filled from the logged-in admin company, but you can still change it.</div>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}

                <PhotoFieldSection
                  mode={mode}
                  photo={values.photo}
                  hasError={Boolean(errors.photo)}
                  submitCount={submitCount}
                  setFieldValue={setFieldValue}
                />

                <div className={backTo ? 'd-flex justify-content-end align-items-center gap-3 pt-5' : ''}>
                  {backTo ? (
                    <Link to={backTo} className='btn btn-icon btn-light-primary' title='Back to table'>
                      <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2 m-0' />
                    </Link>
                  ) : null}
                  <button type="submit" className={backTo ? 'btn btn-lg btn-primary' : 'btn btn-primary'} disabled={submitting}>
                    {backTo ? (
                      <span className='indicator-label'>
                        {submitting ? 'Saving...' : mode === 'add' ? 'Register employee' : 'Save changes'}
                        <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-3 ms-2 me-0' />
                      </span>
                    ) : (
                      submitting ? 'Saving...' : mode === 'add' ? 'Register employee' : 'Save changes'
                    )}
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export { EmployeeRegisterSimpleForm }
