import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import ControlsPage from '../coming-soon/routes/Controls'
import {useControlsAccess} from '../custom-hooks'
import FIAHomePage from '../modules/fia/fia-home/FiaHomePage'
import FIAResourcePage from '../modules/fia/fia-resource/FiaResourcePage'

const AccountPage = lazy(() => import('../modules/cf/cf-mas-account/AccountPage'))

const PrivateRoutes = () => {
  const {canAccessControlsRoutes, canAccessGlAccountRoutes} = useControlsAccess()

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='home/*' element={<FIAHomePage />} />
        <Route path='fia-resource/*' element={<FIAResourcePage />} />

        {canAccessControlsRoutes && <Route path='controls/*' element={<ControlsPage />} />}
        {canAccessGlAccountRoutes && (
          <Route
            path='control-file/master/acc/*'
            element={
              <SuspensedView>
                <AccountPage />
              </SuspensedView>
            }
          />
        )}

        <Route path='auth/*' element={<Navigate to='/home/overview' replace />} />
        <Route path='dashboard' element={<Navigate to='/home/overview' replace />} />
        <Route path='dashboard/*' element={<Navigate to='/home/overview' replace />} />

        <Route path='*' element={<Navigate to='/error/404' replace />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
