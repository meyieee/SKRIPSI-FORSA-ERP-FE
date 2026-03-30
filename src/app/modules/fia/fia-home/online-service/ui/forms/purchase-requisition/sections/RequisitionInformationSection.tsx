import React from 'react'
import { RequisitionInformation } from '../../../../core/purchase-requisition'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'

type RequisitionInformationSectionProps = {
  values: RequisitionInformation
  setFieldValue: (field: string, value: any) => void
}

export default function RequisitionInformationSection({
  values,
  setFieldValue,
}: RequisitionInformationSectionProps) {
  return (
    <FormSection title='Supplier/Vendor Information :'>
      <div className='row'>
        <div className='col-md-6'>
          <FormField
            label='Supplier'
            name='requisitionInfo.supplier'
            value={values.supplier}
            onChange={(value) => setFieldValue('requisitionInfo.supplier', value)}
            placeholder='supplier'
            required
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Supplier Address'
            name='requisitionInfo.supplierAddress'
            value={values.supplierAddress}
            onChange={(value) => setFieldValue('requisitionInfo.supplierAddress', value)}
            placeholder='field yang di ambil dari master supplier'
            readOnly={true}
            className='bg-light'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <FormField
            label='Supplier Contact'
            name='requisitionInfo.supplierContact'
            value={values.supplierContact}
            onChange={(value) => setFieldValue('requisitionInfo.supplierContact', value)}
            placeholder='field yang di ambil dari master supplier'
            readOnly={true}
            className='bg-light'
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Comments'
            name='requisitionInfo.comments'
            value={values.comments}
            onChange={(value) => setFieldValue('requisitionInfo.comments', value)}
            placeholder='comments'
          />
        </div>
      </div>
    </FormSection>
  )
}

