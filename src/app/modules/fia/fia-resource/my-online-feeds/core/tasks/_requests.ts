// src/.../core/_requests.ts
import {client} from '../../../../../../functions'
import type {
  ApiResponse,
  CreateTaskPayload,
  GetTasksParams,
  TaskCapabilities,
  TasksRow,
} from './_models'
import {fullUrlServer} from '../../../../../../functions'

export const getMyTasks = async (params?: GetTasksParams): Promise<TasksRow[]> => {
  const res = await client().get<ApiResponse<TasksRow[]>>('/fia-resource/tasks', {
    params: {
      ...(params?.scope ? {scope: params.scope} : {}),
      ...(params?.status ? {status: params.status} : {}),
      ...(params?.priority ? {priority: params.priority} : {}),
      ...(params?.dateType ? {dateType: params.dateType} : {}),
      ...(params?.from ? {from: params.from} : {}),
      ...(params?.to ? {to: params.to} : {}),
    },
  })
  return res.data.data ?? []
}

export const getTaskCapabilities = async (): Promise<TaskCapabilities> => {
  const res = await client().get<ApiResponse<TaskCapabilities>>('/fia-resource/tasks/capabilities')
  return res.data.data
}

export type AssigneeItem = {
  id_number: string
  full_name: string
  email: string
  photo: string
}

type SearchAssigneeOptions = {
  lowerThanLogin?: boolean
}

export const postTask = async (payload: CreateTaskPayload): Promise<TasksRow> => {
  const res = await client().post<ApiResponse<TasksRow>>('/fia-resource/tasks', payload)
  return res.data.data
}

export const searchAssignees = async (
  q: string,
  options?: SearchAssigneeOptions
): Promise<AssigneeItem[]> => {
  const res = await client().get(`${fullUrlServer}/api/fia-resource/tasks/assignees`, {
    params: {
      q,
      ...(options?.lowerThanLogin ? {lowerThanLogin: true} : {}),
    },
    withCredentials: true,
  })
  return (res.data?.data ?? []) as AssigneeItem[]
}

export const getAssignedTasks = async (params?: GetTasksParams): Promise<TasksRow[]> => {
  const res = await client().get<ApiResponse<TasksRow[]>>('/fia-resource/tasks/assigned', {
    params: {
      ...(params?.status ? {status: params.status} : {}),
      ...(params?.priority ? {priority: params.priority} : {}),
      ...(params?.dateType ? {dateType: params.dateType} : {}),
      ...(params?.from ? {from: params.from} : {}),
      ...(params?.to ? {to: params.to} : {}),
    },
  })
  return res.data.data ?? []
}

export const patchTaskStatus = async (
  taskId: number,
  status: 'Outstanding' | 'Completed'
): Promise<void> => {
  await client().patch<ApiResponse<any>>(`/fia-resource/tasks/${taskId}/status`, {status})
}
