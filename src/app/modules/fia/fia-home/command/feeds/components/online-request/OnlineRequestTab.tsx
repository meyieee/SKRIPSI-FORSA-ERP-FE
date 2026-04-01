import React, { useState, useMemo, useEffect } from 'react'
import { useOnlineRequestContext } from './OnlineRequestContext'
import OnlineRequestTable from './OnlineRequestTable'
import OnlineRequestViewModal from './modal/OnlineRequestViewModal'
import { matchesOnlineRequestFilters, OnlineRequest } from './types'
import { FeedsFilters } from '../../core/types'

type Props = {
  filters: FeedsFilters
  refreshKey: number
}

const OnlineRequestTab: React.FC<Props> = ({ filters, refreshKey }) => {
  const { requests, isLoading, error, refreshRequests } = useOnlineRequestContext()
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<OnlineRequest | null>(null)

  useEffect(() => {
    if (refreshKey === 0) return
    refreshRequests(filters)
  }, [refreshKey])

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => matchesOnlineRequestFilters(request, filters))
  }, [requests, filters])

  const handleView = (request: OnlineRequest) => {
    setSelectedRequest(request)
    setShowRequestModal(true)
  }

  return (
    <div>
      <OnlineRequestTable
        requests={filteredRequests}
        onView={handleView}
        isLoading={isLoading}
        error={error}
      />
      <OnlineRequestViewModal
        show={showRequestModal}
        onHide={() => setShowRequestModal(false)}
        request={selectedRequest}
      />
    </div>
  )
}

export default OnlineRequestTab

