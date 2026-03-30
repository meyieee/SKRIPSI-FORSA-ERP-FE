import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

interface HistoryModalProps {
  show: boolean
  onHide: () => void
  onDateRangeSubmit: (startDate: string | null, endDate: string | null) => void
}

const HistoryModal: React.FC<HistoryModalProps> = ({show, onHide, onDateRangeSubmit}) => {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [errors, setErrors] = useState<{startDate?: string; endDate?: string}>({})

  const validateDates = () => {
    const newErrors: {startDate?: string; endDate?: string} = {}

    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      if (start > end) {
        newErrors.endDate = 'End date must be after start date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateDates()) {
      return
    }

    // Konversi tanggal ke format yang sesuai
    const startDateValue = startDate.trim() === '' ? null : startDate
    const endDateValue = endDate.trim() === '' ? null : endDate

    onDateRangeSubmit(startDateValue, endDateValue)
    onHide() // Close modal setelah submit
  }

  const handleReset = () => {
    setStartDate('')
    setEndDate('')
    setErrors({})
  }

  const handleModalHide = () => {
    handleReset()
    onHide()
  }

  // Handle tanggal input changes
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
    if (errors.startDate || errors.endDate) {
      setErrors({})
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
    if (errors.startDate || errors.endDate) {
      setErrors({})
    }
  }

  return (
    <Modal show={show} onHide={handleModalHide} centered size='lg'>
      <Modal.Header>
        <Modal.Title>Filter History by Date Range</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='mb-3'>
          <small className='text-muted'>
            Filter approval history by date range to find processed items (Approved/Rejected). Leave
            fields empty to show all history data.
          </small>
        </div>

        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type='date'
              value={startDate}
              onChange={handleStartDateChange}
              isInvalid={!!errors.startDate}
            />
            {errors.startDate && (
              <Form.Control.Feedback type='invalid'>{errors.startDate}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type='date'
              value={endDate}
              onChange={handleEndDateChange}
              isInvalid={!!errors.endDate}
            />
            {errors.endDate && (
              <Form.Control.Feedback type='invalid'>{errors.endDate}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-secondary' onClick={handleReset}>
          Reset
        </Button>
        <Button variant='secondary' onClick={handleModalHide}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Apply Filter
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default HistoryModal
