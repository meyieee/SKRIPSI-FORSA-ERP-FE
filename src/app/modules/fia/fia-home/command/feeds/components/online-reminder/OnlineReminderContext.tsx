import React, { createContext, useContext, useState } from 'react'
import { OnlineReminderContextType, OnlineReminder } from './types'
import { mockOnlineReminders } from '../../data/mock'

const OnlineReminderContext = createContext<OnlineReminderContextType | undefined>(undefined)

export const OnlineReminderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reminders, setReminders] = useState<OnlineReminder[]>(mockOnlineReminders)

  const getRemindersCount = () => {
    return reminders.length
  }

  return (
    <OnlineReminderContext.Provider value={{ reminders, setReminders, getRemindersCount }}>
      {children}
    </OnlineReminderContext.Provider>
  )
}

export const useOnlineReminderContext = () => {
  const context = useContext(OnlineReminderContext)
  if (!context) {
    throw new Error('useOnlineReminderContext must be used within OnlineReminderProvider')
  }
  return context
}

