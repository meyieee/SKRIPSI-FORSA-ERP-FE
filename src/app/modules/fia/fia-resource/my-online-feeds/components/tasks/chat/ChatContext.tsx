import React, {createContext, useContext, useState, useEffect, useRef} from 'react'
import {default as socket} from '../../../../../../../functions/socket'
import {apiBaseUrl} from '../../../../../../../functions/base_url'
import {getAuth} from '../../../../../../auth'

export type ChatAttachment = {
  type: 'image' | 'file'
  name: string
  size: number
  url: string // untuk preview / download (bisa dataURL dari backend)
}

export type ChatMessage = {
  id: string
  taskId: number
  from: 'me' | 'them'
  text: string
  ts: number // timestamp (ms)
  attachments?: ChatAttachment[]
}

type ChatCtx = {
  selectedTaskId: number | null
  openChat: (taskId: number) => void
  closeChat: () => void
  messagesByTask: Record<number, ChatMessage[]>
  sendMessage: (taskId: number, text: string, attachments?: ChatAttachment[]) => Promise<void>
  deleteMessage: (taskId: number, messageId: string) => Promise<void>
  unreadCounts: Record<number, number>
  markAsRead: (taskId: number) => void
  preloadUnreadForTask: (taskId: number) => Promise<void>
}

const ChatContext = createContext<ChatCtx | undefined>(undefined)

const API_BASE = apiBaseUrl

