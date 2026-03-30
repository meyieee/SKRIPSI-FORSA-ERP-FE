/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useMemo, useState} from 'react'
import {AssetRow} from '../../dummy'
import {documentsDummy, AssetDocument} from './dummy'
import {KTSVG} from '../../../../../../../../../../_metronic'
import DocumentViewModal from './ViewModal'

type Props = {asset?: AssetRow | null}

const typeLabel: Record<AssetDocument['fileType'], string> = {
  pdf: 'PDF',
  word: 'Word',
  excel: 'Excel',
  image: 'Image',
  other: 'Other',
}

const NamaDoc: React.FC<{code: string}> = ({code}) => (
  <div
    className='d-flex align-items-center justify-content-center bg-dark text-secondary rounded'
    style={{width: 72, minWidth: 72, height: 92}}
  >
    <span className='fw-bold small text-center px-2'>{code}</span>
  </div>
)

const DocumentCard: React.FC<{doc: AssetDocument; onView: (d: AssetDocument) => void}> = ({
  doc,
  onView,
}) => {
  return (
    <div className='card h-100 border border-gray-300'>
      <div className='bg-secondary px-3 py-2 text-center fw-bold'>{doc.fileName}</div>

      <div className='card-body d-flex gap-3 align-items-stretch'>
        <NamaDoc code={doc.fileCode} />
        <div className='flex-grow-1 d-flex flex-column justify-content-between'>
          <div>
            <div className='text-gray-700'>
              {doc.description || '(file scan excel, word, pdf, etc)'}
            </div>
            <div className='mt-2 small text-muted'>
              <span className='me-3 badge badge-light'>{typeLabel[doc.fileType]}</span>
              {doc.size && <span className='me-3'>• {doc.size}</span>}
              {doc.uploadedAt && <span className='me-3'>• {doc.uploadedAt}</span>}
              {doc.uploadedBy && <span>• by {doc.uploadedBy}</span>}
            </div>
          </div>

          <div className='d-flex gap-2 mt-3 flex-wrap'>
            {/* View → buka modal */}
            <button
              type='button'
              className='btn btn-sm btn-icon btn-light-primary'
              title='View'
              onClick={() => onView(doc)}
            >
              <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-3' />
            </button>

            {/* Download */}
            <a
              href={doc.url || '#'}
              className='btn btn-sm btn-icon btn-light'
              title='Download'
              download
              onClick={(e) => {
                if (!doc.url) e.preventDefault()
              }}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr091.svg' className='svg-icon-3' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const DocumentsTab: React.FC<Props> = ({asset}) => {
  const docs: AssetDocument[] = useMemo(
    () => (asset?.assetNo ? documentsDummy[asset.assetNo] || [] : []),
    [asset?.assetNo]
  )

  const [showViewer, setShowViewer] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<AssetDocument | null>(null)

  const handleView = (d: AssetDocument) => {
    setSelectedDoc(d)
    setShowViewer(true)
  }

  return (
    <>
      <div className='row g-6'>
        {docs.length > 0 ? (
          docs.map((doc, idx) => (
            <div key={idx} className='col-12 col-md-6 col-lg-3'>
              <DocumentCard doc={doc} onView={handleView} />
            </div>
          ))
        ) : (
          <div className='col-12'>
            <div className='border rounded p-10 text-center text-muted'>No documents found.</div>
          </div>
        )}
      </div>

      {/* Modal viewer */}
      <DocumentViewModal show={showViewer} onHide={() => setShowViewer(false)} doc={selectedDoc} />
    </>
  )
}

export default DocumentsTab
