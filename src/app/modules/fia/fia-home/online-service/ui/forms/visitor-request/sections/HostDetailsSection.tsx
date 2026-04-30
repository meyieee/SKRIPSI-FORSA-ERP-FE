import React from 'react'
import { HostDetails } from '../../../../core/visitor-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

type HostDetailsSectionProps = {
  values: HostDetails
  setFieldValue: (field: string, value: any) => void
  /** `adm_cf_11_dept` via GET `/departments` (dept_code / dept_des) */
  departmentOptions: Array<{ value: string; label: string }>
}

export default function HostDetailsSection({
  values,
  setFieldValue,
  departmentOptions,
}: HostDetailsSectionProps) {
  return (
    <FormSection title='Host Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Host Name'
            name='hostDetails.hostName'
            value={values.hostName}
            onChange={(value) => setFieldValue('hostDetails.hostName', value)}
            placeholder='Enter host name'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Department'
            name='hostDetails.department'
            value={values.department}
            onChange={(value) => setFieldValue('hostDetails.department', value)}
            options={departmentOptions}
            placeholder={departmentOptions.length === 0 ? 'Loading departments…' : 'choose your option'}
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Contact Number'
            name='hostDetails.contactNumber'
            value={values.contactNumber}
            onChange={(value) => setFieldValue('hostDetails.contactNumber', value)}
            type='text'
            inputMode='tel'
            placeholder='+62 812-3456-7890'
            required
          />
        </div>
      </div>
    </FormSection>
  )
}

