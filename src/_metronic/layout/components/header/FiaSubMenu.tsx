import {FC, ReactNode } from 'react'
import clsx from 'clsx'
import {Link, useLocation} from 'react-router-dom'
import {checkIsActive} from '../../../helpers'

interface MenuItem {
  to: string;
  title: string;
  icon?: ReactNode; // 👈 svg optional
}

interface Props {
  menuItems: MenuItem[];
}

const FiaSubMenu: FC<Props> = ({ menuItems }) => {
  const { pathname } = useLocation();

  return (
    <div className='row' data-kt-menu-dismiss='true'>
      <div className='col-lg-12 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6'>

        <div className='d-grid w-100'
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(menuItems.length / 2)}, 1fr)`,
            gridTemplateRows: 'repeat(2, auto)',
            gap: '0.75rem',
          }}
        >
          {menuItems.map((item) => (
            <div key={item.to} className='w-100'>
              <div className='menu-item p-0 m-0'>
                <Link
                  to={item.to}
                  className={clsx('menu-link py-3', {
                    active: checkIsActive(pathname, item.to),
                  })}
                >
                  <span className='menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3'>
                    {item.icon ?? (
                      <span className='svg-icon svg-icon-primary svg-icon-1'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                          <rect x='2' y='2' width='9' height='9' rx='2' fill='currentColor' />
                          <rect opacity='0.3' x='13' y='2' width='9' height='9' rx='2' fill='currentColor' />
                          <rect opacity='0.3' x='13' y='13' width='9' height='9' rx='2' fill='currentColor' />
                          <rect opacity='0.3' x='2' y='13' width='9' height='9' rx='2' fill='currentColor' />
                        </svg>
                      </span>
                    )}
                  </span>

                  <span className='d-flex flex-column'>
                    <span className='fs-6 fw-bold text-gray-800'>{item.title}</span>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}


export { FiaSubMenu }