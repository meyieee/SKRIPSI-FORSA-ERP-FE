import React from 'react'
import { TrainingDetails } from '../../../../core/training-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

type TrainingDetailsSectionProps = {
  values: TrainingDetails
  setFieldValue: (field: string, value: any) => void
  getTrainingMethodOptions: () => Array<{ value: string; label: string }>
}

export default function TrainingDetailsSection({
  values,
  setFieldValue,
  getTrainingMethodOptions,
}: TrainingDetailsSectionProps) {
  return (
    <FormSection title='Training Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Training Title'
            name='trainingDetails.trainingTitle'
            value={values.trainingTitle}
            onChange={(value) => setFieldValue('trainingDetails.trainingTitle', value)}
            placeholder='[training title]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Training Duration'
            name='trainingDetails.trainingDuration'
            value={values.trainingDuration}
            onChange={(value) => setFieldValue('trainingDetails.trainingDuration', value)}
            placeholder='[combo]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Training Method'
            name='trainingDetails.trainingMethod'
            value={values.trainingMethod}
            onChange={(value) => setFieldValue('trainingDetails.trainingMethod', value)}
            options={getTrainingMethodOptions()}
            required
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Last Attended'
            name='trainingDetails.lastAttended'
            value={values.lastAttended}
            onChange={(value) => setFieldValue('trainingDetails.lastAttended', value)}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Training Provider'
            name='trainingDetails.organizerProvider'
            value={values.organizerProvider}
            onChange={(value) => setFieldValue('trainingDetails.organizerProvider', value)}
            options={[
              { value: 'Provider A', label: 'Provider A' },
              { value: 'Provider B', label: 'Provider B' },
              { value: 'Provider C', label: 'Provider C' },
            ]}
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Date of Training'
            name='trainingDetails.organizerDate'
            value={values.organizerDate}
            onChange={(value) => setFieldValue('trainingDetails.organizerDate', value)}
            type='date'
            required
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <FormField
            label='Venue'
            name='trainingDetails.organizerVenue'
            value={values.organizerVenue}
            onChange={(value) => setFieldValue('trainingDetails.organizerVenue', value)}
            placeholder='[combo]'
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Fees'
            name='trainingDetails.organizerFees'
            value={values.organizerFees}
            onChange={(value) => setFieldValue('trainingDetails.organizerFees', value)}
            placeholder='[combo]'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Employee Request'
            name='trainingDetails.identifiedByEmployee'
            value={values.identifiedByEmployee}
            onChange={(value) => setFieldValue('trainingDetails.identifiedByEmployee', value)}
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Supervisor Request'
            name='trainingDetails.identifiedBySupervisor'
            value={values.identifiedBySupervisor}
            onChange={(value) => setFieldValue('trainingDetails.identifiedBySupervisor', value)}
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Other (specify)'
            name='trainingDetails.identifiedByOther'
            value={values.identifiedByOther}
            onChange={(value) => setFieldValue('trainingDetails.identifiedByOther', value)}
          />
        </div>
      </div>
    </FormSection>
  )
}

