import { OnlineTask } from '../../core/types'

export interface OnlineTaskContextType {
  tasks: OnlineTask[]
  setTasks: React.Dispatch<React.SetStateAction<OnlineTask[]>>
  getTasksCount: () => number
}

export type { OnlineTask }

