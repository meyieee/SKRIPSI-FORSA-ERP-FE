// ChatWindow.tsx
import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {useChat} from './ChatContext'
import {useTasksContext} from '../TasksContext'
import {useAuth} from '../../../../../../auth'
import {fullUrlServer} from '../../../../../../../functions/base_url'
import type {ChatAttachment} from './ChatContext'
import '../scss/tasksstyles.scss'
import DeleteConfirmAlert from './DeleteConfirmAlert'

type DraftAttachment = ChatAttachment & {file?: File}

const ChatWindow: React.FC = () => {
  const {selectedTaskId, closeChat, messagesByTask, sendMessage, deleteMessage} = useChat()
  const {tasksRows} = useTasksContext()
  const {currentUser, auth} = useAuth()

  const [draftText, setDraftText] = useState('')
  const [draftAtts, setDraftAtts] = useState<DraftAttachment[]>([])
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [activeDeleteId, setActiveDeleteId] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<{src: string; alt: string} | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // autoscroll flag: true = boleh ikut ke bawah, false = user lagi scroll baca ke atas
  const shouldAutoScrollRef = useRef(true)

  const filePickerRef = useRef<HTMLInputElement>(null)
  const longPressTimerRef = useRef<number | null>(null)

  const task = tasksRows.find((t) => t.id === selectedTaskId)

  const loginIdNumber = String(
    currentUser?.id_number ||
      auth?.user?.id_number ||
      (auth?.user as any)?.['employees.id_number'] ||
      ''
  ).trim()
  const allSameAssignedBy =
    tasksRows.length > 0 &&
    tasksRows.every(
      (row) => row.assigned_by_id && row.assigned_by_id === tasksRows[0].assigned_by_id
    )
  const allSameAssignedTo =
    tasksRows.length > 0 &&
    tasksRows.every(
      (row) => row.assigned_to_id && row.assigned_to_id === tasksRows[0].assigned_to_id
    )

  const inferredIsAssigner =
    loginIdNumber !== ''
      ? task?.assigned_by_id === loginIdNumber
      : allSameAssignedBy && !allSameAssignedTo

  const headerName = inferredIsAssigner ? task?.assigned_to : task?.assigned_by
  const messages = useMemo(
    () => (selectedTaskId ? messagesByTask[selectedTaskId] || [] : []),
    [selectedTaskId, messagesByTask]
  )

  const scrollToBottom = () => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }

  // set --vh mengikuti tinggi viewport dinamis (termasuk saat keyboard muncul)
  useEffect(() => {
    const vv = (window as any).visualViewport
    const setVH = () => {
      const h = vv ? vv.height : window.innerHeight
      document.documentElement.style.setProperty('--vh', `${h / 100}px`)
    }
    setVH()
    vv?.addEventListener('resize', setVH)
    window.addEventListener('resize', setVH)
    return () => {
      vv?.removeEventListener('resize', setVH)
      window.removeEventListener('resize', setVH)
    }
  }, [])

  // pastikan input terlihat ketika fokus
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const onFocus = () => {
      setTimeout(() => {
        el.scrollIntoView({behavior: 'smooth', block: 'nearest'})
      }, 120)
    }
    el.addEventListener('focus', onFocus)
    return () => el.removeEventListener('focus', onFocus)
  }, [])

  // saat buka task baru: niatnya langsung ke paling bawah
  useEffect(() => {
    if (!selectedTaskId) return
    shouldAutoScrollRef.current = true
    requestAnimationFrame(scrollToBottom)
  }, [selectedTaskId])

  // setelah messages render ke DOM, scroll ke bawah (stabil)
  useLayoutEffect(() => {
    if (!selectedTaskId) return
    if (!shouldAutoScrollRef.current) return
    if (!messages.length) return

    scrollToBottom()
    requestAnimationFrame(scrollToBottom)
    const t = window.setTimeout(scrollToBottom, 120)

    return () => window.clearTimeout(t)
  }, [selectedTaskId, messages])

  // kunci scroll body saat chat terbuka
  useEffect(() => {
    if (selectedTaskId !== null) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [selectedTaskId])

  if (selectedTaskId === null) return null

  // helper: buat attachment dari semua file (gambar atau non-gambar)
  const buildAttachments = (files: FileList): DraftAttachment[] => {
    const atts: DraftAttachment[] = []
    Array.from(files).forEach((f) => {
      const isImg = f.type.startsWith('image/')
      const url = URL.createObjectURL(f)
      atts.push({type: isImg ? 'image' : 'file', name: f.name, size: f.size, url, file: f})
    })
    return atts
  }

  const handlePickFiles = () => filePickerRef.current?.click()

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const atts = buildAttachments(e.target.files)
    if (atts.length) setDraftAtts((prev) => [...prev, ...atts])
    e.target.value = ''
  }

  const removeDraft = (idx: number) => {
    setDraftAtts((prev) => {
      const copy = [...prev]
      const [removed] = copy.splice(idx, 1)
      if (removed) URL.revokeObjectURL(removed.url)
      return copy
    })
  }

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!selectedTaskId) return
    if (!draftText.trim() && draftAtts.length === 0) return

    // saat kirim pesan, kita boleh autoscroll
    shouldAutoScrollRef.current = true

    await sendMessage(selectedTaskId, draftText.trim(), draftAtts as any)

    draftAtts.forEach((a) => {
      try {
        URL.revokeObjectURL(a.url)
      } catch {}
    })
    setDraftAtts([])
    setDraftText('')
  }

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }

  const handleTouchStart = (messageId: string) => {
    clearLongPressTimer()
    longPressTimerRef.current = window.setTimeout(() => {
      setActiveDeleteId(messageId)
    }, 450)
  }

  const handleTouchEnd = () => {
    clearLongPressTimer()
  }

  const handleBubbleClick = (messageId: string) => {
    if (activeDeleteId === messageId) {
      setActiveDeleteId(null)
    }
  }

  return (
    <div className='chat-overlay'>
      <div className='card chat-panel h-100 rounded-0 border-0 border-md-start'>
        {/* Header */}
        <div className='card-header d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center gap-2'>
            <button
              type='button'
              className='btn btn-icon btn-light btn-sm d-inline d-md-none'
              onClick={closeChat}
              aria-label='Back'
              title='Back'
            >
              <i className='bi bi-arrow-left' />
            </button>

            <div>
              <div className='fw-bold text-truncate' style={{maxWidth: '60vw'}}>
                {headerName || task?.assigned_by}
              </div>
              <div className='text-muted small'>Task #{task?.task_no}</div>
            </div>
          </div>

          <button className='btn btn-icon btn-light btn-sm' onClick={closeChat} aria-label='Close'>
            <i className='bi bi-x-lg' />
          </button>
        </div>

        {/* Chat */}
        <div
          ref={scrollRef}
          className='card-body overflow-auto px-3 py-3'
          style={{flex: '1 1 auto', minHeight: 0}}
          onScroll={() => {
            const el = scrollRef.current
            if (!el) return
            const distance = el.scrollHeight - el.scrollTop - el.clientHeight
            shouldAutoScrollRef.current = distance < 60
          }}
        >
          {messages.map((m) => {
            const mine = m.from === 'me'

            return (
              <div
                key={m.id}
                className={`d-flex mb-3 ${mine ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`bubble ${
                    mine ? 'bg-primary text-white bubble-right' : 'bg-body-secondary bubble-left'
                  } ${activeDeleteId === m.id ? 'show-delete' : ''}`}
                  style={{maxWidth: 520}}
                  onTouchStart={() => handleTouchStart(m.id)}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchEnd}
                  onClick={() => handleBubbleClick(m.id)}
                >
                  {/* tombol delete hanya untuk pesan saya */}
                  {mine && (
                    <button
                      type='button'
                      className='btn btn-icon btn-xs btn-light delete-btn'
                      onClick={() => setPendingDeleteId(m.id)}
                      title='Delete'
                      aria-label='Delete'
                    >
                      <i className='bi bi-trash' />
                    </button>
                  )}

                  {m.text && <div className='small mb-2'>{m.text}</div>}

                  {m.attachments?.map((a, idx) => {
                    const fileUrl = a.url?.startsWith('http') ? a.url : `${fullUrlServer}/${a.url}`

                    return (
                      <div key={idx} className='mb-2'>
                        {a.type === 'image' ? (
                          <button
                            type='button'
                            className='chat-image-thumb'
                            onClick={() => setPreviewImage({src: fileUrl, alt: a.name})}
                            title='Open image'
                            aria-label={`Open image ${a.name}`}
                          >
                            <img
                              src={fileUrl}
                              alt={a.name}
                              onLoad={() => {
                                if (shouldAutoScrollRef.current) {
                                  requestAnimationFrame(scrollToBottom)
                                }
                              }}
                            />
                          </button>
                        ) : (
                          <a href={fileUrl} download={a.name} className='text-decoration-underline'>
                            {a.name}
                          </a>
                        )}
                      </div>
                    )
                  })}

                  <div className='text-muted small mt-1'>{new Date(m.ts).toLocaleTimeString()}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Keyboard */}
        <div className='card-footer'>
          {draftAtts.length > 0 && (
            <div className='mb-2'>
              <div className='d-flex flex-wrap gap-2'>
                {draftAtts.map((a, idx) => (
                  <div key={idx} className='position-relative'>
                    {a.type === 'image' ? (
                      <img
                        src={a.url}
                        alt={a.name}
                        style={{height: 72, width: 72, objectFit: 'cover', borderRadius: 6}}
                      />
                    ) : (
                      <div
                        className='d-flex align-items-center justify-content-center bg-body-secondary'
                        style={{height: 72, width: 72, borderRadius: 6}}
                      >
                        <i className='bi bi-file-earmark-text fs-3' />
                      </div>
                    )}

                    <button
                      type='button'
                      className='btn btn-icon btn-sm btn-light position-absolute top-0 end-0 translate-middle'
                      onClick={() => removeDraft(idx)}
                      aria-label='Remove'
                      title='Remove'
                    >
                      <i className='bi bi-x' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSend}>
            <div className='d-flex align-items-center gap-2'>
              <button
                type='button'
                className='btn btn-icon btn-light'
                onClick={handlePickFiles}
                aria-label='Add files or images'
                title='Add files or images'
              >
                <i className='bi bi-paperclip' />
              </button>

              <input
                ref={inputRef}
                className='form-control flex-grow-1 min-w-0'
                placeholder='Type a message...'
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
              />

              <button
                type='submit'
                className='btn btn-icon btn-primary'
                aria-label='Send'
                title='Send'
              >
                <i className='bi bi-send-fill' />
              </button>
            </div>

            <input
              ref={filePickerRef}
              type='file'
              multiple
              hidden
              accept='image/*,.pdf,.doc,.docx,.xlsx,.csv,.jpg,.jpeg,.png,.gif,.txt'
              onChange={onFilesSelected}
            />
          </form>
        </div>
      </div>

      <DeleteConfirmAlert
        show={!!pendingDeleteId}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (selectedTaskId && pendingDeleteId) {
            deleteMessage(selectedTaskId, pendingDeleteId)
          }
          setPendingDeleteId(null)
        }}
      />

      {previewImage && (
        <div
          className='chat-image-preview'
          role='dialog'
          aria-modal='true'
          aria-label='Image preview'
          onClick={() => setPreviewImage(null)}
        >
          <button
            type='button'
            className='chat-image-preview__close'
            onClick={() => setPreviewImage(null)}
            aria-label='Close preview'
            title='Close preview'
          >
            <i className='bi bi-x-lg' />
          </button>
          <img
            className='chat-image-preview__img'
            src={previewImage.src}
            alt={previewImage.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default ChatWindow
