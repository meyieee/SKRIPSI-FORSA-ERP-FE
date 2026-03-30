import React from 'react'
import {AssetRow} from '../../dummy'
import {detailDummy, AssetDetail} from './dummy'

type Props = {asset?: AssetRow | null}

const labelStyle: React.CSSProperties = {minWidth: 180}

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

const QRBox: React.FC<{src?: string}> = ({src}) => (
  <div
    className='bg-light d-flex align-items-center justify-content-center rounded mb-6'
    style={{width: 180, height: 140}}
  >
    {src ? (
      <img src={src} alt='QR' style={{maxWidth: '100%', maxHeight: '100%'}} />
    ) : (
      <span className='text-gray-600'>QR Code</span>
    )}
  </div>
)

const DetailTab: React.FC<Props> = ({asset}) => {
  const d: AssetDetail | undefined = asset?.assetNo ? detailDummy[asset.assetNo] : undefined

  return (
    <div className='row g-8 align-items-start'>
      {/* DETAIL  */}
      <div className='col-md-4 col-lg-5 order-1 order-lg-1'>
        <SectionTitle title='DETAIL' />
        <div className='px-3'>
          <Row label='Asset Ref No' value={d?.assetRefNo} />
          <Row label='Manufacture No' value={d?.manufactureNo} />
          <Row label='Manufacture Year' value={d?.manufactureYear} />
          <Row label='Date Operate' value={d?.dateOperate} />
          <Row label='User (PIC)' value={d?.userPIC} />
          <Row label='Ownership' value={d?.ownership} />
        </div>
      </div>

      {/* ASSIGNMENT */}
      <div className='col-md-4 col-lg-4 order-2 order-lg-2'>
        <SectionTitle title='ASSIGNMENT' />
        <div className='px-3'>
          <Row label='Branch | Site' value={d?.branchSite} />
          <Row label='Department' value={d?.department} />
          <Row label='Cost Center' value={d?.costCenter} />
          <Row label='Account Code' value={d?.accountCode} />
          <Row label='Location' value={d?.location} />
          <Row label='Ownership Type' value={d?.ownershipType} />
        </div>
      </div>

      {/* QR + status */}
      <div className='col-md-4 col-lg-3 order-3 order-lg-3'>
        <div className='d-flex flex-column align-items-lg-end'>
          <QRBox src={d?.qrImageUrl} />
          <div className='px-3 w-100'>
            <Row label='Condition' value={d?.condition} />
            <Row label='Register By' value={d?.registerBy} />
            <Row label='Register Date' value={d?.registerDate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailTab
