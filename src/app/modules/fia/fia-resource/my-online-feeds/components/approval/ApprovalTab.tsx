// ApprovalTab.tsx
import React, {useState, useEffect, useMemo} from 'react'
import {KTSVG} from '../../../../../../../_metronic'
import type {ApprovalItem, ApprovalRow} from './types'
import {useApprovalContext} from './ApprovalContext'
import ApprovalButtons from './Buttons'
import Title from '../Title'
import HistoryModal from './modal/SearchHistoryModal'
import ApprovalViewModal from './modal/ApprovalViewModal'
import {useCanAccessRoute} from '../../../../../../custom-hooks'
import './scss/approvalstyles.scss'

interface ApprovalTabProps {
  onSelect?: (items: ApprovalItem[]) => void
}

const ApprovalTab: React.FC<ApprovalTabProps> = ({onSelect}) => {
  const canAccess = useCanAccessRoute('/fia-resource/my_online_feeds/approval')
  const {approvalRows, selectedItems, setSelectedItems, historyRows, userFirstName} =
    useApprovalContext()

  // ALL hooks MUST be called before any early return
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRow | null>(null)
  const [filteredRows, setFilteredRows] = useState(approvalRows)
  const [isFiltered, setIsFiltered] = useState(false)
  const [viewMode, setViewMode] = useState<'current' | 'history'>('current')

  // ALL useMemo and useEffect MUST be before early return
  const allVisibleChecked = useMemo(() => {
    if (viewMode !== 'current') return false
    if (filteredRows.length === 0) return false
    return filteredRows.every((row) => selectedItems.some((i) => i.document_no === row.document_no))
  }, [viewMode, filteredRows, selectedItems])

  useEffect(() => {
    const source = viewMode === 'history' ? historyRows : approvalRows
    if (!isFiltered) {
      setFilteredRows(source)
    }
  }, [approvalRows, historyRows, viewMode, isFiltered])

  useEffect(() => {
    if (!selectedApproval?.document_no) return
    const source = viewMode === 'history' ? historyRows : approvalRows
    const latest = source.find((row) => row.document_no === selectedApproval.document_no)
    if (latest) {
      setSelectedApproval(latest)
    }
  }, [approvalRows, historyRows, viewMode, selectedApproval?.document_no])

  // Early return AFTER all hooks
  if (!canAccess) {
    return (
      <div className='alert alert-warning'>
        <h4>Access Denied</h4>
        <p>You don't have permission to access this page.</p>
      </div>
    )
  }

  const handleCheckboxChange = (row: ApprovalRow, checked: boolean) => {
    const updated = checked
      ? [...selectedItems, row]
      : selectedItems.filter((i) => i.document_no !== row.document_no)

    setSelectedItems(updated)
    if (onSelect) onSelect(updated)
  }

  const handleToggleSelectAll = (checked: boolean) => {
    if (viewMode !== 'current') return

    if (checked) {
      const docs = new Set(selectedItems.map((i) => i.document_no))
      const merged: ApprovalItem[] = [
        ...selectedItems,
        ...filteredRows.filter((r) => !docs.has(r.document_no)),
      ]
      setSelectedItems(merged)
      if (onSelect) onSelect(merged)
    } else {
      const filteredDocs = new Set(filteredRows.map((r) => r.document_no))
      const remaining = selectedItems.filter((i) => !filteredDocs.has(i.document_no))
      setSelectedItems(remaining)
      if (onSelect) onSelect(remaining)
    }
  }

  const handleHistoryModalClose = () => setShowHistoryModal(false)

  const parseDate = (dateString: string): Date => {
    const dateParts = dateString.replace(/[()]/g, '').trim().split('-')
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0])
      const monthMap: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      }
      const month = monthMap[dateParts[1]]
      const year = 2000 + parseInt(dateParts[2])
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day)
      }
    }
    return new Date(dateString)
  }

  const parseInputDate = (value: string): Date | null => {
    if (!value) return null
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!match) return null
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  }

  const handleDateRangeSubmit = (start: string | null, end: string | null) => {
    const sourceData = viewMode === 'history' ? historyRows : approvalRows

    if (!start && !end) {
      setFilteredRows(sourceData)
      setIsFiltered(false)
      return
    }

    const filtered = sourceData.filter((row) => {
      try {
        const rowDate = parseDate(row.created)
        const startDate = start ? parseInputDate(start) : null
        const endDate = end ? parseInputDate(end) : null

        if (endDate) {
          endDate.setHours(23, 59, 59, 999)
        }

        const afterStart = startDate ? rowDate >= startDate : true
        const beforeEnd = endDate ? rowDate <= endDate : true

        return afterStart && beforeEnd
      } catch {
        return false
      }
    })

    setFilteredRows(filtered)
    setIsFiltered(true)
  }

  const handleShowAllData = () => {
    setFilteredRows(approvalRows)
    setIsFiltered(false)
    setViewMode('current')
    setSelectedItems([])
    if (onSelect) onSelect([])
  }

  const handleShowHistory = () => {
    setViewMode('history')
    setFilteredRows(historyRows)
    setIsFiltered(false)
    setSelectedItems([])
    if (onSelect) onSelect([])
  }

  const diffDays = (a: Date, b: Date) => {
    const MS = 1000 * 60 * 60 * 24
    const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
    return Math.floor((utcA - utcB) / MS)
  }

  const getPendingAgeDays = (row: ApprovalRow) => {
    const baseStr = row.pending_since || row.created
    try {
      const base = parseDate(baseStr)
      const today = new Date()
      return diffDays(today, base)
    } catch {
      return 0
    }
  }

  const getStatusLabel = (status: string) => {
    // tampilkan persis seperti backend kirim (tanpa dipaksa jadi "Waiting for Approval")
    return (status || '').trim()
  }

  const getStatusBadgeClass = (row: ApprovalRow) => {
    const s = (row.status || '').trim()

    // 1) khusus Pending (ada aging)
    if (s === 'Pending') {
      const days = getPendingAgeDays(row)
      if (days >= 61) return 'badge badge-danger fs-7 fw-semibold'
      if (days >= 31) return 'badge badge-warning fs-7 fw-semibold'
      if (days >= 1) return 'badge badge-success fs-7 fw-semibold'
      return 'badge badge-dark fs-7 fw-semibold'
    }

    if (s === 'Waiting for Verification') return 'badge badge-info fs-7 fw-semibold'
    if (s === 'Waiting for Review') return 'badge badge-primary fs-7 fw-semibold'
    if (s.startsWith('Approval -')) return 'badge badge-warning fs-7 fw-semibold'
    if (s.startsWith('Approver -')) return 'badge badge-warning fs-7 fw-semibold'

    // 3) final states
    if (s === 'Approved') return 'badge badge-success fs-7 fw-semibold'
    if (s === 'Rejected') return 'badge badge-danger fs-7 fw-semibold'

    return 'badge badge-secondary fs-7 fw-semibold'
  }

  return (
    <div className=''>
      <div
        className='d-flex justify-content-between align-items-center mb-4 rounded'
        style={{background: 'var(--bs-body-bg)'}}
      >
        <div className='d-flex breadcrumb breadcrumb-line'>
          <div className='ms-4'>
            <Title text2='My Online Approval' style={{fontSize: '20px'}} />
          </div>
          <span>-</span>
          <Title text1={`Awaiting ${userFirstName || 'Your'}'s Approval`} />
        </div>

        <ApprovalButtons
          onShowHistory={handleShowHistory}
          onShowOutstanding={handleShowAllData}
          onOpenFilter={() => setShowHistoryModal(true)}
          viewMode={viewMode}
        />
      </div>

      {viewMode === 'history' && (
        <div className='alert alert-dark mb-3'>
          <i className='fas fa-history me-2'></i>
          Showing approval history ({historyRows.length} items). Click "Outstanding Item" to view
          all waiting approvals.
        </div>
      )}

      {isFiltered && viewMode === 'current' && (
        <div className='alert alert-info mb-3'>
          <i className='fas fa-filter me-2'></i>
          Showing filtered current data ({filteredRows.length} of {approvalRows.length} items).
          Click "Outstanding Item" to view all pending data.
        </div>
      )}

      {isFiltered && viewMode === 'history' && (
        <div className='alert alert-info mb-3'>
          <i className='fas fa-filter me-2'></i>
          Showing filtered history data ({filteredRows.length} of {historyRows.length} items).
        </div>
      )}

      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              {viewMode === 'current' && (
                <th className='min-w-20px py-3'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      checked={allVisibleChecked}
                      onChange={(e) => handleToggleSelectAll(e.target.checked)}
                      style={{border: '1.5px solid var(--bs-gray-600)', boxShadow: 'none'}}
                    />
                  </div>
                </th>
              )}
              <th className='min-w-100px py-3'>Document No</th>
              <th className='min-w-140px py-3'>Request Type</th>
              <th className='min-w-120px py-3'>Created</th>
              <th className='min-w-120px py-3'>Raised By</th>
              <th className='min-w-120px py-3'>Project Description - Department</th>
              <th className='min-w-100px py-3'>Status</th>
              <th className='min-w-50px text-end py-3'>Action</th>
            </tr>
          </thead>

          <tbody className='text-gray-700'>
            {filteredRows.length > 0 ? (
              filteredRows.map((row, index) => {
                const isChecked = selectedItems.some((item) => item.document_no === row.document_no)
                return (
                  <tr key={index}>
                    {viewMode === 'current' && (
                      <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={isChecked}
                            onChange={(e) => handleCheckboxChange(row, e.target.checked)}
                            style={{border: '1.5px solid var(--bs-gray-600)', boxShadow: 'none'}}
                          />
                        </div>
                      </td>
                    )}
                    <td>{row.document_no}</td>
                    <td>{row.request_type}</td>
                    <td>{row.created}</td>
                    <td>{row.raised_by}</td>
                    <td>{row.project_desc}</td>
                    <td>
                      <span className={getStatusBadgeClass(row)}>{getStatusLabel(row.status)}</span>
                    </td>
                    <td className='text-end'>
                      <button
                        type='button'
                        className='btn btn-link btn-color-dark btn-active-color-primary me-1'
                        onClick={() => {
                          setSelectedApproval(row)
                          setShowApprovalModal(true)
                        }}
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen004.svg'
                          className='svg-icon-3'
                        />
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={viewMode === 'current' ? 8 : 7}
                  className='text-center py-4 text-muted'
                >
                  {viewMode === 'history'
                    ? isFiltered
                      ? 'No history data found for the selected date range'
                      : 'No approval history available'
                    : isFiltered
                    ? 'No current data found for the selected date range'
                    : 'No pending approvals'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ApprovalViewModal
        show={showApprovalModal}
        onHide={() => setShowApprovalModal(false)}
        approval={selectedApproval}
      />

      <HistoryModal
        show={showHistoryModal}
        onHide={handleHistoryModalClose}
        onDateRangeSubmit={handleDateRangeSubmit}
      />
    </div>
  )
}

export default ApprovalTab
