import React from 'react'
import { SpecialRequirements } from '../../../../core/visitor-request'
import FormSection from '../../common/components/FormSection'
import FormSelect from '../../common/components/FormSelect'
import FormField from '../../common/components/FormField'
import FormTextarea from '../../common/components/FormTextarea'

type SpecialRequirementsSectionProps = {
  values: SpecialRequirements
  setFieldValue: (field: string, value: any) => void
  getMeetingRoomOptions: () => Array<{ value: string; label: string }>
}

export default function SpecialRequirementsSection({
  values,
  setFieldValue,
  getMeetingRoomOptions,
}: SpecialRequirementsSectionProps) {
  return (
    <FormSection title='Special Requirements'>
      <div className='row'>
        <div className='col-md-6'>
          <FormSelect
            label='Meeting Room'
            name='specialRequirements.meetingRoom'
            value={values.meetingRoom}
            onChange={(value) => setFieldValue('specialRequirements.meetingRoom', value)}
            options={getMeetingRoomOptions()}
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Equipment Requirements'
            name='specialRequirements.equipmentRequirements'
            value={values.equipmentRequirements}
            onChange={(value) => setFieldValue('specialRequirements.equipmentRequirements', value)}
            placeholder='[projector, laptop, etc]'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <FormTextarea
            label='Comments'
            name='specialRequirements.comments'
            value={values.comments}
            onChange={(value) => setFieldValue('specialRequirements.comments', value)}
            rows={2}
            placeholder='[text input]'
          />
        </div>
      </div>
    </FormSection>
  )
}

