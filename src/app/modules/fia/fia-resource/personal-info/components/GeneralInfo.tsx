import {FC, useEffect, useRef, useState} from 'react'
import {NavigasiMainTab} from './NavTab'
import {useProfile} from './ProfileContext'
import NotFoundAlert from './NotFoundAlert'
import {
  fetchPersonalInfoCapabilities,
  searchPersonalInfo,
  fetchPersonalInfo,
  type PersonSearchItem,
} from '../../personal-info/core/_requests'
import {normalizeName} from '../../components/functions/normalizeName'

type Props = {
  className?: string
  showMainNav?: boolean
  allowEmployeeSearch?: boolean
}

const GeneralInfo: FC<Props> = ({className, showMainNav, allowEmployeeSearch = true}) => {
  const {profile, getPhotoUrl, setPersonalInfoPayload, role} = useProfile()

  // dropdown search state
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<PersonSearchItem[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [canSearchEmployee, setCanSearchEmployee] = useState(false)
  const blurTimerRef = useRef<number | null>(null)

  // alert state
  const [notFound, setNotFound] = useState(false)
  const [notFoundMsg, setNotFoundMsg] = useState('The person may not exist or you mistyped')

  useEffect(() => {
    if (role !== 'admin') return

    let isMounted = true

    ;(async () => {
      try {
        const capability = await fetchPersonalInfoCapabilities()
        if (isMounted) {
          setCanSearchEmployee(!!capability?.canSearchEmployee)
        }
      } catch (e: any) {
        console.error(e?.message)
        if (isMounted) {
          setCanSearchEmployee(false)
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [role])

  useEffect(() => {
    if (profile?.name && !query) setQuery(profile.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.name])

  // debounce search
  useEffect(() => {
    if (role !== 'admin' || !canSearchEmployee) return
    const q = query.trim()
    if (!q) {
      setOptions([])
      return
    }

    const t = window.setTimeout(async () => {
      try {
        setIsSearching(true)
        const rows = await searchPersonalInfo(q)
        setOptions(rows)
        setShowDropdown(true)
      } catch (e: any) {
        console.error(e?.message)
        setOptions([])
        setShowDropdown(true)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => window.clearTimeout(t)
  }, [query, role, canSearchEmployee])

  const pickPerson = async (p: PersonSearchItem) => {
    setQuery(normalizeName(p.full_name))
    setShowDropdown(false)
    setNotFound(false)

    try {
      const payload = await fetchPersonalInfo(p.id_number)
      setPersonalInfoPayload(payload)
    } catch (e: any) {
      console.error(e?.message)
      setNotFoundMsg(`Failed to load "${normalizeName(p.full_name)}" (${p.id_number}).`)
      setNotFound(true)
    }
  }

  const handleChangeClick = async () => {
    const key = query.trim()
    if (!key) return

    try {
      setIsSearching(true)
      const rows = await searchPersonalInfo(key)

      if (!rows.length) {
        setNotFoundMsg(`No result for "${query}". The person may not exist or you mistyped`)
        setNotFound(true)
        return
      }

      await pickPerson(rows[0])
    } catch (e: any) {
      setNotFoundMsg(`Search error for "${query}".`)
      setNotFound(true)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className={`card mb-3 ${className || ''}`}>
      <NotFoundAlert
        show={notFound}
        message={notFoundMsg}
        onClose={() => setNotFound(false)}
        autoHideMs={4000}
        fixed={false}
      />

      <div className='d-flex'>
        <div className='d-flex align-items-center p-4'>
          <div className='overlay-wrapper position-relative'>
            <img
              src={getPhotoUrl(profile?.photo_key || '')}
              alt=''
              className='rounded'
              style={{width: '110px', height: '140px', objectFit: 'cover'}}
            />
          </div>

          {profile && (
            <div className='d-flex flex-column justify-content-center ms-6'>
              <div className='text-dark mb-7'>
                <h2 className='fw-bold mb-1'>
                  {profile.name} <span className='text-gray-700'>({profile.id})</span>
                </h2>
                <div className='d-flex ms-2'>
                  <p className='text-gray-700 me-10'>{profile.position}</p>
                  <p className='text-gray-700'>
                    <em>{profile.email}</em>
                  </p>
                </div>
              </div>

              <div className='d-flex'>
                <div className='me-20'>
                  <p className='fw-bold'>Supervisor</p>
                  <p className='text-gray-700 ms-2'>{profile.supervisor}</p>
                </div>
                <div className='me-20'>
                  <p className='fw-bold'>Department</p>
                  <p className='text-gray-700 ms-2'>{profile.department}</p>
                </div>
                <div>
                  <p className='fw-bold text-nowrap'>Employee Type</p>
                  <p className='text-gray-700 ms-2'>{profile.employeeType}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {role === 'admin' && allowEmployeeSearch && (
          <div className='d-flex justify-content-between flex-column ms-auto'>
            {canSearchEmployee && (
              <div className='d-flex flex-column p-5 ms-auto' style={{position: 'relative'}}>
              <div className='input-group input-group-sm'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search by name or ID'
                  value={query}
                  onChange={(e) => {
                    setQuery(normalizeName(e.target.value))
                    setNotFound(false)
                  }}
                  onFocus={() => {
                    if (options.length) setShowDropdown(true)
                  }}
                  onBlur={() => {
                    blurTimerRef.current = window.setTimeout(() => setShowDropdown(false), 150)
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleChangeClick()}
                />
                <button className='btn btn-sm btn-light-primary' onClick={handleChangeClick}>
                  Change
                </button>
              </div>

              {showDropdown && (isSearching || options.length > 0) && (
                <div
                  style={{
                    position: 'absolute',
                    top: 55,
                    right: 0,
                    width: 320,
                    zIndex: 9999,
                    background: 'var(--bs-body-bg)',
                    border: '1px solid var(--bs-border-color)',
                    borderRadius: 6,
                    maxHeight: 240,
                    overflowY: 'auto',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    if (blurTimerRef.current) window.clearTimeout(blurTimerRef.current)
                  }}
                >
                  {isSearching && (
                    <div style={{padding: 10, fontSize: 13, opacity: 0.8}}>Searching...</div>
                  )}

                  {!isSearching &&
                    options.map((p) => (
                      <div
                        key={p.id_number}
                        style={{padding: '10px 12px', cursor: 'pointer'}}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          pickPerson(p)
                        }}
                      >
                        <div style={{fontWeight: 600}}>{normalizeName(p.full_name)}</div>
                        <div style={{fontSize: 12, opacity: 0.75}}>
                          {p.id_number}
                          {p.email ? ` • ${p.email}` : ''}
                        </div>
                      </div>
                    ))}
                </div>
              )}
              </div>
            )}

            <div className='me-5 mb-4 ms-auto'>
              {showMainNav !== false && <NavigasiMainTab className='ms-5 mt-2 mb-2' />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export {GeneralInfo}
