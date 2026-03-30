import { useEffect, useState } from 'react'
import { OnlineCategoryKey } from '../registry'

type UseOnlineFormParams<T> = {
  cat: OnlineCategoryKey
  type: string
  getFormApi: (cat: OnlineCategoryKey, type: string) => Promise<T>
  saveDraftApi: (cat: OnlineCategoryKey, type: string, payload: T) => Promise<void>
  submitApi: (cat: OnlineCategoryKey, type: string, payload: T) => Promise<{ requestId: string }>
  validate: (values: T) => string[]
}

type UseOnlineFormReturn<T> = {
  data: T | null
  loading: boolean
  submitting: boolean
  error: string | null
  onSubmit: (values: T, actions: any) => Promise<void>
  onSave: () => Promise<void>
  onCancel: () => Promise<void>
  setData: (data: T | null) => void
}

export function useOnlineForm<T>({
  cat,
  type,
  getFormApi,
  saveDraftApi,
  submitApi,
  validate,
}: UseOnlineFormParams<T>): UseOnlineFormReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    console.log(`=== ${type.toUpperCase()} FORM LOADING START ===`)
    console.log(`Loading ${type} form for category:`, cat, 'type:', type)
    
    getFormApi(cat, type)
      .then((res) => {
        console.log(`✅ ${type} form data loaded successfully:`, res)
        if (mounted) {
          setData(res)
        }
      })
      .catch((err) => {
        console.error(`❌ Error loading ${type} form:`, err)
        if (mounted) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
        console.log(`=== ${type.toUpperCase()} FORM LOADING END ===`)
      })
    
    return () => {
      mounted = false
    }
  }, [cat, type, getFormApi])

  const onSubmit = async (values: T, actions: any) => {
    const errs = validate(values)
    if (errs.length) {
      setError(errs.join('\n'))
      return
    }
    setError(null)
    try {
      setSubmitting(true)
      const res = await submitApi(cat, type, values)
      alert('Submitted! New Request ID: ' + res.requestId)
      actions.resetForm()
    } catch (e: any) {
      alert(e.message || 'Submit failed')
    } finally {
      setSubmitting(false)
    }
  }

  const onSave = async () => {
    if (!data) return
    try {
      await saveDraftApi(cat, type, data)
      alert('Draft saved (dummy)')
    } catch (e: any) {
      alert(e.message || 'Save failed')
    }
  }

  const onCancel = async () => {
    try {
      const initial = await getFormApi(cat, type)
      setData(initial)
      alert('Reset to initial (dummy)')
    } catch (e: any) {
      alert(e.message || 'Reset failed')
    }
  }

  return {
    data,
    loading,
    submitting,
    error,
    onSubmit,
    onSave,
    onCancel,
    setData,
  }
}

