import React from 'react'
import { useAssetAtoms } from '../../../../hooks/useAssetAtoms'

export default function RequestHeader() {
  const { form } = useAssetAtoms()
  if (!form) return null

  return (
    <div className='d-flex justify-content-between align-items-center mb-6'>
      <div>
        <h3 className='card-title mb-2'>ASSET REQUEST FORM</h3>
        <div className='fw-bold'>Request ID: {form.header.requestId}</div>
        <div className='text-muted'>Request Type: {form.header.requestType} | Ref: {form.header.refRequestNo}</div>
      </div>
    </div>
  )
}
