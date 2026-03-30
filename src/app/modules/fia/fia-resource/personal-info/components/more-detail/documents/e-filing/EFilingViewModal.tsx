import React from 'react'
import {Modal} from 'react-bootstrap'
import {EFilingRow} from './dummy'
import './efilingstyles.scss'

type Props = {show: boolean; onHide: () => void; row: EFilingRow | null}

const EFilingViewModal: React.FC<Props> = ({show, onHide, row}) => {
  const isPdf = (url?: string) => !!url && /\.pdf($|\?)/i.test(url)

  return (
    <Modal show={show} onHide={onHide} centered size='lg' className='efile-view-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Scanned Document</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {row?.attached && row.scanUrl ? (
          isPdf(row.scanUrl) ? (
            <div className='doc-stage'>
              <div className='doc-frame'>
                <iframe
                  title='scanned-pdf'
                  src={row.scanUrl}
                  style={{width: '100%', height: '72vh', border: 0}}
                />
                <div className='doc-caption'>
                  {row.fileType} • {row.shortDescription}
                </div>
              </div>
            </div>
          ) : (
            <div className='doc-stage'>
              <div className='doc-frame'>
                <img src={row.scanUrl} alt={row.shortDescription} className='doc-file' />
                <div className='doc-caption'>
                  {row.fileType} • {row.shortDescription}
                </div>
              </div>
            </div>
          )
        ) : (
          <div className='alert alert-warning mb-0'>No scanned file attached for this record.</div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default EFilingViewModal
