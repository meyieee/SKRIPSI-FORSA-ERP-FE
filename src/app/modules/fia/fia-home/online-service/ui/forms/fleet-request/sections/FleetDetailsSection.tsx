import React from 'react'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'

type FleetDetailsSectionProps = {
  values: {
    fleetType: string
    additionInformation: string
    numberOfUnits: string
    specifications: string
  }
  setFieldValue: (field: string, value: any) => void
  getFleetTypeOptions: () => Array<{ value: string; label: string }>
  getNumberOfUnitsOptions: () => Array<{ value: string; label: string }>
  getSpecificationsOptions: () => Array<{ value: string; label: string }>
}

export default function FleetDetailsSection({
  values,
  setFieldValue,
  getFleetTypeOptions,
  getNumberOfUnitsOptions,
  getSpecificationsOptions,
}: FleetDetailsSectionProps) {
  return (
    <FormSection title='Fleet Request Details'>
      <div className='row'>
        <div className='col-md-6'>
          <FormSelect
            label='Fleet Type'
            name='fleetDetails.fleetType'
            value={values.fleetType}
            onChange={(value) => setFieldValue('fleetDetails.fleetType', value)}
            options={getFleetTypeOptions()}
            required
          />
        </div>
        <div className='col-md-6'>
          <FormSelect
            label='Number of Units'
            name='fleetDetails.numberOfUnits'
            value={values.numberOfUnits}
            onChange={(value) => setFieldValue('fleetDetails.numberOfUnits', value)}
            options={getNumberOfUnitsOptions()}
            required
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <FormTextarea
            label='Addition Information'
            name='fleetDetails.additionInformation'
            value={values.additionInformation}
            onChange={(value) => setFieldValue('fleetDetails.additionInformation', value)}
            rows={1}
            placeholder='Enter additional information'
          />
        </div>
        <div className='col-md-6'>
          <FormSelect
            label='Specifications'
            name='fleetDetails.specifications'
            value={values.specifications}
            onChange={(value) => setFieldValue('fleetDetails.specifications', value)}
            options={getSpecificationsOptions()}
          />
        </div>
      </div>
    </FormSection>
  )
}


