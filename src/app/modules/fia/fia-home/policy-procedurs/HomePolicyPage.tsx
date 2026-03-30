/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useMemo, FC} from 'react'
import {documentsDummy, AssetDocument} from './dummy'
import { usePermission } from '../../../../custom-hooks'

type DocumentsTabProps = {asset?: {asset_no?: string} | null}

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

const DocumentCard: React.FC<{doc: AssetDocument}> = ({doc}) => {
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

const DocumentsTab: React.FC<DocumentsTabProps> = ({asset}) => {
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

const HomePolicyPage: FC = () => {
  // Permission checks
  const canRead = usePermission('/home/policy&procedures', 'Read')
  const canCreate = usePermission('/home/policy&procedures', 'Create')
  const canUpdate = usePermission('/home/policy&procedures', 'Update')
  const canDelete = usePermission('/home/policy&procedures', 'Delete')
  
  if (!canRead) {
    return (
      <div className='alert alert-warning'>
        <h4>Access Denied</h4>
        <p>You don't have permission to access this page.</p>
      </div>
    )
  }
  
  return (
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <h2>Policy Procedures & Regulations</h2>
          </div>
        </div>
        <div className='card-body pt-0'>
          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <a
                  className='nav-link text-active-primary me-6 active'
                  data-bs-toggle='tab'
                  href='#kt_tab_pane_1'
                >
                  Company Policy
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link text-active-primary me-6'
                  data-bs-toggle='tab'
                  href='#kt_tab_pane_2'
                >
                  SOP
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link text-active-primary me-6'
                  data-bs-toggle='tab'
                  href='#kt_tab_pane_3'
                >
                  Union Agreement
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link text-active-primary me-6'
                  data-bs-toggle='tab'
                  href='#kt_tab_pane_4'
                >
                  Regulations
                </a>
              </li>
            </ul>
          </div>

          <div className='tab-content' id='myTabContent'>
            <div
              className='tab-pane fade show active'
              id='kt_tab_pane_1'
              role='tabpanel'
            >
              <div className='py-5'>
                <h3>Policy & Procedures</h3>
                <DocumentsTab asset={{asset_no: 'DD001'}} />
              </div>
            </div>

            <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
              <div className='py-5'>
                <h3>Standard Operating Procedures</h3>
                <DocumentsTab asset={{asset_no: 'DD001'}} />
              </div>
            </div>

            <div className='tab-pane fade' id='kt_tab_pane_3' role='tabpanel'>
              <div className='py-5'>
                <h3>Union Agreement</h3>
                <DocumentsTab asset={{asset_no: 'DD001'}} />
              </div>
            </div>

            <div className='tab-pane fade' id='kt_tab_pane_4' role='tabpanel'>
              <div className='py-5'>
                <h3>Regulation (Internal & External)</h3>
               <DocumentsTab asset={{asset_no: 'DD001'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePolicyPage