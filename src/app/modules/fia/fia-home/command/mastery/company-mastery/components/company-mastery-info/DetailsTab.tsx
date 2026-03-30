import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Company} from '../../core/types'

type Props = {
  company: Company
}

const DetailsTab: React.FC<Props> = ({company}) => {
  return (
    <Row className='g-4 mb-4'>
      {/* Bill To Details */}
      <Col md={6}>
        <div className='bg-dark text-white p-2 mb-3 fw-bold'>BILL TO DETAILS</div>
        <div className='mb-3'>
          <div className='mb-1'>Bill To :</div>
          <div className='border-bottom pb-1'>{company.addresses?.billTo?.to || '-'}</div>
        </div>
        <div className='mb-3'>
          <div className='mb-1'>Full Address :</div>
          <div className='border-bottom pb-1'>{company.addresses?.billTo?.fullAddress?.split('\n')[0] || '-'}</div>
          <div className='border-bottom pb-1 mt-1'>{company.addresses?.billTo?.fullAddress?.split('\n')[1] || ''}</div>
          <div className='border-bottom pb-1 mt-1'>{company.addresses?.billTo?.fullAddress?.split('\n')[2] || ''}</div>
        </div>
        <div className='mb-3'>
          <div className='mb-1'>Attention :</div>
          <div className='border-bottom pb-1'>{company.addresses?.billTo?.attention || '-'}</div>
        </div>
        <div>
          <div className='mb-1'>Contact Number :</div>
          <div className='border-bottom pb-1'>{company.addresses?.billTo?.phone || '-'}</div>
        </div>
      </Col>

      {/* Ship To Details */}
      <Col md={6}>
        <div className='bg-dark text-white p-2 mb-3 fw-bold'>SHIP TO DETAILS</div>
        <div className='mb-3'>
          <div className='mb-1'>Ship To :</div>
          <div className='border-bottom pb-1'>{company.addresses?.shipTo?.to || '-'}</div>
        </div>
        <div className='mb-3'>
          <div className='mb-1'>Full Address :</div>
          <div className='border-bottom pb-1'>{company.addresses?.shipTo?.fullAddress?.split('\n')[0] || '-'}</div>
          <div className='border-bottom pb-1 mt-1'>{company.addresses?.shipTo?.fullAddress?.split('\n')[1] || ''}</div>
          <div className='border-bottom pb-1 mt-1'>{company.addresses?.shipTo?.fullAddress?.split('\n')[2] || ''}</div>
        </div>
        <div className='mb-3'>
          <div className='mb-1'>Attention :</div>
          <div className='border-bottom pb-1'>{company.addresses?.shipTo?.attention || '-'}</div>
        </div>
        <div>
          <div className='mb-1'>Contact Number :</div>
          <div className='border-bottom pb-1'>{company.addresses?.shipTo?.phone || '-'}</div>
        </div>
      </Col>
    </Row>
  )
}

export default DetailsTab

