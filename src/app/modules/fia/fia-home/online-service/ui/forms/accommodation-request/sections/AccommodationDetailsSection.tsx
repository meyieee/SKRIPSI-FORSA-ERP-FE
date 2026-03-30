import React from 'react'
import { AccommodationDetails } from '../../../../core/accommodation-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

type AccommodationDetailsSectionProps = {
  values: AccommodationDetails
  setFieldValue: (field: string, value: any) => void
  getLocationOptions: () => Array<{ value: string; label: string }>
  getTimeOptions: () => Array<{ value: string; label: string }>
}

export default function AccommodationDetailsSection({
  values,
  setFieldValue,
  getLocationOptions,
  getTimeOptions,
}: AccommodationDetailsSectionProps) {
  return (
    <FormSection title='Accommodation Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Arrival (Location)'
            name='accommodationDetails.arrivalLocation'
            value={values.arrivalLocation}
            onChange={(value) => setFieldValue('accommodationDetails.arrivalLocation', value)}
            options={getLocationOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Accommodation Location'
            name='accommodationDetails.accommodationLocation'
            value={values.accommodationLocation}
            onChange={(value) => setFieldValue('accommodationDetails.accommodationLocation', value)}
            options={getLocationOptions()}
          />
        </div>
          <div className='col-md-4'>
          <FormField
            label='Room Number'
            name='accommodationDetails.roomNumber'
            value={values.roomNumber}
            onChange={(value) => setFieldValue('accommodationDetails.roomNumber', value)}
            type='number'
            placeholder='[number]'
            min={1}
            max={9999}
          />
        </div>
      </div>


<div className='row'>
  <div className='col-md-6'>
    <FormField
      label='Check-in Date & Time'
      name='accommodationDetails.checkInTime'
      value={values.checkInTime || ''}
      onChange={(value) => setFieldValue('accommodationDetails.checkInTime', value)}
      type='datetime-local'
      required
    />
  </div>
  <div className='col-md-6'>
    <FormField
      label='Check-out Date & Time'
      name='accommodationDetails.checkOutTime'
      value={values.checkOutTime || ''}
      onChange={(value) => setFieldValue('accommodationDetails.checkOutTime', value)}
      type='datetime-local'
      required
    />
  </div>
</div>
    </FormSection>
  )
}

