import clsx from 'clsx'
import React, {FC} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { checkIsActive, toAbsoluteUrl } from '../../../helpers'

const DssMegaMenu: FC = () =>
{
  const {pathname} = useLocation()

  return (
    <div className='row' data-kt-menu-dismiss='true'>
      <div className="col-lg-8 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6">
        <div className="row">
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div className="mb-6">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Manpower</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/manpower/manpower-summary'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/manpower/manpower-summary'),
                  })}
                >
                  <span className="menu-title">Manpower Summary</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/manpower/personnel-details'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/manpower/personnel-details'),
                  })}
                >
                  <span className="menu-title">Personnel Details</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/manpower/organization-chart-detail'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/manpower/organization-chart-detail'),
                  })}
                >
                  <span className="menu-title">Organization Chart Detail</span>
                </Link>
              </div>
            </div>
            <div className="mb-6">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Finance</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/finance/capital-expenditure'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/finance/capital-expenditure'),
                  })}
                >
                  <span className="menu-title">Capital Expenditure</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/finance/contract-admin'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/finance/contract-admin'),
                  })}
                >
                  <span className="menu-title">Contract Admin</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div className="mb-6">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Material</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/material/online-request'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/material/online-request'),
                  })}
                >
                  <span className="menu-title">Online Request</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/material/material-tracking'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/material/material-tracking'),
                  })}
                >
                  <span className="menu-title">Material Tracking</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/material/inventory-stock'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/material/inventory-stock'),
                  })}
                >
                  <span className="menu-title">Inventory Stock</span>
                </Link>
              </div>
            </div>
            <div className="mb-0">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Service</h4>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/service/transport-control'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/service/transport-control'),
                  })}
                >
                  <span className="menu-title">Transport Admin</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/service/visitor-control'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/service/visitor-control'),
                  })}
                >
                  <span className="menu-title">Visitor Control</span>
                </Link>
              </div>
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/dss/service/light-vehicle-portal'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/dss/service/light-vehicle-portal'),
                  })}
                >
                  <span className="menu-title">Light Vehicle Portal</span>
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

export {DssMegaMenu}