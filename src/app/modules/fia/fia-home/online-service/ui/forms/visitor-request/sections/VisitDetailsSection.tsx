import React from 'react'
import { VisitDetails } from '../../../../core/visitor-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

type VisitDetailsSectionProps = {
  values: VisitDetails
  setFieldValue: (field: string, value: any) => void
  getTimeOptions: () => Array<{ value: string; label: string }>
  getDurationOptions: () => Array<{ value: string; label: string }>
}

export default function VisitDetailsSection({
  values,
  setFieldValue,
  getTimeOptions,
  getDurationOptions,
}: VisitDetailsSectionProps) {
  return (
    <FormSection title='Visit Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Date of Visit'
            name='visitDetails.dateOfVisit'
            value={values.dateOfVisit}
            onChange={(value) => setFieldValue('visitDetails.dateOfVisit', value)}
            type='date'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Time of Visit'
            name='visitDetails.timeOfVisit'
            value={values.timeOfVisit}
            onChange={(value) => setFieldValue('visitDetails.timeOfVisit', value)}
            options={getTimeOptions()}
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Expected Duration'
            name='visitDetails.expectedDuration'
            value={values.expectedDuration}
            onChange={(value) => setFieldValue('visitDetails.expectedDuration', value)}
            options={getDurationOptions()}
            required
          />
        </div>
      </div>
    </FormSection>
  )
}

