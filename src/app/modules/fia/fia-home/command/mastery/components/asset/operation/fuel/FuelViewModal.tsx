import React from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../../../../../../../../_metronic'
import {FuelRow} from './dummy'
import './fuelmodalstyling.scss'

type Props = {
  show: boolean
  onHide: () => void
  row: FuelRow | null
}

const FuelViewModal: React.FC<Props> = ({show, onHide, row}) => {
  if (!row) return null

  return (
    <Modal show={show} onHide={onHide} centered size='lg' className='fuel-view-modal medium-modal'>
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG
            path='/media/icons/duotune/general/gen004.svg'
            className='svg-icon-2 me-2 text-primary'
          />
          Fuel Transaction
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='fuel-detail-item'>
          <span className='label'>Request No:</span>
          <span className='value'>{row.requestNo ?? '-'}</span>
        </div>

        <div className='fuel-detail-item'>
          <span className='label'>DateTime:</span>
          <span className='value'>{row.dateTime ?? '-'}</span>
        </div>

        <div className='fuel-detail-item'>
          <span className='label'>Requestor:</span>
          <span className='value'>{row.requestor ?? '-'}</span>
        </div>

        <div className='fuel-detail-item'>
          <span className='label'>Reading:</span>
          <span className='value'>{row.reading ?? '-'}</span>
        </div>

        <div className='fuel-detail-item'>
          <span className='label'>Stockcode:</span>
          <span className='value'>{row.stockcode ?? '-'}</span>
        </div>

        <div className='fuel-detail-item'>
          <span className='label'>Amount:</span>
          <span className='value'>{row.amount ?? '-'}</span>
        </div>

        <div className='fuel-detail-item'>
          <span className='label'>UOM:</span>
          <span className='value'>{row.uom ?? '-'}</span>
        </div>

        <div className='fuel-detail-item'>
          <span className='label'>Fuel Bay:</span>
          <span className='value'>{row.fuelBay ?? '-'}</span>
        </div>

        <div className='fuel-detail-item'>
          <span className='label'>Fuel Card:</span>
          <span className='value'>{row.fuelCard ?? '-'}</span>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default FuelViewModal
