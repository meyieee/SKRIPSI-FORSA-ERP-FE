import React from 'react'
import CommunicationSafetyCard from './CommunicationSafetyCard'
import InChargePersonCard from './InChargePersonCard'
import { HotlineContact, InChargePerson } from '../core/types'

type Props = {
  contacts: HotlineContact[]
  inChargePersons: InChargePerson[]
}

const HotlineOverview: React.FC<Props> = ({ contacts, inChargePersons }) => {
  return (
    <div className='mb-8'>
      <h2 className='fw-bold text-center mb-6'>HOTLINE OVERVIEW</h2>
      <div className='row gx-6'>
        <div className='col-lg-6 col-xxl-6 mb-5 mb-lg-0'>
          <CommunicationSafetyCard contacts={contacts} />
        </div>
        <div className='col-lg-6 col-xxl-6'>
          <InChargePersonCard persons={inChargePersons} />
        </div>
      </div>
    </div>
  )
}

export default HotlineOverview














