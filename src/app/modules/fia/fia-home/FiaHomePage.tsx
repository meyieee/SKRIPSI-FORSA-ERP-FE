import {FC} from 'react'
import {FiaHomeView} from './overview/FiaHomeView'
import {FiaHomeCompany} from './company/FiaHomeCompany'
import { Route, Routes } from 'react-router-dom'
import FiaHomeOnlineServices from './online-service/FiaHomeOnlineServices'
import { PageTitle } from '../../../../_metronic/layout/core'
import FiaHomeCommandCenter from './command/FiaHomeCommandCenter'
import HomePolicyPage from './policy-procedurs/HomePolicyPage'
import { ProtectedRoute } from '../../auth/components/ProtectedRoute'

const FIAHomePage: FC = () => {
  return (
    <Routes>
      <Route
        path='overview'
        element={
          <ProtectedRoute routePath='/home/overview'>
            <FiaHomeView />
          </ProtectedRoute>
        }
      />
      
      <Route
        path='Company_Profile'
        element={
          <ProtectedRoute routePath='/home/company_list'>
            <FiaHomeCompany />
          </ProtectedRoute>
        }
      />
      <Route
        path='company_list'
        element={
          <ProtectedRoute routePath='/home/company_list'>
            <FiaHomeCompany />
          </ProtectedRoute>
        }
      />
      <Route
        path='online_service'
        element={
          <ProtectedRoute routePath='/home/online_service'>
            <>
              <PageTitle>Online Services</PageTitle>
              <FiaHomeOnlineServices />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path='command_center/*'
        element={
          <ProtectedRoute routePath='/home/command_center'>
            <>
              <PageTitle>Command Center</PageTitle>
              <FiaHomeCommandCenter />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path='policy&procedures'
        element={
          <ProtectedRoute routePath='/home/policy&procedures'>
            <>
              <PageTitle>Policy & Procedures</PageTitle>
              <HomePolicyPage />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default FIAHomePage
