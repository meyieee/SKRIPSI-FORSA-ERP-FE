import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { FeedsFilters } from '../core/types'
import {
  defaultSiteOptions,
  defaultDepartmentOptions,
  defaultSectionOptions,
  defaultElementOptions,
} from '../core/constants'

type Props = {
  filters: FeedsFilters
  onFilterChange: (filters: FeedsFilters) => void
}

const FeedsFilterBar: React.FC<Props> = ({ filters, onFilterChange }) => {
  const handleChange = (field: keyof FeedsFilters, value: string) => {
    onFilterChange({ ...filters, [field]: value })
  }

  const handleReset = () => {
    onFilterChange({ site: '', department: '', section: '', element: '', date: '' })
  }

  return (
    <div className='mt-3 mb-3 p-3 border rounded'>
      <Row className='g-3 align-items-end row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6'>
        <Col>
          <Form.Label className='fw-semibold'>Site | Branch</Form.Label>
          <Form.Select value={filters.site} onChange={(e) => handleChange('site', e.target.value)}>
            <option value=''>default: All</option>
            {defaultSiteOptions.map((site) => (
              <option key={site} value={site}>
                {site}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label className='fw-semibold'>Department</Form.Label>
          <Form.Select
            value={filters.department}
            onChange={(e) => handleChange('department', e.target.value)}
          >
            <option value=''>default: All</option>
            {defaultDepartmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label className='fw-semibold'>Section</Form.Label>
          <Form.Select
            value={filters.section}
            onChange={(e) => handleChange('section', e.target.value)}
          >
            <option value=''>default: All</option>
            {defaultSectionOptions.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label className='fw-semibold'>Element</Form.Label>
          <Form.Select
            value={filters.element}
            onChange={(e) => handleChange('element', e.target.value)}
          >
            <option value=''>default: All</option>
            {defaultElementOptions.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label className='fw-semibold'>Date</Form.Label>
          <Form.Control
            type='date'
            value={filters.date}
            onChange={(e) => handleChange('date', e.target.value)}
            placeholder='default: All'
          />
        </Col>
        <Col>
          <Form.Label className='fw-semibold invisible'>Actions</Form.Label>
          <div className='d-flex flex-column flex-md-row gap-2 w-100 justify-content-end'>
            <Button variant='secondary' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default FeedsFilterBar

