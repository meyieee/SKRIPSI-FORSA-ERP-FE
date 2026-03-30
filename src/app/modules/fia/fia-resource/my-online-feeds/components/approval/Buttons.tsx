import React, {useState, useEffect} from 'react'
import {KTSVG} from '../../../../../../../_metronic'
import {useApprovalContext} from './ApprovalContext'
import {useTabContext} from '../TabContext'
import ApprovalAlert from './Alert'
import ConfirmationModal from './modal/ConfirmationModal'
import { usePermission } from '../../../../../../custom-hooks'

interface ApprovalButtonsProps {
  onShowHistory?: () => void
  onShowOutstanding?: () => void
  onOpenFilter?: () => void
  viewMode?: 'current' | 'history'
}

const ApprovalButtons: React.FC<ApprovalButtonsProps> = ({
  onShowHistory,
  onShowOutstanding,
  onOpenFilter,
  viewMode = 'current',
}) => {
  const {selectedItems, updateStatusAndNotes} = useApprovalContext()
  const {activeTab} = useTabContext()
  const [actionType, setActionType] = useState<'Approve' | 'Pending' | 'Reject' | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  
  // Permission check for UpdateA (Update Approval)
  const canUpdateA = usePermission('/fia-resource/my_online_feeds/approval', 'UpdateA')

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showAlert])

  const openModal = (type: 'Approve' | 'Pending' | 'Reject') => {
    if (selectedItems.length === 0) {
      setShowAlert(true) // Tampilkan alert
      return
    }

    setActionType(type)
    setShowConfirmationModal(true)
  }

  const handleHistoryClick = () => {
    if (onShowHistory) {
      onShowHistory()
    }
  }

  const handleOutstandingClick = () => {
    if (onShowOutstanding) {
      onShowOutstanding()
    }
  }

  const handleFilterClick = () => {
    if (onOpenFilter) {
      onOpenFilter()
    }
  }

  if (activeTab !== 'approval') {
    return null // Tidak menampilkan tombol jika tab aktif bukan 'approval'
  }

  const actionsDisabled = viewMode === 'history'

  return (
    <div>
      {/* Tombol Approve, Pending, Reject */}
      <div className='card-toolbar d-flex justify-content-end m-3'>
        <button
          className='btn btn-light me-4'
          style={{fontSize: '13px', padding: '10px 10px', lineHeight: '1'}}
          onClick={handleOutstandingClick}
          title='Show all outstanding items'
        >
          <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
          Outstanding Item
        </button>
        {canUpdateA && (
          <>
            <button
              className='btn btn-success'
              style={{fontSize: '13px', padding: '10px 10px', lineHeight: '1'}}
              onClick={() => openModal('Approve')}
              disabled={actionsDisabled}
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Approve
            </button>
            <button
              className='btn btn-dark ms-0'
              style={{fontSize: '13px', padding: '10px 10px', lineHeight: '1'}}
              onClick={() => openModal('Pending')}
              disabled={actionsDisabled}
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Pending
            </button>
            <button
              className='btn btn-danger ms-0'
              style={{fontSize: '13px', padding: '10px 20px', lineHeight: '1'}}
              onClick={() => openModal('Reject')}
              disabled={actionsDisabled}
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Reject
            </button>
          </>
        )}
        {viewMode === 'history' && (
          <button
            className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary ms-4'
            style={{fontSize: '13px', padding: '10px 20px', lineHeight: '1'}}
            onClick={handleFilterClick}
            title='Filter history data by date range'
          >
            <KTSVG path='media/icons/duotune/general/gen031.svg' className='svg-icon-3' />
            Filter
          </button>
        )}
        <button
          className='btn btn-outline btn-outline-dashed btn-outline-dark btn-active-light-dark ms-4'
          style={{fontSize: '13px', padding: '10px 20px', lineHeight: '1'}}
          onClick={handleHistoryClick}
          title='Show approval history'
        >
          <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
          History
        </button>
      </div>

      {/* Modal Konfirmasi */}
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        actionType={actionType ?? undefined}
        selectedItems={selectedItems}
        onConfirm={async (notes) => {
          if (actionType) {
            await updateStatusAndNotes(
              selectedItems.map((i) => i.document_no),
              actionType,
              notes
            )
          }

          setShowConfirmationModal(false)
        }}
      />
      {/* Tampilkan Alert */}
      <ApprovalAlert showAlert={showAlert} />
    </div>
  )
}

export default ApprovalButtons
