import React from 'react'
import { ExtendedRequestDetails } from '../../../../core/accommodation-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'

type ExtendedRequestDetailsSectionProps = {
  values: ExtendedRequestDetails
  setFieldValue: (field: string, value: any) => void
  getDurationOptions: () => Array<{ value: string; label: string }>
}

export default function ExtendedRequestDetailsSection({
  values,
  setFieldValue,
  getDurationOptions,
}: ExtendedRequestDetailsSectionProps) {
  return (
    <FormSection title='Extended Request Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Visitor Name'
            name='extendedRequestDetails.visitorName'
            value={values.visitorName}
            onChange={(value) => setFieldValue('extendedRequestDetails.visitorName', value)}
            placeholder='[text input]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Duration of Stay'
            name='extendedRequestDetails.durationOfStay'
            value={values.durationOfStay}
            onChange={(value) => setFieldValue('extendedRequestDetails.durationOfStay', value)}
            options={getDurationOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Comments'
            name='extendedRequestDetails.comments'
            value={values.comments}
            onChange={(value) => setFieldValue('extendedRequestDetails.comments', value)}
            rows={2}
            placeholder='[text input]'
          />
        </div>
      </div>
    </FormSection>
  )
}



