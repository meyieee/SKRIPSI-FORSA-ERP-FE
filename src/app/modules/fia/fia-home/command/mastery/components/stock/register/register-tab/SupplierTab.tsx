import React, {useMemo} from 'react'

export type SupplierRow = {
  no: number
  name: string
  contactPrefer: string
  address: string
  phone: string
  wa: string
  email: string
}

type Props = {
  suppliers?: SupplierRow[]
}

const defaultSuppliers: SupplierRow[] = [
  {
    no: 1,
    name: 'PT Supplier Equipment Machinery',
    contactPrefer: 'Parent',
    address: 'Street xx',
    phone: '081xxxxxxxx',
    wa: '081xxxxxxxx',
    email: 'email@xxxxx',
  },
  {
    no: 2,
    name: 'PT Sarana Prasarana',
    contactPrefer: 'Relative',
    address: 'Street xxx',
    phone: '081xxxxxxxx',
    wa: '081xxxxxxxx',
    email: 'email@xxxxx',
  },
  {
    no: 3,
    name: 'PT Contractor Equipment Berat',
    contactPrefer: 'Relative',
    address: 'Street xxxx',
    phone: '081xxxxxxxx',
    wa: '081xxxxxxxx',
    email: 'email@xxxxx',
  },
]

const SupplierTab: React.FC<Props> = ({suppliers}) => {
  const rows = useMemo(() => suppliers && suppliers.length > 0 ? suppliers : defaultSuppliers, [suppliers])

  return (
    <div className='table-responsive'>
      <table className='table table-row-bordered table-row-gray-300 align-middle'>
        <thead>
          <tr className='fw-bold bg-dark text-light'>
            <th className='min-w-50px'>No</th>
            <th className='min-w-300px'>Supplier</th>
            <th className='min-w-160px'>Contact Prefer</th>
            <th className='min-w-220px'>Full Address</th>
            <th className='min-w-140px'>Phone</th>
            <th className='min-w-140px'>WA</th>
            <th className='min-w-200px'>Email</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          {rows.map((r) => (
            <tr key={r.no}>
              <td>{r.no}</td>
              <td>{r.name}</td>
              <td>{r.contactPrefer}</td>
              <td>{r.address}</td>
              <td>{r.phone}</td>
              <td>{r.wa}</td>
              <td>
                <a href={`mailto:${r.email}`} className='text-primary'>{r.email}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SupplierTab




