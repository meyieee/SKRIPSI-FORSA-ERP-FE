import React from 'react'
import {Modal} from 'react-bootstrap'
import {AssetDocument} from './dummy'
import './styles.scss'

type Props = {show: boolean; onHide: () => void; doc: AssetDocument | null}

const isPdf = (url?: string) => !!url && /\.pdf($|\?)/i.test(url)
const isImage = (url?: string) => !!url && /\.(png|jpe?g|gif|webp|bmp|svg)($|\?)/i.test(url)

const DocumentViewModal: React.FC<Props> = ({show, onHide, doc}) => {
  const url = doc?.url
  const canPreview = url && (isPdf(url) || isImage(url))

  return (
    <Modal show={show} onHide={onHide} centered size='lg' className='doc-view-modal'>
      <Modal.Header closeButton>
        <Modal.Title>{doc?.fileName ?? 'Document Viewer'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {canPreview ? (
          isPdf(url!) ? (
            <div className='docv-stage'>
              <div className='docv-frame'>
                <iframe
                  title='document-pdf'
                  src={url!}
                  style={{width: '100%', height: '72vh', border: 0}}
                />
                <div className='docv-caption'>
                  {doc?.fileType} • {doc?.description || doc?.fileName}
                </div>
              </div>
            </div>
          ) : (
            <div className='docv-stage'>
              <div className='docv-frame'>
                <img src={url!} alt={doc?.description || doc?.fileName} className='docv-file' />
                <div className='docv-caption'>
                  {doc?.fileType} • {doc?.description || doc?.fileName}
                </div>
              </div>
            </div>
          )
        ) : (
          <div className='alert alert-warning mb-0'>
            {url ? (
              <>
                Preview hanya untuk <strong>PDF</strong> atau <strong>gambar</strong>. Silakan
                gunakan <strong>Download</strong>.
              </>
            ) : (
              'Tidak ada URL file untuk dokumen ini.'
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default DocumentViewModal
