import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { HotlineFilters } from '../core/types'
import {
  defaultSiteOptions,
  defaultDepartmentOptions,
  defaultSectionOptions,
  defaultElementOptions,
} from '../core/constants'

type Props = {
  filters: HotlineFilters
  onFilterChange: (filters: HotlineFilters) => void
  onView: () => void
  onUpdate: () => void
}

const HotlineFilterBar: React.FC<Props> = ({ filters, onFilterChange, onView, onUpdate }) => {
  const handleChange = (field: keyof HotlineFilters, value: string) => {
    onFilterChange({ ...filters, [field]: value })
  }

  return (
    <div className='mb-5 p-3 border rounded'>
      <Row className='g-3 align-items-end'>
        <Col lg={2}>
          <Form.Label className='fw-semibold'>Site | Branch</Form.Label>
          <Form.Select value={filters.site} onChange={(e) => handleChange('site', e.target.value)}>
            <option value=''>[combo]</option>
            {defaultSiteOptions.map((site) => (
              <option key={site} value={site}>
                {site}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={2}>
          <Form.Label className='fw-semibold'>Department</Form.Label>
          <Form.Select
            value={filters.department}
            onChange={(e) => handleChange('department', e.target.value)}
          >
            <option value=''>[combo]</option>
            {defaultDepartmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={2}>
          <Form.Label className='fw-semibold'>Section</Form.Label>
          <Form.Select
            value={filters.section}
            onChange={(e) => handleChange('section', e.target.value)}
          >
            <option value=''>[default All]</option>
            {defaultSectionOptions.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={2}>
          <Form.Label className='fw-semibold'>Element</Form.Label>
          <Form.Select
            value={filters.element}
            onChange={(e) => handleChange('element', e.target.value)}
          >
            <option value=''>[default All]</option>
            {defaultElementOptions.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={2}>
          <Form.Label className='fw-semibold'>Date</Form.Label>
          <Form.Control
            type='date'
            value={filters.date}
            onChange={(e) => handleChange('date', e.target.value)}
            placeholder='[default All]'
          />
        </Col>
        <Col lg={2} className='d-flex justify-content-end gap-2'>
          <Form.Label className='fw-semibold invisible'>Actions</Form.Label>
          <div className='d-flex gap-2'>
            <Button variant='primary' onClick={onView}>
              View
            </Button>
            <Button variant='primary' onClick={onUpdate}>
              Update
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HotlineFilterBar

