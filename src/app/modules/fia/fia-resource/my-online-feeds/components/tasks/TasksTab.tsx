import React, {useEffect, useState} from 'react'
import {useTasksContext} from './TasksContext'
import {useChat} from './chat/ChatContext'
import './scss/tasksstyles.scss'
import Buttons from './Buttons'
import {KTSVG} from '../../../../../../../_metronic'
import TaskViewModal from './modal/TasksViewModal'
import {TasksRow} from './types'
import {patchTaskStatus} from '../../core/tasks/_requests'
import {useCanAccessRoute} from '../../../../../../custom-hooks'
import {default as socket} from '../../../../../../functions/socket'
import {useAuth} from '../../../../../auth'

const defaultAvatarUrl = '/media/svg/avatars/blank.svg'

const parseDDMMYY = (s?: string) => {
  if (!s) return 0
  // support: "20-12-25" atau "20-12-2025"
  const parts = String(s).split('-')
  if (parts.length !== 3) return 0

  const [dd, mm, yy] = parts.map((x) => Number(x))
  if (!dd || !mm || !yy) return 0

  const year = yy < 100 ? 2000 + yy : yy
  const d = new Date(year, mm - 1, dd)
  return d.getTime() || 0
}

const TasksTab = () => {
  const canAccess = useCanAccessRoute('/fia-resource/my_online_feeds/tasks')
  const {tasksRows, getTasksCount, getAvatarUrl, refreshTasks, isLoading, error, taskCapabilities} =
    useTasksContext()
  const {openChat, unreadCounts, preloadUnreadForTask} = useChat()
  const {currentUser, auth} = useAuth()

  // ALL hooks MUST be called before any early return
  const [activeScope, setActiveScope] = useState<'my' | 'assigned'>('my')
  const [activeStatus, setActiveStatus] = useState<'' | 'Outstanding' | 'Completed'>('Outstanding')
  const [activePriority, setActivePriority] = useState<'' | 'P#1' | 'P#2' | 'P#3'>('')
  const [activeDateFilter, setActiveDateFilter] = useState({
    startDate: '',
    endDate: '',
    dateType: '',
  })
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<TasksRow | null>(null)

  const loginIdNumber = String(
    currentUser?.id_number ||
      auth?.user?.id_number ||
      (auth?.user as any)?.['employees.id_number'] ||
      ''
  ).trim()

  // ALL useMemo and useEffect MUST be before early return
  const displayRows = React.useMemo(() => {
    // tentukan field tanggal yang dipakai untuk sorting
    // - kalau Date Filter dipakai => ikut dateType (tasks_date / due_date / complete)
    // - kalau tidak, dan status Completed => sort by complete
    // - default => tasks_date
    const sortKey =
      (activeDateFilter.dateType as 'tasks_date' | 'due_date' | 'complete' | '') ||
      (activeStatus === 'Completed' ? 'complete' : 'tasks_date')

    const getSortValue = (row: any) => {
      if (sortKey === 'due_date') return parseDDMMYY(row.due_date)
      if (sortKey === 'complete') return parseDDMMYY(row.complete)
      return parseDDMMYY(row.tasks_date)
    }

    return [...tasksRows].sort((a: any, b: any) => {
      const ta = getSortValue(a)
      const tb = getSortValue(b)

      // DESC => terbaru di atas
      if (tb !== ta) return tb - ta

      // tie-breaker: id desc supaya stabil
      return (Number(b.id) || 0) - (Number(a.id) || 0)
    })
  }, [tasksRows, activeStatus, activeDateFilter.dateType])

  const refreshWithCurrentFilter = async (scopeOverride?: 'my' | 'assigned') => {
    const scope = scopeOverride ?? activeScope

    await refreshTasks({
      scope,
      status: activeStatus || undefined,
      priority: activePriority || undefined,
      ...(activeDateFilter.startDate && activeDateFilter.endDate && activeDateFilter.dateType
        ? {
            dateType: activeDateFilter.dateType as any,
            from: activeDateFilter.startDate,
            to: activeDateFilter.endDate,
          }
        : {}),
    })
  }

  const handleSaveTaskStatus = async (taskId: number, status: 'Outstanding' | 'Completed') => {
    await patchTaskStatus(taskId, status)

    // ✅ setelah update, refresh list yang sedang aktif
    await refreshWithCurrentFilter()
  }

  // Status toggle -> fetch ke backend
  const handleStatusChange = async (status: '' | 'Outstanding' | 'Completed') => {
    setActiveStatus(status)
    await refreshTasks({
      scope: activeScope,
      status: status || undefined,
      priority: activePriority || undefined,
      ...(activeDateFilter.startDate && activeDateFilter.endDate && activeDateFilter.dateType
        ? {
            dateType: activeDateFilter.dateType as any,
            from: activeDateFilter.startDate,
            to: activeDateFilter.endDate,
          }
        : {}),
    })
  }

  // Priority toggle -> fetch ke backend
  const handlePriorityChange = async (priority: '' | 'P#1' | 'P#2' | 'P#3') => {
    setActivePriority(priority)
    await refreshTasks({
      scope: activeScope,
      status: activeStatus || undefined,
      priority: priority || undefined,
      ...(activeDateFilter.startDate && activeDateFilter.endDate && activeDateFilter.dateType
        ? {
            dateType: activeDateFilter.dateType as any,
            from: activeDateFilter.startDate,
            to: activeDateFilter.endDate,
          }
        : {}),
    })
  }

  // Date filter -> fetch ke backend
  const filterByDateRange = async (startDate: string, endDate: string, dateType: string) => {
    setActiveDateFilter({startDate, endDate, dateType})
    await refreshTasks({
      scope: activeScope,
      status: activeStatus || undefined,
      priority: activePriority || undefined,
      dateType: dateType as any,
      from: startDate,
      to: endDate,
    })
  }

  // Clear date filter -> fetch ulang (tanpa dateType/from/to)
  const clearDateFilter = async () => {
    setActiveDateFilter({startDate: '', endDate: '', dateType: ''})
    await refreshTasks({
      scope: activeScope,
      status: activeStatus || undefined,
      priority: activePriority || undefined,
    })
  }

  // Reset all (View All)
  const handleResetAll = async () => {
    setActiveStatus('')
    setActivePriority('')
    setActiveDateFilter({startDate: '', endDate: '', dateType: ''})
    await refreshTasks({scope: activeScope}) // no filter
  }

  // ✅ tombol "Assigned Tasks" jadi toggle
  const handleToggleAssigned = async () => {
    if (activeScope === 'my') {
      // -> masuk mode assigned, reset semua, tampilkan semua assigned tasks
      setActiveScope('assigned')
      setActiveStatus('')
      setActivePriority('')
      setActiveDateFilter({startDate: '', endDate: '', dateType: ''})

      await refreshTasks({scope: 'assigned'}) // tanpa filter = all assigned
    } else {
      // -> balik ke my online tasks default Outstanding
      setActiveScope('my')
      setActiveStatus('Outstanding')
      setActivePriority('')
      setActiveDateFilter({startDate: '', endDate: '', dateType: ''})

      await refreshTasks({scope: 'my', status: 'Outstanding'})
    }
  }

  useEffect(() => {
    console.log('Tasks Count:', getTasksCount())
  }, [tasksRows, getTasksCount])

  useEffect(() => {
    if (!loginIdNumber) return

    const handleTaskUpdated = async (payload: any) => {
      const actorId = String(payload?.actor_id ?? '')
      const assignedById = String(payload?.assigned_by_id ?? '')
      const assignedToId = String(payload?.assigned_to_id ?? '')
      const isMember = assignedById === loginIdNumber || assignedToId === loginIdNumber

      if (!isMember) return
      if (actorId && actorId === loginIdNumber) return

      await refreshTasks({
        scope: activeScope,
        status: activeStatus || undefined,
        priority: activePriority || undefined,
        ...(activeDateFilter.startDate && activeDateFilter.endDate && activeDateFilter.dateType
          ? {
              dateType: activeDateFilter.dateType as any,
              from: activeDateFilter.startDate,
              to: activeDateFilter.endDate,
            }
          : {}),
      })
    }

    socket.on('tasks-updated', handleTaskUpdated)

    return () => {
      socket.off('tasks-updated', handleTaskUpdated)
    }
  }, [
    loginIdNumber,
    activeScope,
    activeStatus,
    activePriority,
    activeDateFilter.startDate,
    activeDateFilter.endDate,
    activeDateFilter.dateType,
    refreshTasks,
  ])

  useEffect(() => {
    tasksRows.forEach((row) => {
      preloadUnreadForTask(row.id)
    })
  }, [tasksRows, preloadUnreadForTask])

  useEffect(() => {
    if (!tasksRows.length) return

    const timer = window.setInterval(() => {
      tasksRows.forEach((row) => {
        preloadUnreadForTask(row.id)
      })
    }, 1500)

    return () => {
      window.clearInterval(timer)
    }
  }, [tasksRows, preloadUnreadForTask])

  // Early return AFTER all hooks
  if (!canAccess) {
    return (
      <div className='alert alert-warning'>
        <h4>Access Denied</h4>
        <p>You don't have permission to access this page.</p>
      </div>
    )
  }

  const handleViewTask = (task: TasksRow) => {
    setSelectedTask(task)
    setShowViewModal(true)
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

  const getTaskStatus = (complete: string) => (complete ? 'Completed' : 'Outstanding')

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
    <div>
      <Buttons
        isAssignedActive={activeScope === 'assigned'}
        onToggleAssigned={handleToggleAssigned}
        canAssign={taskCapabilities?.canAssign ?? false}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        onResetAll={handleResetAll}
        activeStatus={activeStatus}
        activePriority={activePriority}
        onDateFilter={filterByDateRange}
        onClearDateFilter={clearDateFilter}
        isDateFilterActive={!!(activeDateFilter.startDate && activeDateFilter.endDate)}
      />

      {isLoading && <div className='alert alert-info py-2'>Loading tasks...</div>}
      {error && <div className='alert alert-danger py-2'>{error}</div>}

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary py-3'>
              <th className='min-w-140px py-3'>
                {activeScope === 'assigned' ? 'Assigned To' : 'Assigned By'}
              </th>
              <th className='min-w-120px py-3'>Tasks Subject</th>
              <th className='min-w-120px py-3'>Tasks Date</th>
              <th className='min-w-120px py-3'>Due Date</th>
              <th className='min-w-120px py-3'>Priority</th>
              <th className='min-w-100px py-3'>Complete</th>
              <th className='min-w-50px py-3'>Tasks No</th>
              <th className='min-w-50px py-3 text-end'>Chat</th>
              <th className='min-w-50px py-3 text-end'>View</th>
            </tr>
          </thead>

          <tbody className='text-gray-700 '>
            {displayRows.map((row) => {
              const displayName =
                activeScope === 'assigned' ? row.assigned_to ?? '-' : row.assigned_by
              const taskStatus = getTaskStatus(row.complete)

              return (
                <tr key={row.id} style={{cursor: 'pointer'}}>
                  <td className='min-w-140px'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-3'>
                        <img
                          src={getAvatarUrl(row.image_key)}
                          alt={displayName}
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = defaultAvatarUrl
                          }}
                        />
                      </div>
                      <span>{displayName}</span>
                    </div>
                  </td>
                  <td className='min-w-120px'>{row.taks_subject}</td>
                  <td className='min-w-120px'>{row.tasks_date}</td>
                  <td className='min-w-120px'>{row.due_date}</td>
                  <td className='min-w-120px'>
                    <span className={getPriorityClass(row.priority)}>{row.priority}</span>
                  </td>
                  <td className='min-w-100px'>
                    <span className={getStatusClass(taskStatus)}>{taskStatus}</span>
                  </td>
                  <td className='min-w-50px'>{row.task_no}</td>

                  <td className='text-end position-relative'>
                    <button
                      type='button'
                      className='btn btn-link btn-color-dark btn-active-color-primary me-1 position-relative'
                      onClick={(e) => {
                        e.stopPropagation()
                        openChat(row.id)
                      }}
                    >
                      <KTSVG
                        path='/media/icons/duotune/communication/com007.svg'
                        className='svg-icon-3'
                      />
                      {unreadCounts[row.id] > 0 && (
                        <span className='position-absolute top-0 start-100 translate-middle badge badge-circle bg-danger fs-9'>
                          {unreadCounts[row.id]}
                        </span>
                      )}
                    </button>
                  </td>

                  <td className='text-end'>
                    <button
                      type='button'
                      className='btn btn-link btn-color-dark btn-active-color-primary me-1'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewTask(row)
                      }}
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen004.svg'
                        className='svg-icon-3'
                      />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <TaskViewModal
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          task={selectedTask}
          editable={activeScope === 'assigned'}
          onSaveStatus={handleSaveTaskStatus}
        />
      </div>
    </div>
  )
}

export default TasksTab
