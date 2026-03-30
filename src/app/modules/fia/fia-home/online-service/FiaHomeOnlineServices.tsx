import React from 'react'
import CategoryTabs from './ui/CategoryTabs'
import { requestRegistry } from './registry'
import { OnlineCategoryKey } from './registry'
import { useOnlineFormNavigation } from './hooks/useOnlineFormNavigation'
import { PageTitle } from '../../../../../_metronic/layout/core'

const FiaHomeOnlineServices = () => {
  const { cat, type, setSelection } = useOnlineFormNavigation()

  const ActiveComp = requestRegistry[cat]?.types.find((t) => t.key === type)?.component

  return (
    <div>
      <PageTitle>ONLINE SERVICES</PageTitle>
      <CategoryTabs
        active={cat}
        activeType={type}
        onSelect={(k: OnlineCategoryKey, t: string) => setSelection(k, t)}
      />
      <React.Suspense fallback={<div>Loading...</div>}>
        {ActiveComp ? <ActiveComp cat={cat} type={type} /> : <div>No form available.</div>}
      </React.Suspense>
    </div>
  )
}

export default FiaHomeOnlineServices