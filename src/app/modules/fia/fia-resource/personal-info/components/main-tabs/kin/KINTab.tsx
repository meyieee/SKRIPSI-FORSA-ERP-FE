import React from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../_metronic'
import {useProfile} from '../../ProfileContext'

const KinTab: React.FC = () => {
  const {kin} = useProfile()
  const data = Array.isArray(kin) ? kin : []

  if (!data.length) return <div className='alert alert-warning'>⚠️ Please search first</div>

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th>No</th>
                <th>Full Name</th>
                <th>Relationship</th>
                <th>Full Address</th>
                <th>Phone</th>
                <th>WA</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {data.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td>{item.no ?? idx + 1}</td>
                  <td>{item.fullName}</td>
                  <td>{item.relationship}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.wa}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default KinTab
