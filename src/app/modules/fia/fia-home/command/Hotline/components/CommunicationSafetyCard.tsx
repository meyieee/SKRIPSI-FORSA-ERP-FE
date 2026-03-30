import React from 'react'
import { KTCard, KTCardBody } from '../../../../../../../_metronic'
import { HotlineContact } from '../core/types'

type Props = {
  contacts: HotlineContact[]
}

const CommunicationSafetyCard: React.FC<Props> = ({ contacts }) => {
  return (
    <KTCard className='h-100'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>COMMUNICATION SAFETY HOTLINE</span>
        </h3>
      </div>
      <KTCardBody className='pt-4 pb-5'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-300 align-middle mb-0'>
            <tbody className='text-gray-800'>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td className='ps-0 pe-3 py-3 fw-semibold' style={{ width: '45%' }}>
                    * {contact.label}
                  </td>
                  <td className='ps-0 pe-0 py-3'>
                    {contact.type === 'email' ? (
                      <a
                        href={`mailto:${contact.values[0]}`}
                        className='text-primary text-hover-primary text-decoration-none'
                      >
                        {contact.values[0]}
                      </a>
                    ) : (
                      <span>{contact.values.join(', ')}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default CommunicationSafetyCard

