import React from 'react'
import {Modal} from 'react-bootstrap'
import {ContractRow} from './dummy'
import './contractviewmodalstyles.scss'

type Props = {show: boolean; onHide: () => void; contract: ContractRow | null}

const Item = ({label, value}: {label: string; value?: React.ReactNode}) => (
  <div className='contract-detail-item'>
    <span className='label'>{label}</span>
    <span className='value'>{value ?? '-'}</span>
  </div>
)

const ContractViewModal: React.FC<Props> = ({show, onHide, contract}) => {
  return (
    <Modal show={show} onHide={onHide} centered className='contract-view-modal small-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Employment Contract</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {contract ? (
          <>
            <Item label='No' value={contract.no} />
            <Item label='Contract No' value={contract.contractNo} />
            <Item label='No of Contract' value={contract.noOfContract} />
            <Item label='Commance Date' value={contract.commanceDate} />
            <Item label='Completion Date' value={contract.completionDate || ''} />
            <Item label='Status' value={contract.status} />
            <Item label='Report To' value={contract.reportTo} />
            <Item label='New Title Assigned' value={contract.newTitleAssigned} />
          </>
        ) : (
          <div className='text-muted'>No data</div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button className='btn btn-light' onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ContractViewModal
