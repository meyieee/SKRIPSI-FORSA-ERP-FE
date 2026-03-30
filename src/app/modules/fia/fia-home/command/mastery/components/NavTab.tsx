import {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {KTCard, KTCardBody} from '../../../../../../../_metronic'

type Props = {
  className?: string
}

/* Routing Navigasi  */
const NavTabWorkforceTracking: FC<Props> = ({className}) => {
  return (
    <KTCard className={`mb-5 ${className || ''}`}>
      <KTCardBody className='p-0'>
        <ul className='nav nav-custom nav-line-tabs nav-line-tabs-2x nav-stretch fs-5 border-0 px-3'>
        <li className='nav-item'>
          <NavLink
            to='asset'
            className={({isActive}) =>
              isActive ? 'nav-link active text-primary fw-bold' : 'nav-link text-muted text-dark'
            }
          >
            Asset Mastery
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            to='workforce'
            className={({isActive}) =>
              isActive ? 'nav-link active text-primary fw-bold' : 'nav-link text-muted text-dark'
            }
          >
            Workforce Mastery
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            to='stock'
            className={({isActive}) =>
              isActive ? 'nav-link active text-primary fw-bold' : 'nav-link text-muted text-dark'
            }
          >
            Stock Mastery
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            to='company-mastery'
            className={({isActive}) =>
              isActive ? 'nav-link active text-primary fw-bold' : 'nav-link text-muted text-dark'
            }
          >
            Company Mastery
          </NavLink>
        </li>
        </ul>
      </KTCardBody>
    </KTCard>
  )
}

export {NavTabWorkforceTracking}
