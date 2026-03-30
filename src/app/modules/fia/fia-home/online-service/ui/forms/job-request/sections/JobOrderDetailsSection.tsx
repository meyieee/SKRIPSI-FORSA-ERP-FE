import React from 'react'
import { JobOrderDetails } from '../../../../core/job-request'
import FormSection from '../../common/components/FormSection'
import FormSelect from '../../common/components/FormSelect'

type JobOrderDetailsSectionProps = {
  values: JobOrderDetails
  setFieldValue: (field: string, value: any) => void
  getJobTypeOptions: () => Array<{ value: string; label: string }>
  locationOptions: Array<{ value: string; label: string }>
  assetEquipmentOptions: Array<{ value: string; label: string }>
}

export default function JobOrderDetailsSection({
  values,
  setFieldValue,
  getJobTypeOptions,
  locationOptions,
  assetEquipmentOptions,
}: JobOrderDetailsSectionProps) {
  return (
    <FormSection title='Job Order Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Job Type'
            name='jobOrder.jobType'
            value={values.jobType}
            onChange={(value) => setFieldValue('jobOrder.jobType', value)}
            options={getJobTypeOptions()}
            placeholder='[combo]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Location'
            name='jobOrder.location'
            value={values.location}
            onChange={(value) => setFieldValue('jobOrder.location', value)}
            options={locationOptions}
            placeholder='[combo]'
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Asset/Equipment No'
            name='jobOrder.assetEquipment'
            value={values.assetEquipment}
            onChange={(value) => setFieldValue('jobOrder.assetEquipment', value)}
            options={assetEquipmentOptions}
            placeholder='[combo]'
            required
          />
        </div>
      </div>
    </FormSection>
  )
}
