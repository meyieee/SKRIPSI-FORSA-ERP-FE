import {FC, useContext} from 'react'
import clsx from 'clsx'
import {Link, useLocation} from 'react-router-dom'
import {checkIsActive} from '../../../helpers'
import CompanySizeContext from './CompanySizeContext'

const MegaMenu: FC = () => {
  const {pathname} = useLocation()
  const {companySize} = useContext(CompanySizeContext)

  return (
    <div className='row' data-kt-menu-dismiss='true'>
      <div className='col-lg-12 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6'>
        <div className='row'>
          <div className='col-lg-6 mb-3'>
            <div className='menu-item p-0 m-0'>
              <Link
                to={'/dashboard/overview'}
                className={clsx('menu-link py-3', {
                  active: checkIsActive(pathname, '/dashboard/overview'),
                })}
              >
                <span className='menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3'>
                  <span className='svg-icon svg-icon-primary svg-icon-1'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect x='2' y='2' width='9' height='9' rx='2' fill='currentColor' />
                      <rect
                        opacity='0.3'
                        x='13'
                        y='2'
                        width='9'
                        height='9'
                        rx='2'
                        fill='currentColor'
                      />
                      <rect
                        opacity='0.3'
                        x='13'
                        y='13'
                        width='9'
                        height='9'
                        rx='2'
                        fill='currentColor'
                      />
                      <rect
                        opacity='0.3'
                        x='2'
                        y='13'
                        width='9'
                        height='9'
                        rx='2'
                        fill='currentColor'
                      />
                    </svg>
                  </span>
                </span>
                <span className='d-flex flex-column'>
                  <span className='fs-6 fw-bold text-gray-800'>Overview</span>
                </span>
              </Link>
            </div>
          </div>
          {companySize === 'big' && (
            <div className='col-lg-6 mb-3'>
              <div className='menu-item p-0 m-0'>
                <Link
                  to={'/dashboard/online-services'}
                  className={clsx('menu-link py-3', {
                    active: checkIsActive(pathname, '/dashboard/online-services'),
                  })}
                >
                  <span className='menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3'>
                    <span className='svg-icon svg-icon-danger svg-icon-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z'
                          fill='currentColor'
                        />
                        <path
                          opacity='0.3'
                          d='M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z'
                          fill='currentColor'
                        />
                        <path
                          opacity='0.3'
                          d='M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  </span>
                  <span className='d-flex flex-column'>
                    <span className='fs-6 fw-bold text-gray-800'>Online Services</span>
                  </span>
                </Link>
              </div>
            </div>
          )}
          <div className='col-lg-6 mb-3'>
            <div className='menu-item p-0 m-0'>
              <Link
                to={'/dashboard/company-profile'}
                className={clsx('menu-link py-3', {
                  active: checkIsActive(pathname, '/dashboard/company-profile'),
                })}
              >
                <span className='menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3'>
                  <span className='svg-icon svg-icon-info svg-icon-1'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M2 11.7127L10 14.1127L22 11.7127L14 9.31274L2 11.7127Z'
                        fill='currentColor'
                      />
                      <path
                        opacity='0.3'
                        d='M20.9 7.91274L2 11.7127V6.81275C2 6.11275 2.50001 5.61274 3.10001 5.51274L20.6 2.01274C21.3 1.91274 22 2.41273 22 3.11273V6.61273C22 7.21273 21.5 7.81274 20.9 7.91274ZM22 16.6127V11.7127L3.10001 15.5127C2.50001 15.6127 2 16.2127 2 16.8127V20.3127C2 21.0127 2.69999 21.6128 3.39999 21.4128L20.9 17.9128C21.5 17.8128 22 17.2127 22 16.6127Z'
                        fill='currentColor'
                      />
                    </svg>
                  </span>
                </span>
                <span className='d-flex flex-column'>
                  <span className='fs-6 fw-bold text-gray-800'>Company Profile</span>
                </span>
              </Link>
            </div>
          </div>
          {(companySize === 'big' || companySize === 'medium') && (
            <div className='col-lg-6 mb-3'>
              <div className='menu-item p-0 m-0'>
                <Link
                  to={'/dashboard/organization-chart'}
                  className={clsx('menu-link py-3', {
                    active: checkIsActive(pathname, '/dashboard/organization-chart'),
                  })}
                >
                  <span className='menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3'>
                    <span className='svg-icon svg-icon-dark svg-icon-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          opacity='0.3'
                          d='M14 3V21H10V3C10 2.4 10.4 2 11 2H13C13.6 2 14 2.4 14 3ZM7 14H5C4.4 14 4 14.4 4 15V21H8V15C8 14.4 7.6 14 7 14Z'
                          fill='currentColor'
                        />
                        <path
                          d='M21 20H20V8C20 7.4 19.6 7 19 7H17C16.4 7 16 7.4 16 8V20H3C2.4 20 2 20.4 2 21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21C22 20.4 21.6 20 21 20Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  </span>
                  <span className='d-flex flex-column'>
                    <span className='fs-6 fw-bold text-gray-800'>Organization Chart</span>
                  </span>
                </Link>
              </div>
            </div>
          )}
          {companySize === 'big' && (
            <div className='col-lg-6 mb-3'>
              <div className='menu-item p-0 m-0'>
                <Link
                  to={'/dashboard/policy-procedures'}
                  className={clsx('menu-link py-3', {
                    active: checkIsActive(pathname, '/dashboard/policy-procedures'),
                  })}
                >
                  <span className='menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3'>
                    <span className='svg-icon svg-icon-warning svg-icon-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z'
                          fill='currentColor'
                        />
                        <path
                          opacity='0.3'
                          d='M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  </span>
                  <span className='d-flex flex-column'>
                    <span className='fs-6 fw-bold text-gray-800'>Policy & Procedures</span>
                  </span>
                </Link>
              </div>
            </div>
          )}
          {companySize === 'big' && (
            <div className='col-lg-6 mb-3'>
              <div className='menu-item p-0 m-0'>
                <Link
                  to={'/dashboard/branding-marketing'}
                  className={clsx('menu-link py-3', {
                    active: checkIsActive(pathname, '/dashboard/branding-marketing'),
                  })}
                >
                  <span className='menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3'>
                    <span className='svg-icon svg-icon-danger svg-icon-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          opacity='0.3'
                          d='M22 8H8L12 4H19C19.6 4 20.2 4.39999 20.5 4.89999L22 8ZM3.5 19.1C3.8 19.7 4.4 20 5 20H12L16 16H2L3.5 19.1ZM19.1 20.5C19.7 20.2 20 19.6 20 19V12L16 8V22L19.1 20.5ZM4.9 3.5C4.3 3.8 4 4.4 4 5V12L8 16V2L4.9 3.5Z'
                          fill='currentColor'
                        />
                        <path
                          d='M22 8L20 12L16 8H22ZM8 16L4 12L2 16H8ZM16 16L12 20L16 22V16ZM8 8L12 4L8 2V8Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  </span>
                  <span className='d-flex flex-column'>
                    <span className='fs-6 fw-bold text-gray-800'>Branding & Marketing</span>
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export {MegaMenu}
