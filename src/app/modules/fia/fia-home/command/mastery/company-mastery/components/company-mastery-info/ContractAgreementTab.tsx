import React from 'react'
import {Company} from '../../core/types'

type ContractAgreement = {
  id: string
  contractNo: string
  contractDate: string
  contractDescription: string
  client: string
  effectiveDate: string
  termination: string
  paymentTerms: string
  contractB: string
}

type Props = {
  company: Company
  contracts?: ContractAgreement[]
}

// Mock data - replace with actual data from props/service
const mockContracts: ContractAgreement[] = [
  {
    id: '1',
    contractNo: 'CE2507001',
    contractDate: '1-Jul-25',
    contractDescription: 'Provide Workshop Equipment',
    client: 'PT Mobile Crane Company',
    effectiveDate: '1-Aug-25',
    termination: '1-Dec-25',
    paymentTerms: '30 Days Invoice',
    contractB: 'Kobe Obiu',
  },
  {
    id: '2',
    contractNo: 'CE2502001',
    contractDate: '1-Feb-25',
    contractDescription: 'FULL MARC CONTRACT',
    client: 'PT Heavy Equipment',
    effectiveDate: '1-Feb-25',
    termination: '1-Feb-27',
    paymentTerms: '30 Days Invoice',
    contractB: 'Muffin Stone',
  },
]

const ContractAgreementTab: React.FC<Props> = ({company, contracts}) => {
  const contractsData = contracts || mockContracts // Replace with actual data from company

  return (
    <div className='table-responsive'>
      <table className='table table-row-bordered table-row-gray-300 align-middle'>
        <thead>
          <tr className='bg-dark text-white fw-bold'>
            <th className='min-w-50px text-center'>No</th>
            <th className='min-w-120px'>Contract No</th>
            <th className='min-w-120px'>Contract Date</th>
            <th className='min-w-200px'>Contract Description</th>
            <th className='min-w-180px'>Client</th>
            <th className='min-w-120px'>Effective Date</th>
            <th className='min-w-120px'>Termination</th>
            <th className='min-w-150px'>Payment Terms</th>
            <th className='min-w-120px'>Contract B</th>
            <th className='min-w-100px text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {contractsData.length === 0 ? (
            <tr>
              <td colSpan={10} className='text-center text-muted py-3'>
                No data
              </td>
            </tr>
          ) : (
            contractsData.map((contract, index) => (
              <tr key={contract.id}>
                <td className='text-center'>{index + 1}</td>
                <td>{contract.contractNo}</td>
                <td>{contract.contractDate}</td>
                <td>{contract.contractDescription}</td>
                <td>{contract.client}</td>
                <td>{contract.effectiveDate}</td>
                <td>{contract.termination}</td>
                <td>{contract.paymentTerms}</td>
                <td>{contract.contractB}</td>
                <td className='text-center'>
                  <div className='d-flex gap-2 justify-content-center'>
                    <a href='#' className='text-primary text-decoration-underline'>V</a>
                    <a href='#' className='text-primary text-decoration-underline'>U</a>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContractAgreementTab

