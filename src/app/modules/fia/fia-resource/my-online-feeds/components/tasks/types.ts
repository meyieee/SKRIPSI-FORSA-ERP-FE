/* Pengaturan types untuk tab Tasks */
export interface TasksRow {
  id: number
  image_key: string
  assigned_by: string
  assigned_by_id?: string
  assigned_to?: string
  assigned_to_id?: string
  taks_subject: string
  tasks_date: string
  due_date: string
  priority: string
  complete: string
  task_no: string
  short_description: string
}

export interface TasksContextType {
  tasksRows: TasksRow[]
  setTasksRows: React.Dispatch<React.SetStateAction<TasksRow[]>>
  getTasksCount: () => number
  avatarMap: Record<string, string>
  getAvatarUrl: (key: string) => string
}
