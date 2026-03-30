import React from 'react'
import {AssetRow} from '../../dummy'
import {specsDummy, AssetSpecs} from './dummy'

type Props = {asset?: AssetRow | null}

const labelStyle: React.CSSProperties = {minWidth: 160}
const SectionTitle: React.FC<{title: string}> = ({title}) => (
  <div className='fw-bold text-uppercase text-gray-800 bg-light px-3 py-2 rounded mb-4'>
    {title}
  </div>
)

const SpecRow: React.FC<{label: string; value?: React.ReactNode; rightNote?: React.ReactNode}> = ({
  label,
  value,
  rightNote,
}) => (
  <div className='d-flex align-items-center mb-3'>
    <strong className='text-end me-2' style={labelStyle}>
      {label} :
    </strong>
    {value !== undefined ? (
      <span className='flex-grow-1'>{value}</span>
    ) : (
      <span className='flex-grow-1 border-bottom border-gray-300'>&nbsp;</span>
    )}
    {rightNote && <span className='ms-3 text-muted'>{rightNote}</span>}
  </div>
)

const SpecsTab: React.FC<Props> = ({asset}) => {
  const d: AssetSpecs | undefined = asset?.assetNo ? specsDummy[asset.assetNo] : undefined

  return (
    <div className='container-fluid px-0'>
      {/* BARIS ATAS*/}
      <div className='row g-8'>
        {/* DIMENSION */}
        <div className='col-md-4'>
          <SectionTitle title='DIMENSION' />
          <div className='px-3'>
            <SpecRow label='Height' value={d?.dimension.height} />
            <SpecRow label='Width' value={d?.dimension.width} />
            <SpecRow label='Depth' value={d?.dimension.depth} />
            <SpecRow label='Net Weight' value={d?.dimension.netWeight} />
            <SpecRow label='Gross Weight' value={d?.dimension.grossWeight} />
          </div>
        </div>

        {/* VEHICLE INFO */}
        <div className='col-md-8'>
          <SectionTitle title='VEHICLE INFO' />
          <div className='row'>
            <div className='col-md-6 px-3'>
              <SpecRow label='Initial Reading' value={d?.vehicleInfo.initialReading} />
              <SpecRow label='Reading Type' value={d?.vehicleInfo.readingType} />
              <SpecRow label='Body' value={d?.vehicleInfo.body} />
              <SpecRow label='Seating Capacity' value={d?.vehicleInfo.seatingCapacity} />
              <SpecRow label='Engine Type' value={d?.vehicleInfo.engineType} />
            </div>
            <div className='col-md-6 px-3'>
              <SpecRow label='Engine Size' value={d?.vehicleInfo.engineSize} />
              <SpecRow label='Chassis' value={d?.vehicleInfo.chassis} />
              <SpecRow label='No of Cylinder' value={d?.vehicleInfo.cylinders} />
              <SpecRow label='Transmission' value={d?.vehicleInfo.transmission} />
            </div>
          </div>
        </div>
      </div>

      {/* BARIS BAWAH */}
      <div className='row g-8 mt-6'>
        {/* COMPUTER */}
        <div className='col-md-4'>
          <SectionTitle title='COMPUTER' />
          <div className='px-3'>
            <SpecRow label='Processor' value={d?.computer.processor} />
            <SpecRow label='RAM' value={d?.computer.ram} />
            <SpecRow label='System Type' value={d?.computer.systemType} />
            <SpecRow label='Operating System' value={d?.computer.os} />
          </div>
        </div>

        {/* TYRE */}
        <div className='col-md-4'>
          <SectionTitle title='TYRE' />
          <div className='px-3'>
            <SpecRow label='Tyre Size' value={d?.tyre.size} />
            <SpecRow label='Tyre Amount' value={d?.tyre.amount} />
            <SpecRow label='No of Axles' value={d?.tyre.axles} />
          </div>
        </div>

        {/* FUEL */}
        <div className='col-md-4'>
          <SectionTitle title='FUEL' />
          <div className='px-3'>
            <SpecRow
              label='Primary Type'
              value={d?.fuel.primaryType}
              rightNote={d?.fuel.primaryCapacity ? `[${d.fuel.primaryCapacity}]` : '[capacity]'}
            />
            <SpecRow
              label='Secondary Type'
              value={d?.fuel.secondaryType}
              rightNote={d?.fuel.secondaryCapacity ? `[${d.fuel.secondaryCapacity}]` : '[capacity]'}
            />
            <SpecRow label='Tank Units' value={d?.fuel.tankUnits} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecsTab
