import React from 'react'
import { useCashAtoms } from '../../../../hooks/useCashAtoms'

export default function RequestHeader() {
  const { form } = useCashAtoms()
  if (!form) return null

  return (
    <div className='d-flex justify-content-between align-items-center mb-6'>
      <div>
        <h3 className='card-title mb-2'>CASH REQUEST FORM</h3>
        <div className='fw-bold'>Request ID: {form.header.requestId}</div>
        <div className='text-muted'>Request Type: {form.header.requestType} | Ref: {form.header.refRequestNo}</div>
      </div>
    </div>
  )
}
