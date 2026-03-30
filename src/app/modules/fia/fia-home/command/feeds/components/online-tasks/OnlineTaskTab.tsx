import React, { useState, useMemo } from 'react'
import { useOnlineTaskContext } from './OnlineTaskContext'
import OnlineTaskTable from './OnlineTaskTable'
import OnlineTaskViewModal from './modal/OnlineTaskViewModal'
import { OnlineTask } from './types'
import { FeedsFilters } from '../../core/types'

type Props = {
  filters: FeedsFilters
}

const OnlineTaskTab: React.FC<Props> = ({ filters }) => {
  const { tasks } = useOnlineTaskContext()
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<OnlineTask | null>(null)

  const filteredTasks = useMemo(() => {
    let result: OnlineTask[] = [...tasks]
    // Apply filter logic
    return result
  }, [tasks, filters])

  const handleView = (task: OnlineTask) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  return (
    <div>
      <OnlineTaskTable tasks={filteredTasks} onView={handleView} />
      <OnlineTaskViewModal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        task={selectedTask}
      />
    </div>
  )
}

export default OnlineTaskTab

