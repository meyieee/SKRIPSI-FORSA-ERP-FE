import React, {createContext, useContext, ReactNode} from 'react'
import {useLocation} from 'react-router-dom'

// Menghemat kode pada FiaResourcePage.tsx
// Mengimpor seluruh provider
import {ApprovalProvider, RequestsProvider, TasksProvider} from './tabs'

// Membuat Context untuk nilai activeTab
const TabContext = createContext<any>(null)

// Hook untuk mengambil nilai activeTab
export const useTabContext = () => {
  return useContext(TabContext)
}

// Provider untuk membungkus aplikasi dan menyediakan nilai activeTab
export const TabProvider = ({children}: {children: ReactNode}) => {
  const location = useLocation()

  // Mengambil tab aktif dari URL
  const activeTab = location.pathname.split('/').pop() // Misalnya, 'approval', 'requests', dll.

  return (
    <TabContext.Provider value={{activeTab}}>
      <ApprovalProvider>
        <RequestsProvider>
          <TasksProvider>{children}</TasksProvider>
        </RequestsProvider>
      </ApprovalProvider>
    </TabContext.Provider>
  )
}
