import React, { useCallback, useEffect, useRef, useState } from 'react'
import { UserModel } from '../../../../../../../../modules/auth'
import { normalizeName } from '../../../../../../fia-resource/components/functions/normalizeName'
import {
  searchOnlineServiceEmployees,
  type OnlineServiceEmployeeSearchItem,
} from '../../../../core/employee-search/_requests'

type EmployeeSearchTypeaheadProps = {
  label: string
  name: string
  value: string
  onChange: (idNumber: string) => void
  placeholder?: string
  required?: boolean
  currentUser?: UserModel | null
}

function displayNameFromUser(user: UserModel | null | undefined): string {
  if (!user) return ''
  if (user.name) return user.name
  if (user.username) return user.username
  if (user.fullname) return user.fullname
  if (user.first_name || user.last_name) {
    return `${user.first_name || ''} ${user.last_name || ''}`.trim()
  }
  if (user.id_number) return user.id_number
  return ''
}

function userIdKey(user: UserModel | null | undefined): string {
  if (!user) return ''
  return (user.id_number || user.id?.toString() || '').trim()
}

export default function EmployeeSearchTypeahead({
  label,
  name,
  value,
  onChange,
  placeholder = 'Search by name or ID…',
  required = false,
  currentUser,
}: EmployeeSearchTypeaheadProps) {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<OnlineServiceEmployeeSearchItem[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const blurTimerRef = useRef<number | null>(null)
  const lastSelectedRef = useRef<{ id: string; label: string } | null>(null)
  const focusedRef = useRef(false)
  const searchDebounceRef = useRef<number | null>(null)

  useEffect(() => {
    if (!value) {
      setQuery('')
      lastSelectedRef.current = null
      return
    }
    if (lastSelectedRef.current && lastSelectedRef.current.id !== value) {
      lastSelectedRef.current = null
    }
    const uid = userIdKey(currentUser)
    if (lastSelectedRef.current?.id === value) {
      setQuery(lastSelectedRef.current.label)
      return
    }
    if (uid && value === uid) {
      const d = displayNameFromUser(currentUser)
      setQuery(d ? normalizeName(d) : value)
      return
    }
    setQuery(value)
  }, [value, currentUser])

  const runSearch = useCallback(async (qRaw: string) => {
    const q = (qRaw || '').replace(/\s+/g, ' ').trim()
    try {
      setIsSearching(true)
      const rows = await searchOnlineServiceEmployees(q)
      setOptions(rows)
      if (focusedRef.current) setShowDropdown(true)
    } catch (e) {
      console.error(e)
      setOptions([])
      if (focusedRef.current) setShowDropdown(true)
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    if (!focusedRef.current) return

    if (searchDebounceRef.current) window.clearTimeout(searchDebounceRef.current)
    searchDebounceRef.current = window.setTimeout(() => {
      void runSearch(query)
    }, 300)

    return () => {
      if (searchDebounceRef.current) window.clearTimeout(searchDebounceRef.current)
    }
  }, [query, runSearch])

  const pick = (p: OnlineServiceEmployeeSearchItem) => {
    const labelText = normalizeName(p.full_name)
    lastSelectedRef.current = { id: p.id_number, label: labelText }
    setQuery(labelText)
    setShowDropdown(false)
    onChange(p.id_number)
  }

  return (
    <div className='mb-2 position-relative'>
      <label className={`form-label ${required ? 'required' : ''}`}>{label}</label>
      <input
        type='text'
        name={name}
        className='form-control'
        autoComplete='off'
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(normalizeName(e.target.value))
        }}
        onFocus={() => {
          focusedRef.current = true
          setShowDropdown(true)
          if (searchDebounceRef.current) window.clearTimeout(searchDebounceRef.current)
          void runSearch(query)
        }}
        onBlur={() => {
          focusedRef.current = false
          blurTimerRef.current = window.setTimeout(() => setShowDropdown(false), 150)
        }}
      />

      {showDropdown && (
        <div
          className='position-absolute w-100 mt-1 rounded border shadow-sm'
          style={{
            zIndex: 9999,
            background: 'var(--bs-body-bg)',
            borderColor: 'var(--bs-border-color)',
            maxHeight: 240,
            overflowY: 'auto',
          }}
          onMouseDown={(e) => {
            e.preventDefault()
            if (blurTimerRef.current) window.clearTimeout(blurTimerRef.current)
          }}
        >
          {isSearching && (
            <div className='p-2 small text-muted'>Searching…</div>
          )}
          {!isSearching && options.length === 0 && (
            <div className='p-2 small text-muted'>No employees found</div>
          )}
          {!isSearching &&
            options.map((p) => (
              <div
                key={p.id_number}
                className='px-3 py-2'
                style={{ cursor: 'pointer' }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  pick(p)
                }}
              >
                <div className='fw-semibold'>{normalizeName(p.full_name)}</div>
                <div className='small text-muted'>
                  {p.id_number}
                  {p.email ? ` • ${p.email}` : ''}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
