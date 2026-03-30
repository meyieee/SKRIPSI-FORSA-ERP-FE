import React, { createContext, useContext, useState } from 'react'
import { OnlineRequestContextType, OnlineRequest } from './types'
import { mockOnlineRequests } from '../../data/mock'

const OnlineRequestContext = createContext<OnlineRequestContextType | undefined>(undefined)

export const OnlineRequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<OnlineRequest[]>(mockOnlineRequests)

  const getRequestsCount = () => {
    return requests.length
  }

  return (
    <OnlineRequestContext.Provider value={{ requests, setRequests, getRequestsCount }}>
      {children}
    </OnlineRequestContext.Provider>
  )
}

export const useOnlineRequestContext = () => {
  const context = useContext(OnlineRequestContext)
  if (!context) {
    throw new Error('useOnlineRequestContext must be used within OnlineRequestProvider')
  }
  return context
}