export const ChatProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const [messagesByTask, setMessagesByTask] = useState<Record<number, ChatMessage[]>>({})
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({})
  const selectedTaskIdRef = useRef<number | null>(null)
  const preloadRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    selectedTaskIdRef.current = selectedTaskId
  }, [selectedTaskId])

  const getStoredUser = () => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return {}
    }
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  const getLoginIdNumber = () => {
    const auth = getAuth()
    const u: any = auth?.user || {}
    const storedUser: any = getStoredUser()
    return String(
      u?.id_number ||
        u?.idNumber ||
        u?.['employees.id_number'] ||
        storedUser?.id_number ||
        storedUser?.idNumber ||
        storedUser?.['employees.id_number'] ||
        ''
    ).trim()
  }

  const getLoginBranchCode = () => {
    const auth = getAuth()
    const u: any = auth?.user || {}
    const storedUser: any = getStoredUser()
    return String(
      u?.branch_code ||
        u?.branchCode ||
        u?.['employees.branch_detail.branch_code'] ||
        storedUser?.branch_code ||
        storedUser?.branchCode ||
        storedUser?.['employees.branch_detail.branch_code'] ||
        ''
    ).trim()
  }

  const getOpenedKey = () => {
    const idNumber = getLoginIdNumber() || 'unknown'
    return `tasks_chat_opened_${idNumber}`
  }

  const getLastOpenedAt = (taskId: number) => {
    try {
      const raw = localStorage.getItem(getOpenedKey())
      if (!raw) return false
      const map = JSON.parse(raw)
      if (map && typeof map === 'object') {
        const ts = map[String(taskId)]
        return typeof ts === 'number' ? ts : null
      }
      return null
    } catch {
      return null
    }
  }

  const markOpenedTask = (taskId: number, openedAt?: number) => {
    try {
      const key = getOpenedKey()
      const raw = localStorage.getItem(key)
      const map = raw ? JSON.parse(raw) : {}
      const next = map && typeof map === 'object' ? map : {}
      next[String(taskId)] = openedAt ?? Date.now()
      localStorage.setItem(key, JSON.stringify(next))
    } catch {
      // ignore
    }
  }

  // helper: mapping response API -> ChatMessage
  const mapApiToChatMessage = (row: any): ChatMessage => {
    const taskId = Number(row.task_id ?? row.taskId ?? 0)

    const fromRaw = row.sender ?? row.from
    const from: 'me' | 'them' = fromRaw === 'me' ? 'me' : 'them'

    const text = row.message_text ?? row.text ?? ''

    const ts = row.created_at
      ? new Date(row.created_at).getTime()
      : typeof row.ts === 'number'
      ? row.ts
      : Date.now()

    const attachments = Array.isArray(row.attachments)
      ? row.attachments.map((a: any) => ({
          type: a.type === 'image' ? 'image' : 'file',
          name: a.name ?? 'file',
          size: a.size ?? 0,
          url: a.url ?? '',
        }))
      : undefined

    return {
      id: String(row.id),
      taskId,
      from,
      text,
      ts,
      attachments,
    }
  }

  // Ambil semua pesan untuk satu task dari backend
  const fetchMessagesForTask = async (taskId: number) => {
    try {
      const res = await fetch(`${API_BASE}/fia-resource/tasks/${taskId}/messages`, {
        credentials: 'include', // supaya cookie token ikut ke backend
      })

      if (!res.ok) {
        console.error('Failed to fetch messages', await res.text())
        return
      }

      const json = await res.json()
      const rows = Array.isArray(json.data) ? json.data : []
      const chats: ChatMessage[] = rows.map(mapApiToChatMessage)

      setMessagesByTask((prev) => ({...prev, [taskId]: chats}))

      if (selectedTaskIdRef.current === taskId) {
        const latestTs = chats.length ? chats[chats.length - 1].ts : Date.now()
        markOpenedTask(taskId, latestTs)
      }

      // kalau mau, di sini kamu bisa hitung unread dari backend (misal ada kolom is_read)
      // sementara biarkan saja:
      setUnreadCounts((prev) => ({...prev, [taskId]: 0}))
    } catch (err) {
      console.error('fetchMessagesForTask error:', err)
    }
  }

  const preloadUnreadForTask = async (taskId: number) => {
    if (!taskId) return
    if (selectedTaskIdRef.current === taskId) return
    if (preloadRef.current.has(taskId)) return
    const lastOpenedAt = getLastOpenedAt(taskId)

    preloadRef.current.add(taskId)
    try {
      const res = await fetch(`${API_BASE}/fia-resource/tasks/${taskId}/messages`, {
        credentials: 'include',
      })

      if (!res.ok) {
        console.error('Failed to preload messages', await res.text())
        return
      }

      const json = await res.json()
      const rows = Array.isArray(json.data) ? json.data : []
      const chats: ChatMessage[] = rows.map(mapApiToChatMessage)
      const unread = chats.filter(
        (m) => m.from === 'them' && (!lastOpenedAt || m.ts > lastOpenedAt)
      ).length
      setUnreadCounts((prev) => ({...prev, [taskId]: unread}))
    } catch (err) {
      console.error('preloadUnreadForTask error:', err)
    } finally {
      preloadRef.current.delete(taskId)
    }
  }

  const openChat = (taskId: number) => {
    setSelectedTaskId(taskId)
    markOpenedTask(taskId)
    fetchMessagesForTask(taskId)
    markAsRead(taskId) // reset unread saat dibuka
  }

  const closeChat = () => {
    const currentTaskId = selectedTaskIdRef.current
    if (currentTaskId) {
      markOpenedTask(currentTaskId)
      setUnreadCounts((prev) => ({...prev, [currentTaskId]: 0}))
    }
    setSelectedTaskId(null)
  }

  const markAsRead = (taskId: number) => {
    markOpenedTask(taskId)
    setUnreadCounts((prev) => ({...prev, [taskId]: 0}))
    // kalau mau, kamu bisa panggil endpoint PATCH ke backend untuk set is_read = 1 di sini
  }

  /* KIRIM PESAN -> backend */
  const sendMessage = async (
    taskId: number,
    text: string,
    attachments: any[] = []
  ): Promise<void> => {
    if (!text.trim() && attachments.length === 0) return

    try {
      const fd = new FormData()

      // ✅ controller baca req.body.text
      fd.append('text', text?.trim?.() || '')

      // ✅ multer: .array("files") -> field harus "files"
      attachments.forEach((a: any) => {
        if (a?.file instanceof File) {
          fd.append('files', a.file)
        }
      })

      const res = await fetch(`${API_BASE}/fia-resource/tasks/${taskId}/messages`, {
        method: 'POST',
        credentials: 'include',
        body: fd,
      })

      if (!res.ok) {
        console.error('sendMessage failed', await res.text())
        return
      }

      const json = await res.json()
      const saved = mapApiToChatMessage(json.data ?? json)

      setMessagesByTask((prev) => {
        const arr = prev[taskId] ? [...prev[taskId]] : []
        if (arr.some((item) => item.id === saved.id)) {
          return prev
        }
        arr.push(saved)
        return {...prev, [taskId]: arr}
      })

      await fetchMessagesForTask(taskId)
    } catch (err) {
      console.error('sendMessage error:', err)
    }
  }

  /* HAPUS PESAN -> backend */
  const deleteMessage = async (taskId: number, messageId: string): Promise<void> => {
    try {
      const res = await fetch(
        `${API_BASE}/fia-resource/tasks/${taskId}/messages/${encodeURIComponent(messageId)}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      )

      if (!res.ok) {
        console.error('deleteMessage failed', await res.text())
        return
      }

      // kalau backend balas OK, baru update state
      setMessagesByTask((prev) => {
        const list = prev[taskId] || []
        return {...prev, [taskId]: list.filter((m) => m.id !== messageId)}
      })
    } catch (err) {
      console.error('deleteMessage error:', err)
    }
  }

  // (optional) kalau kamu nanti pakai WebSocket / SSE:
  // - buka koneksi di useEffect
  useEffect(() => {
    const branchCode = getLoginBranchCode()
    const loginIdNumber = getLoginIdNumber()
    const rooms = [branchCode, loginIdNumber].filter(Boolean)

    if (!rooms.length) return

    const joinRoom = () => {
      rooms.forEach((room) => {
        socket.emit('join room', room)
        console.log('[socket] join room:', room)
      })
    }

    const handleDisconnect = (reason: string) => console.log('[socket] disconnected:', reason)
    const handleConnectError = (err: any) => console.log('[socket] connect_error:', err?.message)

    if (socket.connected) joinRoom()
    socket.on('connect', joinRoom)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleConnectError)

    return () => {
      socket.off('connect', joinRoom)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleConnectError)

      rooms.forEach((room) => {
        socket.emit('leave room', room)
      })
    }
  }, [])

  useEffect(() => {
    if (!selectedTaskId) return

    fetchMessagesForTask(selectedTaskId)

    const timer = window.setInterval(() => {
      fetchMessagesForTask(selectedTaskId)
    }, 1500)

    return () => {
      window.clearInterval(timer)
    }
  }, [selectedTaskId])

  useEffect(() => {
    const handleIncoming = (payload: any) => {
      const taskId = Number(payload?.task_id ?? payload?.taskId ?? 0)
      if (!taskId) return

      const myId = getLoginIdNumber()

      const assignedToId = String(payload?.assigned_to_id ?? payload?.assignedToId ?? '')
      const assignedById = String(payload?.assigned_by_id ?? payload?.assignedById ?? '')
      const isMember =
        !myId ||
        (assignedToId && assignedToId === myId) ||
        (assignedById && assignedById === myId)
      if (!isMember) return

      const senderId = String(payload?.sender_id ?? payload?.senderId ?? '')
      if (senderId && senderId === myId) return

      setMessagesByTask((prev) => {
        const chat = mapApiToChatMessage(payload)
        const list = prev[taskId] || []
        if (list.some((item) => item.id === chat.id)) {
          return prev
        }
        return {...prev, [taskId]: [...list, chat]}
      })

      fetchMessagesForTask(taskId)

      const createdAt = payload?.created_at ? new Date(payload.created_at).getTime() : Date.now()

      if (selectedTaskIdRef.current === taskId) {
        markOpenedTask(taskId, createdAt)
        setUnreadCounts((prev) => ({...prev, [taskId]: 0}))
        return
      }

      const lastOpenedAt = getLastOpenedAt(taskId)
      if (lastOpenedAt && createdAt <= lastOpenedAt) {
        setUnreadCounts((prev) => ({...prev, [taskId]: 0}))
        return
      }
      setUnreadCounts((prev) => ({...prev, [taskId]: (prev[taskId] || 0) + 1}))
    }

    socket.on('tasks-message', handleIncoming)

    const handleDeleted = (payload: any) => {
      const taskId = Number(payload?.task_id ?? payload?.taskId ?? 0)
      const messageId = String(payload?.id ?? '')
      if (!taskId || !messageId) return

      setMessagesByTask((prev) => {
        const list = prev[taskId] || []
        return {...prev, [taskId]: list.filter((m) => m.id !== messageId)}
      })
    }

    socket.on('tasks-message-deleted', handleDeleted)
    return () => {
      socket.off('tasks-message', handleIncoming)
      socket.off('tasks-message-deleted', handleDeleted)
    }
  }, [])
  // - kalau ada pesan baru untuk taskId X, panggil setMessagesByTask + update unreadCounts

  return (
    <ChatContext.Provider
      value={{
        selectedTaskId,
        openChat,
        closeChat,
        messagesByTask,
        sendMessage,
        deleteMessage,
        unreadCounts,
        markAsRead,
        preloadUnreadForTask,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}
