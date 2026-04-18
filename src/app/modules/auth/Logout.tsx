import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from './core/Auth'

export function Logout() {
  const {logout} = useAuth()
  useEffect(() => {
    logout()
  }, [logout])

  // RR v6: Navigate must not be the only child of <Routes> without <Route>; use a single Navigate here.
  return <Navigate to='/auth' replace />
}
