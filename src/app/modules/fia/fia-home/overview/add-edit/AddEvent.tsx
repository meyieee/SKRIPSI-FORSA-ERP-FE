import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

interface AddEventModalProps {
  show: boolean
  handleClose: () => void
  onSubmit: (event: {title: string; date: string}) => void
  initialDate?: string
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  show,
  handleClose,
  onSubmit,
  initialDate,
}) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(initialDate || '')

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (show) {
      setTitle('')
      setDate(initialDate || '')
    }
  }, [show, initialDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && date) {
      onSubmit({title, date})
      handleClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter event name'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Batal
          </Button>
          <Button variant='primary' type='submit'>
            Simpan
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddEventModal
