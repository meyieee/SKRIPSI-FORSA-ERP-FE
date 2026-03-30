import React, { useState, useMemo } from 'react'
import { useOnlineRequestContext } from './OnlineRequestContext'
import OnlineRequestTable from './OnlineRequestTable'
import OnlineRequestViewModal from './modal/OnlineRequestViewModal'
import { OnlineRequest } from './types'
import { FeedsFilters } from '../../core/types'

type Props = {
  filters: FeedsFilters
}

const OnlineRequestTab: React.FC<Props> = ({ filters }) => {
  const { requests } = useOnlineRequestContext()
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<OnlineRequest | null>(null)

  const filteredRequests = useMemo(() => {
    let result: OnlineRequest[] = [...requests]

    // Apply filter logic based on filters
    if (filters.site) {
      // Filter by site if needed
    }
    if (filters.department) {
      // Filter by department if needed
    }
    if (filters.section) {
      // Filter by section if needed
    }
    if (filters.element) {
      // Filter by element if needed
    }
    if (filters.date) {
      // Filter by date if needed
    }

    return result
  }, [requests, filters])

  const handleView = (request: OnlineRequest) => {
    setSelectedRequest(request)
    setShowRequestModal(true)
  }

  return (
    <div>
      <OnlineRequestTable requests={filteredRequests} onView={handleView} />
      <OnlineRequestViewModal
        show={showRequestModal}
        onHide={() => setShowRequestModal(false)}
        request={selectedRequest}
      />
    </div>
  )
}

export default OnlineRequestTab

