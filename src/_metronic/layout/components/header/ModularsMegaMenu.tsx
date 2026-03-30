import { FC, useContext } from 'react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { checkIsActive, toAbsoluteUrl } from '../../../helpers'
import CompanySizeContext from './CompanySizeContext'

const ModularsMegaMenu: FC = () =>
{
  const {pathname} = useLocation()
  const { companySize } = useContext(CompanySizeContext);

  return (
    <div className='row' data-kt-menu-dismiss='true'>
      <div className="col-lg-8 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6">
        <div className="row">
          {(companySize === 'medium' || companySize === 'big') &&
          <>
            <div className="col-lg-4 mb-6 mb-lg-0">
              <div className="mb-6">
                <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Prime</h4>
                <div className="menu-item p-0 m-0">
                  <Link
                    to={'/modulars/prime/operation-management'}
                    className={clsx
                      ('menu-link py-3', {
                      active: checkIsActive(pathname, '/modulars/prime/operation-management'),
                    })}
                  >
                    <span className="menu-title">Operation Management</span>
                  </Link>
                </div>
                {companySize === 'big' &&
                <div className="menu-item p-0 m-0">
                  <Link
                    to={'/modulars/prime/maintenance-management'}
                    className={clsx
                      ('menu-link py-3', {
                      active: checkIsActive(pathname, '/modulars/prime/maintenance-management'),
                    })}
                  >
                    <span className="menu-title">Maintenance Management</span>
                  </Link>
                </div>}
                <div className="menu-item p-0 m-0">
                  <Link
                    to={'/modulars/prime/workforce-management'}
                    className={clsx
                      ('menu-link py-3', {
                      active: checkIsActive(pathname, '/modulars/prime/workforce-management'),
                    })}
                  >
                    <span className="menu-title">Workforce Management</span>
                  </Link>
                </div>
                {companySize === 'big' &&
                <>
                  <div className="menu-item p-0 m-0">
                    <Link
                      to={'/modulars/prime/inventory-program'}
                      className={clsx
                        ('menu-link py-3', {
                        active: checkIsActive(pathname, '/modulars/prime/inventory-program'),
                      })}
                    >
                      <span className="menu-title">Inventory Program</span>
                    </Link>
                  </div>
                  <div className="menu-item p-0 m-0">
                    <Link
                      to={'/modulars/prime/cash-cost-control'}
                      className={clsx
                        ('menu-link py-3', {
                        active: checkIsActive(pathname, '/modulars/prime/cash-cost-control'),
                      })}
                    >
                      <span className="menu-title">Cash Cost Control</span>
                    </Link>
                  </div>
                  <div className="menu-item p-0 m-0">
                    <Link
                      to={'/modulars/prime/facilities-management'}
                      className={clsx
                        ('menu-link py-3', {
                        active: checkIsActive(pathname, '/modulars/prime/facilities-management'),
                      })}
                    >
                      <span className="menu-title">Facilities Management</span>
                    </Link>
                  </div>
                  <div className="menu-item p-0 m-0">
                    <Link
                      to={'/modulars/prime/production-system'}
                      className={clsx
                        ('menu-link py-3', {
                        active: checkIsActive(pathname, '/modulars/prime/production-system'),
                      })}
                    >
                      <span className="menu-title">Production System</span>
                    </Link>
                  </div>
                  <div className="menu-item p-0 m-0">
                    <Link
                      to={'/modulars/prime/manufacture-system'}
                      className={clsx
                        ('menu-link py-3', {
                        active: checkIsActive(pathname, '/modulars/prime/manufacture-system'),
                      })}
                    >
                      <span className="menu-title">Manufacture System</span>
                    </Link>
                  </div>
                </>}
              </div>
            </div>
            <div className="col-lg-4 mb-6 mb-lg-0">
              <div className="mb-6">
                <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Operation</h4>
                {companySize === 'big' &&
                <div className="menu-item p-0 m-0">
                  <Link
                    to={'/modulars/op/workshop-management'}
                    className={clsx
                      ('menu-link py-3', {
                      active: checkIsActive(pathname, '/modulars/op/workshop-management'),
                    })}
                  >
                    <span className="menu-title">Workshop Management</span>
                  </Link>
                </div>}
                <div className="menu-item p-0 m-0">
                  <Link
                    to={'/modulars/op/lv-management'}
                    className={clsx
                      ('menu-link py-3', {
                      active: checkIsActive(pathname, '/modulars/op/lv-management'),
                    })}
                  >
                    <span className="menu-title">LV Management</span>
                  </Link>
                </div>
                <div className="menu-item p-0 m-0">
                  <Link
                    to={'/modulars/op/component-program'}
                    className={clsx
                      ('menu-link py-3', {
                      active: checkIsActive(pathname, '/modulars/op/component-program'),
                    })}
                  >
                    <span className="menu-title">Component RPL Program</span>
                  </Link>
                </div>
                {companySize === 'big' &&
                <>
                  <div className="menu-item p-0 m-0">
                    <Link
                      to={'/modulars/op/consumable-control'}
                      className={clsx
                        ('menu-link py-3', {
                        active: checkIsActive(pathname, '/modulars/op/consumable-control'),
                      })}
                    >
                      <span className="menu-title">Consumable Control</span>
                    </Link>
                  </div>
                  <div className="menu-item p-0 m-0">
                    <Link
                      to={'/modulars/op/tire-management'}
                      className={clsx
                        ('menu-link py-3', {
                        active: checkIsActive(pathname, '/modulars/op/tire-management'),
                      })}
                    >
                      <span className="menu-title">Tire Management</span>
                    </Link>
                  </div>
                  <div className="menu-item p-0 m-0">
                    <Link
                      to={'/modulars/op/tooling-management'}
                      className={clsx
                        ('menu-link py-3', {
                        active: checkIsActive(pathname, '/modulars/op/tooling-management'),
                      })}
                    >
                      <span className="menu-title">Tooling Management</span>
                    </Link>
                  </div>
                </>}
              </div>
            </div>
          </>}
          <div className="col-lg-4 mb-6 mb-lg-0">
            <div className="mb-6">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Department</h4>
              {companySize === 'big' && <div className="menu-item p-0 m-0">
                <Link
                  to={'/modulars/dept/sales-management/view'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/modulars/dept/sales-management/view'),
                  })}
                >
                  <span className="menu-title">Sales Management</span>
                </Link>
              </div>}
              {(companySize === 'medium' || companySize === 'big') &&
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/modulars/dept/contract-admin'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/modulars/dept/contract-admin'),
                  })}
                >
                  <span className="menu-title">Contract Admin</span>
                </Link>
              </div>}
              {companySize === 'big' && <div className="menu-item p-0 m-0">
                <Link
                  to={'/modulars/dept/cash-advance'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/modulars/dept/cash-advance'),
                  })}
                >
                  <span className="menu-title">Cash Advance</span>
                </Link>
              </div>}
              {(companySize === 'medium' || companySize === 'big') &&
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/modulars/dept/budgeting-cost'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/modulars/dept/budgeting-cost'),
                  })}
                >
                  <span className="menu-title">Budgeting & Cost</span>
                </Link>
              </div>}
            </div>
            {(companySize === 'medium' || companySize === 'big') && 
            <div className="mb-0">
              <h4 className="fs-6 fs-lg-4 fw-bold mb-3 ms-4">Service</h4>
              {companySize === 'big' &&
              <>
                <div className="menu-item p-0 m-0">
                  <Link
                    to={'/modulars/service/csr-management'}
                    className={clsx
                      ('menu-link py-3', {
                      active: checkIsActive(pathname, '/modulars/service/csr-management'),
                    })}
                  >
                    <span className="menu-title">CSR | SLD Management</span>
                  </Link>
                </div>
                <div className="menu-item p-0 m-0">
                  <Link
                    to={'/modulars/service/office-building-service'}
                    className={clsx
                      ('menu-link py-3', {
                      active: checkIsActive(pathname, '/modulars/service/office-building-service'),
                    })}
                  >
                    <span className="menu-title">Office & Building</span>
                  </Link>
                </div>
              </>}
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/modulars/service/visitor-management'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/modulars/service/visitor-management'),
                  })}
                >
                  <span className="menu-title">Visitor Management</span>
                </Link>
              </div>
              {companySize === 'big' &&
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/modulars/service/town-lodging'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/modulars/service/town-lodging'),
                  })}
                >
                  <span className="menu-title">Town | Lodging</span>
                </Link>
              </div>}
              <div className="menu-item p-0 m-0">
                <Link
                  to={'/modulars/service/transport-management'}
                  className={clsx
                    ('menu-link py-3', {
                    active: checkIsActive(pathname, '/modulars/service/transport-management'),
                  })}
                >
                  <span className="menu-title">Transport Management</span>
                </Link>
              </div>
            </div>}
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <img src={toAbsoluteUrl('/media/stock/500x600/img-1.jpg')} className="rounded mw-100" alt="" />
      </div>
    </div>
  )
}

export {ModularsMegaMenu}
