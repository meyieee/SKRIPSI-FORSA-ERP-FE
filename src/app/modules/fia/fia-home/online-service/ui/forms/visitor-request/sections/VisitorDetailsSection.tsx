import React from 'react'
import { VisitorDetails } from '../../../../core/visitor-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'

type VisitorDetailsSectionProps = {
  values: VisitorDetails
  setFieldValue: (field: string, value: any) => void
}

export default function VisitorDetailsSection({
  values,
  setFieldValue,
}: VisitorDetailsSectionProps) {
  return (
    <FormSection title='Visitor Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Visitor Name'
            name='visitorDetails.visitorName'
            value={values.visitorName}
            onChange={(value) => setFieldValue('visitorDetails.visitorName', value)}
            placeholder='[text input]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Company/Org'
            name='visitorDetails.companyOrg'
            value={values.companyOrg}
            onChange={(value) => setFieldValue('visitorDetails.companyOrg', value)}
            placeholder='[text input]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Contact No/Email'
            name='visitorDetails.contactNoEmail'
            value={values.contactNoEmail}
            onChange={(value) => setFieldValue('visitorDetails.contactNoEmail', value)}
            type='email'
            placeholder='[email@example.com]'
          />
        </div>
      </div>
    </FormSection>
  )
}

