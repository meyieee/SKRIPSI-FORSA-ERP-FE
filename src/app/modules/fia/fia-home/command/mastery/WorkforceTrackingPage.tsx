import {FC} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

/* Workforce Tracking imports */
import {WorkforceTrackingView} from './WorkforceTrackingView'
import {ProfileProvider} from '../../../fia-resource/personal-info/components/ProfileContext'
import {WorkforceMasteryTab, AssetMasteryTab} from './components/tabs'
import StockMasteryTab from './components/stock/StockMasteryTab'
import {CompanyMasteryPage} from './company-mastery/CompanyMasteryPage'

/* File Routing */
const FIAResourcePage: FC = () => {
  return (
    <Routes>
      {/* --- WORKFORCE TRACKING --- */}
      <Route
        element={
          <ProfileProvider>
            <WorkforceTrackingView />
          </ProfileProvider>
        }
      >
        <Route index element={<Navigate to='stock' replace />} />
        <Route path='workforce' element={<WorkforceMasteryTab />} />
        <Route path='asset' element={<AssetMasteryTab />} />
        <Route path='stock' element={<StockMasteryTab />} />
        <Route path='company-mastery' element={<CompanyMasteryPage />} />
      </Route>
    </Routes>
  )
}

export default FIAResourcePage
