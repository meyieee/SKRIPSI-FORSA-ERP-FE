import React from 'react'
import { SecurityClearance } from '../../../../core/visitor-request'
import FormSection from '../../common/components/FormSection'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'

type SecurityClearanceSectionProps = {
  values: SecurityClearance
  setFieldValue: (field: string, value: any) => void
  getYesNoOptions: () => Array<{ value: string; label: string }>
  getClearanceTypeOptions: () => Array<{ value: string; label: string }>
}

export default function SecurityClearanceSection({
  values,
  setFieldValue,
  getYesNoOptions,
  getClearanceTypeOptions,
}: SecurityClearanceSectionProps) {
  return (
    <FormSection title='Security Clearance'>
      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Clearance Required'
            name='securityClearance.clearanceRequired'
            value={values.clearanceRequired}
            onChange={(value) => setFieldValue('securityClearance.clearanceRequired', value)}
            options={getYesNoOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Type of Clearance'
            name='securityClearance.typeOfClearance'
            value={values.typeOfClearance}
            onChange={(value) => setFieldValue('securityClearance.typeOfClearance', value)}
            options={getClearanceTypeOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Comments'
            name='securityClearance.comments'
            value={values.comments}
            onChange={(value) => setFieldValue('securityClearance.comments', value)}
            rows={2}
            placeholder='Enter comments'
          />
        </div>
      </div>
    </FormSection>
  )
}

