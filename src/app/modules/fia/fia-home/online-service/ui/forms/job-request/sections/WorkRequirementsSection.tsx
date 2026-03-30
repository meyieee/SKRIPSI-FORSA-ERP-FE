import React from 'react'
import { WorkRequirements } from '../../../../core/job-request'
import FormSection from '../../common/components/FormSection'
import FormTextarea from '../../common/components/FormTextarea'

type WorkRequirementsSectionProps = {
  values: WorkRequirements
  setFieldValue: (field: string, value: any) => void
}

export default function WorkRequirementsSection({
  values,
  setFieldValue,
}: WorkRequirementsSectionProps) {
  return (
    <FormSection title='Work Requirements'>
      <div className='row'>
        <div className='col-md-6'>
          <FormTextarea
            label='Special Instructions'
            name='workRequirements.specialInstructions'
            value={values.specialInstructions}
            onChange={(value) => setFieldValue('workRequirements.specialInstructions', value)}
            rows={2}
            placeholder='[text input]'
          />
        </div>
        <div className='col-md-6'>
          <FormTextarea
            label='Safety Precautions'
            name='workRequirements.safetyPrecautions'
            value={values.safetyPrecautions}
            onChange={(value) => setFieldValue('workRequirements.safetyPrecautions', value)}
            rows={2}
            placeholder='[text input]'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <FormTextarea
            label='Material Required'
            name='workRequirements.materialRequired'
            value={values.materialRequired}
            onChange={(value) => setFieldValue('workRequirements.materialRequired', value)}
            rows={2}
            placeholder='[text input]'
          />
        </div>
        <div className='col-md-6'>
          <FormTextarea
            label='Tool Required'
            name='workRequirements.toolRequired'
            value={values.toolRequired}
            onChange={(value) => setFieldValue('workRequirements.toolRequired', value)}
            rows={2}
            placeholder='[text input]'
          />
        </div>
      </div>
    </FormSection>
  )
}

