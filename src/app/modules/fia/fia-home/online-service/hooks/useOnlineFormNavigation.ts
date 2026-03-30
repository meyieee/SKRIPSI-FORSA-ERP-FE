import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { OnlineCategoryKey, getDefaultSelection, requestRegistry } from '../registry'

export function useOnlineFormNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const cat = (params.get('cat') as OnlineCategoryKey) || getDefaultSelection().cat
  const type = params.get('type') || getDefaultSelection().type

  const setSelection = (newCat: OnlineCategoryKey, newType: string) => {
    const p = new URLSearchParams(location.search)
    p.set('cat', newCat)
    p.set('type', newType)
    navigate({ search: p.toString() }, { replace: true })
  }

  const validTypes = requestRegistry[cat]?.types.map((t) => t.key) || []
  const safeType = validTypes.includes(type) ? type : validTypes[0]

  return {
    cat,
    type: safeType,
    setSelection,
    validTypes,
  }
}

