import * as Yup from 'yup'

export type EmployeeRegisterObject = {
  [keys: string]: EmployeeRegisterData[]
}

/** Mirrors tbl_emp_regs (SKRIPSI-FORSA-ERP-BE module-hr/models/tbl_emp_regs.js) */
export interface EmployeeRegisterData {
  id?: string
  id_number: string
  first_name: string
  middle_name: string
  last_name: string
  nick_name: string
  gender: string
  date_of_birth: string
  point_of_birth: string
  marital_status: string
  religion: string
  nationality: string
  ethnic: string
  status: string
  status_date: string
  reg_by: string | null | undefined
  reg_date: string
  address: string
  city: string
  sub_district: string
  district: string
  region: string
  province: string
  country: string
  post_code: string
  blood_type: string
  height: string
  weight: string
  medication: string
  allergies: string
  chronic_medical_history: string
  identity_ktp: string
  home_phone: string
  personal_email: string
  photo: string | File | null
  applicant_id: string
  position_no: string
  approval_no: string
  id_number_ref: string
  hire_date: string
  service_date: string
  probation_date: string
  point_of_hire: string
  point_of_leave: string
  point_of_travel: string
  contract_no: string
  contract_date: string
  contract_expire: string
  job_title: string
  position_title: string
  work_function: string
  job_level: string
  individual_grade: string
  individual_level: string
  employee_type: string
  employee_class: string
  employment_type: string
  supervisor: string
  branch_code: string
  emp_company: string
  dept_code: string
  section_code: string
  cost_center: string
  account_code: string
  union_code: string
  onsite_location: string
  onsite_address: string
  work_location: string
  office_code: string
  onsite_marital: string
  marital_benefit: string
  work_phone: string
  mobile: string
  wa: string
  email_company: string
  website: string
  termination_date: string
  termination_by: string
  termination_reason: string
  paygroup: string
  bank_account: string
  leave_type: string
  work_insurance: string
  medical_insurance: string
  tax_code: string
  work_day: string
  crew: string
  last_promotion: string
  remarks: string
  ['branch_detail.com_name']?: string
  ['branch_detail.branch_code']?: string
  ['job_title_detail.title_des']?: string
  ['employee_type_detail.emp_type_des']?: string
  ['locwork_detail.locwork_des']?: string
  ['com_detail.com_name']?: string
  ['department_detail.dept_des']?: string
  ['department_detail.dept_code']?: string
  ['section_detail.section_code']?: string
  ['section_detail.section_description']?: string
}

export const getEmptyEmployeeRegisterValues = (
  regBy: string | null | undefined
): EmployeeRegisterData => {
  const today = new Date().toISOString().slice(0, 10)
  return {
    id_number: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    nick_name: '',
    gender: '',
    date_of_birth: '',
    point_of_birth: '',
    marital_status: '',
    religion: '',
    nationality: '',
    ethnic: '',
    status: 'Active',
    status_date: today,
    reg_by: regBy || '',
    reg_date: today,
    address: '',
    city: '',
    sub_district: '',
    district: '',
    region: '',
    province: '',
    country: '',
    post_code: '',
    blood_type: '',
    height: '',
    weight: '',
    medication: '',
    allergies: '',
    chronic_medical_history: '',
    identity_ktp: '',
    home_phone: '',
    personal_email: '',
    photo: null,
    applicant_id: '',
    position_no: '',
    approval_no: '',
    id_number_ref: '',
    hire_date: '',
    service_date: '',
    probation_date: '',
    point_of_hire: '',
    point_of_leave: '',
    point_of_travel: '',
    contract_no: '',
    contract_date: '',
    contract_expire: '',
    job_title: '',
    position_title: '',
    work_function: '',
    job_level: '',
    individual_grade: '',
    individual_level: '',
    employee_type: '',
    employee_class: '',
    employment_type: '',
    supervisor: '',
    branch_code: '',
    emp_company: '',
    dept_code: '',
    section_code: '',
    cost_center: '',
    account_code: '',
    union_code: '',
    onsite_location: '',
    onsite_address: '',
    work_location: '',
    office_code: '',
    onsite_marital: '',
    marital_benefit: '',
    work_phone: '',
    mobile: '',
    wa: '',
    email_company: '',
    website: '',
    termination_date: '',
    termination_by: '',
    termination_reason: '',
    paygroup: '',
    bank_account: '',
    leave_type: '',
    work_insurance: '',
    medical_insurance: '',
    tax_code: '',
    work_day: '',
    crew: '',
    last_promotion: '',
    remarks: '',
  }
}

/** Single form: required = * fields in Sequelize model + identity + reg */
export const employeeRegisterSimpleSchema = Yup.object({
  id: Yup.string().optional(),
  id_number: Yup.string()
    .matches(/^\S*$/, 'ID number must not contain spaces')
    .required('Required'),
  first_name: Yup.string(),
  middle_name: Yup.string(),
  last_name: Yup.string(),
  gender: Yup.string(),
  date_of_birth: Yup.string(),
  point_of_birth: Yup.string(),
  marital_status: Yup.string(),
  religion: Yup.string(),
  reg_date: Yup.string(),
  job_title: Yup.string(),
  job_level: Yup.string().required('Required'),
  individual_level: Yup.string().required('Required'),
  employee_type: Yup.string(),
  employee_class: Yup.string(),
  employment_type: Yup.string(),
  branch_code: Yup.string(),
  emp_company: Yup.string().required('Required'),
  dept_code: Yup.string().required('Required'),
  section_code: Yup.string().required('Required'),
  cost_center: Yup.string().required('Required'),
  account_code: Yup.string(),
  office_code: Yup.string(),
  status: Yup.string(),
  status_date: Yup.string(),
  reg_by: Yup.string().nullable(),
  photo: Yup.mixed().nullable(),
})

