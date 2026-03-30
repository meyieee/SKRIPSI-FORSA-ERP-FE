import React, { createContext, useContext, useState } from 'react'
import { OnlineRosterContextType, OnlineRoster } from './types'
import { mockOnlineRoster } from '../../data/mock'

const OnlineRosterContext = createContext<OnlineRosterContextType | undefined>(undefined)

export const OnlineRosterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roster, setRoster] = useState<OnlineRoster[]>(mockOnlineRoster)

  const getRosterCount = () => {
    return roster.length
  }

  return (
    <OnlineRosterContext.Provider value={{ roster, setRoster, getRosterCount }}>
      {children}
    </OnlineRosterContext.Provider>
  )
}

export const useOnlineRosterContext = () => {
  const context = useContext(OnlineRosterContext)
  if (!context) {
    throw new Error('useOnlineRosterContext must be used within OnlineRosterProvider')
  }
  return context
}

