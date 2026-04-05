import React from 'react'
import './HeaderSection.scss'

type HeaderSectionProps = {
  requestId: string
  requestType: string
  refRequestNo: string
}

export default function HeaderSection({ requestId, requestType, refRequestNo }: HeaderSectionProps) {
  return (
    <div className='header-info-section'>
      <div className='d-flex gap-4 align-items-center'>
        <div className='fw-bold'>Request ID: {requestId}</div>
        <div className='fw-bold'>Request Type: {requestType}</div>
        <div className='fw-bold'>Ref Request No: {refRequestNo}</div>
      </div>
    </div>
  )
}

