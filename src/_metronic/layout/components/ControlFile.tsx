import { FC } from 'react'
import { Link } from "react-router-dom"
import { KTSVG } from "../../helpers"
import { useAuth } from "../../../app/modules/auth"
import { PageLink, PageTitle } from "../core"

const ControlFile = () => {
  const {currentUser} = useAuth()

  return (
    <>
      <div className='accordion' id='kt_accordion_1'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='kt_accordion_1_header_1'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_1'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_1'
            >
              <KTSVG
                path='/media/icons/duotune/art/art002.svg'
                className='svg-icon svg-icon-2x me-3'
              />
              Master
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_1'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_header_1'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body bg-light'>
              <section className="row">
                <section className="col-md-2">
                  <Link
                    to='/control-file/master/company/view-company'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Company</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/department/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Department</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/location/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Location</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/cost-center/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Cost Center</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/currency/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Currency</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/priority/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Priority</h3>
                  </Link>
                </section>
              </section>
              <section className="row my-5">
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/acc/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Account</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/loc-work/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Location Work</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/loc-ops/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Operation Location</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/colour/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Colour</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/officer/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Officer</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/offcr-type/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Officer Type</h3>
                  </Link>
                </section>
              </section>
              <section className="row my-5">
                <section className="col-md-2">
                  <Link 
                    to='/control-file/master/contractor/view'
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Contractor</h3>
                  </Link>
                </section>
              </section>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='kt_accordion_1_header_2'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_2'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_2'
            >
              <KTSVG
                path='/media/icons/duotune/abstract/abs001.svg'
                className='svg-icon svg-icon-2x me-3'
              />
              Operations
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_2'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_header_2'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body bg-light'>
              <section className="row">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/asset-model/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Asset Model</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/asset-group/category' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Asset Group</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/meter-readingtype/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Reading Type</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/fuel-type/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Fuel Type</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/reading-fuel-stockcode/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Reading Stockcode</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/job-type/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Job Type</h3>
                  </Link>
                </section>
              </section>
              <section className="row mt-5">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/job-status/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Job Status</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/job-code/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Job Code</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/resource-type/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Resource Type</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/job-auxiliary/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Job Auxiliary</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/job-overhead/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Job Overhead</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/inspection-qna/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Inspection Q&A</h3>
                  </Link>
                </section>
              </section>
              <section className="row mt-5">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/job-major/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Major Job</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/job-minor/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Minor Job</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/shift-type/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Shift Type</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/shift/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Shift</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/breakdown-status/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Breakdown Status</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/breakdown-category/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Breakdown Category</h3>
                  </Link>
                </section>
              </section>
              <section className="row mt-5">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/responsible/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Responsible</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'ops_manager' || currentUser?.role === 'administrator' ? '/control-file/operations/timemap/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Timemap</h3>
                  </Link>
                </section>
              </section>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='kt_accordion_1_header_3'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_3'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_3'
            >
              <KTSVG
                path='/media/icons/duotune/coding/cod002.svg'
                className='svg-icon svg-icon-2x me-3'
              />
              Resource
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_3'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_header_3'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body bg-light'>
              <section className="row">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/employee-type/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Employee Type</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/employee-class/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Employee Class</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/employment-type/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Employment Type</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/employment-status/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Employment Status</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/marital-benefit/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Marital Benefit</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/leave-type/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Leave Type</h3>
                  </Link>
                </section>
              </section>
              
              <section className="row mt-5">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/work-day/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Work Day</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/work-group/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Work Group</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/work-function/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Work Function</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/level/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Level</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/grade/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Grade</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/post-title/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Post Title</h3>
                  </Link>
                </section>
              </section>
              
              <section className="row mt-5">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/education/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Education</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/field-study/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Field Study</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/year-exp/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Year Experience</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/age/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Age</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'hr_manager' || currentUser?.role === 'administrator' ? '/control-file/resource/english/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">English</h3>
                  </Link>
                </section>
              </section>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='kt_accordion_1_header_4'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_4'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_4'
            >
              <KTSVG
                path='/media/icons/duotune/abstract/abs032.svg'
                className='svg-icon svg-icon-2x me-3'
              />
              Supply
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_4'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_header_4'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body bg-light'>
              <section className="row">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/stockcode/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Stockcode</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/supplier-stockcode/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Supplier Stockcode</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/stock-reg/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Stockcode Register</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/stock-group/stock-category' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Stock Group</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/storage/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Storage</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/supplier/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Supplier</h3>
                  </Link>
                </section>
              </section>
              <section className="row mt-5">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/customer/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Customer</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/unit-of-materials/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Unit of Materials</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/freight/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Freight</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/bin-location/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Bin Location</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/cstmr-price/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Customer Price</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/manufacture/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Manufacture</h3>
                  </Link>
                </section>
              </section>
              <section className="row mt-5">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/stock-class/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Stock Class</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'scm_manager' || currentUser?.role === 'administrator' ? '/control-file/supply/beginning-stock/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Beginning Stock</h3>
                  </Link>
                </section>
              </section>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='kt_accordion_1_header_5'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_5'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_5'
            >
              <KTSVG
                path='/media/icons/duotune/medicine/med005.svg'
                className='svg-icon svg-icon-2x me-3'
              />
              Finance
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_5'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_header_5'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body bg-light'>
              <section className="row">
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'fin_manager' || currentUser?.role === 'administrator' ? '/control-file/finance/account-code' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Account Code</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'fin_manager' || currentUser?.role === 'administrator' ? '/control-file/finance/beginning-balance' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Beginning Balance</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'fin_manager' || currentUser?.role === 'administrator' ? '/control-file/finance/payment-type' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Payment Type</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'fin_manager' || currentUser?.role === 'administrator' ? '/control-file/finance/mstr-bank' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Master Bank</h3>
                  </Link>
                </section>
                <section className="col-md-2">
                  <Link 
                    to={currentUser?.role === 'fin_manager' || currentUser?.role === 'administrator' ? '/control-file/finance/tax-percentage/view' : '/error/404'}
                    className="card btn btn-active-secondary p-6"
                  >
                    <h3 className="card-title fs-6">Tax Percentage</h3>
                  </Link>
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const breadcrumbs: Array<PageLink> = [
  { 
    title: 'Controls', 
    path: '/controls/control-file', 
    isSeparator: false, isActive: false
  },
  { 
    title: '', 
    path: '', 
    isSeparator: true, 
    isActive: false 
  },
]

const ControlFilePage: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Control File</PageTitle>
      <ControlFile />
    </>
  )
}

export default ControlFilePage