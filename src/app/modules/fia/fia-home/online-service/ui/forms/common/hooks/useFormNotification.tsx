import { useState, useCallback } from 'react'

type UseFormNotificationReturn = {
  showSuccess: boolean
  showError: boolean
  successMessage: string
  errorMessage: string
  errorDetails?: string
  successRequestId?: string
  successRefRequestNo?: string
  showSuccessModal: (message: string, requestId?: string, refRequestNo?: string) => void
  showErrorModal: (message: string, details?: string) => void
  closeAllModals: () => void
}

export function useFormNotification(): UseFormNotificationReturn {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

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

  const closeAllModals = useCallback(() => {
    setShowSuccess(false)
    setShowError(false)
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
    successMessage,
    errorMessage,
    errorDetails,
    successRequestId,
    successRefRequestNo,
    showSuccessModal,
    showErrorModal,
    closeAllModals
  }
}
