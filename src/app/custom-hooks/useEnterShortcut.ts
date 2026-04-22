import {useEffect} from 'react'

type EnterShortcutOptions = {
  enabled?: boolean
  onEnter: () => void
  allowTextarea?: boolean
  shouldHandle?: (event: KeyboardEvent) => boolean
}

const isEditableTarget = (target: EventTarget | null, allowTextarea = false) => {
  const element = target as HTMLElement | null
  if (!element) return false

  const tagName = element.tagName?.toLowerCase()
  if (!allowTextarea && tagName === 'textarea') return true
  if (!allowTextarea && (element as HTMLInputElement).type === 'textarea') return true
  if (element.isContentEditable) return true

  return false
}

export default function useEnterShortcut({
  enabled = true,
  onEnter,
  allowTextarea = false,
  shouldHandle,
}: EnterShortcutOptions) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return
      if (event.ctrlKey || event.altKey || event.metaKey) return
      if (event.shiftKey) return
      if (isEditableTarget(event.target, allowTextarea)) return
      if (shouldHandle && !shouldHandle(event)) return

      event.preventDefault()
      onEnter()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [allowTextarea, enabled, onEnter, shouldHandle])
}
