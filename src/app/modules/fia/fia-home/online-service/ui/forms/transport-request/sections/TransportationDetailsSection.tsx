import React from 'react'
import { TransportationDetails } from '../../../../core/transport-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'

type TransportationDetailsSectionProps = {
  values: TransportationDetails
  setFieldValue: (field: string, value: any) => void
  getModeOfTransportOptions: () => Array<{ value: string; label: string }>
  getTimeOptions: () => Array<{ value: string; label: string }>
}

export default function TransportationDetailsSection({
  values,
  setFieldValue,
  getModeOfTransportOptions,
  getTimeOptions,
}: TransportationDetailsSectionProps) {
  return (
    <FormSection title='Transportation Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Destination'
            name='transportationDetails.destination'
            value={values.destination}
            onChange={(value) => setFieldValue('transportationDetails.destination', value)}
            placeholder='[destination]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Mode of Transport'
            name='transportationDetails.modeOfTransport'
            value={values.modeOfTransport}
            onChange={(value) => setFieldValue('transportationDetails.modeOfTransport', value)}
            options={getModeOfTransportOptions()}
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Number of Passengers'
            name='transportationDetails.noOfPassengers'
            value={values.noOfPassengers}
            onChange={(value) => setFieldValue('transportationDetails.noOfPassengers', value)}
            type='number'
            placeholder='[number]'
            required
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Pick Up Time'
            name='transportationDetails.pickUpTime'
            value={values.pickUpTime}
            onChange={(value) => setFieldValue('transportationDetails.pickUpTime', value)}
            options={getTimeOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Drop Off Time'
            name='transportationDetails.dropOffTime'
            value={values.dropOffTime}
            onChange={(value) => setFieldValue('transportationDetails.dropOffTime', value)}
            options={getTimeOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Special Requirement'
            name='transportationDetails.specialRequirement'
            value={values.specialRequirement}
            onChange={(value) => setFieldValue('transportationDetails.specialRequirement', value)}
            rows={1}
            placeholder='[text input]'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <FormTextarea
            label='Comments'
            name='transportationDetails.comments'
            value={values.comments}
            onChange={(value) => setFieldValue('transportationDetails.comments', value)}
            rows={2}
            placeholder='[text input]'
          />
        </div>
      </div>
    </FormSection>
  )
}

