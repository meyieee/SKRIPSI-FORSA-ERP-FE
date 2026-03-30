import React from 'react'
import {NavLink} from 'react-router-dom'
import clsx from 'clsx'

interface TabItem {
  path: string
  label: string
}

interface SubTabNavProps {
  tabs: TabItem[]
}

export const SubTabNav: React.FC<SubTabNavProps> = ({tabs}) => {
  return (
    <div className='d-flex border-bottom mb-4'>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({isActive}) =>
            clsx(
              'px-4 py-3 fw-semibold ',
              isActive
                ? 'border-bottom border-3 border-primary text-primary'
                : 'text-muted hover:text-primary'
            )
          }
          end
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}