const latestValues = (data: EmployeeRegisterData | undefined | null): EmployeeRegisterData => {
  const formatDate = (date?: string | null) => {
    const parsedDate = date ? new Date(date) : new Date()
    return isNaN(parsedDate.getTime()) ? new Date().toISOString().slice(0, 10) : parsedDate.toISOString().slice(0, 10)
  }

  if (!data) return getEmptyEmployeeRegisterValues(undefined)

  return {
    id: data?.id != null ? String(data.id) : undefined,
    id_number: data?.id_number ?? '',
    first_name: data?.first_name ?? '',
    middle_name: data?.middle_name ?? '',
    last_name: data?.last_name ?? '',
    nick_name: data?.nick_name ?? '',
    gender: data?.gender ?? '',
    date_of_birth: formatDate(data?.date_of_birth),
    point_of_birth: data?.point_of_birth ?? '',
    marital_status: data?.marital_status ?? '',
    religion: data?.religion ?? '',
    nationality: data?.nationality ?? '',
    ethnic: data?.ethnic ?? '',
    status: data?.status ?? 'Active',
    status_date: formatDate(data?.status_date),
    reg_by: data?.reg_by ?? '',
    reg_date: formatDate(data?.reg_date),
    address: data?.address ?? '',
    city: data?.city ?? '',
    sub_district: data?.sub_district ?? '',
    district: data?.district ?? '',
    region: data?.region ?? '',
    province: data?.province ?? '',
    country: data?.country ?? '',
    post_code: data?.post_code ?? '',
    blood_type: data?.blood_type ?? '',
    height: data?.height ?? '',
    weight: data?.weight ?? '',
    medication: data?.medication ?? '',
    allergies: data?.allergies ?? '',
    chronic_medical_history: data?.chronic_medical_history ?? '',
    identity_ktp: data?.identity_ktp ?? '',
    home_phone: data?.home_phone ?? '',
    personal_email: data?.personal_email ?? '',
    photo: data?.photo ?? null,
    applicant_id: data?.applicant_id ?? '',
    position_no: data?.position_no ?? '',
    approval_no: data?.approval_no ?? '',
    id_number_ref: data?.id_number_ref ?? '',
    hire_date: formatDate(data?.hire_date),
    service_date: formatDate(data?.service_date),
    probation_date: formatDate(data?.probation_date),
    point_of_hire: data?.point_of_hire ?? '',
    point_of_leave: data?.point_of_leave ?? '',
    point_of_travel: data?.point_of_travel ?? '',
    contract_no: data?.contract_no ?? '',
    contract_date: formatDate(data?.contract_date),
    contract_expire: formatDate(data?.contract_expire),
    job_title: data?.job_title ?? '',
    position_title: data?.position_title ?? '',
    work_function: data?.work_function ?? '',
    job_level: data?.job_level ?? '',
    individual_grade: data?.individual_grade ?? '',
    individual_level: data?.individual_level ?? '',
    employee_type: data?.employee_type ?? '',
    employee_class: data?.employee_class ?? '',
    employment_type: data?.employment_type ?? '',
    supervisor: data?.supervisor ?? '',
    branch_code: data?.branch_code ?? '',
    emp_company: data?.emp_company ?? '',
    dept_code: data?.dept_code ?? '',
    section_code: (data as EmployeeRegisterData & { section_code?: string })?.section_code ?? '',
    cost_center: data?.cost_center ?? '',
    account_code: data?.account_code ?? '',
    union_code: data?.union_code ?? '',
    onsite_location: data?.onsite_location ?? '',
    onsite_address: data?.onsite_address ?? '',
    work_location: data?.work_location ?? '',
    office_code: data?.office_code ?? '',
    onsite_marital: data?.onsite_marital ?? '',
    marital_benefit: data?.marital_benefit ?? '',
    work_phone: data?.work_phone ?? '',
    mobile: data?.mobile ?? '',
    wa: data?.wa ?? '',
    email_company: data?.email_company ?? '',
    website: data?.website ?? '',
    termination_date: formatDate(data?.termination_date),
    termination_by: data?.termination_by ?? '',
    termination_reason: data?.termination_reason ?? '',
    paygroup: data?.paygroup ?? '',
    bank_account: data?.bank_account ?? '',
    leave_type: data?.leave_type ?? '',
    work_insurance: data?.work_insurance ?? '',
    medical_insurance: data?.medical_insurance ?? '',
    tax_code: data?.tax_code ?? '',
    work_day: data?.work_day ?? '',
    crew: data?.crew ?? '',
    last_promotion: formatDate(data?.last_promotion),
    remarks: data?.remarks ?? '',
  }
}

export { latestValues }
