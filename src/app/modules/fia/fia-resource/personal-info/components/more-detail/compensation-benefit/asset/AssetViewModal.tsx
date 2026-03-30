import React from 'react'
import {Modal} from 'react-bootstrap'
import {AssetRow} from './dummy'
import {KTSVG} from '../../../../../../../../../_metronic'
import './assetviewmodalstyles.scss'

type Props = {show: boolean; onHide: () => void; asset: AssetRow | null}

const Item = ({label, value}: {label: string; value?: React.ReactNode}) => (
  <div className='asset-detail-item'>
    <span className='label'>{label}</span>
    <span className='value'>{value ?? '-'}</span>
  </div>
)

const AssetViewModal: React.FC<Props> = ({show, onHide, asset}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className='asset-view-modal small-modal' // apply styling classes
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-2 me-2' />
          Asset Detail
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {asset ? (
          <>
            <Item label='No' value={asset.no} />
            <Item label='Asset No' value={asset.assetNo} />
            <Item label='Description' value={asset.assetDescription} />
            <Item label='Type' value={asset.assetType} />
            <Item label='Model' value={asset.model} />
            <Item label='Serial No' value={asset.serialNo} />
            <Item label='Manufacture' value={asset.manufacture} />
            <Item label='Condition' value={asset.condition} />
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

export default AssetViewModal
