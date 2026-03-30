import { KTCard, KTCardBody, KTSVG } from '../../../../../../_metronic'
import { CostCenter } from '../core/_models'

interface CostCenterListProps {
  costCenters: CostCenter[]
}

export const CostCenterList = ({ costCenters }: CostCenterListProps) => {
  return (
    <KTCard className='h-100'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>COST CENTER | SECTION</span>
        </h3>
      </div>
      <KTCardBody className='py-4 d-flex flex-column'>
        <div className='table-responsive flex-grow-1'>
          <table className='table align-middle table-hover table-row-dashed fs-6 gy-0 dataTable no-footer'>
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-150px'>Cost Center</th>
                <th className='min-w-50px text-end'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-600'>
              {costCenters.map((center, index) => (
                <tr key={center.id}>
                  <td>
                    <span className='fw-bold'>{index + 1}</span>
                  </td>
                  <td>
                    <div className='d-flex flex-column'>
                      <span className='fw-semibold fs-6 text-gray-800'>{center.name}</span>
                      <span className='text-muted fs-7'>{center.type}</span>
                    </div>
                  </td>
                  <td className='text-end'>
                    <button
                      type='button'
                      className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen004.svg'
                        className='svg-icon-3'
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

