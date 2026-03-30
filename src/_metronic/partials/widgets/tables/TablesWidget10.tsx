import {FC, Fragment, useState} from 'react'
import {KTSVG} from '../../../helpers'

type Props = {
  className: string
}

const TablesWidget10: FC<Props> = ({className}) => {
  const [approvalRows] = useState<any>({
    'Work Order': [
      {
        id: 1,
        document_no: 'WO2306-001',
        description: 'Work Order',
        created: '10-Jan-21',
        raised_by: 'Eduard Salindeho',
        amount: '25,000,000',
        status: 'Waiting for Approval',
      },
      {
        id: 2,
        document_no: 'WO2306-002',
        description: 'Work Order',
        created: '10-Jan-21',
        raised_by: 'Eduard Salindeho',
        amount: '50,000,000',
        status: 'Waiting for Approval',
      },
      {
        id: 3,
        document_no: 'WO2306-003',
        description: 'Work Order',
        created: '10-Jan-21',
        raised_by: 'Eduard Salindeho',
        amount: '100,000,000',
        status: 'Waiting for Approval',
      },
    ],
    'Purchase Order': [
      {
        id: 1,
        document_no: 'PO2306-001',
        description: 'Purchase Order Request',
        created: '10-Jan-21',
        raised_by: 'Vallerie Joanna',
        amount: '7,000,000',
        status: 'Pending',
      },
      {
        id: 2,
        document_no: 'PO2306-002',
        description: 'Purchase Order Request',
        created: '10-Jan-21',
        raised_by: 'Jannice Felicia',
        amount: '2,000,000',
        status: 'Waiting for Approval',
      },
    ],
    'Change Individual Roster': [
      {
        id: 1,
        document_no: 'TR2306-001',
        description: 'Annual Field Break Travel Request',
        created: '10-Jan-21',
        raised_by: 'Eduard Salindeho',
        amount: '5,000,000',
        status: 'Pending',
      },
    ],
  })

  const [requestRows] = useState([
    {
      id: 1,
      ref_doc_no: 'PO2306-001',
      description: 'Purchase laptop and accessories',
      trans_type: 'Purchase Order',
      priority: 'P#2',
      request_date: '10-Jun-23',
      status: 'Waiting for Approval',
    },
    {
      id: 2,
      ref_doc_no: 'PO2306-002',
      description: 'Purchase office furniture and refrigerator',
      trans_type: 'Purchase Order',
      priority: 'P#2',
      request_date: '20-Jun-23',
      status: 'Waiting for Approval',
    },
    {
      id: 3,
      ref_doc_no: 'WO2307-001',
      description: 'Replace new alternator',
      trans_type: 'Work Order',
      priority: 'P#2',
      request_date: '2-Jul-23',
      status: 'Waiting for Approval',
    },
    {
      id: 4,
      ref_doc_no: 'TR2307-001',
      description: 'Travel request - Atlas Kobe',
      trans_type: 'Travel Request',
      priority: 'P#2',
      request_date: '5-Jul-23',
      status: 'Waiting for Approval',
    },
    {
      id: 5,
      ref_doc_no: 'MR2307-001',
      description: 'Material request for new alternator',
      trans_type: 'Material Request',
      priority: 'P#2',
      request_date: '15-Jul-23',
      status: 'Waiting for Approval',
    },
  ])

  const [taskRows] = useState([
    {
      id: 1,
      task_no: 'TSK230001',
      task_description: 'Prepare manufacture modular',
      created_date: '22-Mar-23',
      priority: 'P#2',
      plan_complete: '30-Mar-23',
      status: 'On Progress',
    },
    {
      id: 2,
      task_no: 'TSK230001',
      task_description: 'Follow up material receipt report',
      created_date: '20-Mar-23',
      priority: 'P#2',
      plan_complete: '25-Mar-23',
      status: 'On Progress',
    },
    {
      id: 3,
      task_no: 'TSK230001',
      task_description: 'Modul material receipt need finish',
      created_date: '10-Feb-23',
      priority: 'P#2',
      plan_complete: '25-Feb-23',
      status: 'On Progress',
    },
    {
      id: 4,
      task_no: 'TSK230001',
      task_description: 'Prepare NEWS ON THREES APPLICATION',
      created_date: '22-Feb-23',
      priority: 'P#2',
      plan_complete: '15-Mar-23',
      status: 'On Progress',
    },
    {
      id: 5,
      task_no: 'TSK230001',
      task_description: 'Prepare NEWS ON FORSA UPGRADE',
      created_date: '20-Feb-23',
      priority: 'P#2',
      plan_complete: '22-Feb-23',
      status: 'On Progress',
    },
    {
      id: 6,
      task_no: 'TSK230001',
      task_description: 'Prepare NEWS ON TOOGOOT APPLICATION',
      created_date: '15-Feb-23',
      priority: 'P#2',
      plan_complete: '22-Feb-23',
      status: 'On Progress',
    },
    {
      id: 7,
      task_no: 'TSK230001',
      task_description: 'Prepare NEWS ON TOOGOOT UPGRADE',
      created_date: '05-Feb-23',
      priority: 'P#2',
      plan_complete: '22-Feb-23',
      status: 'On Progress',
    },
  ])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header'>
        <ul className='nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0'>
          <li className='nav-item'>
            <a className='nav-link active text-dark' data-bs-toggle='tab' href='#kt_tab_pane_7'>
              MY APPROVAL (6)
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link text-dark' data-bs-toggle='tab' href='#kt_tab_pane_8'>
              MY REQUESTS (0)
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link text-dark' data-bs-toggle='tab' href='#kt_tab_pane_9'>
              MY TASKS (0)
            </a>
          </li>
        </ul>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <button className='btn btn-sm btn-light-danger'>
            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            Rejected
          </button>
          <button className='btn btn-sm btn-light ms-3'>
            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            Pending
          </button>
          <button className='btn btn-sm btn-primary ms-3'>
            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            Approved
          </button>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3 card-scroll h-350px'>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade show active' id='kt_tab_pane_7' role='tabpanel'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-1'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold'>
                    <th className='w-25px'>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value='1'
                          data-kt-check='true'
                          data-kt-check-target='.widget-9-check'
                        />
                      </div>
                    </th>
                    <th className='min-w-100px'>Document No</th>
                    <th className='min-w-140px'>Description</th>
                    <th className='min-w-120px'>Request Date</th>
                    <th className='min-w-120px'>Requested by</th>
                    <th className='min-w-120px'>Amount</th>
                    <th className='min-w-100px'>Status</th>
                    <th className='min-w-50px text-end'>Actions</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody className='text-gray-600'>
                  {Object.keys(approvalRows).map((key: string | any, i: number) => (
                    <Fragment key={i}>
                      <tr>
                        <td colSpan={12} className='bg-light fw-bold'>
                          <span className='min-w-100px'>{key}</span>
                        </td>
                      </tr>
                      {approvalRows[key].map((row: any, index: number) => (
                        <tr key={index}>
                          <td className='w-25px'>
                            <div className='form-check form-check-sm form-check-custom form-check-solid'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                value='1'
                                data-kt-check='true'
                                data-kt-check-target='.widget-9-check'
                              />
                            </div>
                          </td>
                          <td>
                            <span className='min-w-100px'>{row.document_no}</span>
                          </td>
                          <td>
                            <span className='min-w-100px'>{row.description}</span>
                          </td>
                          <td>
                            <span className='min-w-100px'>{row.created}</span>
                          </td>
                          <td>
                            <span className='min-w-100px'>{row.raised_by}</span>
                          </td>
                          <td>
                            <span className='min-w-100px'>{row.amount}</span>
                          </td>
                          <td>
                            <span
                              className={
                                row.status === 'Cancelled'
                                  ? 'badge badge-light-danger fs-7 fw-semibold'
                                  : row.status === 'Pending'
                                  ? 'badge badge-light-warning fs-7 fw-semibold'
                                  : 'badge badge-light-info fs-7 fw-semibold'
                              }
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className='text-end'>
                            <button
                              type='button'
                              className='btn btn-link btn-color-gray-500 btn-active-color-primary me-1'
                            >
                              <KTSVG
                                path='/media/icons/duotune/general/gen004.svg'
                                className='svg-icon-3'
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
          <div className='tab-pane fade' id='kt_tab_pane_8' role='tabpanel'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-1'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold'>
                    <th className='min-w-50px'>No</th>
                    <th className='min-w-100px'>Ref Doc No</th>
                    <th className='min-w-140px'>Description</th>
                    <th className='min-w-120px'>Trans Type</th>
                    <th className='min-w-120px'>Priority</th>
                    <th className='min-w-120px'>Request Date</th>
                    <th className='min-w-100px'>Status</th>
                    <th className='min-w-50px text-end'>Actions</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody className='text-gray-600'>
                  {requestRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <span className='min-w-125px'>{row.id}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.ref_doc_no}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.description}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.trans_type}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.priority}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.request_date}</span>
                      </td>
                      <td>
                        <span
                          className={
                            row.status === 'Cancelled'
                              ? 'badge badge-light-danger fs-7 fw-semibold'
                              : row.status === 'Pending'
                              ? 'badge badge-light-warning fs-7 fw-semibold'
                              : 'badge badge-light-info fs-7 fw-semibold'
                          }
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className='text-end'>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <button className='btn btn-sm btn-link btn-color-gray-500 btn-active-color-primary me-1'>
                            <KTSVG
                              path='/media/icons/duotune/general/gen004.svg'
                              className='svg-icon-3'
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
          <div className='tab-pane fade' id='kt_tab_pane_9' role='tabpanel'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-1'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold'>
                    <th className='min-w-50px'>No</th>
                    <th className='min-w-140px'>Task No</th>
                    <th className='min-w-120px'>Task Description</th>
                    <th className='min-w-120px'>Created Date</th>
                    <th className='min-w-120px'>Priority</th>
                    <th className='min-w-120px'>Plan Complete</th>
                    <th className='min-w-100px'>Status</th>
                    <th className='min-w-50px text-end'>Actions</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody className='text-gray-600'>
                  {taskRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <span className='min-w-125px'>{row.id}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.task_no}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.task_description}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.created_date}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.priority}</span>
                      </td>
                      <td>
                        <span className='min-w-125px'>{row.plan_complete}</span>
                      </td>
                      <td>
                        <span
                          className={
                            row.status === 'Cancelled'
                              ? 'badge badge-light-danger fs-7 fw-semibold'
                              : row.status === 'Pending'
                              ? 'badge badge-light-warning fs-7 fw-semibold'
                              : 'badge badge-light-info fs-7 fw-semibold'
                          }
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className='text-end'>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <button className='btn btn-sm btn-link btn-color-gray-500 btn-active-color-primary me-1'>
                            <KTSVG
                              path='/media/icons/duotune/general/gen004.svg'
                              className='svg-icon-3'
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
        </div>
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TablesWidget10}
