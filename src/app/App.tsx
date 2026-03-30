import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {CompanySizeContextProvider} from '../_metronic/layout/components/header/CompanySizeContext'

const App = () => {
  return(
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <AuthInit>
          <CompanySizeContextProvider>
            <Outlet />
            <MasterInit />
          </CompanySizeContextProvider>
        </AuthInit>
      </LayoutProvider>
    </Suspense>
  )
}

export {App}
