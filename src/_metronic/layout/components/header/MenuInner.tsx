import {ReactNode} from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {
  FiaHomeCompanyList,
  FiaHomeCommandCenter,
  FiaHomeOnlineService,
  FiaHomeOverview,
  FiaHomePolicyProcedures,
  FiaResAnalyticalKPIs,
  FiaResMyOnlineFeeds,
  FiaResPersonalInfo,
  FiaResStatisticalManagement,
  FiaResWorkforceTracking,
} from './FiaIcons'
import {FiaSubMenu} from './FiaSubMenu'
import {useCanAccessRoute, useControlsAccess} from '../../../../app/custom-hooks'

interface FiaMenuItem {
  to: string
  title: string
  icon?: ReactNode
}

export function MenuInner() {
  const {
    showSection: canAccessControls,
    showAccountSettings,
    showAddEmployee,
    showChangePassword,
  } = useControlsAccess()

  const canAccessOverview = useCanAccessRoute('/home/overview')
  const canAccessCompanyList = useCanAccessRoute('/home/company_list')
  const canAccessCommandCenter = useCanAccessRoute('/home/command_center')
  const canAccessOnlineService = useCanAccessRoute('/home/online_service')
  const canAccessPolicy = useCanAccessRoute('/home/policy&procedures')
  const canAccessHome =
    canAccessOverview ||
    canAccessCompanyList ||
    canAccessCommandCenter ||
    canAccessOnlineService ||
    canAccessPolicy

  const canAccessMyFeeds = useCanAccessRoute('/fia-resource/my_online_feeds')
  const canAccessPersonalInfo = useCanAccessRoute('/fia-resource/personal_info')
  const canAccessWorkforce = useCanAccessRoute('/fia-resource/workforce_tracking')
  const canAccessResStats = useCanAccessRoute('/fia-resource/statistic_management')
  const canAccessResKPI = useCanAccessRoute('/fia-resource/analitycal&KPIs')
  const canAccessResource =
    canAccessMyFeeds || canAccessPersonalInfo || canAccessWorkforce || canAccessResStats || canAccessResKPI

  return (
    <>
      {canAccessHome &&
        (() => {
          const homeMenuItems: FiaMenuItem[] = []
          if (canAccessOverview) homeMenuItems.push({to: '/home/overview', title: 'Overview', icon: <FiaHomeOverview />})
          if (canAccessCompanyList)
            homeMenuItems.push({to: '/home/company_list', title: 'Company List', icon: <FiaHomeCompanyList />})
          if (canAccessCommandCenter)
            homeMenuItems.push({
              to: '/home/command_center',
              title: 'Command Center',
              icon: <FiaHomeCommandCenter />,
            })
          if (canAccessOnlineService)
            homeMenuItems.push({to: '/home/online_service', title: 'Online Service', icon: <FiaHomeOnlineService />})
          if (canAccessPolicy)
            homeMenuItems.push({
              to: '/home/policy&procedures',
              title: 'Policy & Procedures',
              icon: <FiaHomePolicyProcedures />,
            })

          return (
            <MenuInnerWithSub
              isMega={true}
              title='Home'
              to='/home'
              menuPlacement='bottom-start'
              menuTrigger={`{default:'click', lg: 'hover'}`}
            >
              <FiaSubMenu menuItems={homeMenuItems} />
            </MenuInnerWithSub>
          )
        })()}

      {canAccessResource &&
        (() => {
          const resourceMenuItems: FiaMenuItem[] = []
          if (canAccessMyFeeds)
            resourceMenuItems.push({
              to: '/fia-resource/my_online_feeds',
              title: 'My Online Feeds',
              icon: <FiaResMyOnlineFeeds />,
            })
          if (canAccessPersonalInfo)
            resourceMenuItems.push({
              to: '/fia-resource/personal_info',
              title: 'Personal Info',
              icon: <FiaResPersonalInfo />,
            })
          if (canAccessWorkforce)
            resourceMenuItems.push({
              to: '/fia-resource/workforce_tracking',
              title: 'Workforce Tracking',
              icon: <FiaResWorkforceTracking />,
            })
          if (canAccessResStats)
            resourceMenuItems.push({
              to: '/fia-resource/statistic_management',
              title: 'Statistic Management',
              icon: <FiaResStatisticalManagement />,
            })
          if (canAccessResKPI)
            resourceMenuItems.push({
              to: '/fia-resource/analitycal&KPIs',
              title: "Analytical & KPI's",
              icon: <FiaResAnalyticalKPIs />,
            })

          return (
            <MenuInnerWithSub
              isMega={true}
              title='Resource'
              to='/fia-resource'
              menuPlacement='bottom-start'
              menuTrigger={`{default:'click', lg: 'hover'}`}
            >
              <FiaSubMenu menuItems={resourceMenuItems} />
            </MenuInnerWithSub>
          )
        })()}

      {canAccessControls && (
        <MenuInnerWithSub
          title='Controls'
          to='/controls'
          menuPlacement='bottom-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          {showAccountSettings && (
            <MenuItem to='/controls/account-settings' title='Account Settings' icon='/media/icons/duotune/communication/com006.svg' />
          )}
          {showAddEmployee && (
            <MenuItem to='/controls/employee-register/add' title='Add Employee' icon='/media/icons/duotune/communication/com006.svg' />
          )}
          {showChangePassword && (
            <MenuItem to='/controls/change-password' title='Change Password' icon='/media/icons/duotune/communication/com006.svg' />
          )}
        </MenuInnerWithSub>
      )}
    </>
  )
}
