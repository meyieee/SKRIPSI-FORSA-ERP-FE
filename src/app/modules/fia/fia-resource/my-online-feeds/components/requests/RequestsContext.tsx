import React, {createContext, useContext, useEffect, useState} from 'react'
import {RequestsContextType, RequestsRow} from './types'

import {UseReactQuery} from '../../../../../../functions'
import {cache_fiaresourceonlinefeeds_requests} from '../../../../../../constans/CachesName'
import {getMyRequests} from '../../core/requests'
import {default as socket} from '../../../../../../functions/socket'

const RequestsContext = createContext<RequestsContextType | undefined>(undefined)

export const RequestsProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [requestsRows, setRequestsRows] = useState<RequestsRow[]>([])

  const refreshRequests = async () => {
    try {
      const rows = await getMyRequests()
      setRequestsRows(rows)
    } catch (e) {
      console.error('Failed to refresh requests:', e)
    }
  }

  const requestsQuery = UseReactQuery<RequestsRow[]>({
    cacheName: cache_fiaresourceonlinefeeds_requests,
    enabled: true,
    func: async () => getMyRequests(),
  })

  useEffect(() => {
    if (Array.isArray(requestsQuery.data)) {
      setRequestsRows(requestsQuery.data)
    }
  }, [requestsQuery.data])

  useEffect(() => {
    const handleApprovalsUpdated = async () => {
      await refreshRequests()
    }

    socket.on('approvals-updated', handleApprovalsUpdated)
    return () => {
      socket.off('approvals-updated', handleApprovalsUpdated)
    }
  }, [])

  const getRequestsCount = () => requestsRows.length

  return (
    <RequestsContext.Provider
      value={{
        requestsRows,
        setRequestsRows,
        getRequestsCount,
        isLoading: requestsQuery.isLoading,
        error: requestsQuery.error,
      }}
    >
      {children}
    </RequestsContext.Provider>
  )
}

export const useRequestsContext = () => {
  const context = useContext(RequestsContext)
  if (!context) throw new Error('useRequestsContext must be used within RequestsProvider')
  return context
}
