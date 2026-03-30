import React from 'react'
import { KTSVG } from '../../../../../../../../_metronic'
import { OnlineTask } from './types'

type Props = {
  tasks: OnlineTask[]
  onView?: (task: OnlineTask) => void
}

const OnlineTaskTable: React.FC<Props> = ({ tasks, onView }) => {
  const handleView = (task: OnlineTask) => {
    if (onView) {
      onView(task)
    }
  }

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

  const total = tasks.length

  return (
    <div>
      {/* Title */}
      <div className='mb-3'>
        <h3 className='fw-bold fs-3 mb-0'>ONLINE TASKS CONTROL</h3>
      </div>

      {/* ===== Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold align-middle bg-secondary'>
              <th className='min-w-30px'>No</th>
              <th className='min-w-120px'>Tasks No</th>
              <th className='min-w-250px'>Tasks Title</th>
              <th className='min-w-120px'>Assigned By</th>
              <th className='min-w-120px'>Assigned To</th>
              <th className='min-w-80px text-center'>Priority</th>
              <th className='min-w-100px'>Tasks Date</th>
              <th className='min-w-100px'>Tasks Date</th>
              <th className='min-w-100px'>Expired</th>
              <th className='min-w-120px'>Status</th>
              <th className='min-w-100px text-end py-3'>Action</th>
            </tr>
          </thead>
          <tbody className='text-gray-800'>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={11} className='text-center text-muted py-10'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.no}</td>
                  <td>{task.tasksNo}</td>
                  <td>{task.tasksTitle}</td>
                  <td>{task.assignedBy}</td>
                  <td>{task.assignedTo}</td>
                  <td className='text-center'>
                    <span className={getPriorityClass(task.priority)}>{task.priority}</span>
                  </td>
                  <td>{task.tasksDate}</td>
                  <td>{task.tasksDate}</td>
                  <td>{task.expired}</td>
                  <td>
                    <span className='badge badge-warning fs-7 fw-semibold'>{task.status}</span>
                  </td>
                  <td className='text-end'>
                    {onView && (
                      <button
                        type='button'
                        className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                        onClick={() => handleView(task)}
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen004.svg'
                          className='svg-icon-3'
                        />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='small text-muted mt-2'>
        Showing <span className='fw-semibold'>{total}</span> record{total !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default OnlineTaskTable

