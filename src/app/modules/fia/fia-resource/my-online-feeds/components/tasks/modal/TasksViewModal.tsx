import React, {useEffect, useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {TasksRow} from '../types'
import {KTSVG} from '../../../../../../../../_metronic'
import '../scss/tasksstyles.scss'

interface TaskViewModalProps {
  show: boolean
  onHide: () => void
  task: TasksRow | null

  // ✅ baru
  editable?: boolean
  onSaveStatus?: (taskId: number, status: 'Outstanding' | 'Completed') => Promise<void>
}

const TaskViewModal: React.FC<TaskViewModalProps> = ({
  show,
  onHide,
  task,
  editable = false,
  onSaveStatus,
}) => {
  const [status, setStatus] = useState<'Outstanding' | 'Completed'>('Outstanding')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!task) return
    // kalau complete ada isi -> anggap Completed
    setStatus(task.complete ? 'Completed' : 'Outstanding')
  }, [task])

  if (!task) return null

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'P#1':
        return 'badge badge-danger fs-7 fw-semibold'
      case 'P#2':
        return 'badge badge-warning fs-7 fw-semibold'
      case 'P#3':
        return 'badge badge-success fs-7 fw-semibold'
      default:
        return 'badge badge-light fs-7 fw-semibold'
    }
  }

  const getCompleteClass = (complete: string) =>
    complete ? 'badge badge-primary fs-7 fw-semibold' : 'badge badge-secondary fs-7 fw-semibold'

  const handleSave = async () => {
    if (!task || !onSaveStatus) return
    try {
      setSaving(true)
      await onSaveStatus(task.id, status)
      onHide()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered size='lg' className='task-view-modal small-modal'>
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG
            path='/media/icons/duotune/general/gen004.svg'
            className='svg-icon-2 me-2 text-primary'
          />
          Task Detail
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='task-detail-item'>
          <span className='label'>Assigned By:</span>
          <span className='value'>{task.assigned_by}</span>
        </div>

        <div className='task-detail-item'>
          <span className='label'>Task Subject:</span>
          <span className='value'>{task.taks_subject}</span>
        </div>

        <div className='task-detail-item'>
          <span className='label'>Short Description:</span>
          <span className='value'>{task.short_description}</span>
        </div>

        <div className='task-detail-item'>
          <span className='label'>Priority:</span>
          <span className={getPriorityClass(task.priority)}>{task.priority}</span>
        </div>

        <div className='task-detail-item'>
          <span className='label'>Due Date:</span>
          <span className='value'>{task.due_date}</span>
        </div>

        {/* ✅ Complete section jadi bisa edit */}
        <div className='task-detail-item' style={{alignItems: 'center'}}>
          <span className='label'>Complete:</span>

          {!editable ? (
            <span className={getCompleteClass(task.complete)}>
              {task.complete || 'Outstanding'}
            </span>
          ) : (
            <div style={{minWidth: 220}}>
              <Form.Select
                size='sm'
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value='Outstanding'>Outstanding</option>
                <option value='Completed'>Complete</option>
              </Form.Select>
            </div>
          )}
        </div>
      </Modal.Body>

      {/* ✅ tombol save hanya kalau editable */}
      {editable && (
        <Modal.Footer>
          <Button variant='light' onClick={onHide} disabled={saving}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}

export default TaskViewModal
