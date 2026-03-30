import React from 'react'
import {TasksProvider} from './TasksContext'
import {ChatProvider} from './chat/ChatContext'
import TasksTab from './TasksTab'
import ChatWindow from './chat/ChatWindow'

/* Untuk membungkus page yang ada di tab Tasks karena memiliki beberapa layer */
const TasksPage: React.FC = () => {
  return (
    <TasksProvider>
      <ChatProvider>
        <div className='d-flex'>
          <div className='flex-grow-1'>
            <TasksTab />
          </div>
          <ChatWindow />
        </div>
      </ChatProvider>
    </TasksProvider>
  )
}

export default TasksPage
