import React from 'react'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'

/** Display Rp.100.000 — stored value remains plain integer (e.g. 100000). */
function formatAmountRequestDisplay(amount: number): string {
  if (!amount || amount <= 0) return ''
  return `Rp.${amount.toLocaleString('id-ID')}`
}

function parseAmountRequestInput(raw: string): number {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return 0
  const n = Number.parseInt(digits, 10)
  return Number.isFinite(n) ? n : 0
}

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
            value={formatAmountRequestDisplay(values.amountRequest)}
            onChange={(value) =>
              setFieldValue('cashRequestDetails.amountRequest', parseAmountRequestInput(value))
            }
            type='text'
            inputMode='numeric'
            placeholder='Rp.0'
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
            placeholder='Enter bank account'
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Currency'
            name='cashRequestDetails.currency'
            value={values.currency}
            onChange={(value) => setFieldValue('cashRequestDetails.currency', value)}
            placeholder='Enter currency'
          />
        </div>
      </div>
       
    </FormSection>
  )
}
