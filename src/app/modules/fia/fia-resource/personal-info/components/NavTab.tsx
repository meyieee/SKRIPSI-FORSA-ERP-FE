import {FC} from 'react'
import {NavLink, useLocation} from 'react-router-dom'

interface NavigasiMainTabProps {
  className?: string
  forceDefaultTabs?: boolean
}

export const NavigasiMainTab: FC<NavigasiMainTabProps> = ({
  className = '',
  forceDefaultTabs = false,
}) => {
  const location = useLocation()

  const getMainTabConfig = () => {
    const pathname = location.pathname

    if (forceDefaultTabs) {
      return {
        basePath: '/fia-resource/personal_info',
        tabs: [
          {path: 'personal_data', label: 'Personal Data'},
          {path: 'job_info', label: 'Job Info'},
          {path: 'job_service', label: 'Job Service'},
          {path: 'dependent', label: 'Dependent'},
          {path: 'kin', label: 'KIN'},
        ],
      }
    }

    if (pathname.includes('/career_development')) {
      return {
        basePath: '/fia-resource/personal_info/career_development',
        tabs: [
          {path: 'career', label: 'Career'},
          {path: 'training', label: 'Training'},
          {path: 'education', label: 'Education'},
          {path: 'language_hobby', label: 'Language & Hobby'},
          {path: 'appraisal', label: 'Appraisal'},
        ],
      }
    } else if (pathname.includes('/violation_discipline')) {
      return {
        basePath: '/fia-resource/personal_info/violation_discipline',
        tabs: [
          {path: 'discipline', label: 'Discipline'},
          {path: 'warning', label: 'Warning'},
        ],
      }
    } else if (pathname.includes('/compensation_benefit')) {
      return {
        basePath: '/fia-resource/personal_info/compensation_benefit',
        tabs: [
          {path: 'leave_travel', label: 'Leave & Travel'},
          {path: 'expense_claim', label: 'Expense Claim'},
          {path: 'earnings', label: 'Earnings'},
          {path: 'medical', label: 'Medical'},
          {path: 'loan', label: 'Loan'},
          {path: 'asset', label: 'Asset'},
          {path: 'ppe', label: 'PPE'},
        ],
      }
    } else if (pathname.includes('/documents')) {
      return {
        basePath: '/fia-resource/personal_info/documents',
        tabs: [
          {path: 'efiling', label: 'E-Filing'},
          {path: 'employment_contract', label: 'Employment Contract'},
        ],
      }
    } else {
      return {
        basePath: '/fia-resource/personal_info',
        tabs: [
          {path: 'personal_data', label: 'Personal Data'},
          {path: 'job_info', label: 'Job Info'},
          {path: 'job_service', label: 'Job Service'},
          {path: 'dependent', label: 'Dependent'},
          {path: 'kin', label: 'KIN'},
        ],
      }
    }
  }

  const config = getMainTabConfig()

  return (
    <ul className={`nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 gap-2 ${className}`}>
      {config.tabs.map((tab) => {
        const fullPath = `${config.basePath}/${tab.path}`
        const isCurrentlyActive =
          location.pathname === fullPath || location.pathname.startsWith(`${fullPath}/`)

        return (
          <li key={tab.path} className='nav-item'>
            <NavLink
              to={fullPath}
              className={({isActive}) => {
                const active = isActive || isCurrentlyActive
                return `nav-link ${active ? 'active text-primary fw-bold' : 'text-muted'}`
              }}
            >
              {tab.label}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
