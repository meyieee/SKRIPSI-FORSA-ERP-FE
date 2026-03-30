import React from 'react'
import {AssetRow} from '../../dummy'
import {financeDummy, AssetFinance} from './dummy'

type Props = {asset?: AssetRow | null}

const labelStyle: React.CSSProperties = {minWidth: 180}

const SectionTitle: React.FC<{title: string}> = ({title}) => (
  <div className='fw-bold text-uppercase text-gray-800 bg-light px-3 py-2 rounded mb-4'>
    {title}
  </div>
)

const Row: React.FC<{label: string; value?: React.ReactNode}> = ({label, value}) => (
  <div className='d-flex align-items-center mb-3'>
    <strong className='text-end me-2' style={labelStyle}>
      {label} :
    </strong>
    {value !== undefined ? (
      <span className='flex-grow-1'>{value}</span>
    ) : (
      <span className='flex-grow-1 border-bottom border-gray-300'>&nbsp;</span>
    )}
  </div>
)

const FinanceTab: React.FC<Props> = ({asset}) => {
  const d: AssetFinance | undefined = asset?.assetNo ? financeDummy[asset.assetNo] : undefined

  return (
    <div className='container-fluid px-0'>
      <div className='row g-8'>
        {/* KIRI */}
        <div className='col-md-6'>
          <SectionTitle title='PURCHASE INFO' />
          <div>
            <Row label='CapEx No' value={d?.purchaseInfo.capexNo} />
            <Row label='PO No' value={d?.purchaseInfo.poNo} />
            <Row label='Supplier' value={d?.purchaseInfo.supplier} />
            <Row label='Qty' value={d?.purchaseInfo.qty} />
            <Row label='Purchase Price' value={d?.purchaseInfo.purchasePrice} />
            <Row label='Purchase Date' value={d?.purchaseInfo.purchaseDate} />
            <Row label='Date Received' value={d?.purchaseInfo.dateReceived} />
          </div>
        </div>

        {/* KANAN*/}
        <div className='col-md-6'>
          <SectionTitle title='FINANCE ACCOUNTING INFO' />
          <div className='row'>
            {/* kiri tengah*/}
            <div className='col-md-6 px-0'>
              <Row label='Expected Life' value={d?.accountingInfo.expectedLife} />
              <Row label='Current Value' value={d?.accountingInfo.currentValue} />
              <Row label='Add Value' value={d?.accountingInfo.addValue} />
              <Row label='Sold Amount' value={d?.accountingInfo.soldAmount} />
              <Row label='Disposal Date' value={d?.accountingInfo.disposalDate} />
              <Row label='Disposal Reason' value={d?.accountingInfo.disposalReason} />
            </div>
            {/* kanan tengah */}
            <div className='col-md-6 px-0'>
              <Row label='Depreciation Year' value={d?.accountingInfo.depreciationYear} />
              <Row label='Depreciation Type' value={d?.accountingInfo.depreciationType} />
              <Row label='Remain Value' value={d?.accountingInfo.remainValue} />
              <Row label='Date Sold' value={d?.accountingInfo.dateSold} />
              <Row label='Insurance No' value={d?.accountingInfo.insuranceNo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceTab
