import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {useAuth} from '../modules/auth'
import ControlsPage from '../coming-soon/routes/Controls'
import FIAHomePage from '../modules/fia/fia-home/FiaHomePage'
import FIAResourcePage from '../modules/fia/fia-resource/FiaResourcePage'

const PrivateRoutes = () => {
  const {currentUser} = useAuth()

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='home/*' element={<FIAHomePage />} />
        <Route path='fia-resource/*' element={<FIAResourcePage />} />

        {currentUser?.role === 'administrator' && (
          <Route path='controls/*' element={<ControlsPage />} />
        )}

        <Route path='auth/*' element={<Navigate to='/home/overview' replace />} />
        <Route path='dashboard' element={<Navigate to='/home/overview' replace />} />
        <Route path='dashboard/*' element={<Navigate to='/home/overview' replace />} />

        <Route path='*' element={<Navigate to='/error/404' replace />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
