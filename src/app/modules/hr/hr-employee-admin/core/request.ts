import { client } from '../../../../functions'
import { EmployeeRegisterData } from './models'

const employeeRegister = async (values: EmployeeRegisterData) => {
    const {
        //step1
        id_number, first_name, middle_name, last_name, nick_name, gender, date_of_birth, 
        point_of_birth, marital_status, religion, nationality, ethnic, status, status_date, 
        reg_date, address, city, sub_district, district, region, province, country, reg_by,
        post_code, blood_type, height, weight, medication, allergies, chronic_medical_history, 
        identity_ktp, home_phone, personal_email, photo, 
        
        //step2
        applicant_id, position_no, approval_no, 
        id_number_ref, hire_date, service_date, probation_date, point_of_hire, point_of_leave, 
        point_of_travel, contract_no, contract_date, contract_expire, job_title, position_title, 
        work_function, job_level, individual_grade, individual_level, employee_type, employee_class, 
        employment_type, supervisor, branch_code, emp_company, dept_code, section_code, cost_center, account_code, 
        union_code, onsite_location, onsite_address, work_location, office_code, onsite_marital, 
        marital_benefit, work_phone, mobile, wa, email_company, website, termination_date, termination_by,
        termination_reason, 
        
        //step3
        paygroup, bank_account, leave_type, work_insurance, medical_insurance, 
        tax_code, work_day, crew, last_promotion, remarks,
    } = values
  
    const datas = new FormData()
    datas.append("id_number", id_number)
    datas.append("first_name", first_name)
    datas.append("middle_name", middle_name)
    datas.append("last_name", last_name)
    datas.append("nick_name", nick_name)
    datas.append("gender", gender)
    datas.append("date_of_birth", date_of_birth)
    datas.append("point_of_birth", point_of_birth)
    datas.append("marital_status", marital_status)
    datas.append("religion", religion)
    datas.append("nationality", nationality)
    datas.append("ethnic", ethnic)
    datas.append("status", status)
    datas.append("status_date", status_date)
    datas.append("reg_by", reg_by || '')
    datas.append("reg_date", reg_date)
    datas.append("address", address)
    datas.append("city", city)
    datas.append("sub_district", sub_district)
    datas.append("district", district)
    datas.append("region", region)
    datas.append("province", province)
    datas.append("country", country)
    datas.append("post_code", post_code)
    datas.append("blood_type", blood_type)
    datas.append("height", height)
    datas.append("weight", weight)
    datas.append("medication", medication)
    datas.append("allergies", allergies)
    datas.append("chronic_medical_history", chronic_medical_history)
    datas.append("identity_ktp", identity_ktp)
    datas.append("home_phone", home_phone)
    datas.append("personal_email", personal_email)
    if (photo instanceof File) {
      datas.append('image', photo)
    } else if (typeof photo === 'string' && photo !== '') {
      datas.append('image', photo)
    }
    datas.append("applicant_id", applicant_id)
    datas.append("position_no", position_no)
    datas.append("approval_no", approval_no)
    datas.append("id_number_ref", id_number_ref)
    datas.append("hire_date", hire_date)
    datas.append("service_date", service_date)
    datas.append("probation_date", probation_date)
    datas.append("point_of_hire", point_of_hire)
    datas.append("point_of_leave", point_of_leave)
    datas.append("point_of_travel", point_of_travel)
    datas.append("contract_no", contract_no)
    datas.append("contract_date", contract_date)
    datas.append("contract_expire", contract_expire)
    datas.append("job_title", job_title)
    datas.append("position_title", position_title)
    datas.append("work_function", work_function)
    datas.append("job_level", job_level)
    datas.append("individual_grade", individual_grade)
    datas.append("individual_level", individual_level)
    datas.append("employee_type", employee_type)
    datas.append("employee_class", employee_class)
    datas.append("employment_type", employment_type)
    datas.append("supervisor", supervisor)
    datas.append("branch_code", branch_code)
    datas.append("emp_company", emp_company)
    datas.append("dept_code", dept_code)
    datas.append("section_code", section_code)
    datas.append("cost_center", cost_center)
    datas.append("account_code", account_code)
    datas.append("union_code", union_code)
    datas.append("onsite_location", onsite_location)
    datas.append("onsite_address", onsite_address)
    datas.append("work_location", work_location)
    datas.append("office_code", office_code)
    datas.append("onsite_marital", onsite_marital)
    datas.append("marital_benefit", marital_benefit)
    datas.append("work_phone", work_phone)
    datas.append("mobile", mobile)
    datas.append("wa", wa)
    datas.append("email_company", email_company)
    datas.append("website", website)
    datas.append("termination_date", termination_date)
    datas.append("termination_by", termination_by)
    datas.append("termination_reason", termination_reason)
    datas.append("paygroup", paygroup)
    datas.append("bank_account", bank_account)
    datas.append("leave_type", leave_type)
    datas.append("work_insurance", work_insurance)
    datas.append("medical_insurance", medical_insurance)
    datas.append("tax_code", tax_code)
    datas.append("work_day", work_day)
    datas.append("crew", crew)
    datas.append("last_promotion", last_promotion)
    datas.append("remarks", remarks)
  
    const response = await client().post(`employeeregister`, datas, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
    return response;
}

const employeeEdit = async (values: EmployeeRegisterData, regBy: string | null | undefined) => {
  const {
      id,
      //step1
      id_number, first_name, middle_name, last_name, nick_name, gender, date_of_birth, 
      point_of_birth, marital_status, religion, nationality, ethnic, status, status_date, 
      reg_date, address, city, sub_district, district, region, province, country, 
      post_code, blood_type, height, weight, medication, allergies, chronic_medical_history, 
      identity_ktp, home_phone, personal_email, photo,
      
      //step2
      applicant_id, position_no, approval_no, 
      id_number_ref, hire_date, service_date, probation_date, point_of_hire, point_of_leave, 
      point_of_travel, contract_no, contract_date, contract_expire, job_title, position_title, 
      work_function, job_level, individual_grade, individual_level, employee_type, employee_class, 
      employment_type, supervisor, branch_code, emp_company, dept_code, section_code, cost_center, account_code, 
      union_code, onsite_location, onsite_address, work_location, office_code, onsite_marital, 
      marital_benefit, work_phone, mobile, wa, email_company, website, termination_date, termination_by,
      termination_reason, 
      
      //step3
      paygroup, bank_account, leave_type, work_insurance, medical_insurance, 
      tax_code, work_day, crew, last_promotion, remarks,
  } = values

  const datas = new FormData()
  datas.append("id_number", id_number)
  datas.append("first_name", first_name)
  datas.append("middle_name", middle_name)
  datas.append("last_name", last_name)
  datas.append("nick_name", nick_name)
  datas.append("gender", gender)
  datas.append("date_of_birth", date_of_birth)
  datas.append("point_of_birth", point_of_birth)
  datas.append("marital_status", marital_status)
  datas.append("religion", religion)
  datas.append("nationality", nationality)
  datas.append("ethnic", ethnic)
  datas.append("status", status)
  datas.append("status_date", status_date)
  datas.append("reg_by", regBy || '')
  datas.append("reg_date", reg_date)
  datas.append("address", address)
  datas.append("city", city)
  datas.append("sub_district", sub_district)
  datas.append("district", district)
  datas.append("region", region)
  datas.append("province", province)
  datas.append("country", country)
  datas.append("post_code", post_code)
  datas.append("blood_type", blood_type)
  datas.append("height", height)
  datas.append("weight", weight)
  datas.append("medication", medication)
  datas.append("allergies", allergies)
  datas.append("chronic_medical_history", chronic_medical_history)
  datas.append("identity_ktp", identity_ktp)
  datas.append("home_phone", home_phone)
  datas.append("personal_email", personal_email)
  if(photo === null) {
    //ketika foto sebelumnya diganti dengan foto yang baru
    datas.append('image', 'deleted')
  }else{
    //ketika tidak mengupdate foto
    datas.append('image', photo)
  }
  datas.append("applicant_id", applicant_id)
  datas.append("position_no", position_no)
  datas.append("approval_no", approval_no)
  datas.append("id_number_ref", id_number_ref)
  datas.append("hire_date", hire_date)
  datas.append("service_date", service_date)
  datas.append("probation_date", probation_date)
  datas.append("point_of_hire", point_of_hire)
  datas.append("point_of_leave", point_of_leave)
  datas.append("point_of_travel", point_of_travel)
  datas.append("contract_no", contract_no)
  datas.append("contract_date", contract_date)
  datas.append("contract_expire", contract_expire)
  datas.append("job_title", job_title)
  datas.append("position_title", position_title)
  datas.append("work_function", work_function)
  datas.append("job_level", job_level)
  datas.append("individual_grade", individual_grade)
  datas.append("individual_level", individual_level)
  datas.append("employee_type", employee_type)
  datas.append("employee_class", employee_class)
  datas.append("employment_type", employment_type)
  datas.append("supervisor", supervisor)
  datas.append("branch_code", branch_code)
  datas.append("emp_company", emp_company)
  datas.append("dept_code", dept_code)
  datas.append("section_code", section_code)
  datas.append("cost_center", cost_center)
  datas.append("account_code", account_code)
  datas.append("union_code", union_code)
  datas.append("onsite_location", onsite_location)
  datas.append("onsite_address", onsite_address)
  datas.append("work_location", work_location)
  datas.append("office_code", office_code)
  datas.append("onsite_marital", onsite_marital)
  datas.append("marital_benefit", marital_benefit)
  datas.append("work_phone", work_phone)
  datas.append("mobile", mobile)
  datas.append("wa", wa)
  datas.append("email_company", email_company)
  datas.append("website", website)
  datas.append("termination_date", termination_date)
  datas.append("termination_by", termination_by)
  datas.append("termination_reason", termination_reason)
  datas.append("paygroup", paygroup)
  datas.append("bank_account", bank_account)
  datas.append("leave_type", leave_type)
  datas.append("work_insurance", work_insurance)
  datas.append("medical_insurance", medical_insurance)
  datas.append("tax_code", tax_code)
  datas.append("work_day", work_day)
  datas.append("crew", crew)
  datas.append("last_promotion", last_promotion)
  datas.append("remarks", remarks)

  const response = await client().put(`employeeregister/${id}`, datas, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  return response;
}

const updateStatusEmployee = async (id: string, status: string, remarks: string, onSuccess: Function, onError: Function) => {
  await client().put(`/employeeregister/delete/${id}`, {status, remarks})
  .then((res) => {
      onSuccess(res.data.message)      
  })
  .catch((e) => {
    onError(e.response.data.message)
  })
}
  
const getEmployeeGroupedByDept = async (branch_code: string) => {
  const urlAPI = branch_code === 'HO' ?'/employeeregister/dept':`/employeeregister/dept/${branch_code}`
  const response = await client().get(urlAPI)
  return response.data.data;
}

const getEmployee = async (branch_code : string) => {
  const urlAPI = branch_code === 'HO' ?'/employeeregister':`/employeeregister/${branch_code}`
  const response = await client().get(urlAPI);
  return response.data.data;
}

const getHOemployee = async () => {
  const urlAPI ='/employeeregister'
  const response = await client().get(urlAPI);
  return response.data.data;
}

const getEmployeeById = async (id : string | undefined) => {
  const urlAPI = `/employeeregister/id/${id}`
  const response = await client().get(urlAPI);
  return response.data.data;
}

const getAllActiveComs = async () => {
  const response = await client().get(`/allactivecoms`);
  return response.data.data.rows;
}

/** HO/branch list for job step (replaces scm-purchase-order getBranch) */
const getBranch = async () => {
  const response = await client().get('/hoandbranchprofiles/')
  return response.data.data.rows
}

export { employeeRegister, employeeEdit, updateStatusEmployee, getEmployeeGroupedByDept, getEmployee, getAllActiveComs, getEmployeeById, getHOemployee, getBranch }