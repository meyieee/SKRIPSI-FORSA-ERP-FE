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

const WorkforceFilterCtx = createContext<Ctx | null>(null)

export const useWorkforceFilters = () => {
  const v = useContext(WorkforceFilterCtx)
  if (!v) throw new Error('useWorkforceFilters must be used within <WorkforceFilterProvider>')
  return v
}

export const WorkforceFilterProvider: React.FC<ProviderProps> = ({children}) => {
  const [filters, setFilters] = useState<GlobalFilters>({
    site: '',
    department: '',
    section: '',
    element: '',
    date: '',
  })
  const reset = () => setFilters({site: '', department: '', section: '', element: '', date: ''})
  const value = useMemo(() => ({filters, setFilters, reset}), [filters])
  return <WorkforceFilterCtx.Provider value={value}>{children}</WorkforceFilterCtx.Provider>
}
