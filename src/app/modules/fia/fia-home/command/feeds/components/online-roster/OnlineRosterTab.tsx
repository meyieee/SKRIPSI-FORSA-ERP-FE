import React, { useState, useMemo } from 'react'
import { useOnlineRosterContext } from './OnlineRosterContext'
import OnlineRosterTable from './OnlineRosterTable'
import OnlineRosterViewModal from './modal/OnlineRosterViewModal'
import { OnlineRoster } from './types'
import { FeedsFilters } from '../../core/types'

type Props = {
  filters: FeedsFilters
}

const OnlineRosterTab: React.FC<Props> = ({ filters }) => {
  const { roster } = useOnlineRosterContext()
  const [showRosterModal, setShowRosterModal] = useState(false)
  const [selectedRoster, setSelectedRoster] = useState<OnlineRoster | null>(null)

  const filteredRoster = useMemo(() => {
    let result: OnlineRoster[] = [...roster]

    // Apply filter logic
    if (filters.site) {
      result = result.filter((r) => r.siteBranch === filters.site)
    }
    if (filters.department) {
      result = result.filter((r) => r.department === filters.department)
    }
    if (filters.section) {
      result = result.filter((r) => r.section === filters.section)
    }
    if (filters.element) {
      result = result.filter((r) => r.element === filters.element)
    }

    return result
  }, [roster, filters])

  // Use filter date or default to March 2025 (matching mock data)
  const selectedDate = filters.date || '2025-03-16'

  const handleView = (rosterItem: OnlineRoster) => {
    setSelectedRoster(rosterItem)
    setShowRosterModal(true)
  }

  return (
    <div>
      <OnlineRosterTable roster={filteredRoster} selectedDate={selectedDate} onView={handleView} />
      <OnlineRosterViewModal
        show={showRosterModal}
        onHide={() => setShowRosterModal(false)}
        roster={selectedRoster}
      />
    </div>
  )
}

export default OnlineRosterTab

