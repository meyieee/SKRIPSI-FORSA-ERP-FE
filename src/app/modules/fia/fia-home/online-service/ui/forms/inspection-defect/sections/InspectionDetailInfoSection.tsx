import React, { useEffect } from 'react'
import { InspectionDetailInfo, getAssetDetails } from '../../../../core/inspection-defect'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'

type InspectionDetailInfoSectionProps = {
  values: InspectionDetailInfo
  setFieldValue: (field: string, value: any) => void
  getAssetOptions: () => Array<{ value: string; description: string; type: string; model: string }>
}

export default function InspectionDetailInfoSection({
  values,
  setFieldValue,
  getAssetOptions,
}: InspectionDetailInfoSectionProps) {
  // Fallback untuk values jika undefined
  const safeValues = values || {
    assetNo: '',
    assetDescription: '',
    assetType: '',
    assetModel: '',
    location: '',
    inspectionSummary: '',
    notesComments: '',
    additionalNotes: '',
  }
  
  // Auto-fill asset details when assetNo changes
  useEffect(() => {
    if (safeValues.assetNo) {
      const assetDetails = getAssetDetails(safeValues.assetNo)
      if (assetDetails) {
        setFieldValue('inspectionDetailInfo.assetDescription', assetDetails.assetDescription)
        setFieldValue('inspectionDetailInfo.assetType', assetDetails.assetType)
        setFieldValue('inspectionDetailInfo.assetModel', assetDetails.assetModel)
      }
    } else {
      // Clear fields if assetNo is empty
      setFieldValue('inspectionDetailInfo.assetDescription', '')
      setFieldValue('inspectionDetailInfo.assetType', '')
      setFieldValue('inspectionDetailInfo.assetModel', '')
    }
  }, [safeValues.assetNo, setFieldValue])

  const assetOptions = getAssetOptions().map(asset => ({
    value: asset.value,
    label: `${asset.value} - ${asset.description}`
  }))

  return (
      <FormSection title='Inspection Detail Info'>
        <div className='row'>
          <div className='col-md-4'>
            <FormSelect
              label='Asset No'
              name='inspectionDetailInfo.assetNo'
              value={safeValues.assetNo}
              onChange={(value) => setFieldValue('inspectionDetailInfo.assetNo', value)}
              options={assetOptions}
            />
            {safeValues.assetNo && (safeValues.assetDescription || safeValues.assetType || safeValues.assetModel) && (
              <div className='mt-2 p-2 bg-light rounded border'>
                {safeValues.assetDescription && (
                  <div className='mb-1'>
                    <small className='text-muted d-block'>Asset Description:</small>
                    <span className='fw-semibold'>{safeValues.assetDescription}</span>
                  </div>
                )}
                {safeValues.assetType && (
                  <div className='mb-1'>
                    <small className='text-muted d-block'>Asset Type:</small>
                    <span className='fw-semibold'>{safeValues.assetType}</span>
                  </div>
                )}
                {safeValues.assetModel && (
                  <div>
                    <small className='text-muted d-block'>Asset Model:</small>
                    <span className='fw-semibold'>{safeValues.assetModel}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='col-md-4'>
            <FormField
              label='Location'
              name='inspectionDetailInfo.location'
              value={safeValues.location}
              onChange={(value) => setFieldValue('inspectionDetailInfo.location', value)}
              placeholder='Enter location'
            />
          </div>
          <div className='col-md-4'>
            <FormTextarea
              label='Inspection Summary'
              name='inspectionDetailInfo.inspectionSummary'
              value={safeValues.inspectionSummary}
              onChange={(value) => setFieldValue('inspectionDetailInfo.inspectionSummary', value)}
              rows={2}
              placeholder='Enter detailed inspection summary...'
            />
          </div>
        </div>
  
        <div className='row'>
          <div className='col-md-6'>
            <FormTextarea
              label='Notes | Comments'
              name='inspectionDetailInfo.notesComments'
              value={safeValues.notesComments}
              onChange={(value) => setFieldValue('inspectionDetailInfo.notesComments', value)}
              rows={2}
              placeholder='Enter notes or comments'
            />
          </div>
          <div className='col-md-6'>
            <FormTextarea
              label='Additional Notes'
              name='inspectionDetailInfo.additionalNotes'
              value={safeValues.additionalNotes}
              onChange={(value) => setFieldValue('inspectionDetailInfo.additionalNotes', value)}
              rows={2}
              placeholder='Enter additional notes'
            />
          </div>
        </div>
      </FormSection>
    )
  }


