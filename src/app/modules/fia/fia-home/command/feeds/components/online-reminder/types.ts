import { OnlineReminder } from '../../core/types'

export interface OnlineReminderContextType {
  reminders: OnlineReminder[]
  setReminders: React.Dispatch<React.SetStateAction<OnlineReminder[]>>
  getRemindersCount: () => number
}

export type { OnlineReminder }

