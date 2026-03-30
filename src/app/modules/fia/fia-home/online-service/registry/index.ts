import { OnlineCategoryKey, OnlineCategory } from './types'
import { operationTypes } from './categories/operationRegistry'
import { resourceTypes } from './categories/resourceRegistry'
import { departmentTypes } from './categories/departmentRegistry'
import { generalTypes } from './categories/generalRegistry'

export const requestRegistry: Record<OnlineCategoryKey, OnlineCategory> = {
  operation: {
    key: 'operation',
    label: 'OPERATION',
    types: operationTypes,
  },
  resource: {
    key: 'resource',
    label: 'RESOURCE',
    types: resourceTypes,
  },
  department: {
    key: 'department',
    label: 'DEPARTMENT',
    types: departmentTypes,
  },
  general: {
    key: 'general',
    label: 'GENERAL',
    types: generalTypes,
  },
}

export function getDefaultSelection(): { cat: OnlineCategoryKey; type: string } {
  const cat: OnlineCategoryKey = 'operation'
  const type = requestRegistry[cat].types[0]?.key ?? 'job-request'
  return { cat, type }
}

// Re-export types for convenience
export type { OnlineCategoryKey, OnlineRequestType, OnlineCategory } from './types'

