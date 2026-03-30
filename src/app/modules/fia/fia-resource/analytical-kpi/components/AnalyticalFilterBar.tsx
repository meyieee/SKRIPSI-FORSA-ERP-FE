import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {useAnalyticalFilters} from '../AnalyticalFilterContext'

// props opsional: kalau suatu halaman mau override daftar opsi
type Props = {
  siteOptions?: string[]
  deptOptions?: string[]
  sectionOptions?: (string | undefined)[]
  elementOptions?: (string | undefined)[]
  onApply?: (filters: any) => void // mis. trigger fetch
}

const uniq = (arr: (string | undefined)[] = []) =>
  Array.from(new Set(arr.filter((v): v is string => !!v && v.trim() !== '')))

const AnalyticalFilterBar: React.FC<Props> = ({
  siteOptions = [],
  deptOptions = [],
  sectionOptions = [],
  elementOptions = [],
  onApply,
}) => {
  const {filters, setFilters, reset} = useAnalyticalFilters()
  const onChange =
    (k: keyof typeof filters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFilters((s) => ({...s, [k]: e.target.value}))

  return (
    <div className='mb-3 p-3 border rounded'>
      <Row className='g-3 align-items-end'>
        <Col md={2}>
          <Form.Label className='fw-semibold'>Site | Branch</Form.Label>
          <Form.Select value={filters.site} onChange={onChange('site')}>
            <option value=''>[Default All]</option>
            {uniq(siteOptions).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label className='fw-semibold'>Department</Form.Label>
          <Form.Select value={filters.department} onChange={onChange('department')}>
            <option value=''>[Default All]</option>
            {uniq(deptOptions).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label className='fw-semibold'>Section</Form.Label>
          <Form.Select value={filters.section} onChange={onChange('section')}>
            <option value=''>[Default All]</option>
            {uniq(sectionOptions).map((v) => (
              <option key={v} value={v ?? ''}>
                {v ?? ''}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label className='fw-semibold'>Element</Form.Label>
          <Form.Select value={filters.element} onChange={onChange('element')}>
            <option value=''>[Default All]</option>
            {uniq(elementOptions).map((v) => (
              <option key={v} value={v ?? ''}>
                {v ?? ''}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label className='fw-semibold'>Date</Form.Label>
          <Form.Control type='date' value={filters.date} onChange={onChange('date')} />
        </Col>
        <Col md={2} className='d-flex justify-content-end align-items-end'>
          <div className='d-flex flex-column flex-md-row gap-2 w-100 justify-content-end'>
            <Button variant='secondary' onClick={reset}>
              Reset
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AnalyticalFilterBar
