import React from 'react'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

type CashRequestDetailsSectionProps = {
  values: {
    expenseType: string
    amountRequest: number
    paymentMethod: string
    bankAccount: string
    currency: string
  }
  setFieldValue: (field: string, value: any) => void
  getExpenseTypeOptions: () => Array<{ value: string; label: string }>
  getPaymentMethodOptions: () => Array<{ value: string; label: string }>
}

export default function CashRequestDetailsSection({
  values,
  setFieldValue,
  getExpenseTypeOptions,
  getPaymentMethodOptions,
}: CashRequestDetailsSectionProps) {
  return (
    <FormSection title='Cash Request Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Expense Type'
            name='cashRequestDetails.expenseType'
            value={values.expenseType}
            onChange={(value) => setFieldValue('cashRequestDetails.expenseType', value)}
            options={getExpenseTypeOptions()}
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Amount Request'
            name='cashRequestDetails.amountRequest'
            value={values.amountRequest}
            onChange={(value) => setFieldValue('cashRequestDetails.amountRequest', parseFloat(value) || 0)}
            type='number'
            min={0}
            step='0.01'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Payment Method'
            name='cashRequestDetails.paymentMethod'
            value={values.paymentMethod}
            onChange={(value) => setFieldValue('cashRequestDetails.paymentMethod', value)}
            options={getPaymentMethodOptions()}
            required
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <FormField
            label='Bank Account'
            name='cashRequestDetails.bankAccount'
            value={values.bankAccount}
            onChange={(value) => setFieldValue('cashRequestDetails.bankAccount', value)}
            placeholder='[text input]'
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Currency'
            name='cashRequestDetails.currency'
            value={values.currency}
            onChange={(value) => setFieldValue('cashRequestDetails.currency', value)}
            placeholder='[text input]'
          />
        </div>
      </div>
       
    </FormSection>
  )
}
