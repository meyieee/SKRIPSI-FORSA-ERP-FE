import React from 'react'
import { KTCard, KTCardBody } from '../../../../../../../_metronic'
import { InChargePerson } from '../core/types'

type Props = {
  persons: InChargePerson[]
}

const InChargePersonCard: React.FC<Props> = ({ persons }) => {
  return (
    <KTCard className='h-100'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>IN-CHARGE PERSON IN CHARGE</span>
        </h3>
      </div>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-150px py-3'>Full Name</th>
                <th className='min-w-150px py-3'>Job Title</th>
                <th className='min-w-150px py-3'>Phone</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {persons.map((person, index) => (
                <tr key={index}>
                  <td className='py-3'>* {person.fullName}</td>
                  <td className='py-3'>{person.jobTitle}</td>
                  <td className='py-3'>{person.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default InChargePersonCard














