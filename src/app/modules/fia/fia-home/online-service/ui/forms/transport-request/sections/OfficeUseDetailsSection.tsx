import React from 'react'
import { OfficeUseDetails } from '../../../../core/transport-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'

type OfficeUseDetailsSectionProps = {
  values: OfficeUseDetails
  setFieldValue: (field: string, value: any) => void
}

export default function OfficeUseDetailsSection({
  values,
  setFieldValue,
}: OfficeUseDetailsSectionProps) {
  return (
    <FormSection title='Office Use Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Vehicle No'
            name='officeUseDetails.vehicleNo'
            value={values.vehicleNo}
            onChange={(value) => setFieldValue('officeUseDetails.vehicleNo', value)}
            placeholder='[vehicle number]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Driver Name'
            name='officeUseDetails.driverName'
            value={values.driverName}
            onChange={(value) => setFieldValue('officeUseDetails.driverName', value)}
            placeholder='[driver name]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Contact No'
            name='officeUseDetails.contactNo'
            value={values.contactNo}
            onChange={(value) => setFieldValue('officeUseDetails.contactNo', value)}
            placeholder='[contact number]'
          />
        </div>
      </div>
    </FormSection>
  )
}

