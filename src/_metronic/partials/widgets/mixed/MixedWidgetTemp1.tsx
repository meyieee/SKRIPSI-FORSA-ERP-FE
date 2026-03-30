import { FC } from 'react'
import { fullUrlServer, toAbsoluteUrl } from '../../../helpers'
import { UseReactQuery } from '../../../../app/functions/reactQuery'
import { getHoAndBranchProfiles } from '../../../../app/functions/branchProfiles'
import type { ComData } from '../../../../app/types/comData'
import { cache_hoandbranchprofiles } from '../../../../app/constans'

type BranchProfile = ComData & {
  branch_code?: string
  address?: string
  email?: string
  web_address?: string
  city?: string
  province?: string
  region?: string
  country?: string
}

type Props = {
  className?: string
  chartColor?: string
  chartHeight?: string
}

// NOTE:
// THIS WIDGET IS FOR PRESENTATION ONLY ON TUESDAY, 07/15/24. DELETE AFTER

const MixedWidgetTemp1: FC<Props> = ({className}) => {
  const { data } = UseReactQuery({ func: getHoAndBranchProfiles, cacheName: cache_hoandbranchprofiles });
  const branchProfiles = (data ?? []) as BranchProfile[]
  const ho = branchProfiles.find((e) => e.com_type === 'HO')
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body pt-5 card-scroll h-250px'>
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div className="col-4">
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  { ho?.logo
                    ? <img src={`${fullUrlServer}/${ho?.logo}`} alt='Uploaded HO Company Logo' />
                    : <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='Blank Profile Logo' />
                  }
                </div>
              </div>
              <div className="col-8">
                <span className='btn btn-secondary disabled w-100 py-3 mb-5 ms-3'>
                  HEAD OFFICE
                </span>
                
                <label className="ms-3 d-flex align-items-center form-label">Company Code & Name</label>
                <span className="ms-3 form-control form-control-sm">{ho?.branch_code} - {ho?.com_name}</span>

                <label className="ms-3 d-flex align-items-center form-label mt-3">Full Address</label>
                <span className="ms-3 form-control form-control-sm">{ho?.address}</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <label className="d-flex align-items-center form-label">Email</label>
                <span className="form-control form-control-sm">{ho?.email}</span>

                <label className="d-flex align-items-center form-label mt-3">Website</label>
                <span className="form-control form-control-sm">{ho?.web_address}</span>
                
                <label className="d-flex align-items-center form-label mt-3">City</label>
                <span className="form-control form-control-sm">{ho?.city}</span>
              </div>
              <div className="col-6">
                <label className="d-flex align-items-center form-label">Province</label>
                <span className="form-control form-control-sm">{ho?.province}</span>
                
                <label className="d-flex align-items-center form-label mt-3">Region</label>
                <span className="form-control form-control-sm">{ho?.region}</span>

                <label className="d-flex align-items-center form-label mt-3">Country</label>
                <span className="form-control form-control-sm">{ho?.country}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <span className='btn btn-secondary disabled w-100 py-3 mb-5'>
              BRANCH
            </span>
            {/* begin::Item */}
            {branchProfiles.map((e, index: number) => (
              <div key={index} className='d-flex align-items-center mb-8'>
                {/* begin::Bullet */}
                <span className={`bullet bullet-vertical h-40px bg-${e.com_type === 'HO' ? 'success' : 'secondary'} me-5`}></span>
                {/* end::Bullet */}
                {/* begin::Description */}
                <div className='flex-grow-1'>
                  {/* <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-6'>
                    {e.com_name}
                  </a> */}
                  <span className='text-gray-800 text-hover-primary fw-bold fs-6'>{e.com_name}</span>
                </div>
                {/* end::Description */}
              </div>
            ))}
            {/* end:Item */}
          </div>
        </div>
      </div>
    </div>
  )
}

export {MixedWidgetTemp1}