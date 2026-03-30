import React from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../_metronic'
import {useProfile} from '../../ProfileContext'

const labelStyle: React.CSSProperties = {minWidth: '160px'}

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

const DependentTab: React.FC = () => {
  const {dependents} = useProfile()

  if (!dependents || dependents.length === 0) {
    return <div className='alert alert-warning'>⚠️ Please search first</div>
  }

  return (
    <KTCard>
      <KTCardBody>
        {dependents.map((d: any, idx: number) => (
          <div key={idx} className='mb-12'>
            <div className='row g-8'>
              <div className='col-md-4'>
                <SectionTitle title='PERSONAL' />
                <div className='px-3'>
                  <Row label='ID No Dep' value={d.idDep} />
                  <Row label='Full Name' value={d.fullName} />
                  <Row label='Gender' value={d.gender} />
                  <Row label='Relationship' value={d.relationship} />
                  <Row label='Onsite' value={d.onsite} />
                  <Row label='Expat Dep' value={d.expatDep} />
                  <Row label='Marital Status' value={d.maritalStatus} />
                </div>
              </div>

              <div className='col-md-4'>
                <SectionTitle title='DETAIL INFO' />
                <div className='px-3'>
                  <Row label='Position' value={d.position} />
                  <Row label='Place of Birth' value={d.placeOfBirth} />
                  <Row label='Date of Birth | Age' value={`${d.dateOfBirth} | ${d.age}`} />
                  <Row label='Religion' value={d.religion} />
                  <Row label='Remarks' value={d.remarks} />
                </div>
              </div>

              <div className='col-md-4'>
                <SectionTitle title='ADDRESS' />
                <div className='px-3'>
                  <Row label='Address' value={d.address} />
                  <Row label='City' value={d.city} />
                  <Row label='State' value={d.state} />
                  <Row label='ZIP' value={d.zip} />
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <SectionTitle title='CONTACT' />
              <div className='row g-6'>
                <div className='col-md-4'>
                  <div className='px-3'>
                    <Row label='Phone 1' value={d.phone1} />
                    <Row label='Phone 2' value={d.phone2} />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='px-3'>
                    <Row label='Email' value={d.email} />
                    <Row label='Handicapped' value={d.handicapped} />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='px-3'>
                    <Row label='Student' value={d.student} />
                    <Row label='Employee ID' value={d.employeeId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </KTCardBody>
    </KTCard>
  )
}

export default DependentTab
