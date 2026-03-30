import React from 'react'
import { AccommodationRequirements } from '../../../../core/accommodation-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

type AccommodationRequirementsSectionProps = {
  values: AccommodationRequirements
  setFieldValue: (field: string, value: any) => void
  getAccommodationTypeOptions: () => Array<{ value: string; label: string }>
  getYesNoOptions: () => Array<{ value: string; label: string }>
}

export default function AccommodationRequirementsSection({
  values,
  setFieldValue,
  getAccommodationTypeOptions,
  getYesNoOptions,
}: AccommodationRequirementsSectionProps) {
  return (
    <FormSection title='Accommodation Requirements'>
      <div className='row'>
        <div className='col-md-6'>
          <FormSelect
            label='Accommodation Type'
            name='accommodationRequirements.accommodationType'
            value={values.accommodationType}
            onChange={(value) => setFieldValue('accommodationRequirements.accommodationType', value)}
            options={getAccommodationTypeOptions()}
            required
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Number of Nights'
            name='accommodationRequirements.numberOfNights'
            value={values.numberOfNights}
            onChange={(value) => setFieldValue('accommodationRequirements.numberOfNights', value)}
            type='number'
            placeholder='[number]'
            required
            min={1}
            max={365}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <FormSelect
            label='Extra Bed'
            name='accommodationRequirements.extraBed'
            value={values.extraBed}
            onChange={(value) => setFieldValue('accommodationRequirements.extraBed', value)}
            options={getYesNoOptions()}
          />
        </div>
        <div className='col-md-6'>
          <FormSelect
            label='Meal Provided'
            name='accommodationRequirements.mealProvided'
            value={values.mealProvided}
            onChange={(value) => setFieldValue('accommodationRequirements.mealProvided', value)}
            options={getYesNoOptions()}
          />
        </div>
      </div>
    </FormSection>
  )
}



