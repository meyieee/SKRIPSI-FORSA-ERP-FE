import React from 'react'
import { VisitorRegistration } from '../../../../core/visitor-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

type VisitorRegistrationSectionProps = {
  values: VisitorRegistration
  setFieldValue: (field: string, value: any) => void
  getTimeOptions: () => Array<{ value: string; label: string }>
}

export default function VisitorRegistrationSection({
  values,
  setFieldValue,
  getTimeOptions,
}: VisitorRegistrationSectionProps) {
  return (
    <FormSection title='Visitor Registration (For Office Use)'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Visitor ID'
            name='visitorRegistration.visitorId'
            value={values.visitorId}
            onChange={(value) => setFieldValue('visitorRegistration.visitorId', value)}
            placeholder='Enter visitor ID'
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Check In Time'
            name='visitorRegistration.checkInTime'
            value={values.checkInTime}
            onChange={(value) => setFieldValue('visitorRegistration.checkInTime', value)}
            options={getTimeOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Check Out Time'
            name='visitorRegistration.checkOutTime'
            value={values.checkOutTime}
            onChange={(value) => setFieldValue('visitorRegistration.checkOutTime', value)}
            options={getTimeOptions()}
          />
        </div>
      </div>
    </FormSection>
  )
}

