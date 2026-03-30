import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import FeedsFilterBar from './components/FeedsFilterBar'
import FeedsNavTab from './components/FeedsNavTab'
import { FeedsFilters } from './core/types'
import { defaultFeedsFilters } from './core/constants'
import { OnlineRequestProvider } from './components/online-request/OnlineRequestContext'
import { OnlineTaskProvider } from './components/online-tasks/OnlineTaskContext'
import { OnlineReminderProvider } from './components/online-reminder/OnlineReminderContext'
import { OnlineRosterProvider } from './components/online-roster/OnlineRosterContext'
import OnlineRequestTab from './components/online-request/OnlineRequestTab'
import OnlineTaskTab from './components/online-tasks/OnlineTaskTab'
import OnlineReminderTab from './components/online-reminder/OnlineReminderTab'
import OnlineRosterTab from './components/online-roster/OnlineRosterTab'

const FeedsPage: React.FC = () => {
  const [filters, setFilters] = useState<FeedsFilters>(defaultFeedsFilters)

  const handleFilterChange = (newFilters: FeedsFilters) => {
    setFilters(newFilters)
  }

  const handleView = () => {
    // Handle view action
    console.log('View clicked', filters)
  }

  const handleUpdate = () => {
    // Handle update action
    console.log('Update clicked', filters)
  }

  return (
    <div className='container-fluid'>
      <FeedsFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onView={handleView}
        onUpdate={handleUpdate}
      />
      <FeedsNavTab />
      <div className='tab-content'>
        <OnlineRequestProvider>
          <OnlineTaskProvider>
            <OnlineReminderProvider>
              <OnlineRosterProvider>
                <Routes>
                  <Route path='online-request' element={<OnlineRequestTab filters={filters} />} />
                  <Route path='online-tasks' element={<OnlineTaskTab filters={filters} />} />
                  <Route
                    path='online-reminder'
                    element={<OnlineReminderTab filters={filters} />}
                  />
                  <Route path='online-roster' element={<OnlineRosterTab filters={filters} />} />
                  <Route index element={<Navigate to='online-request' replace />} />
                </Routes>
              </OnlineRosterProvider>
            </OnlineReminderProvider>
          </OnlineTaskProvider>
        </OnlineRequestProvider>
      </div>
    </div>
  )
}

export default FeedsPage

