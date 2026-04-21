import React, {useEffect, useRef} from 'react'
import { KTSVG } from '../../../../../../../../_metronic'
import { normalizeStatus, OnlineTask } from './types'

type Props = {
  tasks: OnlineTask[]
  onView?: (task: OnlineTask) => void
  isLoading?: boolean
  error?: string | null
}

const OnlineTaskTable: React.FC<Props> = ({ tasks, onView, isLoading = false, error = null }) => {
  const topScrollRef = useRef<HTMLDivElement>(null)
  const topScrollInnerRef = useRef<HTMLDivElement>(null)
  const bottomScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const topEl = topScrollRef.current
    const topInnerEl = topScrollInnerRef.current
    const bottomEl = bottomScrollRef.current
    if (!topEl || !topInnerEl || !bottomEl) return

    const syncWidth = () => {
      topInnerEl.style.width = `${bottomEl.scrollWidth}px`
    }

    let fromTop = false
    let fromBottom = false

    const onTopScroll = () => {
      if (fromBottom) return
      fromTop = true
      bottomEl.scrollLeft = topEl.scrollLeft
      fromTop = false
    }

    const onBottomScroll = () => {
      if (fromTop) return
      fromBottom = true
      topEl.scrollLeft = bottomEl.scrollLeft
      fromBottom = false
    }

    syncWidth()
    topEl.addEventListener('scroll', onTopScroll)
    bottomEl.addEventListener('scroll', onBottomScroll)
    window.addEventListener('resize', syncWidth)

    return () => {
      topEl.removeEventListener('scroll', onTopScroll)
      bottomEl.removeEventListener('scroll', onBottomScroll)
      window.removeEventListener('resize', syncWidth)
    }
  }, [tasks.length, isLoading, error])

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

  const getStatusClass = (status: string) => {
    if (status === 'Completed') {
      return 'badge badge-success fs-7 fw-semibold'
    }
    if (status === 'Outstanding') {
      return 'badge badge-warning fs-7 fw-semibold'
    }
    return 'badge badge-light fs-7 fw-semibold'
  }

  return (
    <div className='container-fluid px-0'>
      <div className='mt-5'>
        {/* Title */}
        <div className='mb-3'>
          <h3 className='fw-bold fs-3 mb-0'>ONLINE TASKS CONTROL</h3>
        </div>

        {/* ===== Table ===== */}
        <div
          ref={topScrollRef}
          className='mb-2'
          style={{overflowX: 'auto', overflowY: 'hidden', maxWidth: '100%', height: 14}}
          aria-hidden='true'
        >
          <div ref={topScrollInnerRef} style={{height: 1}} />
        </div>

        <div ref={bottomScrollRef} className='table-responsive'>
          {error && <div className='alert alert-warning py-3 mb-3'>{error}</div>}
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold align-middle bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-120px'>Tasks No</th>
                <th className='min-w-250px'>Tasks Title</th>
                <th className='min-w-120px'>Assigned By</th>
                <th className='min-w-120px'>Assigned To</th>
                <th className='min-w-80px text-center'>Priority</th>
                <th className='min-w-100px'>Tasks Date</th>
                <th className='min-w-100px'>Expired</th>
                <th className='min-w-120px'>Status</th>
                <th className='min-w-100px text-end py-3'>Action</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className='text-center text-muted py-10'>
                    Loading online tasks history...
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={10} className='text-center text-muted py-10'>
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
                    <td>{task.expired}</td>
                    <td>
                      <span className={getStatusClass(task.status)}>{normalizeStatus(task.status)}</span>
                    </td>
                    <td className='text-end'>
                      <div className='d-flex justify-content-end flex-shrink-0'>
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
                      </div>
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
    </div>
  )
}

export default OnlineTaskTable

