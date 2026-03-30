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

const JobInfoTab: React.FC = () => {
  const {jobInfo} = useProfile()
  const j = jobInfo

  if (!j) return <div className='alert alert-warning'>⚠️ Please search first</div>

  return (
    <KTCard>
      <KTCardBody>
        <div className='row g-8'>
          <div className='col-md-4'>
            <SectionTitle title='FUNCTION' />
            <div className='px-3'>
              <Row label='Job Title' value={j.jobTitle} />
              <Row label='Position Title' value={j.positionTitle} />
              <Row label='Work Function' value={j.workFunction} />
              <Row label='Job Level' value={j.jobLevel} />
              <Row label='Individual Grade' value={j.individualGrade} />
              <Row label='Individual Level' value={j.individualLevel} />
              <Row label='Employee Type' value={j.employeeType} />
              <Row label='Employee Class' value={j.employeeClass} />
              <Row label='Employment Type' value={j.employmentType} />
              <Row label='Supervisor' value={j.supervisor} />
              <Row label='Onsite Marital' value={j.onsiteMarital} />
              <Row label='Benefit Marital' value={j.benefitMarital} />
            </div>
          </div>

          <div className='col-md-4'>
            <SectionTitle title='HIRE' />
            <div className='px-3 mb-6'>
              <Row label='Hire Date' value={j.hireDate} />
              <Row label='Service Date' value={j.serviceDate} />
              <Row label='Probation Date' value={j.probationDate} />
              <Row label='Point of Hire' value={j.pointOfHire} />
              <Row label='Point of Leave' value={j.pointOfLeave} />
              <Row label='Point of Travel' value={j.pointOfTravel} />
            </div>

            <SectionTitle title='LOCATION' />
            <div className='px-3'>
              <Row label='Onsite Location' value={j.onsiteLocation} />
              <Row label='Onsite Address' value={j.onsiteAddress} />
              <Row label='Work Location' value={j.workLocation} />
              <Row label='Office No' value={j.officeNo} />
            </div>
          </div>

          <div className='col-md-4'>
            <SectionTitle title='ORGANIZATION' />
            <div className='px-3 mb-6'>
              <Row label='Company' value={j.company} />
              <Row label='Employee Company' value={j.employeeCompany} />
              <Row label='Department' value={j.department} />
              <Row label='Cost Center' value={j.costCenter} />
              <Row label='Account Code' value={j.accountCode} />
              <Row label='Union Code' value={j.unionCode} />
            </div>

            <SectionTitle title='CONTACT' />
            <div className='px-3'>
              <Row label='Work Phone' value={j.workPhone} />
              <Row label='Mobile' value={j.mobile} />
              <Row label='WA' value={j.wa} />
              <Row label='Email Company' value={j.emailCompany} />
            </div>
          </div>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default JobInfoTab
