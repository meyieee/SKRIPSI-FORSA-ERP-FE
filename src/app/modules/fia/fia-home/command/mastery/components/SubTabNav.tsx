import React from 'react'
import {NavLink} from 'react-router-dom'

type Props = {tabs: {path: string; label: string}[]}

export const SubTabNav: React.FC<Props> = ({tabs}) => {
  return (
    <div className='ms-4 mt-6'>
      <ul className='nav nav-tabs nav-line-tabs border-0'>
        {tabs.map((t) => (
          <li key={t.path} className='nav-item'>
            <NavLink
              to={t.path}
              end
              className={({isActive}) =>
                isActive
                  ? 'nav-link active text-primary fw-semibold'
                  : 'nav-link text-muted text-dark'
              }
            >
              {t.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
