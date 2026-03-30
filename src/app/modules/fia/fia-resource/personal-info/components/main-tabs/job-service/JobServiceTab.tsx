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

const JobServiceTab: React.FC = () => {
  const {jobService} = useProfile()
  const s = jobService

  if (!s) return <div className='alert alert-warning'>⚠️ Please search first</div>

  return (
    <KTCard>
      <KTCardBody>
        <div className='row g-8'>
          <div className='col-md-4'>
            <SectionTitle title='BENEFIT' />
            <div className='px-3'>
              <Row label='Paygroup' value={s.paygroup} />
              <Row label='Bank Account' value={s.bankAccount} />
              <Row label='Leave Type' value={s.leaveType} />
              <Row label='Union No' value={s.unionNo} />
            </div>
          </div>

          <div className='col-md-4'>
            <SectionTitle title='INSURANCE' />
            <div className='px-3'>
              <Row label='Work Insurance' value={s.workInsurance} />
              <Row label='Medical Insurance' value={s.medicalInsurance} />
              <Row label='Tax Code | NPWP' value={s.taxCode} />
            </div>
          </div>

          <div className='col-md-4'>
            <SectionTitle title='PERFORMANCE' />
            <div className='px-3'>
              <Row label='Work Day' value={s.workDay} />
              <Row label='Crew | Workgroup' value={s.crew} />
              <Row label='Last Promotion' value={s.lastPromotion} />
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <SectionTitle title='CONTRACT' />
          <div className='row g-6'>
            <div className='col-md-4'>
              <div className='px-3'>
                <Row label='Contract No' value={s.contractNo} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='px-3'>
                <Row label='Contract Date' value={s.contractDate} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='px-3'>
                <Row label='Contract Expire' value={s.contractExpire} />
              </div>
            </div>
          </div>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default JobServiceTab
