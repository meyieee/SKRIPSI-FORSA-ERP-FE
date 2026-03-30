import React, {useMemo} from 'react'

export type SOHRow = {no: number; branch: string; storage?: string; qty: number}

type Props = {
  sohAll: SOHRow[]
  sohGlobal: SOHRow[]
}

const fmt = (n?: number) =>
  typeof n === 'number' ? n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-'

const DetailsTab: React.FC<Props> = ({sohAll, sohGlobal}) => {
  const totalAll = useMemo(() => sohAll.reduce((a, b) => a + (b.qty || 0), 0), [sohAll])
  const totalGlobal = useMemo(() => sohGlobal.reduce((a, b) => a + (b.qty || 0), 0), [sohGlobal])

  return (
    <div className='row g-4 mb-4'>
      <div className='col-md-7'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-300 align-middle'>
            <thead className='bg-light'>
              <tr>
                <th colSpan={3} className='fw-bold'>
                  SOH ALL DETAILS
                </th>
              </tr>
              <tr>
                <th className='min-w-50px'>No</th>
                <th>Branch</th>
                <th>Storage</th>
                <th className='text-end'>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {sohAll.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center text-muted py-3'>
                    No data
                  </td>
                </tr>
              ) : (
                <>
                  {sohAll.map((r) => (
                    <tr key={`all-${r.no}`}>
                      <td>{r.no}</td>
                      <td>{r.branch}</td>
                      <td>{r.storage || '-'}</td>
                      <td className='text-end'>{fmt(r.qty)}</td>
                    </tr>
                  ))}
                  <tr className='fw-bold bg-light'>
                    <td colSpan={3}>Total SOH ALL :</td>
                    <td className='text-end'>{fmt(totalAll)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='col-md-5'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-300 align-middle'>
            <thead className='bg-light'>
              <tr>
                <th colSpan={2} className='fw-bold'>
                  SOH GLOBAL DETAILS
                </th>
              </tr>
              <tr>
                <th className='min-w-50px'>No</th>
                <th>Branch</th>
                <th className='text-end'>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {sohGlobal.length === 0 ? (
                <tr>
                  <td colSpan={3} className='text-center text-muted py-3'>
                    No data
                  </td>
                </tr>
              ) : (
                <>
                  {sohGlobal.map((r) => (
                    <tr key={`global-${r.no}`}>
                      <td>{r.no}</td>
                      <td>{r.branch}</td>
                      <td className='text-end'>{fmt(r.qty)}</td>
                    </tr>
                  ))}
                  <tr className='fw-bold bg-light'>
                    <td colSpan={2}>Total SOH GLOBAL :</td>
                    <td className='text-end'>{fmt(totalGlobal)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DetailsTab




