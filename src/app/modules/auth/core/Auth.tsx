import {FC, useState, useEffect, useCallback, createContext, useContext, Dispatch, SetStateAction} from 'react'
import { useQueryClient } from "@tanstack/react-query"
import api from 'axios'
import axios from 'axios'
import {WithChildren} from '../../../../_metronic/helpers'
import {AuthModel, UserModel, PermissionModel} from './_models'
import {getUserSession, LOGOUT_URL} from './_requests'
import * as authHelper from './AuthHelpers'
import { getBranchUserSession, handleSocketJoinRoom } from '../../../functions'
import { apiBaseUrl } from '../../../functions/base_url'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'

api.defaults.baseURL = apiBaseUrl;

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
  permissions: PermissionModel[]
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
  permissions: [],
}

// -> initialisasi sebagai useContext
const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}
// -> end initialisasi sebagai useContext


// sebagai state management di index.tsx (component terluar)
const AuthProvider: FC<WithChildren> = ({children}) => {
  
  const queryClient = useQueryClient();
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const [permissions, setPermissions] = useState<PermissionModel[]>(
    auth?.permissions || []
  )
  
  // Sync permissions when auth changes (e.g., on page refresh)
  useEffect(() => {
    if (auth?.permissions) {
      setPermissions(auth.permissions)
    } else {
      setPermissions([])
    }
  }, [auth])
  
  const saveAuth = useCallback((nextAuth: AuthModel | undefined) => {
    const normalized = nextAuth ? authHelper.normalizeAuth(nextAuth) : undefined
    setAuth(normalized)
    setPermissions(normalized?.permissions || [])
    if (normalized) {
      authHelper.setAuth(normalized)
    } else {
      authHelper.removeAuth()
    }
  }, [])

  const logout = useCallback(() => {
    saveAuth(undefined)
    setCurrentUser(undefined)
    queryClient.clear()

    if (auth && auth?.user?.name) {
      return axios.post(`${apiBaseUrl}${LOGOUT_URL}`, {name: auth.user.name}, {withCredentials: true})
    }

    return null
  }, [auth, saveAuth, queryClient])

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout, permissions}}>
      {children}
    </AuthContext.Provider>
  )
}

const SESSION_FETCH_TIMEOUT_MS = 15000

// sebagai state management di App.tsx
const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    let cancelled = false

    const requestUser = async () => {
      try {
        const normalizedAuth = auth ? authHelper.normalizeAuth(auth) : undefined
        if (!normalizedAuth || !normalizedAuth.user) {
          logout()
          return
        }

        const refreshedAuth = await Promise.race([
          getUserSession(normalizedAuth),
          new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), SESSION_FETCH_TIMEOUT_MS)),
        ])

        if (cancelled) return

        const activeAuth =
          authHelper.normalizeAuth(refreshedAuth) ||
          authHelper.normalizeAuth(authHelper.getAuth()) ||
          normalizedAuth

        if (!activeAuth || !activeAuth.user) {
          logout()
          return
        }

        setCurrentUser(activeAuth.user)

        const branch = getBranchUserSession(activeAuth.user)
        if (branch) {
          handleSocketJoinRoom(branch)
        }
      } catch (error) {
        logout()
      } finally {
        setShowSplashScreen(false)
      }
    }

    requestUser()
    return () => {
      cancelled = true
    }
  }, [auth, logout, setCurrentUser])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
