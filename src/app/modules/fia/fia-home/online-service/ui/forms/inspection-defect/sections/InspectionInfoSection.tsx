import React from 'react'
import { InspectionInfo } from '../../../../core/inspection-defect'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'
import { formatLocalDate } from '../../../../core/_date'

type InspectionInfoSectionProps = {
  values: InspectionInfo
  setFieldValue: (field: string, value: any) => void
  getInspectionTypeOptions: () => Array<{ value: string; label: string }>
}

export default function InspectionInfoSection({
  values,
  setFieldValue,
  getInspectionTypeOptions,
}: InspectionInfoSectionProps) {
  // Fallback untuk values jika undefined
  const safeValues = values || {
    inspectionDate: formatLocalDate(new Date()),
    inspectionType: '',
    inspectionDescription: '',
    inspectionBy: '',
    inspectionByJobTitle: '',
    inspectionFor: '',
    inspectionForJobTitle: '',
    priority: '',
    department: '',
    relevantDocs: '',
    costCenter: '',
    justificationReason: '',
    justificationBenefit: '',
  }
  
  return (
    <FormSection title='Inspection Information'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Inspection Date'
            name='inspectionInfo.inspectionDate'
            value={safeValues.inspectionDate}
            onChange={(value) => setFieldValue('inspectionInfo.inspectionDate', value)}
            type='date'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Inspection Type'
            name='inspectionInfo.inspectionType'
            value={safeValues.inspectionType}
            onChange={(value) => setFieldValue('inspectionInfo.inspectionType', value)}
            options={getInspectionTypeOptions()}
            required
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Inspection Description'
            name='inspectionInfo.inspectionDescription'
            value={safeValues.inspectionDescription}
            onChange={(value) => setFieldValue('inspectionInfo.inspectionDescription', value)}
            rows={2}
            placeholder='Enter inspection description'
            required
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Inspection By'
            name='inspectionInfo.inspectionBy'
            value={safeValues.inspectionBy}
            onChange={(value) => setFieldValue('inspectionInfo.inspectionBy', value)}
            placeholder='[name - id number]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Job Title'
            name='inspectionInfo.inspectionByJobTitle'
            value={safeValues.inspectionByJobTitle}
            onChange={(value) => setFieldValue('inspectionInfo.inspectionByJobTitle', value)}
            placeholder='[job title]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Inspection For'
            name='inspectionInfo.inspectionFor'
            value={safeValues.inspectionFor}
            onChange={(value) => setFieldValue('inspectionInfo.inspectionFor', value)}
            placeholder='[name - id number]'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Job Title'
            name='inspectionInfo.inspectionForJobTitle'
            value={safeValues.inspectionForJobTitle}
            onChange={(value) => setFieldValue('inspectionInfo.inspectionForJobTitle', value)}
            placeholder='[job title]'
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Justification - Reason'
            name='inspectionInfo.justificationReason'
            value={safeValues.justificationReason}
            onChange={(value) => setFieldValue('inspectionInfo.justificationReason', value)}
            rows={2}
            placeholder='[reason for request]'
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Justification - Expected Outcomes'
            name='inspectionInfo.justificationBenefit'
            value={safeValues.justificationBenefit}
            onChange={(value) => setFieldValue('inspectionInfo.justificationBenefit', value)}
            rows={2}
            placeholder='[expected outcomes]'
          />
        </div>
      </div>
    </FormSection>
  )
}

