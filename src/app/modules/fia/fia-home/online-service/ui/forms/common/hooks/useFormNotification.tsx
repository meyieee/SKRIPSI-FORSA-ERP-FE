import { useState, useCallback } from 'react'

type UseFormNotificationReturn = {
  // Modal states
  showSuccess: boolean
  showError: boolean
  showDraftSaved: boolean
  
  // Messages
  successMessage: string
  errorMessage: string
  errorDetails?: string
  successRequestId?: string
  successRefRequestNo?: string
  
  // Actions
  showSuccessModal: (message: string, requestId?: string, refRequestNo?: string) => void
  showErrorModal: (message: string, details?: string) => void
  showDraftSavedModal: () => void
  closeAllModals: () => void
}

export function useFormNotification(): UseFormNotificationReturn {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showDraftSaved, setShowDraftSaved] = useState(false)
  
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorDetails, setErrorDetails] = useState<string | undefined>(undefined)
  const [successRequestId, setSuccessRequestId] = useState<string | undefined>(undefined)
  const [successRefRequestNo, setSuccessRefRequestNo] = useState<string | undefined>(undefined)

  const showSuccessModal = useCallback((message: string, requestId?: string, refRequestNo?: string) => {
    setSuccessMessage(message)
    setSuccessRequestId(requestId)
    setSuccessRefRequestNo(refRequestNo)
    setShowSuccess(true)
  }, [])

  const showErrorModal = useCallback((message: string, details?: string) => {
    setErrorMessage(message)
    setErrorDetails(details)
    setShowError(true)
  }, [])

  const showDraftSavedModal = useCallback(() => {
    setShowDraftSaved(true)
  }, [])

  const closeAllModals = useCallback(() => {
    setShowSuccess(false)
    setShowError(false)
    setShowDraftSaved(false)
    // Clear messages after a short delay to allow modal close animation
    setTimeout(() => {
      setSuccessMessage('')
      setErrorMessage('')
      setErrorDetails(undefined)
      setSuccessRequestId(undefined)
      setSuccessRefRequestNo(undefined)
    }, 300)
  }, [])

  return {
    showSuccess,
    showError,
    showDraftSaved,
    successMessage,
    errorMessage,
    errorDetails,
    successRequestId,
    successRefRequestNo,
    showSuccessModal,
    showErrorModal,
    showDraftSavedModal,
    closeAllModals
  }
}

