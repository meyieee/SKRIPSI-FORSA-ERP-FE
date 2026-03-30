import React, {useMemo} from 'react'

export type TransactionRow = {
  no: number
  docNo: string
  transDate: string
  itemNo: number | string
  qty: number | string
  docRef: string
  costCenter: string
  storage: string
  branch: string
}

type Props = {
  transactions?: TransactionRow[]
}

const defaultRows: TransactionRow[] = [
  {no: 1, docNo: 'RM-001', transDate: '01-Jan-23', itemNo: 1, qty: 2, docRef: 'PO#001', costCenter: 'LOG0001', storage: 'Surface Storage', branch: 'Balikpapan'},
  {no: 2, docNo: 'RM-002', transDate: '04-Jan-23', itemNo: 1, qty: 1, docRef: 'PO#002', costCenter: 'LOG0001', storage: 'Surface Storage', branch: 'Balikpapan'},
  {no: 3, docNo: 'MR-003', transDate: '05-Jan-23', itemNo: 1, qty: 3, docRef: 'MR#001', costCenter: 'LOG0001', storage: 'Wenang Storage', branch: 'Manado'},
  {no: 4, docNo: 'RM-004', transDate: '07-Jan-23', itemNo: 1, qty: 1, docRef: 'PO#004', costCenter: 'LOG0001', storage: 'Surface Storage', branch: 'Balikpapan'},
  {no: 5, docNo: 'MR-005', transDate: '10-Jan-23', itemNo: 1, qty: 1, docRef: 'MR#002', costCenter: 'LOG0001', storage: 'Wenang Storage', branch: 'Manado'},
]

const TransactionTab: React.FC<Props> = ({transactions}) => {
  const rows = useMemo(() => (transactions && transactions.length > 0 ? transactions : defaultRows), [transactions])

  return (
    <div className='table-responsive'>
      <table className='table table-row-bordered table-row-gray-300 align-middle'>
        <thead>
          <tr className='fw-bold bg-dark text-light'>
            <th className='min-w-50px'>No</th>
            <th className='min-w-120px'>Doc No</th>
            <th className='min-w-140px'>Trans Date</th>
            <th className='min-w-100px'>Item No</th>
            <th className='min-w-80px'>Qty</th>
            <th className='min-w-140px'>Doc No Ref</th>
            <th className='min-w-140px'>Cost Center</th>
            <th className='min-w-180px'>Storage</th>
            <th className='min-w-160px'>Branch</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          {rows.map((r) => (
            <tr key={r.no}>
              <td>{r.no}</td>
              <td>{r.docNo}</td>
              <td>{r.transDate}</td>
              <td>{r.itemNo}</td>
              <td>{r.qty}</td>
              <td>{r.docRef}</td>
              <td>{r.costCenter}</td>
              <td>{r.storage}</td>
              <td>{r.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTab


