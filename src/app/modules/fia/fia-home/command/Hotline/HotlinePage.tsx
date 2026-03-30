import React, { useState, useMemo } from 'react'
import HotlineOverview from './components/HotlineOverview'
import HotlineFilterBar from './components/HotlineFilterBar'
import HelpdeskRequestTable from './components/HelpdeskRequestTable'
import { HotlineFilters, HelpdeskRequest } from './core/types'
import { defaultFilters } from './core/constants'
import {
  mockHotlineContacts,
  mockInChargePersons,
  mockHelpdeskRequests,
} from './data/mock'

const HotlinePage: React.FC = () => {
  const [filters, setFilters] = useState<HotlineFilters>(defaultFilters)

  const filteredRequests = useMemo(() => {
    let result: HelpdeskRequest[] = [...mockHelpdeskRequests]

    if (filters.site) {
      // Filter logic based on site if needed
    }
    if (filters.department) {
      // Filter logic based on department if needed
    }
    if (filters.section) {
      // Filter logic based on section if needed
    }
    if (filters.element) {
      // Filter logic based on element if needed
    }
    if (filters.date) {
      // Filter logic based on date if needed
    }

    return result
  }, [filters])

  const handleFilterChange = (newFilters: HotlineFilters) => {
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

  const handleRequestView = (request: HelpdeskRequest) => {
    // Handle view request detail
    console.log('View request:', request)
  }

  return (
    <div className='container-fluid'>
      <HotlineOverview contacts={mockHotlineContacts} inChargePersons={mockInChargePersons} />
      <HotlineFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onView={handleView}
        onUpdate={handleUpdate}
      />
      <HelpdeskRequestTable requests={filteredRequests} onView={handleRequestView} />
    </div>
  )
}

export default HotlinePage

