import React from 'react'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

type TransferDetailsSectionProps = {
  values: {
    currentOwner: string
    workLocation: string
    reasonForTransfer: string
  }
  setFieldValue: (field: string, value: any) => void
  fleetLocationOptions: Array<{ value: string; label: string }>
  getReasonForTransferOptions: () => Array<{ value: string; label: string }>
}

export default function TransferDetailsSection({
  values,
  setFieldValue,
  fleetLocationOptions,
  getReasonForTransferOptions,
}: TransferDetailsSectionProps) {
  return (
    <FormSection title='Transfer Fleet Details (if applicable)'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Current Owner'
            name='transferDetails.currentOwner'
            value={values.currentOwner}
            onChange={(value) => setFieldValue('transferDetails.currentOwner', value)}
            placeholder='[text input]'
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Work Location'
            name='transferDetails.workLocation'
            value={values.workLocation}
            onChange={(value) => setFieldValue('transferDetails.workLocation', value)}
            options={fleetLocationOptions}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Reason for Transfer'
            name='transferDetails.reasonForTransfer'
            value={values.reasonForTransfer}
            onChange={(value) => setFieldValue('transferDetails.reasonForTransfer', value)}
            options={getReasonForTransferOptions()}
          />
        </div>
      </div>
    </FormSection>
  )
}


