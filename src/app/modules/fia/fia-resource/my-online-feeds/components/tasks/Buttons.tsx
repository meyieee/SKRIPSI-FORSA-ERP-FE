import React, {useState} from 'react'
import CreateETaskModal from './modal/CreateETaskModal'
import Title from '../Title'

type Status = '' | 'Outstanding' | 'Completed'
type Priority = '' | 'P#1' | 'P#2' | 'P#3'

interface ButtonsProps {
  onStatusChange: (status: Status) => void
  onPriorityChange: (priority: Priority) => void
  onResetAll: () => void

  activeStatus?: Status
  activePriority?: Priority

  onDateFilter: (startDate: string, endDate: string, dateType: string) => void
  onClearDateFilter: () => void
  isDateFilterActive: boolean

  // ✅ baru
  isAssignedActive: boolean
  onToggleAssigned: () => void
  canAssign: boolean
}

const Buttons: React.FC<ButtonsProps> = ({
  onStatusChange,
  onPriorityChange,
  onResetAll,
  activeStatus = '',
  activePriority = '',
  onDateFilter,
  onClearDateFilter,
  isDateFilterActive,

  // ✅ baru
  isAssignedActive,
  onToggleAssigned,
  canAssign,
}) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateType, setDateType] = useState<'tasks_date' | 'due_date' | 'complete'>('tasks_date')
  const [isDateExpanded, setIsDateExpanded] = useState(false)
  const [showCreateETasks, setShowCreateETasks] = useState(false)

  const handleViewTasks = () => {
    if (startDate && endDate) onDateFilter(startDate, endDate, dateType)
  }

  const handleClearDateFilter = () => {
    setStartDate('')
    setEndDate('')
    setDateType('tasks_date')
    onClearDateFilter()
  }

  const toggleStatus = (next: Status) => onStatusChange(activeStatus === next ? '' : next)
  const togglePriority = (next: Priority) => onPriorityChange(activePriority === next ? '' : next)

  return (
    <div className='d-flex justify-content-between align-items-start'>
      {/* LEFT: title + filters */}
      <div className='mb-3 d-flex flex-wrap gap-2 align-items-start'>
        <div>
          <Title text2='My Online Task' style={{fontSize: '20px'}} className='custom-title mt-2' />
        </div>

        {/* Status */}
        <button
          className={`btn ${
            activeStatus === 'Outstanding' ? 'btn-primary' : 'btn-light-dark'
          } btn-sm me-2`}
          onClick={() => toggleStatus('Outstanding')}
        >
          Outstanding
        </button>

        <button
          className={`btn ${
            activeStatus === 'Completed' ? 'btn-primary' : 'btn-light-dark'
          } btn-sm me-2`}
          onClick={() => toggleStatus('Completed')}
        >
          Complete
        </button>

        {/* Priority */}
        <button
          className={`btn ${
            activePriority === 'P#1' ? 'btn-primary' : 'btn-active-light-dark'
          } btn-sm me-1`}
          onClick={() => togglePriority('P#1')}
        >
          P#1
        </button>
        <button
          className={`btn ${
            activePriority === 'P#2' ? 'btn-primary' : 'btn-active-light-dark'
          } btn-sm me-1`}
          onClick={() => togglePriority('P#2')}
        >
          P#2
        </button>
        <button
          className={`btn ${
            activePriority === 'P#3' ? 'btn-primary' : 'btn-active-light-dark'
          } btn-sm me-1`}
          onClick={() => togglePriority('P#3')}
        >
          P#3
        </button>

        {/* View All */}
        <button
          className={`btn ${
            !activeStatus && !activePriority ? 'btn-primary' : 'btn-light-dark'
          } btn-sm me-2`}
          onClick={onResetAll}
        >
          View All
        </button>

        {/* Date Filter */}
        <div className='mb-3 ms-2 tasks-date-filter'>
          <button
            className={`btn ${
              isDateFilterActive ? 'btn-secondary' : 'btn-active-dark'
            } btn-sm me-2`}
            onClick={() => setIsDateExpanded((s) => !s)}
            type='button'
          >
            <i className='fas fa-calendar-alt me-1'></i>
            Date Filter
            <i className={`fas ${isDateExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} ms-1`}></i>
          </button>

          {isDateFilterActive && (
            <button
              className='btn btn-active-dark btn-sm'
              onClick={handleClearDateFilter}
              type='button'
            >
              <i className='fas fa-times me-1'></i>
              Clear Date Filter
            </button>
          )}

          {isDateExpanded && (
            <div className='card card-filter tasks-date-filter-panel'>
              <div className='card-body p-3'>
                <div className='row g-3'>
                  <div className='col-12'>
                    <label className='form-label fw-bold'>Filter Based On:</label>
                    <select
                      className='form-select form-select-sm'
                      value={dateType}
                      onChange={(e) => setDateType(e.target.value as any)}
                    >
                      <option value='tasks_date'>Task Date</option>
                      <option value='due_date'>Due Date</option>
                      <option value='complete'>Complete Date</option>
                    </select>
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label'>From:</label>
                    <input
                      type='date'
                      className='form-control form-control-sm'
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label'>To:</label>
                    <input
                      type='date'
                      className='form-control form-control-sm'
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                    />
                  </div>

                  <div className='col-12'>
                    <button
                      className='btn btn-primary btn-sm me-2'
                      onClick={handleViewTasks}
                      disabled={!startDate || !endDate}
                      type='button'
                    >
                      <i className='fas fa-eye me-1'></i>
                      View Tasks
                    </button>

                    <button
                      className='btn btn-secondary btn-sm'
                      onClick={handleClearDateFilter}
                      type='button'
                    >
                      <i className='fas fa-eraser me-1'></i>
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Assigned Tasks + Create */}
      {canAssign && (
        <div className='d-flex gap-2'>
          <button
            className={`btn ${isAssignedActive ? 'btn-primary' : 'btn-light-dark'} btn-task`}
            onClick={onToggleAssigned}
            type='button'
          >
            Assigned Tasks
          </button>

          <button
            className='btn btn-success btn-task'
            onClick={() => setShowCreateETasks(true)}
            type='button'
          >
            Create E-Tasks
          </button>
        </div>
      )}

      {canAssign && (
        <CreateETaskModal show={showCreateETasks} onHide={() => setShowCreateETasks(false)} />
      )}
    </div>
  )
}

export default Buttons
