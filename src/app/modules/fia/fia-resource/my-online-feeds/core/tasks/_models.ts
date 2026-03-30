// src/.../core/_models.ts
export type TaskScope = 'my' | 'assigned'

export type TasksRow = {
  id: number
  image_key: string // backend boleh tetap kirim image_key, atau kita isi dari emp.photo nanti
  assigned_by: string
  assigned_by_id?: string

  assigned_to?: string
  assigned_to_id?: string

  taks_subject: string
  tasks_date: string // "dd-mm-yy"
  due_date: string // "dd-mm-yy"
  priority: string // 'P#1' | 'P#2' | 'P#3'
  complete: string // "" atau "dd-mm-yy"
  task_no: string
  short_description: string
}

// query filter yang backend support
export type GetTasksParams = {
  scope?: 'my' | 'assigned'
  status?: '' | 'Outstanding' | 'Completed'
  priority?: '' | 'P#1' | 'P#2' | 'P#3'
  dateType?: '' | 'tasks_date' | 'due_date' | 'complete'
  from?: string // 'YYYY-MM-DD'
  to?: string // 'YYYY-MM-DD'
}

// payload create task (sesuaikan dengan TasksController.createTask kamu)
export type CreateTaskPayload = {
  assignedToId: string // 15 digit id_number user tujuan
  assignedToName: string
  imageKey?: string | null
  subject: string
  shortDescription?: string | null
  tasksDateTime: string // ISO string, contoh: '2025-08-03T09:00:00'
  dueDateTime?: string | null
  priority: 'P#1' | 'P#2' | 'P#3'
  status?: string | null // optional
  postDate?: string | null // 'YYYY-MM-DD'
  taskOwner?: string | null
  completeDateTime?: string | null
}

export type ApiResponse<T> = {
  message: string
  data: T
}

export type TaskCapabilities = {
  canAssign: boolean
  hierarchyLevel: number | null
  idNumber: string
}
