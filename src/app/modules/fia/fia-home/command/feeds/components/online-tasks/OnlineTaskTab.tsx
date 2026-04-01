import React, { useState, useMemo, useEffect } from 'react'
import { useOnlineTaskContext } from './OnlineTaskContext'
import OnlineTaskTable from './OnlineTaskTable'
import OnlineTaskViewModal from './modal/OnlineTaskViewModal'
import { matchesOnlineTaskFilters, OnlineTask } from './types'
import { FeedsFilters } from '../../core/types'

type Props = {
  filters: FeedsFilters
  refreshKey: number
}

const OnlineTaskTab: React.FC<Props> = ({ filters, refreshKey }) => {
  const { tasks, isLoading, error, refreshTasks } = useOnlineTaskContext()
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<OnlineTask | null>(null)

  useEffect(() => {
    if (refreshKey === 0) return
    refreshTasks(filters)
  }, [refreshKey])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => matchesOnlineTaskFilters(task, filters))
  }, [tasks, filters])

  const handleView = (task: OnlineTask) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  return (
    <div>
      <OnlineTaskTable
        tasks={filteredTasks}
        onView={handleView}
        isLoading={isLoading}
        error={error}
      />
      <OnlineTaskViewModal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        task={selectedTask}
      />
    </div>
  )
}

export default OnlineTaskTab

