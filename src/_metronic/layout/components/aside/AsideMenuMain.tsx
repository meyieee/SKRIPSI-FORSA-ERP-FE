import {AsideMenuItem} from './AsideMenuItem'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {useCanAccessRoute, useControlsAccess} from '../../../../app/custom-hooks'

export function AsideMenuMain() {
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
      {canAccessHome && (
        <AsideMenuItemWithSub
          to='/home'
          title='Home'
          fontIcon='bi-archive'
          icon='/media/icons/duotune/general/gen022.svg'
          showSubmenu={true}
        >
          {canAccessOverview && <AsideMenuItem to='/home/overview' title='Overview' hasBullet={true} />}
          {canAccessCompanyList && <AsideMenuItem to='/home/company_list' title='Company List' hasBullet={true} />}
          {canAccessCommandCenter && (
            <AsideMenuItem to='/home/command_center' title='Command Center' hasBullet={true} />
          )}
          {canAccessOnlineService && (
            <AsideMenuItem to='/home/online_service' title='Online Service' hasBullet={true} />
          )}
          {canAccessPolicy && (
            <AsideMenuItem to='/home/policy&procedures' title='Policy & Procedures' hasBullet={true} />
          )}
        </AsideMenuItemWithSub>
      )}

      {canAccessResource && (
        <AsideMenuItemWithSub
          to='/fia-resource'
          title='Resource'
          fontIcon='bi-archive'
          icon='/media/icons/duotune/general/gen022.svg'
          showSubmenu={true}
        >
          {canAccessMyFeeds && (
            <AsideMenuItem to='/fia-resource/my_online_feeds' title='My Online Feeds' hasBullet={true} />
          )}
          {canAccessPersonalInfo && (
            <AsideMenuItem to='/fia-resource/personal_info' title='Personal Info' hasBullet={true} />
          )}
          {canAccessWorkforce && (
            <AsideMenuItem to='/fia-resource/workforce_tracking' title='Workforce Tracking' hasBullet={true} />
          )}
          {canAccessResStats && (
            <AsideMenuItem to='/fia-resource/statistic_management' title='Statistic Management' hasBullet={true} />
          )}
          {canAccessResKPI && (
            <AsideMenuItem to='/fia-resource/analitycal&KPIs' title={`Analytical & KPI's`} hasBullet={true} />
          )}
        </AsideMenuItemWithSub>
      )}

      {canAccessControls && (
        <AsideMenuItemWithSub
          to='/controls'
          title='Controls'
          fontIcon='bi-archive'
          icon='/media/icons/duotune/communication/com006.svg'
          showSubmenu={true}
        >
          {showAccountSettings && (
            <AsideMenuItem to='/controls/account-settings' title='Account Settings' hasBullet={true} />
          )}
          {showAddEmployee && (
            <AsideMenuItem to='/controls/employee-management' title='Employee Management' hasBullet={true} />
          )}
          {showChangePassword && (
            <AsideMenuItem to='/controls/change-password' title='Change Password' hasBullet={true} />
          )}
        </AsideMenuItemWithSub>
      )}
    </>
  )
}
