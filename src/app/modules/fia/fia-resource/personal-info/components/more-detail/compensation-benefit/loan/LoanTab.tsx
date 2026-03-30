import React, {useEffect, useMemo} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {loanDummy, LoanRow} from './dummy'

const money = (v?: number) =>
  v === undefined || v === null
    ? ''
    : v.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})

const LoanTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: LoanRow[] = useMemo(() => {
    return selectedId ? loanDummy[selectedId] ?? [] : []
  }, [selectedId])

  useEffect(() => {
    console.log('Loan count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-140px'>Loan No</th>
                <th className='min-w-140px'>Loan Date</th>
                <th className='min-w-160px '>Loan Amount</th>
                <th className='min-w-140px'>Interest Rate</th>
                <th className='min-w-140px'>Repayment Term</th>
                <th className='min-w-180px '>Monthly Repayment</th>
                <th className='min-w-200px '>Outstanding Balance</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.loanNo}</td>
                    <td>{row.loanDate}</td>
                    <td>{money(row.loanAmount)}</td>
                    <td>{`${row.interestRate}%`}</td>
                    <td>{row.repaymentTerm}</td>
                    <td>{money(row.monthlyRepayment)}</td>
                    <td>{money(row.outstandingBalance)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className='text-center text-muted py-10'>
                    No loan data for this profile
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default LoanTab
