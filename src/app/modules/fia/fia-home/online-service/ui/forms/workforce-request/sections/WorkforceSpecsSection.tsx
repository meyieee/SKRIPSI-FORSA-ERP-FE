import React from 'react'
import { WorkforceSpecs } from '../../../../core/workforce-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

type WorkforceSpecsSectionProps = {
  values: WorkforceSpecs
  setFieldValue: (field: string, value: any) => void
  getEmploymentTypeOptions: () => Array<{ value: string; label: string }>
  getShiftOptions: () => Array<{ value: string; label: string }>
}

export default function WorkforceSpecsSection({
  values,
  setFieldValue,
  getEmploymentTypeOptions,
  getShiftOptions,
}: WorkforceSpecsSectionProps) {
  return (
    <FormSection title='Workforce Specifications'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Job Title'
            name='workforceSpecs.jobTitle'
            value={values.jobTitle}
            onChange={(value) => setFieldValue('workforceSpecs.jobTitle', value)}
            placeholder='[text input]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Number of Position'
            name='workforceSpecs.positions'
            value={values.positions}
            onChange={(value) => setFieldValue('workforceSpecs.positions', value)}
            type='number'
            placeholder='[number]'
            required
            min={1}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Employment Type'
            name='workforceSpecs.employmentType'
            value={values.employmentType}
            onChange={(value) => setFieldValue('workforceSpecs.employmentType', value)}
            options={getEmploymentTypeOptions()}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <label className='form-label'>Overtime Required</label>
          <div className='form-check mt-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='overtimeRequired'
              checked={values.overtimeRequired}
              onChange={(e) => setFieldValue('workforceSpecs.overtimeRequired', e.target.checked)}
            />
            <label className='form-check-label' htmlFor='overtimeRequired'>
              Yes
            </label>
          </div>
        </div>
        <div className='col-md-4'>
          <FormField
            label='Work Schedule'
            name='workforceSpecs.workSchedule'
            value={values.workSchedule}
            onChange={(value) => setFieldValue('workforceSpecs.workSchedule', value)}
            placeholder='[text input]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Work Location'
            name='workforceSpecs.workLocation'
            value={values.workLocation}
            onChange={(value) => setFieldValue('workforceSpecs.workLocation', value)}
            placeholder='[text input]'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Shift'
            name='workforceSpecs.shift'
            value={values.shift}
            onChange={(value) => setFieldValue('workforceSpecs.shift', value)}
            options={getShiftOptions()}
          />
        </div>
      </div>
    </FormSection>
  )
}




