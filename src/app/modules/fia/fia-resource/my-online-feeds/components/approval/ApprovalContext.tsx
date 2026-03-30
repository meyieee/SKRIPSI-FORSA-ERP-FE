import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import type {ApprovalRow, ApprovalContextType} from './types'
import {getApprovalHistory, getCurrentApprovals, postApprovalAction} from '../../core/approval'
import {default as socket} from '../../../../../../functions/socket'
import {getAuth} from '../../../../../auth'

const ApprovalContext = createContext<ApprovalContextType | undefined>(undefined)

export const ApprovalProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [approvalRows, setApprovalRows] = useState<ApprovalRow[]>([])
  const [historyRows, setHistoryRows] = useState<ApprovalRow[]>([])
  const [selectedItems, setSelectedItems] = useState<ApprovalRow[]>([])

  // untuk breadcrumb “Awaiting {firstName}'s Approval”
  const [userFirstName, setUserFirstName] = useState<string>('')

  const getApprovalCount = () => approvalRows.length

  const refreshCurrent = async () => {
    const res = await getCurrentApprovals()
    setApprovalRows(res.data ?? [])
    setUserFirstName((res.userFirstName ?? '') || '')
  }

  const refreshHistory = async () => {
    const res = await getApprovalHistory()
    setHistoryRows(res.data ?? [])
    // userFirstName juga boleh ikut dari sini kalau current kosong
    if (!userFirstName) setUserFirstName((res.userFirstName ?? '') || '')
  }

  useEffect(() => {
    // load awal
    ;(async () => {
      try {
        await Promise.all([refreshCurrent(), refreshHistory()])
      } catch (e) {
        console.error('Failed to load approvals:', e)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const auth = getAuth()
    const loginId = String(
      auth?.user?.id_number || (auth?.user as any)?.['employees.id_number'] || ''
    ).trim()

    const handleApprovalsUpdated = async (payload: any) => {
      const actorId = String(payload?.actor_id ?? '')
      if (actorId && actorId === loginId) return

      try {
        await Promise.all([refreshCurrent(), refreshHistory()])
      } catch (e) {
        console.error('Failed to sync approvals from socket:', e)
      }
    }

    socket.on('approvals-updated', handleApprovalsUpdated)
    return () => {
      socket.off('approvals-updated', handleApprovalsUpdated)
    }
  }, [])

  const updateStatusAndNotes = async (
    docNos: string[],
    actionType: 'Approve' | 'Pending' | 'Reject',
    newNotes: Record<string, string>
  ) => {
    // 1) call backend
    const res = await postApprovalAction({
      docNos,
      actionType,
      notes: newNotes,
    })

    // 2) kalau ada yang gagal, tetap refresh biar UI sinkron
    const failed = (res.results ?? []).filter((r) => !r.ok)
    if (failed.length > 0) {
      console.warn('Some approval actions failed:', failed)
    }

    // 3) refresh list (lebih aman daripada ngotak-ngatik status di FE)
    await Promise.all([refreshCurrent(), refreshHistory()])

    // 4) clear selection
    setSelectedItems([])
  }

  const value = useMemo(
    () => ({
      approvalRows,
      setApprovalRows,
      historyRows,
      setHistoryRows,
      selectedItems,
      setSelectedItems,
      updateStatusAndNotes,
      getApprovalCount,
      userFirstName,
      refreshCurrentApprovals: refreshCurrent,
      refreshApprovalHistory: refreshHistory,
    }),
    [approvalRows, historyRows, selectedItems, userFirstName]
  )

  return <ApprovalContext.Provider value={value}>{children}</ApprovalContext.Provider>
}

export const useApprovalContext = () => {
  const context = useContext(ApprovalContext)
  if (!context) throw new Error('useApprovalContext must be used within ApprovalProvider')
  return context
}
