import React from 'react'
import { Button } from 'react-bootstrap'
import { KTCard, KTCardBody } from '../../../../../../../_metronic'
import { HelpdeskRequest } from '../core/types'

type Props = {
  requests: HelpdeskRequest[]
  onView?: (request: HelpdeskRequest) => void
}

const HelpdeskRequestTable: React.FC<Props> = ({ requests, onView }) => {
  const handleView = (request: HelpdeskRequest) => {
    if (onView) {
      onView(request)
    }
  }

  return (
    <KTCard>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>ONLINE HELPDESK REQUEST CONTROL</span>
        </h3>
      </div>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px py-3'>No</th>
                <th className='min-w-120px py-3'>Ref Doc No</th>
                <th className='min-w-250px py-3'>Description</th>
                <th className='min-w-120px py-3'>Trans Type</th>
                <th className='min-w-120px py-3'>Requestor</th>
                <th className='min-w-80px py-3 text-center'>Priority</th>
                <th className='min-w-100px py-3'>Request Date</th>
                <th className='min-w-100px py-3'>Expired</th>
                <th className='min-w-120px py-3'>Status</th>
                <th className='min-w-100px text-end py-3'>Action</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <tr key={request.id}>
                    <td className='py-3'>{index + 1}</td>
                    <td className='py-3'>{request.refDocNo}</td>
                    <td className='py-3'>{request.description}</td>
                    <td className='py-3'>{request.transType}</td>
                    <td className='py-3'>{request.requestor}</td>
                    <td className='py-3 text-center'>
                      <span className='badge badge-light-primary fs-7 fw-semibold'>
                        {request.priority}
                      </span>
                    </td>
                    <td className='py-3'>{request.requestDate}</td>
                    <td className='py-3'>{request.expired}</td>
                    <td className='py-3'>
                      <span className='badge badge-light-warning fs-7 fw-semibold'>
                        {request.status}
                      </span>
                    </td>
                    <td className='text-end py-3'>
                      <Button
                        variant='primary'
                        size='sm'
                        onClick={() => handleView(request)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className='text-center py-5'>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default HelpdeskRequestTable

