import React from 'react'
import { JobRequirements } from '../../../../core/workforce-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormTextarea from '../../common/components/FormTextarea'

type JobRequirementsSectionProps = {
  values: JobRequirements
  setFieldValue: (field: string, value: any) => void
}

export default function JobRequirementsSection({
  values,
  setFieldValue,
}: JobRequirementsSectionProps) {
  return (
    <FormSection title='Job Requirements'>
      <div className='row'>
        <div className='col-md-4'>
          <FormTextarea
            label='Job Description'
            name='jobRequirements.jobDescription'
            value={values.jobDescription}
            onChange={(value) => setFieldValue('jobRequirements.jobDescription', value)}
            rows={2}
            placeholder='Enter job description'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Key Responsibilities'
            name='jobRequirements.keyResponsibilities'
            value={values.keyResponsibilities}
            onChange={(value) => setFieldValue('jobRequirements.keyResponsibilities', value)}
            rows={2}
            placeholder='Enter key responsibilities'
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Required Skills'
            name='jobRequirements.requiredSkills'
            value={values.requiredSkills}
            onChange={(value) => setFieldValue('jobRequirements.requiredSkills', value)}
            rows={2}
            placeholder='Enter required skills'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Experience'
            name='jobRequirements.experience'
            value={values.experience}
            onChange={(value) => setFieldValue('jobRequirements.experience', value)}
            placeholder='Enter experience'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Education'
            name='jobRequirements.education'
            value={values.education}
            onChange={(value) => setFieldValue('jobRequirements.education', value)}
            placeholder='Enter education'
          />
        </div>
      </div>
    </FormSection>
  )
}




