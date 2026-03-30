import React from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../_metronic'
import {useProfile} from '../../ProfileContext'

type Props = {}

const labelStyle: React.CSSProperties = {minWidth: '150px'}

const Row: React.FC<{label: string; value?: React.ReactNode}> = ({label, value}) => (
  <div className='d-flex align-items-center mb-3'>
    <strong className='text-end me-2' style={labelStyle}>
      {label} :
    </strong>
    <span className='flex-grow-1'>
      {value ?? <span className='d-inline-block w-100 border-bottom border-gray-300'>&nbsp;</span>}
    </span>
  </div>
)

const SectionTitle: React.FC<{title: string}> = ({title}) => (
  <div className='fw-bold text-uppercase text-gray-800 bg-light px-3 py-2 rounded mb-4'>
    {title}
  </div>
)

const PersonalDataTab: React.FC<Props> = () => {
  const {personalData} = useProfile()
  const p = personalData

  if (!p) return <div className='alert alert-warning'>⚠️ Please search first</div>

  return (
    <KTCard>
      <KTCardBody>
        <div className='mb-10'>
          <SectionTitle title='PERSONAL DETAILS' />
          <div className='row g-6 align-items-stretch'>
            <div className='col-md-4 px-3'>
              <Row label='ID Number' value={p.idNumber} />
              <Row label='First Name' value={p.firstName} />
              <Row label='Middle Name' value={p.middleName} />
              <Row label='Last Name' value={p.lastName} />
            </div>

            <div className='col-md-4 px-3'>
              <Row label='Nick Name' value={p.nickName} />
              <Row label='Gender' value={p.gender} />
              <Row label='Date of Birth' value={p.dateOfBirth} />
              <Row label='Point of Birth' value={p.placeOfBirth} />
            </div>

            <div className='col-md-4 px-3'>
              <Row label='Marital Status' value={p.maritalStatus} />
              <Row label='Religion' value={p.religion} />
              <Row label='Nationality' value={p.nationality} />
              <Row label='Ethnic' value={p.ethnic} />
              <Row label='Identity | KTP' value={p.ktp} />
            </div>
          </div>
        </div>

        <div className='row g-6 align-items-stretch'>
          <div className='col-md-4'>
            <SectionTitle title='ADDRESS | CONTACT' />
            <div className='px-3'>
              <Row label='Address' value={p.address} />
              <Row label='City' value={p.city} />
              <Row label='Sub District' value={p.subDistrict} />
              <Row label='District' value={p.district} />
              <Row label='Province' value={p.province} />
              <Row label='Country' value={p.country} />
              <Row label='Postcode' value={p.postcode} />
              <Row label='Home Phone' value={p.homePhone} />
              <Row label='Personal Email' value={p.personalEmail} />
            </div>
          </div>

          <div className='col-md-4'>
            <SectionTitle title='MEDICAL INFO' />
            <div className='px-3'>
              <Row label='Blood Type' value={p.bloodType} />
              <Row label='Height' value={p.height} />
              <Row label='Weight' value={p.weight} />
              <Row label='Medication' value={p.medication} />
              <Row label='Allergies' value={p.allergies} />
              <Row label='Chronic Medical History' value={p.chronicHistory} />
            </div>
          </div>

          <div className='col-md-4'>
            <SectionTitle title='STATUS | REGISTER' />
            <div className='px-3'>
              <Row label='Status' value={p.status} />
              <Row label='Status Date' value={p.statusDate} />
              <Row label='Register By' value={p.registerBy} />
              <Row label='Register Date' value={p.registerDate} />
            </div>
          </div>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default PersonalDataTab
