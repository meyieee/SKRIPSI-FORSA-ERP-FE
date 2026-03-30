import React from 'react'
import {Row, Col, Form} from 'react-bootstrap'

const RegisterTab: React.FC = () => {
  return (
    <Row className='g-3'>
      <Col md={6}>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Superceded #1</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Superceded #2</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Manufacture No</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Model</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Size</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Color</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Dangerous (Y/N)</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Description | Spec</Form.Label>
          <Form.Control as='textarea' rows={3} />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Unit of Material</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>UOM Quantity</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Stock Category</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Group</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Class</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Register By</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-semibold'>Register Date</Form.Label>
          <Form.Control type='date' />
        </Form.Group>
        <Row className='g-3'>
          <Col md={6}>
            <div className='border rounded d-flex align-items-center justify-content-center bg-light' style={{height: 120}}>
              Picture
            </div>
          </Col>
          <Col md={6}>
            <div className='border rounded d-flex align-items-center justify-content-center bg-light' style={{height: 120}}>
              Barcode
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default RegisterTab


