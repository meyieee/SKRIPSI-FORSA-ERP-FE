import React from 'react'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {BranchActivation} from '../types'

type Props = {
  branches: BranchActivation[]
  activeBranchCode?: string
  loading?: boolean
}

const CompanyActivateCard: React.FC<Props> = ({branches, activeBranchCode, loading}) => {
  if (loading) {
    return (
      <div className='card h-100'>
        <div className='card-body py-10 text-center'>Loading branches...</div>
      </div>
    )
  }

  if (!branches || branches.length === 0) {
    return (
      <div className='card h-100'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Company Activate</span>
          </h3>
        </div>
        <div className='card-body pt-5 pb-5'>
          <div className='text-center text-muted'>No branches available</div>
        </div>
      </div>
    )
  }

  return (
    <div className='card h-100'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Company Activate</span>
        </h3>
      </div>
      <div className='card-body pt-5 pb-5'>
        <div className='d-flex flex-column gap-3'>
          {branches.map((branch) => {
            const isActive =
              (activeBranchCode && branch.branch_code === activeBranchCode) || branch.is_active

            return (
              <div
                key={branch.branch_code}
                className='d-flex align-items-center justify-content-between px-4 py-3 rounded border position-relative cursor-pointer'
                style={{backgroundColor: '#F9FAFB'}}
              >
                <div
                  className='position-absolute'
                  style={{
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: isActive ? 8 : 0,
                    background: '#50CD89',
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                  }}
                />
                <div className='d-flex align-items-center gap-3'>
                      <div className='fw-semibold'>{branch.branch_name}</div>
                </div>
                <div className='d-flex align-items-center gap-2'>
                  {isActive ? (
                    <span className='badge badge-light-success'>Active</span>
                  ) : (
                    <span className='badge badge-light'>Inactive</span>
                  )}
                  <KTSVG path='/media/icons/duotune/arrows/arr071.svg' className='svg-icon-2' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CompanyActivateCard

