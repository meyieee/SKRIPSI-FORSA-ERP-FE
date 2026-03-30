import React, { useState, useMemo } from 'react'
import { useOnlineReminderContext } from './OnlineReminderContext'
import OnlineReminderTable from './OnlineReminderTable'
import OnlineReminderViewModal from './modal/OnlineReminderViewModal'
import { OnlineReminder } from './types'
import { FeedsFilters } from '../../core/types'

type Props = {
  filters: FeedsFilters
}

const OnlineReminderTab: React.FC<Props> = ({ filters }) => {
  const { reminders } = useOnlineReminderContext()
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState<OnlineReminder | null>(null)

  const filteredReminders = useMemo(() => {
    let result: OnlineReminder[] = [...reminders]
    // Apply filter logic
    return result
  }, [reminders, filters])

  const handleView = (reminder: OnlineReminder) => {
    setSelectedReminder(reminder)
    setShowReminderModal(true)
  }

  return (
    <div>
      <OnlineReminderTable reminders={filteredReminders} onView={handleView} />
      <OnlineReminderViewModal
        show={showReminderModal}
        onHide={() => setShowReminderModal(false)}
        reminder={selectedReminder}
      />
    </div>
  )
}

export default OnlineReminderTab

