import React from 'react'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'

type AssetDetailsSectionProps = {
  values: {
    assetType: string
    assetModel: string
    assetSpecification: string
    quantity: number
    comments: string
  }
  setFieldValue: (field: string, value: any) => void
  getAssetTypeOptions: () => Array<{ value: string; label: string }>
}

export default function AssetDetailsSection({
  values,
  setFieldValue,
  getAssetTypeOptions,
}: AssetDetailsSectionProps) {
  return (
    <FormSection title='Asset Details'>
      <div className='row'>
        <div className='col-md-6'>
          <FormSelect
            label='Asset Type'
            name='assetDetails.assetType'
            value={values.assetType}
            onChange={(value) => setFieldValue('assetDetails.assetType', value)}
            options={getAssetTypeOptions()}
            required
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Asset Model'
            name='assetDetails.assetModel'
            value={values.assetModel}
            onChange={(value) => setFieldValue('assetDetails.assetModel', value)}
            placeholder='Enter asset model'
            required
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <FormField
            label='Asset Specification'
            name='assetDetails.assetSpecification'
            value={values.assetSpecification}
            onChange={(value) => setFieldValue('assetDetails.assetSpecification', value)}
            placeholder='Enter asset specification'
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Quantity'
            name='assetDetails.quantity'
            value={values.quantity}
            onChange={(value) => setFieldValue('assetDetails.quantity', parseInt(value) || 1)}
            type='number'
            min={1}
            required
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <FormTextarea
            label='Comments'
            name='assetDetails.comments'
            value={values.comments}
            onChange={(value) => setFieldValue('assetDetails.comments', value)}
            rows={3}
            placeholder='Enter comments'
          />
        </div>
      </div>
    </FormSection>
  )
}
