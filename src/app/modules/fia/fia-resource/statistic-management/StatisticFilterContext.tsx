import React, {createContext, useContext, useMemo, useState} from 'react'
import {PropsWithChildren} from 'react'

export type GlobalFilters = {
  site: string
  department: string
  section: string
  element: string
  date: string
}

type ProviderProps = PropsWithChildren<{}>

type Ctx = {
  filters: GlobalFilters
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>
  reset: () => void
}

const StatisticFilterCtx = createContext<Ctx | null>(null)

export const useStatisticFilters = () => {
  const v = useContext(StatisticFilterCtx)
  if (!v) throw new Error('useStatisticFilters must be used within <StatisticFilterProvider>')
  return v
}

export const StatisticFilterProvider: React.FC<ProviderProps> = ({children}) => {
  const [filters, setFilters] = useState<GlobalFilters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })
  const reset = () => setFilters({site: '', department: '', section: '', element: '', date: ''})
  const value = useMemo(() => ({filters, setFilters, reset}), [filters])
  return <StatisticFilterCtx.Provider value={value}>{children}</StatisticFilterCtx.Provider>
}
