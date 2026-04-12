import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import {useSearchParams} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic'
import type {PersonalInfoResponse} from '../../personal-info/core/_requests'
import {fetchPersonalInfo, toServerFileUrl} from '../../personal-info/core/_requests'
import {normalizeName} from '../../components/functions/normalizeName'
import {useAuth} from '../../../../auth'

type ProfileType = {
  name: string
  id: string
  position: string
  email: string
  supervisor: string
  department: string
  employeeType: string
  photo_key: string // <-- ubah: simpan path foto dari backend
}

type Role = 'user' | 'admin'

type ProfileContextType = {
  selectedId: string | null
  setSelectedId: (id: string | null) => void

  profile: ProfileType | null
  setProfile: (profile: ProfileType | null) => void

  // data tab hasil fetch
  personalData: Record<string, any> | null
  jobInfo: Record<string, any> | null
  jobService: Record<string, any> | null
  dependents: any[]
  kin: any[]

  setPersonalInfoPayload: (payload: PersonalInfoResponse | null) => void

  getPhotoUrl: (photoPath: string) => string
  role: Role
}

const tryParse = (v: any) => {
  try {
    return JSON.parse(v)
  } catch {
    return null
  }
}

const pickId = (u: any) =>
  String(
    u?.id_number ||
      u?.idNumber ||
      u?.id_number_ref ||
      u?.idNumberRef ||
      u?.emp_id_number ||
      u?.employee_id_number ||
      u?.employeeIdNumber ||
      u?.id ||
      u?._id ||
      ''
  ).trim()

const getLoginIdentity = () => {
  const storages = [localStorage, sessionStorage]

  for (const st of storages) {
    // 1) coba key yang umum
    const commonKeys = [
      'user',
      'auth',
      'AUTH',
      'currentUser',
      'kt-auth-react-v',
      'persist:auth',
      'persist:root',
    ]
    for (const k of commonKeys) {
      const raw = st.getItem(k)
      if (!raw) continue
      const obj = tryParse(raw)
      if (!obj) continue

      // kalau persist biasanya JSON string lagi di dalamnya
      const inner =
        typeof obj === 'object'
          ? obj.user || obj.currentUser || obj.auth || tryParse(obj.user) || tryParse(obj.auth)
          : null

      const u = inner || obj
      const idNumber = pickId(u)
      if (idNumber) {
        return {
          idNumber,
          name: String(u?.name || u?.full_name || u?.fullname || '').trim(),
          username: String(u?.username || u?.user_name || '').trim(),
          email: String(u?.email || u?.email_company || u?.personal_email || '').trim(),
        }
      }
    }

    // 2) scan semua key (fallback)
    for (let i = 0; i < st.length; i++) {
      const k = st.key(i)
      if (!k) continue
      const raw = st.getItem(k)
      if (!raw) continue
      const obj = tryParse(raw)
      if (!obj) continue

      const idNumber = pickId(obj) || pickId(tryParse(obj?.user)) || pickId(tryParse(obj?.auth))
      if (idNumber) {
        return {
          idNumber,
          name: String(obj?.name || obj?.full_name || obj?.fullname || '').trim(),
          username: String(obj?.username || obj?.user_name || '').trim(),
          email: String(obj?.email || obj?.email_company || obj?.personal_email || '').trim(),
        }
      }
    }
  }

  return {idNumber: '', name: '', username: '', email: ''}
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider = ({children}: {children: ReactNode}) => {
  const {currentUser} = useAuth() // pastikan auth ter-inisialisasi
  const [searchParams] = useSearchParams()

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [profile, setProfile] = useState<ProfileType | null>(null)

  const [personalData, setPersonalData] = useState<Record<string, any> | null>(null)
  const [jobInfo, setJobInfo] = useState<Record<string, any> | null>(null)
  const [jobService, setJobService] = useState<Record<string, any> | null>(null)
  const [dependents, setDependents] = useState<any[]>([])
  const [kin, setKin] = useState<any[]>([])

  const role: Role = 'admin'

  const getPhotoUrl = (photoPath: string) => {
    // prioritas: dari server (backend), fallback blank
    const fromServer = toServerFileUrl(photoPath)
    if (fromServer) return fromServer
    return toAbsoluteUrl('/media/avatars/blank.png')
  }

  const setPersonalInfoPayload = useCallback((payload: PersonalInfoResponse | null) => {
    if (!payload) {
      setSelectedId(null)
      setProfile(null)
      setPersonalData(null)
      setJobInfo(null)
      setJobService(null)
      setDependents([])
      setKin([])
      return
    }

    setSelectedId(payload.header?.idNumber || null)

    setProfile({
      name: normalizeName(payload.header?.fullName || ''),
      id: payload.header?.idNumber || '',
      position: '(To be build)',
      email: payload.header?.email || '',
      supervisor: normalizeName(payload.header?.supervisor || ''),
      department: normalizeName(payload.header?.department || ''),
      employeeType: normalizeName(payload.header?.employeeType || ''),
      photo_key: payload.header?.photo || '',
    })

    setPersonalData(payload.personalData || null)
    setJobInfo(payload.jobInfo || null)
    setJobService(payload.jobService || null)
    setDependents(Array.isArray(payload.dependents) ? payload.dependents : [])
    setKin(Array.isArray(payload.kin) ? payload.kin : [])
  }, [])

  const didAutoLoadRef = useRef(false)

  useEffect(() => {
    if (didAutoLoadRef.current) return
    if (selectedId) {
      didAutoLoadRef.current = true
      return
    }

    const idFromQuery = String(searchParams.get('employeeId') || '').trim()
    if (idFromQuery) {
      didAutoLoadRef.current = true
      ;(async () => {
        try {
          const payload = await fetchPersonalInfo(idFromQuery)
          setPersonalInfoPayload(payload)
        } catch (e) {
          console.error('[PersonalInfo] auto load query employee failed:', e)
        }
      })()
      return
    }

    // ambil idNumber dari auth (utama)
    const idFromAuth = pickId(currentUser)

    // fallback dari storage (kalau auth belum ada / tidak ter-wrap provider)
    const idFromStorage = getLoginIdentity().idNumber

    const idNumber = (idFromAuth || idFromStorage || '').trim()

    // debug biar ketahuan sumbernya mana
    console.log('[PersonalInfo] autoLoad idFromAuth=', idFromAuth, 'idFromStorage=', idFromStorage)

    if (!idNumber) return

    didAutoLoadRef.current = true
    ;(async () => {
      try {
        const payload = await fetchPersonalInfo(idNumber)
        setPersonalInfoPayload(payload)
      } catch (e) {
        console.error('[PersonalInfo] auto load login user failed:', e)
        // kalau mau: didAutoLoadRef.current = false  (biar bisa retry)
      }
    })()
  }, [currentUser, searchParams, selectedId, setPersonalInfoPayload])

  return (
    <ProfileContext.Provider
      value={{
        selectedId,
        setSelectedId,
        profile,
        setProfile,
        personalData,
        jobInfo,
        jobService,
        dependents,
        kin,
        setPersonalInfoPayload,
        getPhotoUrl,
        role,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider')
  return ctx
}
