import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

interface AddEventModalProps {
  show: boolean
  handleClose: () => void
  onSubmit: (event: {title: string; date: string}) => void
  initialDate?: string
  title?: string
  editMode?: boolean
  onDelete?: () => void
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  show,
  handleClose,
  onSubmit,
  initialDate,
  title: initialTitle,
  editMode,
  onDelete,
}) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(initialDate || '')

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (show) {
      setTitle(initialTitle || '')
      setDate(initialDate || '')
    }
  }, [show, initialTitle, initialDate])

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
        </Modal.Body>
        <Modal.Footer>
          {editMode && (
            <Button variant='danger' onClick={onDelete}>
              Delete
            </Button>
          )}
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            {editMode ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddEventModal
