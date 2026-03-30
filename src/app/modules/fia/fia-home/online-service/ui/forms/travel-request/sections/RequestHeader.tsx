import React from 'react'
import { useTravelAtoms } from '../../../../hooks/useTravelAtoms'

export default function RequestHeader() {
  const { form } = useTravelAtoms()
  if (!form) return null

  return (
    <div>
      <h3 className='card-title mb-2'>CREATE TRAVEL REQUEST</h3>
      <div className='fw-bold'>Request ID: {form.header.requestId}</div>
      <div className='text-muted'>Request Type: {form.header.requestType} | Ref: {form.header.refRequestNo}</div>
    </div>
  )
}