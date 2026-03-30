import React from 'react'
import { AccommodationRequestHeader } from '../../../../core/accommodation-request'

type HeaderSectionProps = {
  header: AccommodationRequestHeader
}

export default function HeaderSection({ header }: HeaderSectionProps) {
  return (
    <div className='header-info-section mb-4'>
      <div className='d-flex gap-4 align-items-center'>
        <div className='fw-bold'>Request ID: {header.requestId}</div>
        <div className='fw-bold'>Request Type: {header.requestType}</div>
        <div className='fw-bold'>Ref Request No: {header.refRequestNo}</div>
      </div>
    </div>
  )
}



