import { Company, Contact } from '../../core/_models'

interface ContactsTabProps {
  company: Company
  contacts?: Contact[]
}

export const ContactsTab = ({ company, contacts = [] }: ContactsTabProps) => {
  if (!company) return null

  const totalRecords = contacts.length

  return (
    <div className='row g-5'>
      <div className='col-12'>
        <h5 className='fw-bold mb-2 mt-n4'>Contact Information</h5>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-120px'>ID Number</th>
                <th className='min-w-150px'>FullName</th>
                <th className='min-w-140px'>Contact Title</th>
                <th className='min-w-150px'>Prefer Full Address</th>
                <th className='min-w-120px'>Phone</th>
                <th className='min-w-120px'>Mobile</th>
                <th className='min-w-100px'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {totalRecords === 0 ? (
                <tr>
                  <td colSpan={7} className='text-center text-muted py-10'>
                    No contact information available
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.idNumber}</td>
                    <td>{contact.fullName}</td>
                    <td>{contact.contactTitle}</td>
                    <td>{contact.preferFullAddress}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.mobile}</td>
                    <td>
                      {/* Actions can be added here */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Navigation/Pagination */}
        <div className='d-flex justify-content-between align-items-center mt-4'>
          <div className='d-flex align-items-center'>
            <span className='text-muted me-3'>
              Record: {totalRecords} of {totalRecords}
            </span>
            <div className='btn-group me-3'>
              <button className='btn btn-sm btn-light-secondary' disabled>
                <i className='fas fa-angle-double-left'></i>
              </button>
              <button className='btn btn-sm btn-light-secondary' disabled>
                <i className='fas fa-angle-left'></i>
              </button>
              <button className='btn btn-sm btn-light-secondary' disabled>
                <i className='fas fa-angle-right'></i>
              </button>
              <button className='btn btn-sm btn-light-secondary' disabled>
                <i className='fas fa-angle-double-right'></i>
              </button>
            </div>
          </div>
          <div className='d-flex gap-2'>
            <button className='btn btn-sm btn-light-warning'>No Filter</button>
            <button className='btn btn-sm btn-light-primary'>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}


