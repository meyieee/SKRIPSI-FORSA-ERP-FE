import { KTSVG } from '../../../../../../../_metronic'
import { Company, Contract } from '../../core/_models'

interface ContractTabProps {
  company: Company
  contracts?: Contract[]
}

// Temporary dummy data until API is ready
const dummyContracts: Contract[] = [
  {
    id: 1,
    contractName: 'Service Agreement 2024',
    type: 'Service',
    startDate: '01-Jan-24',
    endDate: '31-Dec-24',
    status: 'Active',
  },
  {
    id: 2,
    contractName: 'Supply Contract',
    type: 'Supply',
    startDate: '01-Mar-24',
    endDate: '28-Feb-25',
    status: 'Active',
  },
]

export const ContractTab = ({ company, contracts }: ContractTabProps) => {
  if (!company) return null

  // Use provided contracts or dummy data
  const displayContracts = contracts || dummyContracts

  const handleView = (contract: Contract) => {
    // TODO: Implement view contract functionality
    console.log('View contract:', contract)
  }

  const handleRenew = (contract: Contract) => {
    // TODO: Implement renew contract functionality
    console.log('Renew contract:', contract)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'badge badge-success'
      case 'Expired':
        return 'badge badge-danger'
      case 'Pending':
        return 'badge badge-warning'
      default:
        return 'badge badge-secondary'
    }
  }

  return (
    <div className='row g-5'>
      <div className='col-12'>
        <h5 className='fw-bold mb-2 mt-n4'>Contract Agreements</h5>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-150px'>Contract Name</th>
                <th className='min-w-100px'>Type</th>
                <th className='min-w-100px'>Start Date</th>
                <th className='min-w-100px'>End Date</th>
                <th className='min-w-100px'>Status</th>
                <th className='min-w-100px'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayContracts.map((contract) => (
                <tr key={contract.id}>
                  <td className='fw-bold text-gray-800'>{contract.contractName}</td>
                  <td>{contract.type}</td>
                  <td>{contract.startDate}</td>
                  <td>{contract.endDate}</td>
                  <td>
                    <span className={getStatusBadgeClass(contract.status)}>{contract.status}</span>
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                      onClick={() => handleView(contract)}
                    >
                      <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-3' />
                    </button>
                    <button
                      type='button'
                      className='btn btn-sm btn-light-warning'
                      onClick={() => handleRenew(contract)}
                    >
                      Renew
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

