import clsx from 'clsx'
import {FC, useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { checkIsActive, toAbsoluteUrl } from '../../../helpers'
import CompanySizeContext from './CompanySizeContext'

const EssMegaMenu: FC = () =>
{
  const {pathname} = useLocation()
  const { companySize } = useContext(CompanySizeContext);

  return (
    <div className='row' data-kt-menu-dismiss='true'>
      <div className="col-lg-8 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6">
        <div className="row">
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div className="mb-6">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Personal Info</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/personal-info/personal-data'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/personal-info/personal-data'),
                  })}
                >
                  <span className="menu-title">Personal Data</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/personal-info/job-information'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/personal-info/job-information'),
                  })}
                >
                  <span className="menu-title">Job Information</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/personal-info/dependent'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/personal-info/dependent'),
                  })}
                >
                  <span className="menu-title">Dependent</span>
                </Link>
              </div>
              {companySize === 'big' &&
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/personal-info/job-facilities'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/personal-info/job-facilities'),
                  })}
                >
                  <span className="menu-title">Job Facilities</span>
                </Link>
              </div>}
            </div>
            <div className="mb-6">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Development Info</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/development/career-development'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/development/career-development'),
                  })}
                >
                  <span className="menu-title">Career & Development</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/development/training-admin'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/development/training-admin'),
                  })}
                >
                  <span className="menu-title">Training Admin</span>
                </Link>
              </div>
              {companySize === 'big' &&
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/development/performance-appraisal'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/development/performance-appraisal'),
                  })}
                >
                  <span className="menu-title">Performance Appraisal</span>
                </Link>
              </div>}
            </div>
            <div className="mb-0">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Leave & Travel</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/leave-travel/leave-details'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/leave-travel/leave-details'),
                  })}
                >
                  <span className="menu-title">Leave Details</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/leave-travel/leave-roster'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/leave-travel/leave-roster'),
                  })}
                >
                  <span className="menu-title">Leave Roster</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div className="mb-6">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Attendance & Discipline</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/attendance-discipline/fingerprint-time'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/attendance-discipline/fingerprint-time'),
                  })}
                >
                  <span className="menu-title">Fingerprint | Time</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/attendance-discipline/disciplinary-action'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/attendance-discipline/disciplinary-action'),
                  })}
                >
                  <span className="menu-title">Disciplinary Action</span>
                </Link>
              </div>
            </div>
            <div className="mb-0">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Compensation</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/compensation/expense-claim'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/compensation/expense-claim'),
                  })}
                >
                  <span className="menu-title">Expense Claim</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ess/compensation/earnings-payroll'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ess/compensation/earnings-payroll'),
                  })}
                >
                  <span className="menu-title">Earnings | Payroll</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <img src={toAbsoluteUrl('/media/stock/500x600/img-1.jpg')} className="rounded mw-100" alt="" />
      </div>
    </div>
  )
}

export {EssMegaMenu}