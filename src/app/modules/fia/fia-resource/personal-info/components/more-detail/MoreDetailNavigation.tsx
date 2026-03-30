import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'

interface MoreDetailNavigationProps {
  className?: string
}

const MoreDetailNavigation: React.FC<MoreDetailNavigationProps> = ({className}) => {
  const location = useLocation()

  // Helper function to check if MoreDetail tab should be active
  const isMoreDetailTabActive = (basePath: string) => {
    return location.pathname.includes(basePath)
  }

  return (
    <div className={`d-flex align-items-center ${className || ''}`}>
      <span className='me-2'>:</span>
      <ul className='nav nav-tabs nav-line-tabs nav-stretch fs-5 border-0'>
        <li className='nav-item me-3'>
          <NavLink
            to='/fia-resource/personal_info/career_development/career'
            className={
              isMoreDetailTabActive('/career_development')
                ? 'nav-link active text-primary fw-bold'
                : 'nav-link text-muted'
            }
          >
            CAREER & DEVELOPMENT
          </NavLink>
        </li>
        <li className='nav-item me-3'>
          <NavLink
            to='/fia-resource/personal_info/violation_discipline/discipline'
            className={
              isMoreDetailTabActive('/violation_discipline')
                ? 'nav-link active text-primary fw-bold'
                : 'nav-link text-muted'
            }
          >
            VIOLATION & DISCIPLINE
          </NavLink>
        </li>
        <li className='nav-item me-3'>
          <NavLink
            to='/fia-resource/personal_info/compensation_benefit/leave_travel'
            className={
              isMoreDetailTabActive('/compensation_benefit')
                ? 'nav-link active text-primary fw-bold'
                : 'nav-link text-muted'
            }
          >
            COMPENSATION & BENEFIT
          </NavLink>
        </li>
        <li className='nav-item me-3'>
          <NavLink
            to='/fia-resource/personal_info/documents/efiling'
            className={
              isMoreDetailTabActive('/documents')
                ? 'nav-link active text-primary fw-bold'
                : 'nav-link text-muted'
            }
          >
            DOCUMENTS
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export {MoreDetailNavigation}
