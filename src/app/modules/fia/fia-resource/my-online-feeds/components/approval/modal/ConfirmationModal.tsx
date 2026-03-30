import React, {useEffect, useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import type {ApprovalRow} from '../types'

interface ConfirmationModalProps {
  show: boolean
  onHide: () => void
  onConfirm?: (notes: {[docNo: string]: string}) => void
  actionType?: 'Approve' | 'Pending' | 'Reject'
  selectedItems?: ApprovalRow[]
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onHide,
  onConfirm,
  actionType,
  selectedItems = [],
}) => {
  const [notes, setNotes] = useState<{[docNo: string]: string}>({})

  // Reset notes ketika modal dibuka ulang supaya input selalu kosong di routine berikutnya
  useEffect(() => {
    if (!show) return

    if (selectedItems.length === 0) {
      setNotes({})
      return
    }

    const defaultNotes: {[key: string]: string} = {}
    selectedItems.forEach((item) => {
      defaultNotes[item.document_no] = ''
    })
    setNotes(defaultNotes)
  }, [show, selectedItems])

  const handleNoteChange = (docNo: string, value: string) => {
    setNotes((prev) => ({...prev, [docNo]: value}))
  }

  const modalTitleMap: Record<string, string> = {
    Approve: 'Approval Confirmation',
    Pending: 'Pending Confirmation',
    Reject: 'Cancel Confirmation',
  }

  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title className='text-center w-100'>
          {modalTitleMap[actionType ?? ''] ?? 'Action Confirmation'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead className=' fw-bolder '>
              <tr>
                <th style={{width: '20%'}}>Document No</th>
                <th style={{width: '30%'}}>Description</th>
                <th>Notes & Comments</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item) => (
                <tr key={item.document_no}>
                  <td>{item.document_no}</td>
                  <td>{item.request_type}</td>
                  <td>
                    <Form.Control
                      type='text'
                      placeholder='Enter note or comment'
                      value={notes[item.document_no] || ''}
                      onChange={(e) => handleNoteChange(item.document_no, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant={actionType === 'Reject' ? 'danger' : 'primary'}
          onClick={() => {
            onConfirm?.(notes)
            console.log('🚨 show:', show, 'actionType:', actionType, 'data', selectedItems)
            onHide()
          }}
          disabled={selectedItems.length === 0}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
