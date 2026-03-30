import React, { createContext, useContext, useState } from 'react'
import { OnlineTaskContextType, OnlineTask } from './types'
import { mockOnlineTasks } from '../../data/mock'

const OnlineTaskContext = createContext<OnlineTaskContextType | undefined>(undefined)

export const OnlineTaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<OnlineTask[]>(mockOnlineTasks)

  const getTasksCount = () => {
    return tasks.length
  }

  return (
    <OnlineTaskContext.Provider value={{ tasks, setTasks, getTasksCount }}>
      {children}
    </OnlineTaskContext.Provider>
  )
}

export const useOnlineTaskContext = () => {
  const context = useContext(OnlineTaskContext)
  if (!context) {
    throw new Error('useOnlineTaskContext must be used within OnlineTaskProvider')
  }
  return context
}

