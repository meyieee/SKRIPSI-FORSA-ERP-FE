import React, { createContext, useContext, useEffect, useState } from 'react'
import { OnlineTaskContextType, OnlineTask, OnlineTaskListQuery } from './types'
import { getOnlineTasks } from '../../core/onlineTask.requests'

const OnlineTaskContext = createContext<OnlineTaskContextType | undefined>(undefined)

export const OnlineTaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<OnlineTask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getTasksCount = () => {
    return tasks.length
  }

  const refreshTasks = async (query?: OnlineTaskListQuery) => {
    try {
      setIsLoading(true)
      setError(null)
      const rows = await getOnlineTasks(query)
      setTasks(rows)
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err?.message ?? 'Failed to load online tasks')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshTasks()
  }, [])

  return (
    <OnlineTaskContext.Provider
      value={{ tasks, setTasks, getTasksCount, isLoading, error, refreshTasks }}
    >
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

