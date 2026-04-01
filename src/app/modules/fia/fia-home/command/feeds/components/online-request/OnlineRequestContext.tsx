import React, { createContext, useContext, useEffect, useState } from 'react'
import { OnlineRequestContextType, OnlineRequest, OnlineRequestListQuery } from './types'
import { getOnlineRequests } from '../../core/onlineRequest.requests'

const OnlineRequestContext = createContext<OnlineRequestContextType | undefined>(undefined)

export const OnlineRequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<OnlineRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getRequestsCount = () => {
    return requests.length
  }

  const refreshRequests = async (query?: OnlineRequestListQuery) => {
    try {
      setIsLoading(true)
      setError(null)
      const rows = await getOnlineRequests(query)
      setRequests(rows)
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err?.message ?? 'Failed to load online requests')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshRequests()
  }, [])

  return (
    <OnlineRequestContext.Provider
      value={{ requests, setRequests, getRequestsCount, isLoading, error, refreshRequests }}
    >
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

