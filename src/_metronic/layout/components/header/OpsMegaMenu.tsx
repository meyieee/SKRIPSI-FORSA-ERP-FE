import clsx from 'clsx'
import {FC, useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { checkIsActive, toAbsoluteUrl } from '../../../helpers'
import CompanySizeContext from './CompanySizeContext'

const OpsMegaMenu: FC = () =>
{
  const {pathname} = useLocation()
  const { companySize } = useContext(CompanySizeContext);

  return (
    <div className='row' data-kt-menu-dismiss='true'>
      <div className="col-lg-8 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6">
        <div className="row">
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div className="mb-6">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Production</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/production/production-tracking'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/production/production-tracking'),
                  })}
                >
                  <span className="menu-title">Production Tracking</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/production/production-performance'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/production/production-performance'),
                  })}
                >
                  <span className="menu-title">Production Performance</span>
                </Link>
              </div>
            </div>
            <div className="mb-0">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Operation</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/operation/operation-performance'}
                  className={clsx
                    ('menu-link py-3', {
                      active: checkIsActive(pathname, '/ops/operation/operation-performance'),
                    })}
                >
                  <span className="menu-title">Operation Performance</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/operation/dispatch-breakdown'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/operation/dispatch-breakdown'),
                  })}
                >
                  <span className="menu-title">Dispatch | Breakdown</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/operation/maintenance-schedule'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/operation/maintenance-schedule'),
                  })}
                >
                  <span className="menu-title">Maintenance Schedule</span>
                </Link>
              </div>
              {companySize === 'big' &&
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/operation/maintenance-reliability'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/operation/maintenance-reliability'),
                  })}
                >
                  <span className="menu-title">Maintenance Reliability</span>
                </Link>
              </div>}
            </div>
          </div>
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div className="mb-6">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Workforce</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/workforce/workforce-performance'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/workforce/workforce-performance'),
                  })}
                >
                  <span className="menu-title">Workforce Performance</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/workforce/plan-schedule'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/workforce/plan-schedule'),
                  })}
                >
                  <span className="menu-title">Plan & Schedule</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/workforce/workforce-facilities'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/workforce/workforce-facilities'),
                  })}
                >
                  <span className="menu-title">Workforce Facilities</span>
                </Link>
              </div>
            </div>
            <div className="mb-0">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Inventory</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/inventory/inventory-availability'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/inventory/inventory-availability'),
                  })}
                >
                  <span className="menu-title">Inventory Availability</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/ops/inventory/inventory-forecast'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/ops/inventory/inventory-forecast'),
                  })}
                >
                  <span className="menu-title">Inventory Forecast</span>
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

export {OpsMegaMenu}
