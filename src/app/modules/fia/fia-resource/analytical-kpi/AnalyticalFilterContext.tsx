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

const AnalyticalFilterCtx = createContext<Ctx | null>(null)

export const useAnalyticalFilters = () => {
  const v = useContext(AnalyticalFilterCtx)
  if (!v) throw new Error('useAnalyticalFilters must be used within <AnalyticalFilterProvider>')
  return v
}

export const AnalyticalFilterProvider: React.FC<ProviderProps> = ({children}) => {
  const [filters, setFilters] = useState<GlobalFilters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })
  const reset = () => setFilters({site: '', department: '', section: '', element: '', date: ''})
  const value = useMemo(() => ({filters, setFilters, reset}), [filters])
  return <AnalyticalFilterCtx.Provider value={value}>{children}</AnalyticalFilterCtx.Provider>
}
