// src/.../TasksContext.tsx
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../../_metronic'
import {fullUrlServer} from '../../../../../../functions/base_url'
import type {
  CreateTaskPayload,
  GetTasksParams,
  TaskCapabilities,
  TasksRow,
  TaskScope,
} from '../../core/tasks/_models'
import {
  getMyTasks,
  getAssignedTasks,
  getTaskCapabilities,
  patchTaskStatus,
  postTask,
} from '../../core/tasks/_requests'

type TasksContextType = {
  tasksRows: TasksRow[]
  setTasksRows: React.Dispatch<React.SetStateAction<TasksRow[]>>
  isLoading: boolean
  error: string | null

  // fetch with filter (langsung ke backend)
  refreshTasks: (params?: GetTasksParams & {scope?: TaskScope}) => Promise<void>
  updateTaskStatus: (taskId: number, status: 'Outstanding' | 'Completed') => Promise<void>
  // create task
  createTask: (payload: CreateTaskPayload) => Promise<void>
  taskCapabilities: TaskCapabilities | null

  // helper existing
  getTasksCount: () => number
  avatarMap: Record<string, string>
  getAvatarUrl: (keyOrPath: string) => string
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export const TasksProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const avatarMap: Record<string, string> = useMemo(
    () => ({
      avatar1: '../../../../../../../../../media/avatars/300-1.jpg',
      avatar2: '../../../../../../../../../media/avatars/300-2.jpg',
      avatar3: '../../../../../../../../../media/avatars/300-3.jpg',
      avatar4: '../../../../../../../../../media/avatars/300-4.jpg',
      avatar5: '../../../../../../../../../media/avatars/300-5.jpg',
      avatar6: '../../../../../../../../../media/avatars/300-6.jpg',
      avatar7: '../../../../../../../../../media/avatars/300-7.jpg',
      avatar8: '../../../../../../../../../media/avatars/300-8.jpg',
      avatar9: '../../../../../../../../../media/avatars/300-9.jpg',
      avatar10: '../../../../../../../../../media/avatars/300-10.jpg',
      avatar11: '../../../../../../../../../media/avatars/300-11.jpg',
      avatar12: '../../../../../../../../../media/avatars/300-12.jpg',
      avatar13: '../../../../../../../../../media/avatars/300-13.jpg',
      avatar14: '../../../../../../../../../media/avatars/300-14.jpg',
      avatar15: '../../../../../../../../../media/avatars/300-15.jpg',
    }),
    []
  )

  /**
   * getAvatarUrl bisa handle 2 mode:
   * - kalau backend masih kirim "image_key" (avatar1..avatar15) -> pakai map
   * - kalau nanti kamu ganti jadi path foto employee dari DB, misal "images/000000000000002.jpg"
   *   -> kembalikan path itu sebagai absolute (via toAbsoluteUrl bila memang static FE),
   *   atau kalau itu URL server, biarkan langsung dipakai (http/https)
   */
  const getAvatarUrl = (keyOrPath: string) => {
    if (!keyOrPath) return toAbsoluteUrl('/media/avatars/blank.png')
    if (keyOrPath.startsWith('http://') || keyOrPath.startsWith('https://')) return keyOrPath

    const mapped = avatarMap[keyOrPath]
    if (mapped) return toAbsoluteUrl(mapped)

    // kalau backend kasih path public (public/images/...) dari BE
    if (keyOrPath.startsWith('images/')) {
      return `${fullUrlServer}/${keyOrPath}`
    }

    if (keyOrPath.startsWith('/')) {
      return `${fullUrlServer}${keyOrPath}`
    }

    return `${fullUrlServer}/${keyOrPath}`
  }

  const [tasksRows, setTasksRows] = useState<TasksRow[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [taskCapabilities, setTaskCapabilities] = useState<TaskCapabilities | null>(null)

  const refreshTasks = async (params?: GetTasksParams & {scope?: TaskScope}) => {
    setIsLoading(true)
    setError(null)
    try {
      const scope = params?.scope ?? 'my'
      const data = scope === 'assigned' ? await getAssignedTasks(params) : await getMyTasks(params)

      setTasksRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error('refreshTasks error:', e)
      setError(e?.message ?? 'Failed to load tasks')
      setTasksRows([])
    } finally {
      setIsLoading(false)
    }
  }

  const createTask = async (payload: CreateTaskPayload) => {
    setIsLoading(true)
    setError(null)
    try {
      await postTask(payload)
      // setelah create, reload list (default bisa Outstanding)
      await refreshTasks({status: 'Outstanding'})
    } catch (e: any) {
      console.error('createTask error:', e)
      setError(e?.message ?? 'Failed to create task')
    } finally {
      setIsLoading(false)
    }
  }

  const updateTaskStatus = async (taskId: number, status: 'Outstanding' | 'Completed') => {
    setIsLoading(true)
    setError(null)
    try {
      await patchTaskStatus(taskId, status)
      // ✅ setelah update, biasanya TasksTab akan memanggil refreshTasks lagi.
      // kalau mau auto-refresh di sini, kamu bisa simpan lastParams di ref.
    } catch (e: any) {
      console.error('updateTaskStatus error:', e)
      setError(e?.message ?? 'Failed to update status')
    } finally {
      setIsLoading(false)
    }
  }

  const getTasksCount = () => tasksRows.length

  // load pertama kali: default Outstanding (sesuai UI kamu)
  useEffect(() => {
    refreshTasks({status: 'Outstanding', scope: 'my'})
    getTaskCapabilities()
      .then((data) => setTaskCapabilities(data))
      .catch((e) => {
        console.error('getTaskCapabilities error:', e)
        setTaskCapabilities({canAssign: true, hierarchyLevel: null, idNumber: ''})
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TasksContext.Provider
      value={{
        updateTaskStatus,
        tasksRows,
        setTasksRows,
        isLoading,
        error,
        refreshTasks,
        createTask,
        taskCapabilities,
        getTasksCount,
        avatarMap,
        getAvatarUrl,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const useTasksContext = () => {
  const ctx = useContext(TasksContext)
  if (!ctx) throw new Error('useTasksContext must be used within TasksProvider')
  return ctx
}
