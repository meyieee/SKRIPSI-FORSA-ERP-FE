import React from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {careerDummy} from './dummy'

const CareerTab: React.FC = () => {
  const {selectedId} = useProfile()
  const data = selectedId ? careerDummy[selectedId] : null

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th>No</th>
                <th>Company</th>
                <th>Location</th>
                <th>From (Year)</th>
                <th>To (Year)</th>
                <th>Last Position</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {data?.length ? (
                data.map((item) => (
                  <tr key={item.no}>
                    <td>{item.no}</td>
                    <td>{item.company}</td>
                    <td>{item.location}</td>
                    <td>{item.from}</td>
                    <td>{item.to}</td>
                    <td>{item.lastPosition}</td>
                    <td>{item.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className='text-center text-muted py-10'>
                    No career data for this profile
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

export default CareerTab
