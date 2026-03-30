import React from 'react'
import {AssetRow} from '../../dummy'
import {costSummaryDummy, type CostSummary} from './dummy'

type Props = {asset?: AssetRow | null}

const Row: React.FC<{label: string; value?: React.ReactNode}> = ({label, value}) => (
  <div className='d-flex align-items-center mb-3'>
    <strong className='text-end me-2 text-nowrap d-inline-block' style={{width: 180}}>
      {label} :
    </strong>
    <span className='flex-grow-1'>
      {value ?? <span className='d-inline-block w-100 border-bottom border-gray-300'>&nbsp;</span>}
    </span>
  </div>
)

const formatNumber = (v: unknown) => {
  if (v === null || v === undefined || v === '') return undefined
  const n = Number(v)
  return Number.isFinite(n) ? new Intl.NumberFormat().format(n) : String(v)
}

const CostSummaryTab: React.FC<Props> = ({asset}) => {
  const d: CostSummary | undefined = asset?.assetNo ? costSummaryDummy[asset.assetNo] : undefined

  const total =
    d?.total ??
    (['manhours', 'material', 'auxiliary', 'other'] as const).reduce((sum, k) => {
      const n = Number(d?.[k] ?? 0)
      return sum + (Number.isFinite(n) ? n : 0)
    }, 0)

  return (
    <div className='px-0'>
      <Row label='Manhours' value={formatNumber(d?.manhours)} />
      <Row label='Material' value={formatNumber(d?.material)} />
      <Row label='Auxiliary' value={formatNumber(d?.auxiliary)} />
      <Row label='Other' value={formatNumber(d?.other)} />
      <Row label='Total' value={formatNumber(total)} />
    </div>
  )
}

export default CostSummaryTab
