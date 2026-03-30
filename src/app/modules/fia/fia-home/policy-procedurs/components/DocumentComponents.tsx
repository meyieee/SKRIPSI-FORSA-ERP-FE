/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useMemo, FC} from 'react'
import {RegisterAsset as AssetRow} from '../../../../operations/ops-asset-mgt/core/_models'

type Props = {asset?: AssetRow | null}

export const typeLabel: Record<AssetDocument['fileType'], string> = {
  pdf: 'PDF',
  word: 'Word',
  excel: 'Excel',
  image: 'Image',
  other: 'Other',
}

export const NamaDoc: React.FC<{code: string}> = ({code}) => (
  <div
    className='d-flex align-items-center justify-content-center bg-dark text-secondary rounded'
    style={{width: 72, minWidth: 72, height: 92}}
  >
    <span className='fw-bold small text-center px-2'>{code}</span>
  </div>
)

export const DocumentCard: React.FC<{doc: AssetDocument}> = ({doc}) => {
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
            <a href={doc.url || '#'} className='btn btn-sm btn-light-primary'>
              View
            </a>
            <a href={doc.url || '#'} className='btn btn-sm btn-light'>
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DocumentsTab: React.FC<Props> = ({asset}) => {
  const docs: AssetDocument[] = useMemo(
    () => (asset?.asset_no ? documentsDummy[asset.asset_no] || [] : []),
    [asset?.asset_no]
  )

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
          <div className='col-12'>
            <div className='border rounded p-10 text-center text-muted'>No documents found.</div>
          </div>
        )}
      </div>
    </div>
  )
}

export type AssetDocument = {
  fileCode: string
  fileName: string
  fileType: 'pdf' | 'word' | 'excel' | 'image' | 'other'
  description?: string
  size?: string
  uploadedAt?: string
  uploadedBy?: string
  url?: string
}

export const documentsDummy: Record<string, AssetDocument[]> = {
  DD001: [
    {
      fileCode: 'DOC-001',
      fileName: 'Operation Manual',
      fileType: 'pdf',
      description: 'Manual operasi unit (scan PDF).',
      size: '2.4 MB',
      uploadedAt: '01-Apr-24',
      uploadedBy: 'Tony',
      url: '#',
    },
    {
      fileCode: 'DOC-002',
      fileName: 'Inspection Report',
      fileType: 'word',
      description: 'Laporan inspeksi berkala.',
      size: '560 KB',
      uploadedAt: '15-Apr-24',
      uploadedBy: 'Sesca',
      url: '#',
    },
    {
      fileCode: 'DOC-003',
      fileName: 'Spare Parts List',
      fileType: 'excel',
      description: 'Daftar parts & kode.',
      size: '180 KB',
      uploadedAt: '22-Apr-24',
      uploadedBy: 'Maria',
      url: '#',
    },
    {
      fileCode: 'DOC-004',
      fileName: 'Warranty Card',
      fileType: 'image',
      description: 'Foto kartu garansi.',
      size: '320 KB',
      uploadedAt: '22-Apr-24',
      uploadedBy: 'Maria',
      url: '#',
    },
  ],
}
