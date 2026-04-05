import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useCanAccessRoute } from '../../../custom-hooks'

type Props = {
  routePath: string
  children: ReactNode
  fallback?: ReactNode
}

/**
 * ProtectedRoute Component
 * Guards routes based on user permissions
 * Requires Read permission for the specified route path
 */
export const ProtectedRoute: FC<Props> = ({ 
  routePath, 
  children, 
  fallback = <Navigate to="/error/403" replace /> 
}) => {
  const safeRoutePath = typeof routePath === 'string' ? routePath : ''
  const canAccess = useCanAccessRoute(safeRoutePath)
  
  if (!safeRoutePath || !canAccess) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

