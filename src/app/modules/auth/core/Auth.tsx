import {FC, useState, useEffect, createContext, useContext, useRef, Dispatch, SetStateAction} from 'react'
import { useQueryClient } from "@tanstack/react-query"
import api from 'axios'
import axios from 'axios'
import {WithChildren} from '../../../../_metronic/helpers'
import {AuthModel, UserModel, PermissionModel} from './_models'
import {getUserSession, LOGOUT_URL} from './_requests'
import * as authHelper from './AuthHelpers'
import { getBranchUserSession, handleSocketJoinRoom, fullUrlServer } from '../../../functions'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'

api.defaults.baseURL = `${fullUrlServer}/api`;

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
  
  const saveAuth = (auth: AuthModel | undefined) => {
    const normalized = auth ? authHelper.normalizeAuth(auth) : undefined
    setAuth(normalized)
    setPermissions(normalized?.permissions || [])
    if (normalized) {
      authHelper.setAuth(normalized)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
    queryClient.clear();
  
    if (auth && auth?.user?.name){
      return axios.post(LOGOUT_URL, { name: auth.user.name }, {withCredentials:true})
    }
  
    return null;
  };

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout, permissions}}>
      {children}
    </AuthContext.Provider>
  )
}

// sebagai state management di App.tsx
const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  
  useEffect(() => {
    let isMounted = true
    const requestUser = async () => {
      try {
        if (didRequest.current) return

        const normalizedAuth = auth ? authHelper.normalizeAuth(auth) : undefined
        if (!normalizedAuth || !normalizedAuth.user) {
          logout()
          return
        }

        const refreshedAuth = await getUserSession(normalizedAuth)
        const activeAuth =
          authHelper.normalizeAuth(refreshedAuth) ||
          authHelper.normalizeAuth(authHelper.getAuth()) ||
          normalizedAuth

        if (!activeAuth || !activeAuth.user) {
          logout()
          return
        }

        setCurrentUser(activeAuth.user)

        // Handle join room safely only when branch resolved
        const branch = getBranchUserSession(activeAuth.user)
        if (branch) {
          handleSocketJoinRoom(branch)
        }
      } catch (error) {
        logout()
      } finally {
        if (isMounted) {
          setShowSplashScreen(false)
        }
        didRequest.current = true
      }
    }

    requestUser()
    return () => {
      isMounted = false
    }
  }, [auth, logout, setCurrentUser])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}