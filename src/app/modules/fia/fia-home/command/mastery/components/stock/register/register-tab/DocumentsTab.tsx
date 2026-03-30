import React, {useMemo} from 'react'

export type RegisterDocument = {
  fileName: string
  fileCode: string
  description?: string
  fileType?: 'pdf' | 'word' | 'excel' | 'image' | 'other'
  size?: string
  uploadedAt?: string
  uploadedBy?: string
  url?: string
}

type Props = {
  documents?: RegisterDocument[]
}

const typeLabel: Record<NonNullable<RegisterDocument['fileType']>, string> = {
  pdf: 'PDF',
  word: 'Word',
  excel: 'Excel',
  image: 'Image',
  other: 'Other',
}

const FileCodeBadge: React.FC<{code: string}> = ({code}) => (
  <div
    className='d-flex align-items-center justify-content-center bg-dark text-secondary rounded'
    style={{width: 72, minWidth: 72, height: 92}}
  >
    <span className='fw-bold small text-center px-2'>{code}</span>
  </div>
)

const DocumentCard: React.FC<{doc: RegisterDocument}> = ({doc}) => {
  return (
    <div className='card h-100 border border-gray-300'>
      <div className='bg-secondary px-3 py-2 text-center fw-bold'>{doc.fileName || '(file name)'}</div>
      <div className='card-body d-flex gap-3 align-items-stretch'>
        <FileCodeBadge code={doc.fileCode || '(file code)'} />
        <div className='flex-grow-1 d-flex flex-column justify-content-between'>
          <div>
            <div className='text-gray-700'>
              {doc.description || '(file scan excel, word. Pdf, etc)'}
            </div>
            {(doc.fileType || doc.size || doc.uploadedAt || doc.uploadedBy) && (
              <div className='mt-2 small text-muted'>
                {doc.fileType && <span className='me-3 badge badge-light'>{typeLabel[doc.fileType]}</span>}
                {doc.size && <span className='me-3'>• {doc.size}</span>}
                {doc.uploadedAt && <span className='me-3'>• {doc.uploadedAt}</span>}
                {doc.uploadedBy && <span>• by {doc.uploadedBy}</span>}
              </div>
            )}
          </div>

          <div className='d-flex gap-2 mt-3 flex-wrap'>
            <a href={doc.url || '#'} className='btn btn-sm btn-light-primary'>View</a>
            <a href={doc.url || '#'} className='btn btn-sm btn-light'>Download</a>
          </div>
        </div>
      </div>
    </div>
  )
}

const DocumentsTab: React.FC<Props> = ({documents}) => {
  const docs = useMemo(() => documents || [], [documents])

  return (
    <div>
      <div className='row g-6'>
        {docs.length > 0 ? (
          docs.map((doc, idx) => (
            <div key={idx} className='col-12 col-md-6 col-lg-3'>
              <DocumentCard doc={doc} />
            </div>
          ))
        ) : (
          // Placeholder 4 kartu sesuai referensi gambar
          [0, 1, 2, 3].map((i) => (
            <div key={i} className='col-12 col-md-6 col-lg-3'>
              <DocumentCard doc={{fileName: '(file name)', fileCode: '(file code)'}} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DocumentsTab


