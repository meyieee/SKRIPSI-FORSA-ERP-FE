import { client } from '../../../../../../functions/axiosClient'
import { mockOnlineTasks } from '../data/mock'
import {
  normalizeOnlineTask,
  OnlineTask,
  OnlineTaskDetailPayload,
  OnlineTaskListQuery,
} from '../components/online-tasks/types'

const listEndpoints = [
  '/fia-home/command/feeds/online-tasks',
  '/fia-resource/tasks/global',
  '/fia-resource/tasks',
]

const extractArray = (payload: any): any[] => {
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload)) return payload
  return []
}

const extractObject = (payload: any): Record<string, unknown> | null => {
  if (payload?.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
    return payload.data
  }
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    return payload
  }
  return null
}

const toParams = (query?: OnlineTaskListQuery) => {
  if (!query) return undefined
  const params: Record<string, string> = {}
  if (query.department) params.department = query.department
  if (query.section) params.section = query.section
  if (query.date) params.date = query.date
  return Object.keys(params).length > 0 ? params : undefined
}

const mapListItem = (item: any, index: number): OnlineTask =>
  normalizeOnlineTask({
    id: item?.id ?? String(index + 1),
    no: item?.no ?? item?.seq ?? index + 1,
    tasksNo: item?.tasksNo ?? item?.task_no ?? '',
    tasksTitle: item?.tasksTitle ?? item?.tasks_title ?? item?.subject ?? '',
    assignedBy: item?.assignedBy ?? item?.assigned_by ?? '',
    assignedTo: item?.assignedTo ?? item?.assigned_to ?? '',
    priority: item?.priority,
    tasksDate: item?.tasksDate ?? item?.tasks_date ?? item?.created_at ?? '',
    tasksDateIso: item?.tasksDateIso ?? item?.tasks_date_iso ?? '',
    expired: item?.expired ?? '',
    status: item?.status,
    site: item?.site ?? item?.site_branch ?? '',
    department: item?.department ?? item?.dept ?? '',
    section: item?.section ?? '',
  })

export const getOnlineTasks = async (query?: OnlineTaskListQuery): Promise<OnlineTask[]> => {
  const axios = client()

  for (const endpoint of listEndpoints) {
    try {
      const res = await axios.get(endpoint, { params: toParams(query) })
      const rows = extractArray(res.data).map((item, index) => mapListItem(item, index))
      if (rows.length > 0) {
        return rows
      }
    } catch (error) {
      // continue to fallback endpoint
    }
  }

  return mockOnlineTasks.map((row) => normalizeOnlineTask(row))
}

export const getOnlineTaskDetail = async (
  taskId: string | number
): Promise<OnlineTaskDetailPayload | null> => {
  const axios = client()
  const encoded = encodeURIComponent(String(taskId))
  const detailEndpoints = [
    `/fia-home/command/feeds/online-tasks/${encoded}/detail`,
    `/fia-resource/tasks/${encoded}/detail`,
  ]

  for (const endpoint of detailEndpoints) {
    try {
      const res = await axios.get(endpoint)
      const detail = extractObject(res.data)
      if (detail) {
        return detail as OnlineTaskDetailPayload
      }
    } catch (error) {
      // continue to fallback endpoint
    }
  }

  const fallback = mockOnlineTasks.find((row) => String(row.id) === String(taskId))
  return fallback
    ? {
        ...fallback,
        messages: [],
      }
    : null
}
