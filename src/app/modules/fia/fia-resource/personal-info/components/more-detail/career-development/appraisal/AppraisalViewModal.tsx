import React from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../../../../../../../_metronic'
import {AppraisalRow} from './dummy'
import './appraisalviewmodalstyles.scss'

type Props = {
  show: boolean
  onHide: () => void
  appraisal: AppraisalRow | null
}

const AppraisalViewModal: React.FC<Props> = ({show, onHide, appraisal}) => {
  if (!appraisal) return null

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size='lg'
      className='appraisal-view-modal small-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG
            path='/media/icons/duotune/general/gen004.svg'
            className='svg-icon-2 me-2 text-primary'
          />
          Appraisal Detail
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='appraisal-detail-item'>
          <span className='label'>Appraisal No:</span>
          <span className='value'>{appraisal.appraisalNo}</span>
        </div>

        <div className='appraisal-detail-item'>
          <span className='label'>Reason:</span>
          <span className='value'>{appraisal.reason}</span>
        </div>

        <div className='appraisal-detail-item'>
          <span className='label'>Appraisal Date:</span>
          <span className='value'>{appraisal.appraisalDate}</span>
        </div>

        <div className='appraisal-detail-item'>
          <span className='label'>Date of Appraisal:</span>
          <span className='value'>{appraisal.dateOfAppraisal}</span>
        </div>

        <div className='appraisal-detail-item'>
          <span className='label'>Date Last Appraisal:</span>
          <span className='value'>{appraisal.dateLastAppraisal || '-'}</span>
        </div>

        <div className='appraisal-detail-item'>
          <span className='label'>Appraiser:</span>
          <span className='value'>{appraisal.appraiser}</span>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AppraisalViewModal
