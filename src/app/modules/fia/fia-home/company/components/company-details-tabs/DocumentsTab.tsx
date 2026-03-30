import { Company, Document } from '../../core/_models'

interface DocumentsTabProps {
  company: Company
  documents?: Document[]
}

// Temporary dummy data until API is ready
const dummyDocuments: Document[] = [
  { id: 1, code: 'Manufacture D', document: 'Mr. C', fileAttachment: '811-000000', remarks: 'Manufacture' },
  { id: 2, code: 'Supplier A', document: 'Business License', fileAttachment: '811-000000', remarks: 'Supplier' },
  { id: 3, code: 'Branch MDO', document: 'Company Profile', fileAttachment: 'MDO-001', remarks: 'Branch Office' },
  { id: 4, code: 'Contract 001', document: 'Service Agreement', fileAttachment: 'CON-001', remarks: 'Active Contract' },
]

export const DocumentsTab = ({ company, documents }: DocumentsTabProps) => {
  if (!company) return null

  // Use provided documents or dummy data
  const displayDocuments = documents || dummyDocuments
  const totalRecords = displayDocuments.length
  const currentPage = 1
  const totalPages = Math.ceil(totalRecords / 10) || 1

  return (
    <div className='row g-5'>
      <div className='col-12'>
        <h5 className='fw-bold mb-2 mt-n4'>Company Documents</h5>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-120px'>Code</th>
                <th className='min-w-150px'>Document</th>
                <th className='min-w-150px'>File Attachment</th>
                <th className='min-w-120px'>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {displayDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td className='fw-bold text-gray-800'>{doc.code}</td>
                  <td>{doc.document}</td>
                  <td>{doc.fileAttachment}</td>
                  <td>{doc.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Navigation/Pagination */}
        <div className='d-flex justify-content-between align-items-center mt-4'>
          <div className='d-flex align-items-center'>
            <span className='text-muted me-3'>
              Record: ◄ ◄ {currentPage} of {totalPages} ► ►
            </span>
          </div>
          <div className='d-flex gap-2'>
            <button className='btn btn-sm btn-light-warning'>
              <i className='fas fa-filter me-2'></i>No Filter
            </button>
            <button className='btn btn-sm btn-light-primary'>
              <i className='fas fa-search me-2'></i>Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


