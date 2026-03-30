import { FC, useState} from 'react'

type Props = {
  className?: string
  chartColor?: string
  chartHeight?: string
}

const MixedWidget11: FC<Props> = ({className}) => {
  const [attendanceRows] = useState([
    { id: 1, profile: '6', status: 'Sick', abbreviation: 'S', date: '27 Jan' },
    { id: 2, profile: '5', status: 'Absent', abbreviation: 'X', date: '22 Sep' },
    { id: 3, profile: '11', status: 'Sick', abbreviation: 'S', date: '01 Nov' },
    { id: 4, profile: '9', status: 'Excused Absent', abbreviation: 'C', date: '10 Dec' },
    { id: 5, profile: '23', status: 'Emergency Leave Without', abbreviation: 'E', date: '27 Jan' },
    { id: 6, profile: '7', status: 'Sick', abbreviation: 'S', date: '27 Jan' },
    { id: 7, profile: '8', status: 'Sick', abbreviation: 'S', date: '5 Mar' },
  ]);

  const [reminderRows] = useState([
    { id: 1, tag: 'danger', description: 'PM Light Vehicle Cruise 01-001', due_days: 2, is_overdue: true, weeks: true },
    { id: 2, tag: 'warning', description: 'PM Shovel Model AAA - Ex-001', due_days: 1, is_overdue: true, weeks: true },
    { id: 3, tag: 'success', description: 'Light Vehicle Cruise 01-001', due_days: 2, is_overdue: false, weeks: false },
    { id: 4, tag: 'success', description: 'Michael Scott Annual Leave', due_days: 2, is_overdue: false, weeks: true },
    { id: 5, tag: 'danger', description: 'James Halpert Annual Leave', due_days: 2, is_overdue: false, weeks: true },
    { id: 6, tag: 'danger', description: 'Pamela Beesly Annual Leave', due_days: 2, is_overdue: false, weeks: true },
  ]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className={`card-header border-0 py-5`}>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-dark'>Quick Links</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <ul className="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0">
            <li className="nav-item">
              <a
                className="nav-link text-dark active"
                data-bs-toggle="tab"
                href="#kt_tab_pane_roster"
              >
                ROSTER
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-dark"
                data-bs-toggle="tab"
                href="#kt_tab_pane_attendance"
              >
                ATTENDANCE
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-dark"
                data-bs-toggle="tab"
                href="#kt_tab_pane_reminder"
              >
                REMINDER
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-2 card-scroll h-400px'>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="kt_tab_pane_roster"
            role="tabpanel"
          >
            <ul className="nav nav-stretch nav-pills nav-pills-custom nav-pills-active-custom d-flex justify-content-between mb-8">
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_1">
                  <span className="fs-7 fw-semibold">Fr</span>
                  <span className="fs-6 fw-bold">20</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_2">
                  <span className="fs-7 fw-semibold">Sa</span>
                  <span className="fs-6 fw-bold">21</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_3">
                  <span className="fs-7 fw-semibold">Su</span>
                  <span className="fs-6 fw-bold">22</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger active" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_4">
                  <span className="fs-7 fw-semibold">Tu</span>
                  <span className="fs-6 fw-bold">23</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_5">
                  <span className="fs-7 fw-semibold">Tu</span>
                  <span className="fs-6 fw-bold">24</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_6">
                  <span className="fs-7 fw-semibold">We</span>
                  <span className="fs-6 fw-bold">25</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_7">
                  <span className="fs-7 fw-semibold">Th</span>
                  <span className="fs-6 fw-bold">26</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_8">
                  <span className="fs-7 fw-semibold">Fri</span>
                  <span className="fs-6 fw-bold">27</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_9">
                  <span className="fs-7 fw-semibold">Sa</span>
                  <span className="fs-6 fw-bold">28</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_10">
                  <span className="fs-7 fw-semibold">Su</span>
                  <span className="fs-6 fw-bold">29</span>
                </a>
              </li>
              <li className="nav-item p-0 ms-0">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" data-bs-toggle="tab" href="#kt_timeline_widget_3_tab_content_11">
                  <span className="fs-7 fw-semibold">Mo</span>
                  <span className="fs-6 fw-bold">30</span>
                </a>
              </li>
            </ul>
            <div className="tab-content mb-2">
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_1">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-warning"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Dashboard UI/UX Design Review
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_2">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-warning"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_3">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-primary"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-warning"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade show active" id="kt_timeline_widget_3_tab_content_4">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-warning"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Dashboard UI/UX Design Review
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_5">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Dashboard UI/UX Design Review
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-warning"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_6">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-primary"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-warning"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Dashboard UI/UX Design Review
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_7">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-warning"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Dashboard UI/UX Design Review
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_8">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Dashboard UI/UX Design Review
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_9">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-primary"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Dashboard UI/UX Design Review
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_10">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-warning"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Dashboard UI/UX Design Review
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="tab-pane fade" id="kt_timeline_widget_3_tab_content_11">
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      11:45 - 13:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ron Swanson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      08:25 - 09:10
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Ross Geller
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      16:30 - 17:00
                      <span className="text-gray-400 fw-semibold fs-7">PM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Dashboard UI/UX Design Review
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Mark Morris
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-danger"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      10:20 - 11:00
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      Marketing Campaign Discussion
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Peter Marcus
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
                <div className="d-flex align-items-center mb-6">
                  <span
                    data-kt-element="bullet"
                    className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-primary"
                  ></span>
                  <div className="flex-grow-1 me-5">
                    <div className="text-gray-800 fw-semibold fs-2">
                      12:00 - 13:40
                      <span className="text-gray-400 fw-semibold fs-7">AM</span>
                    </div>
                    <div className="text-gray-700 fw-semibold fs-6">
                      9 Degree Project Estimation Meeting
                    </div>
                    <div className="text-gray-400 fw-semibold fs-7">
                      Lead by
                      <span className="text-primary opacity-75-hover fw-semibold">
                        Bob Pattinson
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_create_project"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="kt_tab_pane_attendance"
            role="tabpanel"
          >
            {attendanceRows.map(row => (
              <div key={row.id} className='d-flex align-items-center mb-7'>
                <span className='badge badge-light-info fs-8 fw-bold me-5'>{row.date}</span>
                {/* begin::Text */}
                <div className='flex-grow-1'>
                  <span className='text-dark fw-bold text-hover-primary fs-6'>
                    {row.status}
                  </span>
                </div>
                {/* end::Text */}
                {/* begin::Avatar */}
                <div className='symbol symbol-50px'>
                  <span className='fs-1 fw-semibold'>{row.abbreviation}</span>
                </div>
                {/* end::Avatar */}
              </div>
            ))}
          </div>
          <div
            className="tab-pane fade"
            id="kt_tab_pane_reminder"
            role="tabpanel"
          >
            {reminderRows.map(row => (
              <div key={row.id} className='d-flex align-items-sm-center mb-7'>
                {/* begin::Bullet */}
                <span className={`bullet bullet-vertical h-40px bg-${row.tag}`}></span>
                {/* end::Bullet */}
                {/* begin::Checkbox */}
                <div className='form-check form-check-custom form-check-solid mx-5'>
                  <input className='form-check-input' type='checkbox' value='' />
                </div>
                {/* end::Checkbox */}
                {/* begin::Section */}
                <div className='d-flex align-items-center flex-row-fluid flex-wrap'>
                  <div className='flex-grow-1 me-2'>
                    <span className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                      {row.description}
                    </span>
                    <span className='text-muted fw-semibold d-block fs-7'>{row.is_overdue ? 'Overdue' : 'Due'} in {row.due_days} {row.weeks ? 'week' : 'day'}{row.due_days > 1 && 's'}</span>
                  </div>
                  <button className='btn btn-link btn-color-primary btn-active-color-primary fs-7 fw-bold my-2'>View</button>
                </div>
                {/* end::Section */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export {MixedWidget11}